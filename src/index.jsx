// @flow
import React, { Component } from "react";
import Texture, {
  NearestFilter,
  LinearFilter,
  NearestMipMapNearestFilter,
  LinearMipMapNearestFilter,
  NearestMipMapLinearFilter,
  LinearMipMapLinearFilter,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  RepeatWrapping,
} from "./Texture";

import { SRLOG } from "./prefixLogs";

import { uniformTypeToGLSLType, processUniform } from "./uniformsType";

export {
  NearestFilter,
  LinearFilter,
  NearestMipMapNearestFilter,
  LinearMipMapNearestFilter,
  NearestMipMapLinearFilter,
  LinearMipMapLinearFilter,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  RepeatWrapping,
};

const PRECISIONS = ["lowp", "mediump", "highp"];

const FS_MAIN_SHADER = `\nvoid main(void){
    vec4 color = vec4(0.0,0.0,0.0,1.0);
    mainImage( color, gl_FragCoord.xy );
    gl_FragColor = color;
}`;

const BASIC_FS =
  // Basic shadertoy shader
  `void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord/iResolution.xy;
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
    fragColor = vec4(col,1.0);
}`;

const BASIC_VS = `attribute vec3 aVertexPosition;
void main(void) {
    gl_Position = vec4(aVertexPosition, 1.0);
}`;

// Shadertoy built-in uniforms
const UNIFORM_TIME = "iTime";
const UNIFORM_TIMEDELTA = "iTimeDelta";
const UNIFORM_DATE = "iDate";
const UNIFORM_FRAME = "iFrame";
const UNIFORM_MOUSE = "iMouse";
const UNIFORM_RESOLUTION = "iResolution";
const UNIFORM_CHANNEL = "iChannel";
const UNIFORM_CHANNELRESOLUTION = "iChannelResolution";

// Uniforms not built-int in shadertoy
const UNIFORM_DEVICEORIENTATION = "iDeviceOrientation";

/* eslint-disable */
type TexturePropsType = {
  url: string,
  wrapS?: number,
  wrapT?: number,
  minFilter?: number,
  magFilter?: number,
  flipY?: number,
};
/* eslint-emable */

type Uniform = {
  type: string,
  value: number | Array<number>,
};

type Props = {
  fs: string,
  vs?: string,
  textures?: Array<TexturePropsType>,
  uniforms?: Array<Uniform>,
  clearColor?: Array<number>,
  precision?: string,
  style?: string,
  contextAttributes?: Object,
  onDoneLoadingTextures?: Function,
  lerp?: number,
  devicePixelRatio?: number,
};

type Shaders = {
  fs: string,
  vs: string,
};

const lerpVal = (v0: number, v1: number, t: number) => v0 * (1 - t) + v1 * t;
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

export default class ShadertoyReact extends Component<Props, *> {
  constructor(props) {
    super(props);

    this.uniforms = {
      [UNIFORM_TIME]: {
        type: "float",
        isNeeded: false,
        value: 0,
      },
      [UNIFORM_TIMEDELTA]: {
        type: "float",
        isNeeded: false,
        value: 0,
      },
      [UNIFORM_DATE]: {
        type: "vec4",
        isNeeded: false,
        value: [0, 0, 0, 0],
      },
      [UNIFORM_MOUSE]: {
        type: "vec4",
        isNeeded: false,
        value: [0, 0, 0, 0],
      },
      [UNIFORM_RESOLUTION]: {
        type: "vec2",
        isNeeded: false,
        value: [0, 0],
      },
      [UNIFORM_FRAME]: {
        type: "int",
        isNeeded: false,
        value: 0,
      },
      [UNIFORM_DEVICEORIENTATION]: {
        type: "vec4",
        isNeeded: false,
        value: [0, 0, 0, 0],
      },
    };
  }

  static defaultProps = {
    textures: [],
    contextAttributes: {},
    devicePixelRatio: 1,
    vs: BASIC_VS,
    precision: "highp",
  };

  componentDidMount = () => {
    this.initWebGL();

    const { fs, vs, clearColor = [0, 0, 0, 1] } = this.props;
    const { gl } = this;

    if (gl) {
      gl.clearColor(...clearColor);
      gl.clearDepth(1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.viewport(0, 0, this.canvas.width, this.canvas.height);

      this.canvas.height = this.canvas.clientHeight;
      this.canvas.width = this.canvas.clientWidth;

      this.processCustomUniforms();
      this.processTextures();
      const shaders = this.preProcessShaders(fs || BASIC_FS, vs || BASIC_VS);
      this.initShaders(shaders);
      this.initBuffers();
      this.drawScene();
      this.addEventListeners();
      this.onResize();
    }
  };

  shouldComponentUpdate = () => false;

  componentWillUnmount() {
    const { gl } = this;

    if (gl) {
      gl.getExtension("WEBGL_lose_context").loseContext();

      gl.useProgram(null);
      gl.deleteProgram(this.shaderProgram);

      if (this.texturesArr.length > 0) {
        this.texturesArr.forEach((texture: Texture) => {
          gl.deleteTexture(texture._webglTexture);
        });
      }

      this.shaderProgram = null;
    }

    this.removeEventListeners();
    cancelAnimationFrame(this.animFrameId);
  }

  setupChannelRes = ({ width, height }: Texture, id: number) => {
    const { devicePixelRatio = 1 } = this.props;
    this.uniforms.iChannelResolution.value[id * 3] = width * devicePixelRatio;
    this.uniforms.iChannelResolution.value[id * 3 + 1] =
      height * devicePixelRatio;
    this.uniforms.iChannelResolution.value[id * 3 + 2] = 0;
    // console.log(this.uniforms);
  };

  initWebGL = () => {
    const { contextAttributes } = this.props;
    // $FlowFixMe
    this.gl =
      this.canvas.getContext("webgl", contextAttributes) ||
      this.canvas.getContext("experimental-webgl", contextAttributes);
    // $FlowFixMe
    this.gl.getExtension("OES_standard_derivatives");
    // $FlowFixMe
    this.gl.getExtension("EXT_shader_texture_lod");
  };

  initBuffers = () => {
    const { gl } = this;

    this.squareVerticesBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticesBuffer);

    const vertices = [
      1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  };

  addEventListeners = () => {
    const options = {
      passive: true,
    };

    if (this.uniforms.iMouse.isNeeded) {
      this.canvas.addEventListener("mousemove", this.mouseMove, options);
      this.canvas.addEventListener("mouseout", this.mouseUp, options);
      this.canvas.addEventListener("mouseup", this.mouseUp, options);
      this.canvas.addEventListener("mousedown", this.mouseDown, options);

      this.canvas.addEventListener("touchmove", this.mouseMove, options);
      this.canvas.addEventListener("touchend", this.mouseUp, options);
      this.canvas.addEventListener("touchstart", this.mouseDown, options);
    }

    if (this.uniforms.iDeviceOrientation.isNeeded) {
      window.addEventListener(
        "deviceorientation",
        this.onDeviceOrientationChange,
        options
      );
    }

    window.addEventListener("resize", this.onResize, options);
  };

  removeEventListeners = () => {
    const options = {
      passive: true,
    };

    if (this.uniforms.iMouse.isNeeded) {
      this.canvas.removeEventListener("mousemove", this.mouseMove, options);
      this.canvas.removeEventListener("mouseout", this.mouseUp, options);
      this.canvas.removeEventListener("mouseup", this.mouseUp, options);
      this.canvas.removeEventListener("mousedown", this.mouseDown, options);

      this.canvas.removeEventListener("touchmove", this.mouseMove, options);
      this.canvas.removeEventListener("touchend", this.mouseUp, options);
      this.canvas.removeEventListener("touchstart", this.mouseDown, options);
    }

    if (this.uniforms.iDeviceOrientation.isNeeded) {
      window.removeEventListener(
        "deviceorientation",
        this.onDeviceOrientationChange,
        options
      );
    }

    window.removeEventListener("resize", this.onResize, options);
  };

  onDeviceOrientationChange = ({ alpha, beta, gamma }) => {
    this.uniforms.iDeviceOrientation.value = [
      alpha,
      beta,
      gamma,
      window.orientation || 0,
    ];
  };

  mouseDown = (e) => {
    const clientX = e.clientX || e.changedTouches[0].clientX;
    const clientY = e.clientY || e.changedTouches[0].clientY;

    let mouseX = clientX - this.canvasPosition.left - window.pageXOffset;
    let mouseY =
      this.canvasPosition.height -
      clientY -
      this.canvasPosition.top -
      window.pageYOffset;

    this.mousedown = true;
    this.uniforms.iMouse.value[2] = mouseX;
    this.uniforms.iMouse.value[3] = mouseY;

    this.lastMouseArr[0] = mouseX;
    this.lastMouseArr[1] = mouseY;
  };

  mouseMove = (e) => {
    this.canvasPosition = this.canvas.getBoundingClientRect();
    const { lerp = 1 } = this.props;

    const clientX = e.clientX || e.changedTouches[0].clientX;
    const clientY = e.clientY || e.changedTouches[0].clientY;

    let mouseX = clientX - this.canvasPosition.left;
    let mouseY = this.canvasPosition.height - clientY - this.canvasPosition.top;

    if (lerp !== 1) {
      this.lastMouseArr[0] = mouseX;
      this.lastMouseArr[1] = mouseY;
    } else {
      this.uniforms.iMouse.value[0] = mouseX;
      this.uniforms.iMouse.value[1] = mouseY;
    }
  };

  mouseUp = (e) => {
    this.uniforms.iMouse.value[2] = 0;
    this.uniforms.iMouse.value[3] = 0;
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

    if (this.uniforms.iResolution.isNeeded) {
      const rUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_RESOLUTION
      );
      // $FlowFixMe
      gl.uniform2fv(rUniform, [gl.canvas.width, gl.canvas.height]);
    }
  };

  drawScene = (timestamp: number) => {
    const { gl } = this;
    const { lerp = 1 } = this.props;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

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

    if (this.uniforms.iMouse.isNeeded && lerp !== 1) {
      this.uniforms.iMouse.value[0] = lerpVal(
        this.uniforms.iMouse.value[0],
        this.lastMouseArr[0],
        lerp
      );
      this.uniforms.iMouse.value[1] = lerpVal(
        this.uniforms.iMouse.value[1],
        this.lastMouseArr[1],
        lerp
      );
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
      console.warn(SRLOG`Error compiling the shader:`, shaderCodeAsText);
      const compilationLog = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      console.error(SRLOG(`Shader compiler log: ${compilationLog}`));
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
        SRLOG(
          `Unable to initialize the shader program: ${gl.getProgramInfoLog(
            this.shaderProgram
          )}`
        )
      );
      return;
    }
    /* eslint-enable no-console */

    gl.useProgram(this.shaderProgram);

    this.vertexPositionAttribute = gl.getAttribLocation(
      this.shaderProgram,
      "aVertexPosition"
    );
    gl.enableVertexAttribArray(this.vertexPositionAttribute);
  };

  processCustomUniforms = () => {
    const { uniforms } = this.props;
    if (uniforms) {
      Object.keys(uniforms).forEach((name: string, id: number) => {
        const { value, type } = this.props.uniforms[name];

        const glslType = uniformTypeToGLSLType(type);
        if (!glslType) return; // If the type specified doesn't exist

        let tempObject = {};
        if (type.includes("Matrix")) {
          const arrayLength = type.length;
          const val = type.charAt(arrayLength - 3);
          const numberOfMatrices = Math.floor(value.length / (val * val));

          if (value.length > val * val) {
            tempObject.arraySize = `[${numberOfMatrices}]`;
          }
        } else if (type.includes("v") && value.length > type.charAt(0)) {
          tempObject.arraySize = `[${Math.floor(
            value.length / type.charAt(0)
          )}]`;
        }

        this.uniforms[name] = {
          type: glslType,
          isNeeded: false,
          value,
          ...tempObject,
        };
      });
    }
  };

  processTextures = () => {
    const { gl } = this;
    const { textures, onDoneLoadingTextures } = this.props;

    if (textures && textures.length > 0) {
      this.uniforms[`${UNIFORM_CHANNELRESOLUTION}`] = {
        type: "vec3",
        isNeeded: false,
        arraySize: `[${textures.length}]`,
        value: [],
      };

      const texturePromisesArr = textures.map(
        (texture: TexturePropsType, id: number) => {
          this.uniforms[`${UNIFORM_CHANNEL}${id}`] = {
            type: "sampler2D",
            isNeeded: false,
          }; // Dynamically add textures uniforms

          this.setupChannelRes(texture, id); // initialize array with 0s
          this.texturesArr[id] = new Texture(gl);
          return this.texturesArr[id]
            .load(texture, id)
            .then((texture) => this.setupChannelRes(texture, id));
        }
      );

      Promise.all(texturePromisesArr)
        .then(() => onDoneLoadingTextures && onDoneLoadingTextures())
        .catch((e) => {
          console.error(e);
          if (onDoneLoadingTextures) onDoneLoadingTextures();
        });
    } else {
      if (onDoneLoadingTextures) onDoneLoadingTextures();
    }
  };

  preProcessShaders = (fs: string, vs: string) => {
    const { precision, devicePixelRatio = 1 } = this.props;

    const dprString = `#define DPR ${devicePixelRatio.toFixed(1)}\n`;
    const isValidPrecision = PRECISIONS.includes(precision);
    const precisionString = `precision ${
      isValidPrecision ? precision : PRECISIONS[1]
    } float;\n`;
    if (!isValidPrecision)
      console.warn(
        SRLOG`wrong precision type ${precision}, please make sure to pass one of a valid precision lowp, mediump, highp, by default you shader precision will be set to highp.`
      );

    let fsString = precisionString
      .concat(dprString)
      .concat(fs)
      .replace(/texture\(/g, "texture2D(");

    const indexOfPrecisionString = fsString.lastIndexOf(precisionString);

    Object.keys(this.uniforms).forEach((uniform: string) => {
      if (fs.includes(uniform)) {
        fsString = insertStringAtIndex(
          fsString,
          `uniform ${this.uniforms[uniform].type} ${uniform}${
            this.uniforms[uniform].arraySize || ""
          }; \n`,
          indexOfPrecisionString + precisionString.length
        );
        this.uniforms[uniform].isNeeded = true;
      }
    });

    const isShadertoy = /mainImage/.test(fs);
    if (isShadertoy) fsString = fsString.concat(FS_MAIN_SHADER);

    // console.log(fsString);
    return {
      fs: fsString,
      vs,
    };
  };

  setUniforms = (timestamp: number) => {
    const { gl } = this;

    let delta = this.lastTime ? (timestamp - this.lastTime) / 1000 : 0;
    this.lastTime = timestamp;

    if (this.props.uniforms) {
      Object.keys(this.props.uniforms).forEach((name) => {
        const currentUniform = this.props.uniforms[name];
        if (this.uniforms[name].isNeeded) {
          const customUniformLocation = gl.getUniformLocation(
            this.shaderProgram,
            name
          );
          processUniform(
            gl,
            customUniformLocation,
            currentUniform.type,
            currentUniform.value
          );
        }
      });
    }

    if (this.uniforms.iMouse.isNeeded) {
      const mouseUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_MOUSE
      );
      // $FlowFixMe
      gl.uniform4fv(mouseUniform, this.uniforms.iMouse.value);
    }

    if (
      this.uniforms.iChannelResolution &&
      this.uniforms.iChannelResolution.isNeeded
    ) {
      const channelResUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_CHANNELRESOLUTION
      );
      gl.uniform3fv(channelResUniform, this.uniforms.iChannelResolution.value);
    }

    if (this.uniforms.iDeviceOrientation.isNeeded) {
      const deviceOrientationUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_DEVICEORIENTATION
      );
      gl.uniform4fv(
        deviceOrientationUniform,
        this.uniforms.iDeviceOrientation.value
      );
    }

    if (this.uniforms.iTime.isNeeded) {
      const timeUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_TIME
      );
      gl.uniform1f(timeUniform, (this.timer += delta));
    }

    if (this.uniforms.iTimeDelta.isNeeded) {
      const timeDeltaUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_TIMEDELTA
      );
      gl.uniform1f(timeDeltaUniform, delta);
    }

    if (this.uniforms.iDate.isNeeded) {
      const d = new Date();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const year = d.getFullYear();
      const time =
        d.getHours() * 60 * 60 +
        d.getMinutes() * 60 +
        d.getSeconds() +
        d.getMilliseconds() * 0.001;

      const dateUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_DATE
      );

      gl.uniform4fv(dateUniform, [year, month, day, time]);
    }

    if (this.uniforms.iFrame.isNeeded) {
      const timeDeltaUniform = gl.getUniformLocation(
        this.shaderProgram,
        UNIFORM_FRAME
      );
      gl.uniform1i(timeDeltaUniform, this.uniforms.iFrame.value++);
    }

    if (this.texturesArr.length > 0) {
      this.texturesArr.forEach((texture: Texture, id: number) => {
        const { isVideo, _webglTexture, source, flipY, isLoaded } = texture;
        if (!isLoaded) return;
        if (this.uniforms[`iChannel${id}`].isNeeded) {
          const iChannel = gl.getUniformLocation(
            this.shaderProgram,
            `iChannel${id}`
          );
          gl.activeTexture(gl[`TEXTURE${id}`]);
          gl.bindTexture(gl.TEXTURE_2D, _webglTexture);
          gl.uniform1i(iChannel, id);
          if (isVideo) texture.updateTexture(_webglTexture, source, flipY);
        }
      });
    }
  };

  registerCanvas = (r: HTMLCanvasElement) => {
    this.canvas = r;
  };

  gl: WebGLRenderingContext;
  squareVerticesBuffer: WebGLBuffer;
  shaderProgram: WebGLProgram;
  vertexPositionAttribute: number;
  animFrameId: AnimationFrameID;
  timeoutId: TimeoutID;
  canvas: HTMLCanvasElement;
  mousedown: boolean = false;
  canvasPosition: ClientRect;
  timer: number = 0;
  lastMouseArr: Array<number> = [0, 0];
  texturesArr: Array<WebGLTexture> = [];
  lastTime: number = 0;

  render = () => {
    const { style } = this.props;

    const currentStyle = {
      glCanvas: {
        height: "100%",
        width: "100%",
        ...style,
      },
    };

    return <canvas style={currentStyle.glCanvas} ref={this.registerCanvas} />;
  };
}
