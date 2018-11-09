export const NearestFilter = 9728;
export const LinearFilter = 9729;
export const NearestMipMapNearestFilter = 9984;
export const LinearMipMapNearestFilter = 9985;
export const NearestMipMapLinearFilter = 9986;
export const LinearMipMapLinearFilter = 9987;
export const ClampToEdgeWrapping = 33071;
export const MirroredRepeatWrapping = 33648;
export const RepeatWrapping = 10497;

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

export default class Texture {
    constructor(gl) {
      this.gl = gl;
  
      this.isLoaded = false;
  
      this.url = null;
      this.wrapS = null;
      this.wrapT = null;
      this.minFilter = null;
      this.magFilter = null;
      this.source = null;
      this.flipY = null;
  
      this._webglTexture = null;
    } 
  
    updateTexture = (texture: WebGLTexture, video: HTMLVideoElement, flipY: boolean) => {
      const { gl } = this; 
      const level = 0;
      const internalFormat = gl.RGBA;
      const srcFormat = gl.RGBA;
      const srcType = gl.UNSIGNED_BYTE;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, video);
    }
  
    setupVideo = (url: string) => {
      const video = document.createElement('video');
      
      let playing = false;
      let timeupdate = false;
    
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.crossOrigin = 'anonymous';
    
      const checkReady = () => {
        if (playing && timeupdate) {
          this.isLoaded = true;
        }
      }
    
      video.addEventListener('playing', () => {
         playing = true;
         checkReady();
      }, true);
    
      video.addEventListener('timeupdate', () => {
         timeupdate = true;
         checkReady();
      }, true);
    
      video.src = url;
      video.play();
    
      return video;
    }
  
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
  
    load = (textureArgs: TextureType, channelId: number) => {
        const { gl } = this;
        
        const {
            url,
            wrapS,
            wrapT,
            minFilter,
            magFilter,
            flipY = -1,
        }: TextureType = textureArgs;

        this.url = url;
        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.minFilter = minFilter;
        this.magFilter = magFilter;
        this.flipY = flipY;

        if(isImage === null && isVideo === null ){
            console.error('ShadertoyReact: Missing url, please make sure to pass the url of your texture { url: ... }');
            return;
        }

        const isImage = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i.exec(url);
        const isVideo = /(\.mp4|\.3gp|\.webm|\.ogv)$/i.exec(url);

        if(isImage === null && isVideo === null ){
            console.error('ShadertoyReact: please upload a video or an image with a valid format', url);
            return;
        }

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

        if(isVideo){
            const video = this.setupVideo(url);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            this._webglTexture = texture;
            this.source = video;
            this.isVideo = true;

            return texture;
        }

        return new Promise((resolve, reject) => {
            let image = new Image();
            image.crossOrigin = 'anonymous';
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

            this._webglTexture = texture;
            this.source = image;
            this.isVideo = false;
            this.isLoaded = true;
        });
    }
}