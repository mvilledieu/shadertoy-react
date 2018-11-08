// @flow
import React, { Component } from 'react';

export const NearestFilter = 9728;
export const LinearFilter = 9729;
export const NearestMipMapNearestFilter = 9984;
export const LinearMipMapNearestFilter = 9985;
export const NearestMipMapLinearFilter = 9986;
export const LinearMipMapLinearFilter = 9987;
export const ClampToEdgeWrapping = 33071;
export const MirroredRepeatWrapping = 33648;
export const RepeatWrapping = 10497;

const FS_PRECISION_PREPROCESSOR = 
`#ifdef GL_ES
    precision mediump float;
#endif\n`;

const FS_MAIN_SHADER = 
`\nvoid main(void){
    vec4 color = vec4(0.0,0.0,0.0,1.0);
    mainImage( color, gl_FragCoord.xy );
    gl_FragColor = color;
}`;

const BASIC_FS = 
`void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = vec4(col,1.0);
}`;

const BASIC_VS = 
`attribute vec3 aVertexPosition;
void main(void) {
    gl_Position = vec4(aVertexPosition, 1.0);
}`;

const UNIFORM_TIME = 'iTime';
const UNIFORM_TIMEDELTA = 'iTimeDelta';
const UNIFORM_FRAME = 'iFrame';
const UNIFORM_MOUSE = 'iMouse';
const UNIFORM_RESOLUTION = 'iResolution';
const UNIFORM_CHANNEL = 'iChannel';

const builtInUniforms = {
  [UNIFORM_TIME]: {
    type: 'float',
    isNeeded: false,
  },
  [UNIFORM_MOUSE]: {
    type: 'vec2',
    isNeeded: false,
  },
  [UNIFORM_RESOLUTION]: {
    type: 'vec2',
    isNeeded: false,
  },
  [UNIFORM_FRAME]: {
    type: 'int',
    isNeeded: false,
  },
  [UNIFORM_TIMEDELTA]: {
    type: 'float',
    isNeeded: false,
  },
};

/* eslint-disable */
type TextureType = {
  url: string,
  wrapS?: number,
  wrapT?: number,
  minFilter?: number,
  magFilter?: number,
  flipY?: number,
};
/* eslint-emable */

type Props = {
  fs: string,
  vs?: string,
  textures?: Array<TextureType>,
  customStyle?: string,
  contextOptions?: Object,
  devicePixelRatio?: number,
  imagesLoaded?: Function,
};

type Shaders = {
  fs: string,
  vs: string,
};

const INCREMENT_TIME = 0.02;

const lerp = (v0: number, v1: number, t: number) => v0 * (1 - t) + v1 * t;
const insertStringAtIndex = (
  currentString: string,
  string: string,
  index: number
) =>
  index > 0
    ? currentString.substring(0, index) +
      string +
      currentString.substring(index, currentString.length)
    : string + currentString;

// eslint-disable-next-line
const isPowerOf2 = (value: number) => (value & (value - 1)) == 0;
const floorPowerOfTwo = (value: number) =>
  2 ** Math.floor(Math.log(value) / Math.LN2);
const textureNeedsGenerateMipmaps = (
  texture: TextureType,
  isPowerOfTwo: boolean
) =>
  isPowerOfTwo &&
  texture.minFilter !== NearestFilter &&
  texture.minFilter !== LinearFilter;
const textureNeedsPowerOfTwo = (texture: TextureType) => {
  if (
    texture.wrapS !== ClampToEdgeWrapping ||
    texture.wrapT !== ClampToEdgeWrapping
  )
    return true;
  if (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter)
    return true;
  return false;
};

export default class ShadertoyReact extends Component<Props, *> {
  static defaultProps = {
    textures: [],
    contextOptions: { premultipliedAlpha: false, alpha: true },
    devicePixelRatio: 1,
    vs: BASIC_VS,
    customStyle: ``,
  };

  componentDidMount = () => {
    this.initWebGL();

    const { fs, vs, textures, imagesLoaded } = this.props;
    const { gl } = this;

    if (gl) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
      gl.clearDepth(1.0); // Clear everything
      gl.enable(gl.DEPTH_TEST); // Enable depth testing
      gl.depthFunc(gl.LEQUAL); // Near things obscure far things
      gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      
      this.canvas.height = this.canvas.clientHeight;
      this.canvas.width = this.canvas.clientWidth;

      if (textures && textures.length > 0) {
        const texturePromisesArr = textures.map((texture: TextureType, id: number) => {
          builtInUniforms[`${UNIFORM_CHANNEL}${id}`] = {
            type: 'sampler2D',
            isNeeded: false,
          };
          return this.loadTexture(texture);
        });

        if (imagesLoaded) {
          Promise.all(texturePromisesArr).then(() => imagesLoaded());
        }
      }
      const shaders = this.preProcessShaders(fs || BASIC_FS, vs || BASIC_VS);
      this.initShaders(shaders);
      this.initBuffers();
      this.drawScene();
      this.addEventListeners();
      this.onResize();

      this.timeoutId = setTimeout(() => this.onResize(), 500);
    }
  };

  shouldComponentUpdate = () => false;

  componentWillUnmount() {
    const { gl } = this;

    if(gl) {
      gl.getExtension('WEBGL_lose_context').loseContext();

      gl.useProgram(null);
      gl.deleteProgram(this.shaderProgram);

      if (this.textures.length > 0) {
        this.textures.forEach(texture => {
          gl.deleteTexture(texture);
        });
      }

      this.shaderProgram = null;
    }

    this.removeEventListeners();
    clearTimeout(this.timeoutId);
    cancelAnimationFrame(this.animFrameId);
  }

  gl: WebGLRenderingContext;

  squareVerticesBuffer: WebGLBuffer;

  shaderProgram: WebGLProgram;

  vertexPositionAttribute: number;

  animFrameId: AnimationFrameID;

  timeoutId: TimeoutID;

  canvas: HTMLCanvasElement;

  pow2canvas: HTMLCanvasElement;

  mouse: Object = { x: 0, y: 0 };

  mouseX: number = 0;

  mouseY: number = 0;

  canvasPosition: Object = {};

  timer: number = 0;

  textures: Array<WebGLTexture> = [];

  lastTime: number = 0;

  frame: number = 0;

  initWebGL = () => {
    const { contextOptions } = this.props;
    // $FlowFixMe
    this.gl =
      this.canvas.getContext('webgl', contextOptions) ||
      this.canvas.getContext('experimental-webgl', contextOptions);
    // $FlowFixMe
    this.gl.getExtension('OES_standard_derivatives');
    // $FlowFixMe
    this.gl.getExtension('EXT_shader_texture_lod');
  };

  initBuffers = () => {
    const { gl } = this;

    this.squareVerticesBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticesBuffer);

    const vertices = [
      1.0,
      1.0,
      0.0,
      -1.0,
      1.0,
      0.0,
      1.0,
      -1.0,
      0.0,
      -1.0,
      -1.0,
      0.0,
    ];

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vertices),
      gl.STATIC_DRAW
    );
  };

  addEventListeners = () => {
    if (builtInUniforms.iMouse.isNeeded) {
      this.canvas.addEventListener('mousemove', this.onMouseMove, {
        passive: true,
      });
      this.canvas.addEventListener('mouseout', this.onMouseOut, {
        passive: true,
      });
    }

    window.addEventListener('resize', this.onResize, { passive: true });
  };

  removeEventListeners = () => {
    if (builtInUniforms.iMouse.isNeeded) {
      this.canvas.removeEventListener('mousemove', this.onMouseMove, {
        passive: true,
      });
      this.canvas.removeEventListener('mouseout', this.onMouseOut, {
        passive: true,
      });
    }

    window.removeEventListener('resize', this.onResize, { passive: true });
  };

  onMouseMove = (event: SyntheticMouseEvent<*>) => {
    const canvasPosition = this.canvas.getBoundingClientRect();

    const mouseX = event.clientX - canvasPosition.left;
    const mouseY = event.clientY - canvasPosition.top;

    this.mouseX = 2 * (mouseX / canvasPosition.width) - 1;
    this.mouseY = 1 - 2 * (mouseY / canvasPosition.height);
  };

  onResize = () => {
    const { gl } = this;
    const { devicePixelRatio = 1 } = this.props;
    this.canvasPosition = this.canvas.getBoundingClientRect();

    const realToCSSPixels = devicePixelRatio; // Force pixel ratio to be one to avoid expensive calculus on retina display

    const displayWidth = Math.floor(
      this.canvasPosition.width * realToCSSPixels
    );
    const displayHeight = Math.floor(
      this.canvasPosition.height * realToCSSPixels
    );

    gl.canvas.width = displayWidth;
    gl.canvas.height = displayHeight;

    if (builtInUniforms.iResolution.isNeeded) {
      const rUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_RESOLUTION
      );
      // $FlowFixMe
      gl.uniform2fv(rUniform, [
        gl.canvas.width,
        gl.canvas.height,
      ]);
    }
  };

  onMouseOut = () => {
    this.mouseX = 0;
    this.mouseY = 0;
  };

  makePowerOfTwo = (
    image: HTMLImageElement | HTMLCanvasElement | ImageBitmap
  ) => {
    if (
      image instanceof HTMLImageElement ||
      image instanceof HTMLCanvasElement ||
      image instanceof ImageBitmap
    ) {
      if (this.pow2canvas === undefined)
        this.pow2canvas = document.createElement('canvas');

      this.pow2canvas.width = floorPowerOfTwo(image.width);
      this.pow2canvas.height = floorPowerOfTwo(image.height);

      const context = this.pow2canvas.getContext('2d');
      context.drawImage(
        image,
        0,
        0,
        this.pow2canvas.width,
        this.pow2canvas.height
      );

      // eslint-disable-next-line
      console.warn(
        `ShadertoyReact: Image is not power of two ${image.width} x ${
          image.height
        }. Resized to ${this.pow2canvas.width} x ${this.pow2canvas.height}`
      );

      return this.pow2canvas;
    }
    return image;
  };

  loadTexture = (textureArgs: TextureType) => {
    const { gl } = this;
    const {
      url,
      wrapS,
      wrapT,
      minFilter,
      magFilter,
      flipY = -1,
    }: TextureType = textureArgs;

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([255, 255, 255, 0]);

    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      width,
      height,
      border,
      srcFormat,
      srcType,
      pixel
    );

    return new Promise((resolve, reject) => {
      let image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`failed loading url: ${url}`));
      image.src = url;
    }).then(image => {
      let isPowerOfTwoImage =
        isPowerOf2(image.width) && isPowerOf2(image.height);

      if (textureNeedsPowerOfTwo(textureArgs) && isPowerOfTwoImage === false) {
        image = this.makePowerOfTwo(image);
        isPowerOfTwoImage = true;
      }

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      gl.texImage2D(
        gl.TEXTURE_2D,
        level,
        internalFormat,
        srcFormat,
        srcType,
        image
      );

      if (textureNeedsGenerateMipmaps(textureArgs, isPowerOfTwoImage)) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }

      if (minFilter) {
        gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_MIN_FILTER,
          minFilter
        );
      }

      if (magFilter) {
        gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_MAG_FILTER,
          magFilter
        );
      }

      if (wrapS && wrapT) {
        gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_WRAP_S,
          wrapS
        );
        gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_WRAP_T,
          wrapT
        );
      }

      this.textures.unshift(texture);
    });
  };

  drawScene = (timestamp: number) => {
    const { gl } = this;
    
    gl.viewport(
      0,
      0,
      gl.drawingBufferWidth,
      gl.drawingBufferHeight
    );

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // eslint-disable-line no-bitwise

    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticesBuffer);
    gl.vertexAttribPointer(
      this.vertexPositionAttribute,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );

    this.setUniforms(timestamp);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (builtInUniforms.iMouse.isNeeded) {
      this.mouse.x = lerp(this.mouse.x, this.mouseX, 0.1);
      this.mouse.y = lerp(this.mouse.y, this.mouseY, 0.1);
    }

    this.animFrameId = requestAnimationFrame(this.drawScene);
  };

  createShader = (type: number, shaderCodeAsText: string) => {
    const { gl } = this;

    const shader = gl.createShader(type);

    gl.shaderSource(shader, shaderCodeAsText);
    gl.compileShader(shader);

    /* eslint-disable no-console */
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('Error compiling the shader:', shaderCodeAsText);
      const compilationLog = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      console.error(`Shader compiler log: ${compilationLog}`);
    }
    /* eslint-enable no-console */

    return shader;
  };

  initShaders = ({ fs, vs }: Shaders) => {
    const { gl } = this;
    // console.log(fs, vs);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fs);
    const vertexShader = this.createShader(gl.VERTEX_SHADER, vs);

    this.shaderProgram = gl.createProgram();
    gl.attachShader(this.shaderProgram, vertexShader);
    gl.attachShader(this.shaderProgram, fragmentShader);
    gl.linkProgram(this.shaderProgram);

    /* eslint-disable no-console */
    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
      // $FlowFixMe
      console.error(
        `Unable to initialize the shader program: ${gl.getProgramInfoLog(
          this.shaderProgram
        )}`
      );
      return;
    }
    /* eslint-enable no-console */

    gl.useProgram(this.shaderProgram);

    this.vertexPositionAttribute = gl.getAttribLocation(
      this.shaderProgram,
      'aVertexPosition'
    );
    gl.enableVertexAttribArray(this.vertexPositionAttribute);
  };

  preProcessShaders = (fs: string, vs: string) => {
    let fsString = FS_PRECISION_PREPROCESSOR.concat(fs);
    const string = '#endif';
    const index = fsString.lastIndexOf(string);
    Object.keys(builtInUniforms).forEach((uniform: string) => {
      if (fs.includes(uniform)) {
        fsString = insertStringAtIndex(
          fsString,
          `uniform ${builtInUniforms[uniform].type} ${uniform}; \n`,
          index + string.length + 1
        );
        builtInUniforms[uniform].isNeeded = true;
      }
    });
    
    fsString = fsString.concat(FS_MAIN_SHADER);
    console.log(fsString);
    return { fs: fsString, vs };
  };

  setUniforms = (timestamp: number) => {

    const { gl } = this;
    
    let delta = this.lastTime ? ((timestamp - this.lastTime) / 1000) : 0;
    this.lastTime = timestamp;

    if (builtInUniforms.iMouse.isNeeded) {
      const mouseUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_MOUSE
      );
      // $FlowFixMe
      gl.uniform2fv(mouseUniform, [this.mouse.x, this.mouse.y]);
    }

    if (builtInUniforms.iTime.isNeeded) {
      const timeUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_TIME
      );
      gl.uniform1f(timeUniform, this.timer += delta );
    }

    if (builtInUniforms.iTimeDelta.isNeeded) {
      const timeDeltaUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_TIMEDELTA
      );
      gl.uniform1f(timeUniform, delta );
    }

    if (builtInUniforms.iFrame.isNeeded) {
      const timeDeltaUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_FRAME
      );
      gl.uniform1f(timeUniform, this.frame++ );
    }

    if (this.textures.length > 0) {
      this.textures.forEach((texture, id) => {
        if (builtInUniforms[`iChannel${id}`].isNeeded) {
          const iChannel = gl.getUniformLocation(
            this.shaderProgram,
            `iChannel${id}`
          );
          gl.activeTexture(gl[`TEXTURE${id}`]);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.uniform1i(iChannel, id);
        }
      });
    }
  };

  registerCanvas = (r: HTMLCanvasElement) => {
    this.canvas = r;
  };

  render = () => {
    const { style } = this.props;

    const currentStyle = {
        glCanvas: {
          position: 'absolute',
          height: '100%',
          width: '100%',
          ...style,
        }
    };

    return (
      <canvas style={currentStyle.glCanvas} ref={this.registerCanvas} />
    );
  };
}
