module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// CONCATENATED MODULE: ./src/Texture.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NearestFilter = 9728;
var LinearFilter = 9729;
var NearestMipMapNearestFilter = 9984;
var LinearMipMapNearestFilter = 9985;
var NearestMipMapLinearFilter = 9986;
var LinearMipMapLinearFilter = 9987;
var ClampToEdgeWrapping = 33071;
var MirroredRepeatWrapping = 33648;
var RepeatWrapping = 10497; // eslint-disable-next-line

var isPowerOf2 = function isPowerOf2(value) {
  return (value & value - 1) == 0;
};

var floorPowerOfTwo = function floorPowerOfTwo(value) {
  return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
};

var textureNeedsGenerateMipmaps = function textureNeedsGenerateMipmaps(texture, isPowerOfTwo) {
  return isPowerOfTwo && texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter;
};

var textureNeedsPowerOfTwo = function textureNeedsPowerOfTwo(texture) {
  if (texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping) return true;
  if (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter) return true;
  return false;
};

var Texture = function Texture(_gl) {
  var _this = this;

  _classCallCheck(this, Texture);

  _defineProperty(this, "isLoaded", false);

  _defineProperty(this, "url", void 0);

  _defineProperty(this, "wrapS", void 0);

  _defineProperty(this, "wrapT", void 0);

  _defineProperty(this, "minFilter", void 0);

  _defineProperty(this, "magFilter", void 0);

  _defineProperty(this, "source", void 0);

  _defineProperty(this, "flipY", -1);

  _defineProperty(this, "width", 0);

  _defineProperty(this, "height", 0);

  _defineProperty(this, "_webglTexture", null);

  _defineProperty(this, "updateTexture", function (texture, video, flipY) {
    var gl = _this.gl;
    var level = 0;
    var internalFormat = gl.RGBA;
    var srcFormat = gl.RGBA;
    var srcType = gl.UNSIGNED_BYTE;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, video);
  });

  _defineProperty(this, "setupVideo", function (url) {
    var video = document.createElement('video');
    var playing = false;
    var timeupdate = false;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.crossOrigin = 'anonymous';

    var checkReady = function checkReady() {
      if (playing && timeupdate) {
        _this.isLoaded = true;
      }
    };

    video.addEventListener('playing', function () {
      playing = true;
      _this.width = video.videoWidth || 0;
      _this.height = video.videoHeight || 0;
      checkReady();
    }, true);
    video.addEventListener('timeupdate', function () {
      timeupdate = true;
      checkReady();
    }, true);
    video.src = url; // video.play();

    return video;
  });

  _defineProperty(this, "makePowerOfTwo", function (image) {
    if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || image instanceof ImageBitmap) {
      if (_this.pow2canvas === undefined) _this.pow2canvas = document.createElement('canvas');
      _this.pow2canvas.width = floorPowerOfTwo(image.width);
      _this.pow2canvas.height = floorPowerOfTwo(image.height);

      var context = _this.pow2canvas.getContext('2d');

      context.drawImage(image, 0, 0, _this.pow2canvas.width, _this.pow2canvas.height); // eslint-disable-next-line

      console.warn("ShadertoyReact: Image is not power of two ".concat(image.width, " x ").concat(image.height, ". Resized to ").concat(_this.pow2canvas.width, " x ").concat(_this.pow2canvas.height));
      return _this.pow2canvas;
    }

    return image;
  });

  _defineProperty(this, "load", function (textureArgs, channelId) {
    var gl = _this.gl;
    var url = textureArgs.url,
        wrapS = textureArgs.wrapS,
        wrapT = textureArgs.wrapT,
        minFilter = textureArgs.minFilter,
        magFilter = textureArgs.magFilter,
        _textureArgs$flipY = textureArgs.flipY,
        flipY = _textureArgs$flipY === void 0 ? -1 : _textureArgs$flipY;
    _this.url = url;
    _this.wrapS = wrapS;
    _this.wrapT = wrapT;
    _this.minFilter = minFilter;
    _this.magFilter = magFilter;
    _this.flipY = flipY;

    if (isImage === null && isVideo === null) {
      console.error('ShadertoyReact: Missing url, please make sure to pass the url of your texture { url: ... }');
      return;
    }

    var isImage = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i.exec(url);
    var isVideo = /(\.mp4|\.3gp|\.webm|\.ogv)$/i.exec(url);

    if (isImage === null && isVideo === null) {
      console.error('ShadertoyReact: please upload a video or an image with a valid format', url);
      return;
    }

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    var level = 0;
    var internalFormat = gl.RGBA;
    var width = 1;
    var height = 1;
    var border = 0;
    var srcFormat = gl.RGBA;
    var srcType = gl.UNSIGNED_BYTE;
    var pixel = new Uint8Array([255, 255, 255, 0]);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

    if (isVideo) {
      var video = _this.setupVideo(url);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      _this._webglTexture = texture;
      _this.source = video;
      _this.isVideo = true;
      return video.play().then(function () {
        return _this;
      });
    }

    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.crossOrigin = 'anonymous';

      image.onload = function () {
        return resolve(image);
      };

      image.onerror = function () {
        return reject(new Error("failed loading url: ".concat(url)));
      };

      image.src = url;
    }).then(function (image) {
      var isPowerOfTwoImage = isPowerOf2(image.width) && isPowerOf2(image.height);

      if (textureNeedsPowerOfTwo(textureArgs) && isPowerOfTwoImage === false) {
        image = _this.makePowerOfTwo(image);
        isPowerOfTwoImage = true;
      }

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

      if (textureNeedsGenerateMipmaps(textureArgs, isPowerOfTwoImage)) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }

      _this._webglTexture = texture;
      _this.source = image;
      _this.isVideo = false;
      _this.isLoaded = true;
      _this.width = image.width || 0;
      _this.height = image.height || 0;
      return _this;
    });
  });

  this.gl = _gl;
};


// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return src_ShadertoyReact; });
/* concated harmony reexport NearestFilter */__webpack_require__.d(__webpack_exports__, "NearestFilter", function() { return NearestFilter; });
/* concated harmony reexport LinearFilter */__webpack_require__.d(__webpack_exports__, "LinearFilter", function() { return LinearFilter; });
/* concated harmony reexport NearestMipMapNearestFilter */__webpack_require__.d(__webpack_exports__, "NearestMipMapNearestFilter", function() { return NearestMipMapNearestFilter; });
/* concated harmony reexport LinearMipMapNearestFilter */__webpack_require__.d(__webpack_exports__, "LinearMipMapNearestFilter", function() { return LinearMipMapNearestFilter; });
/* concated harmony reexport NearestMipMapLinearFilter */__webpack_require__.d(__webpack_exports__, "NearestMipMapLinearFilter", function() { return NearestMipMapLinearFilter; });
/* concated harmony reexport LinearMipMapLinearFilter */__webpack_require__.d(__webpack_exports__, "LinearMipMapLinearFilter", function() { return LinearMipMapLinearFilter; });
/* concated harmony reexport ClampToEdgeWrapping */__webpack_require__.d(__webpack_exports__, "ClampToEdgeWrapping", function() { return ClampToEdgeWrapping; });
/* concated harmony reexport MirroredRepeatWrapping */__webpack_require__.d(__webpack_exports__, "MirroredRepeatWrapping", function() { return MirroredRepeatWrapping; });
/* concated harmony reexport RepeatWrapping */__webpack_require__.d(__webpack_exports__, "RepeatWrapping", function() { return RepeatWrapping; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { src_defineProperty(target, key, source[key]); }); } return target; }

function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var FS_PRECISION_PREPROCESSOR = "#ifdef GL_ES\n    precision highp float;\n#endif\n";
var FS_MAIN_SHADER = "\nvoid main(void){\n    vec4 color = vec4(0.0,0.0,0.0,1.0);\n    mainImage( color, gl_FragCoord.xy );\n    gl_FragColor = color;\n}";
var BASIC_FS = // Basic shadertoy shader
"void mainImage( out vec4 fragColor, in vec2 fragCoord ) {\n    vec2 uv = fragCoord/iResolution.xy;\n    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));\n    fragColor = vec4(col,1.0);\n}";
var BASIC_VS = "attribute vec3 aVertexPosition;\nvoid main(void) {\n    gl_Position = vec4(aVertexPosition, 1.0);\n}";
var UNIFORM_TIME = 'iTime';
var UNIFORM_TIMEDELTA = 'iTimeDelta';
var UNIFORM_DATE = 'iDate';
var UNIFORM_FRAME = 'iFrame';
var UNIFORM_MOUSE = 'iMouse';
var UNIFORM_RESOLUTION = 'iResolution';
var UNIFORM_CHANNEL = 'iChannel';
var UNIFORM_CHANNELRESOLUTION = 'iChannelResolution';
/* eslint-disable */

var lerpVal = function lerpVal(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
};

var insertStringAtIndex = function insertStringAtIndex(currentString, string, index) {
  return index > 0 ? currentString.substring(0, index) + string + currentString.substring(index, currentString.length) : string + currentString;
};

var src_ShadertoyReact =
/*#__PURE__*/
function (_Component) {
  _inherits(ShadertoyReact, _Component);

  function ShadertoyReact(props) {
    var _this$uniforms;

    var _this;

    src_classCallCheck(this, ShadertoyReact);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ShadertoyReact).call(this, props));

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      _this.initWebGL();

      var _this$props = _this.props,
          fs = _this$props.fs,
          vs = _this$props.vs,
          textures = _this$props.textures,
          onDoneLoadingTextures = _this$props.onDoneLoadingTextures;

      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
          gl = _assertThisInitialize.gl;

      if (gl) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque

        gl.clearDepth(1.0); // Clear everything

        gl.enable(gl.DEPTH_TEST); // Enable depth testing

        gl.depthFunc(gl.LEQUAL); // Near things obscure far things

        gl.viewport(0, 0, _this.canvas.width, _this.canvas.height);
        _this.canvas.height = _this.canvas.clientHeight;
        _this.canvas.width = _this.canvas.clientWidth;

        if (textures && textures.length > 0) {
          _this.uniforms["".concat(UNIFORM_CHANNELRESOLUTION)] = {
            type: 'vec3',
            isNeeded: false,
            arraySize: "[".concat(textures.length - 1, "]"),
            value: []
          };
          var texturePromisesArr = textures.map(function (texture, id) {
            _this.uniforms["".concat(UNIFORM_CHANNEL).concat(id)] = {
              type: 'sampler2D',
              isNeeded: false
            }; // Dynamically add textures uniforms

            _this.texturesArr[id] = new Texture(gl);
            return _this.texturesArr[id].load(texture, id).then(function (texture) {
              return _this.setupChannelRes(texture, id);
            });
          });
          Promise.all(texturePromisesArr).then(function () {
            if (onDoneLoadingTextures) onDoneLoadingTextures();
          });
        }

        var shaders = _this.preProcessShaders(fs || BASIC_FS, vs || BASIC_VS);

        _this.initShaders(shaders);

        _this.initBuffers();

        _this.drawScene();

        _this.addEventListeners();

        _this.onResize(); // this.timeoutId = setTimeout(() => this.onResize(), 500);

      }
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "shouldComponentUpdate", function () {
      return false;
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setupChannelRes", function (_ref, id) {
      var width = _ref.width,
          height = _ref.height;
      _this.uniforms.iChannelResolution.value[id * 3] = width;
      _this.uniforms.iChannelResolution.value[id * 3 + 1] = height;
      _this.uniforms.iChannelResolution.value[id * 3 + 2] = 0; // console.log(this.uniforms.iChannelResolution);
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initWebGL", function () {
      var contextAttributes = _this.props.contextAttributes; // $FlowFixMe

      _this.gl = _this.canvas.getContext('webgl', contextAttributes) || _this.canvas.getContext('experimental-webgl', contextAttributes); // $FlowFixMe

      _this.gl.getExtension('OES_standard_derivatives'); // $FlowFixMe


      _this.gl.getExtension('EXT_shader_texture_lod');
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initBuffers", function () {
      var _assertThisInitialize2 = _assertThisInitialized(_assertThisInitialized(_this)),
          gl = _assertThisInitialize2.gl;

      _this.squareVerticesBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, _this.squareVerticesBuffer);
      var vertices = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addEventListeners", function () {
      if (_this.uniforms.iMouse.isNeeded) {
        _this.canvas.addEventListener('mousemove', _this.mouseMove);

        _this.canvas.addEventListener('mouseout', _this.mouseUp);

        _this.canvas.addEventListener('mouseup', _this.mouseUp);

        _this.canvas.addEventListener('mousedown', _this.mouseDown);

        _this.canvas.addEventListener('touchmove', _this.mouseMove);

        _this.canvas.addEventListener('touchend', _this.mouseUp);
      }

      window.addEventListener('resize', _this.onResize, {
        passive: true
      });
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeEventListeners", function () {
      if (_this.uniforms.iMouse.isNeeded) {
        _this.canvas.removeEventListener('mousemove', _this.mouseMove);

        _this.canvas.removeEventListener('mouseout', _this.mouseUp);

        _this.canvas.removeEventListener('mouseup', _this.mouseUp);

        _this.canvas.removeEventListener('mousedown', _this.mouseDown);

        _this.canvas.removeEventListener('touchmove', _this.mouseMove);

        _this.canvas.removeEventListener('touchend', _this.mouseUp);
      }

      window.removeEventListener('resize', _this.onResize, {
        passive: true
      });
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mouseDown", function (e) {
      _this.canvasPosition = _this.canvas.getBoundingClientRect();
      var mouseX = (e.clientX || e.touches[0].clientX) - _this.canvasPosition.left;
      var mouseY = _this.canvasPosition.height - (e.clientY || e.touches[0].clientY) - _this.canvasPosition.top;
      _this.mousedown = true;
      _this.uniforms.iMouse.value[2] = mouseX;
      _this.uniforms.iMouse.value[3] = mouseY;
      _this.lastMouseArr[0] = mouseX;
      _this.lastMouseArr[1] = mouseY;
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mouseMove", function (e) {
      var _this$props$lerp = _this.props.lerp,
          lerp = _this$props$lerp === void 0 ? 1 : _this$props$lerp;
      if (!_this.mousedown) return;
      var mouseX = (e.clientX || e.touches[0].clientX) - _this.canvasPosition.left;
      var mouseY = _this.canvasPosition.height - (e.clientY || e.touches[0].clientY) - _this.canvasPosition.top;

      if (lerp !== 1) {
        _this.lastMouseArr[0] = mouseX;
        _this.lastMouseArr[1] = mouseY;
      } else {
        _this.uniforms.iMouse.value[0] = mouseX;
        _this.uniforms.iMouse.value[1] = mouseY;
      }
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mouseUp", function (e) {
      _this.mousedown = false;
      _this.uniforms.iMouse.value[2] = 0;
      _this.uniforms.iMouse.value[3] = 0;
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onResize", function () {
      var _assertThisInitialize3 = _assertThisInitialized(_assertThisInitialized(_this)),
          gl = _assertThisInitialize3.gl;

      var _this$props$devicePix = _this.props.devicePixelRatio,
          devicePixelRatio = _this$props$devicePix === void 0 ? 1 : _this$props$devicePix;
      _this.canvasPosition = _this.canvas.getBoundingClientRect();
      var realToCSSPixels = devicePixelRatio; // Force pixel ratio to be one to avoid expensive calculus on retina display

      var displayWidth = Math.floor(_this.canvasPosition.width * realToCSSPixels);
      var displayHeight = Math.floor(_this.canvasPosition.height * realToCSSPixels);
      gl.canvas.width = displayWidth;
      gl.canvas.height = displayHeight;

      if (_this.uniforms.iResolution.isNeeded) {
        var rUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_RESOLUTION); // $FlowFixMe

        gl.uniform2fv(rUniform, [gl.canvas.width, gl.canvas.height]);
      }
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "drawScene", function (timestamp) {
      var _assertThisInitialize4 = _assertThisInitialized(_assertThisInitialized(_this)),
          gl = _assertThisInitialize4.gl;

      var _this$props$lerp2 = _this.props.lerp,
          lerp = _this$props$lerp2 === void 0 ? 1 : _this$props$lerp2;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // eslint-disable-line no-bitwise

      gl.bindBuffer(gl.ARRAY_BUFFER, _this.squareVerticesBuffer);
      gl.vertexAttribPointer(_this.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

      _this.setUniforms(timestamp);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (_this.uniforms.iMouse.isNeeded && lerp !== 1) {
        _this.uniforms.iMouse.value[0] = lerpVal(_this.uniforms.iMouse.value[0], _this.lastMouseArr[0], lerp);
        _this.uniforms.iMouse.value[1] = lerpVal(_this.uniforms.iMouse.value[1], _this.lastMouseArr[1], lerp);
      }

      _this.animFrameId = requestAnimationFrame(_this.drawScene);
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createShader", function (type, shaderCodeAsText) {
      var _assertThisInitialize5 = _assertThisInitialized(_assertThisInitialized(_this)),
          gl = _assertThisInitialize5.gl;

      var shader = gl.createShader(type);
      gl.shaderSource(shader, shaderCodeAsText);
      gl.compileShader(shader);
      /* eslint-disable no-console */

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('Error compiling the shader:', shaderCodeAsText);
        var compilationLog = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        console.error("Shader compiler log: ".concat(compilationLog));
      }
      /* eslint-enable no-console */


      return shader;
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initShaders", function (_ref2) {
      var fs = _ref2.fs,
          vs = _ref2.vs;

      var _assertThisInitialize6 = _assertThisInitialized(_assertThisInitialized(_this)),
          gl = _assertThisInitialize6.gl; // console.log(fs, vs);


      var fragmentShader = _this.createShader(gl.FRAGMENT_SHADER, fs);

      var vertexShader = _this.createShader(gl.VERTEX_SHADER, vs);

      _this.shaderProgram = gl.createProgram();
      gl.attachShader(_this.shaderProgram, vertexShader);
      gl.attachShader(_this.shaderProgram, fragmentShader);
      gl.linkProgram(_this.shaderProgram);
      /* eslint-disable no-console */

      if (!gl.getProgramParameter(_this.shaderProgram, gl.LINK_STATUS)) {
        // $FlowFixMe
        console.error("Unable to initialize the shader program: ".concat(gl.getProgramInfoLog(_this.shaderProgram)));
        return;
      }
      /* eslint-enable no-console */


      gl.useProgram(_this.shaderProgram);
      _this.vertexPositionAttribute = gl.getAttribLocation(_this.shaderProgram, 'aVertexPosition');
      gl.enableVertexAttribArray(_this.vertexPositionAttribute);
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "preProcessShaders", function (fs, vs) {
      var fsString = FS_PRECISION_PREPROCESSOR.concat(fs).replace(/texture\(/g, 'texture2D(');
      var lastPreprocessorString = '#endif';
      var index = fsString.lastIndexOf(lastPreprocessorString);
      Object.keys(_this.uniforms).forEach(function (uniform) {
        if (fs.includes(uniform)) {
          fsString = insertStringAtIndex(fsString, "uniform ".concat(_this.uniforms[uniform].type, " ").concat(uniform).concat(_this.uniforms[uniform].arraySize || '', "; \n"), index + lastPreprocessorString.length + 1);
          _this.uniforms[uniform].isNeeded = true;
        }
      });
      fsString = fsString.concat(FS_MAIN_SHADER); // console.log(fsString);

      return {
        fs: fsString,
        vs: vs
      };
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setUniforms", function (timestamp) {
      var _assertThisInitialize7 = _assertThisInitialized(_assertThisInitialized(_this)),
          gl = _assertThisInitialize7.gl;

      var delta = _this.lastTime ? (timestamp - _this.lastTime) / 1000 : 0;
      _this.lastTime = timestamp;

      if (_this.uniforms.iMouse.isNeeded) {
        var mouseUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_MOUSE); // $FlowFixMe

        gl.uniform4fv(mouseUniform, [_this.uniforms.iMouse.value[0], _this.uniforms.iMouse.value[1], _this.uniforms.iMouse.value[2], _this.uniforms.iMouse.value[3]]);
      }

      if (_this.uniforms.iChannelResolution && _this.uniforms.iChannelResolution.isNeeded) {
        var channelResUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_CHANNELRESOLUTION);
        gl.uniform3fv(channelResUniform, _this.uniforms.iChannelResolution.value);
      }

      if (_this.uniforms.iTime.isNeeded) {
        var _timeUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_TIME);

        gl.uniform1f(_timeUniform, _this.timer += delta);
      }

      if (_this.uniforms.iTimeDelta.isNeeded) {
        var timeDeltaUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_TIMEDELTA);
        gl.uniform1f(timeUniform, delta);
      }

      if (_this.uniforms.iDate.isNeeded) {
        var d = new Date();
        var month = d.getMonth() + 1; // the month (from 0-11)

        var day = d.getDate(); // the day of the month (from 1-31)

        var year = d.getFullYear(); // the year (four digits)

        var time = d.getHours() * 60.0 * 60 + d.getMinutes() * 60 + d.getSeconds(); // console.log(d, month, day, year, time);

        var dateUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_DATE);
        gl.uniform4fv(dateUniform, [year, month, day, time]);
      }

      if (_this.uniforms.iFrame.isNeeded) {
        var _timeDeltaUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_FRAME);

        gl.uniform1f(timeUniform, _this.uniforms.iFrame.value++);
      }

      if (_this.texturesArr.length > 0) {
        _this.texturesArr.forEach(function (texture, id) {
          var isVideo = texture.isVideo,
              _webglTexture = texture._webglTexture,
              source = texture.source,
              flipY = texture.flipY,
              isLoaded = texture.isLoaded;
          if (!isLoaded) return;

          if (_this.uniforms["iChannel".concat(id)].isNeeded) {
            var iChannel = gl.getUniformLocation(_this.shaderProgram, "iChannel".concat(id));
            gl.activeTexture(gl["TEXTURE".concat(id)]);
            gl.bindTexture(gl.TEXTURE_2D, _webglTexture);
            gl.uniform1i(iChannel, id);
            if (isVideo) texture.updateTexture(_webglTexture, source, flipY);
          }
        });
      }
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "registerCanvas", function (r) {
      _this.canvas = r;
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "gl", void 0);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "squareVerticesBuffer", void 0);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "shaderProgram", void 0);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "vertexPositionAttribute", void 0);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "animFrameId", void 0);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "timeoutId", void 0);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "canvas", void 0);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mousedown", false);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "canvasPosition", void 0);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "timer", 0);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "lastMouseArr", [0, 0]);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "texturesArr", []);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "lastTime", 0);

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      var style = _this.props.style;
      var currentStyle = {
        glCanvas: _objectSpread({
          position: 'absolute',
          height: '100%',
          width: '100%'
        }, style)
      };
      return external_react_default.a.createElement("canvas", {
        style: currentStyle.glCanvas,
        ref: _this.registerCanvas
      });
    });

    _this.uniforms = (_this$uniforms = {}, src_defineProperty(_this$uniforms, UNIFORM_TIME, {
      type: 'float',
      isNeeded: false,
      value: 0
    }), src_defineProperty(_this$uniforms, UNIFORM_TIMEDELTA, {
      type: 'float',
      isNeeded: false,
      value: 0
    }), src_defineProperty(_this$uniforms, UNIFORM_DATE, {
      type: 'vec4',
      isNeeded: false,
      value: [0, 0, 0, 0]
    }), src_defineProperty(_this$uniforms, UNIFORM_MOUSE, {
      type: 'vec4',
      isNeeded: false,
      value: [0, 0, 0, 0]
    }), src_defineProperty(_this$uniforms, UNIFORM_RESOLUTION, {
      type: 'vec2',
      isNeeded: false,
      value: [0, 0]
    }), src_defineProperty(_this$uniforms, UNIFORM_FRAME, {
      type: 'int',
      isNeeded: false,
      value: 0
    }), _this$uniforms);
    return _this;
  }

  _createClass(ShadertoyReact, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var gl = this.gl;

      if (gl) {
        gl.getExtension('WEBGL_lose_context').loseContext();
        gl.useProgram(null);
        gl.deleteProgram(this.shaderProgram);

        if (this.texturesArr.length > 0) {
          this.texturesArr.forEach(function (texture) {
            gl.deleteTexture(texture.webglTexture);
          });
        }

        this.shaderProgram = null;
      }

      this.removeEventListeners(); // clearTimeout(this.timeoutId);

      cancelAnimationFrame(this.animFrameId);
    }
  }]);

  return ShadertoyReact;
}(external_react_["Component"]);

src_defineProperty(src_ShadertoyReact, "defaultProps", {
  textures: [],
  contextAttributes: {
    premultipliedAlpha: false,
    alpha: true
  },
  devicePixelRatio: 1,
  vs: BASIC_VS
});



/***/ })
/******/ ]);