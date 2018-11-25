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

// CONCATENATED MODULE: ./src/prefixLogs.js
// $flow
var SRLOG = function SRLOG(text) {
  return "shadertoy-react: ".concat(text);
};
// CONCATENATED MODULE: ./src/Texture.js
function _templateObject2() {
  var data = _taggedTemplateLiteral(["please upload a video or an image with a valid format"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Missing url, please make sure to pass the url of your texture { url: ... }"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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

var Texture_Texture = function Texture(_gl) {
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

      console.warn(SRLOG("Image is not power of two ".concat(image.width, " x ").concat(image.height, ". Resized to ").concat(_this.pow2canvas.width, " x ").concat(_this.pow2canvas.height, ";")));
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
      console.error(SRLOG(_templateObject()));
      return;
    }

    var isImage = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i.exec(url);
    var isVideo = /(\.mp4|\.3gp|\.webm|\.ogv)$/i.exec(url);

    if (isImage === null && isVideo === null) {
      console.error(SRLOG(_templateObject2()), url);
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
        return reject(new Error(SRLOG("failed loading url: ".concat(url))));
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


// CONCATENATED MODULE: ./src/uniformsType.js
function uniformsType_templateObject() {
  var data = uniformsType_taggedTemplateLiteral(["The uniform type \"", "\" is not valid, please make sure your uniform type is valid"]);

  uniformsType_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function uniformsType_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }


var INT = 'int';
var FLOAT = 'float';
var processUniform = function processUniform(gl, location, type, value) {
  switch (type) {
    case '1f':
      gl.uniform1f(location, value);
      break;

    case '2f':
      gl.uniform2f(location, value[0], value[1]);
      break;

    case '3f':
      gl.uniform3f(location, value[0], value[1], value[2]);
      break;

    case '4f':
      gl.uniform4f(location, value[0], value[1], value[2], value[3]);
      break;

    case '1i':
      gl.uniform1i(location, value);
      break;

    case '2i':
      gl.uniform2i(location, value[0], value[1]);
      break;

    case '3i':
      gl.uniform3i(location, value[0], value[1], value[2]);
      break;

    case '4i':
      gl.uniform3i(location, value[0], value[1], value[2], value[3]);
      break;

    case '1iv':
      gl.uniform1iv(location, value);
      break;

    case '2iv':
      gl.uniform2iv(location, value);
      break;

    case '3iv':
      gl.uniform3iv(location, value);
      break;

    case '4iv':
      gl.uniform4iv(location, value);
      break;

    case '1fv':
      gl.uniform1fv(location, value);
      break;

    case '2fv':
      gl.uniform2fv(location, value);
      break;

    case '3fv':
      gl.uniform3fv(location, value);
      break;

    case '4fv':
      gl.uniform4fv(location, value);
      break;

    case 'Matrix2fv':
      gl.uniformMatrix2fv(location, false, value);
      break;

    case 'Matrix3fv':
      gl.uniformMatrix3fv(location, false, value);
      break;

    case 'Matrix4fv':
      gl.uniformMatrix4fv(location, false, value);
      break;

    default:
      break;
  }
};
var uniformsType_uniformTypeToGLSLType = function uniformTypeToGLSLType(type) {
  switch (type) {
    case '1f':
      return FLOAT;
      break;

    case '2f':
      return 'vec2';
      break;

    case '3f':
      return 'vec3';
      break;

    case '4f':
      return 'vec4';
      break;

    case '1i':
      return INT;
      break;

    case '2i':
      return 'ivec2';
      break;

    case '3i':
      return 'ivec3';
      break;

    case '4i':
      return 'ivec4';
      break;

    case '1iv':
      return INT;
      break;

    case '2iv':
      return 'ivec2';
      break;

    case '3iv':
      return 'ivec3';
      break;

    case '4iv':
      return 'ivec4';
      break;

    case '1fv':
      return 'float';
      break;

    case '2fv':
      return 'vec2';
      break;

    case '3fv':
      return 'vec3';
      break;

    case '4fv':
      return 'vec4';
      break;

    case 'Matrix2fv':
      return 'mat2';
      break;

    case 'Matrix3fv':
      return 'mat3';
      break;

    case 'Matrix4fv':
      return 'mat4';
      break;

    default:
      console.error(SRLOG(uniformsType_templateObject(), type));
  }
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

function _templateObject3() {
  var data = src_taggedTemplateLiteral(["wrong precision type ", ", please make sure to pass one of a valid precision lowp, mediump, highp, by default you shader precision will be set to mediump."]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function src_templateObject2() {
  var data = src_taggedTemplateLiteral(["Problem encountered while loading textures"]);

  src_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { src_defineProperty(target, key, source[key]); }); } return target; }

function src_templateObject() {
  var data = src_taggedTemplateLiteral(["Error compiling the shader:"]);

  src_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function src_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var PRECISIONS = ['lowp', 'mediump', 'highp'];
var FS_MAIN_SHADER = "\nvoid main(void){\n    vec4 color = vec4(0.0,0.0,0.0,1.0);\n    mainImage( color, gl_FragCoord.xy );\n    gl_FragColor = color;\n}";
var BASIC_FS = // Basic shadertoy shader
"void mainImage( out vec4 fragColor, in vec2 fragCoord ) {\n    vec2 uv = fragCoord/iResolution.xy;\n    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));\n    fragColor = vec4(col,1.0);\n}";
var BASIC_VS = "attribute vec3 aVertexPosition;\nvoid main(void) {\n    gl_Position = vec4(aVertexPosition, 1.0);\n}"; // Shadertoy built-in uniforms

var UNIFORM_TIME = 'iTime';
var UNIFORM_TIMEDELTA = 'iTimeDelta';
var UNIFORM_DATE = 'iDate';
var UNIFORM_FRAME = 'iFrame';
var UNIFORM_MOUSE = 'iMouse';
var UNIFORM_RESOLUTION = 'iResolution';
var UNIFORM_CHANNEL = 'iChannel';
var UNIFORM_CHANNELRESOLUTION = 'iChannelResolution'; // Uniforms not built-int in shadertoy

var UNIFORM_DEVICEORIENTATION = 'iDeviceOrientation';
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
          vs = _this$props.vs;

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

        _this.processCustomUniforms();

        _this.processTextures();

        var shaders = _this.preProcessShaders(fs || BASIC_FS, vs || BASIC_VS);

        _this.initShaders(shaders);

        _this.initBuffers();

        _this.drawScene();

        _this.addEventListeners();

        _this.onResize();
      }
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "shouldComponentUpdate", function () {
      return false;
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setupChannelRes", function (_ref, id) {
      var width = _ref.width,
          height = _ref.height;
      var _this$props$devicePix = _this.props.devicePixelRatio,
          devicePixelRatio = _this$props$devicePix === void 0 ? 1 : _this$props$devicePix;
      _this.uniforms.iChannelResolution.value[id * 3] = width * devicePixelRatio;
      _this.uniforms.iChannelResolution.value[id * 3 + 1] = height * devicePixelRatio;
      _this.uniforms.iChannelResolution.value[id * 3 + 2] = 0; // console.log(this.uniforms);
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
      var options = {
        passive: true
      };

      if (_this.uniforms.iMouse.isNeeded) {
        _this.canvas.addEventListener('mousemove', _this.mouseMove, options);

        _this.canvas.addEventListener('mouseout', _this.mouseUp, options);

        _this.canvas.addEventListener('mouseup', _this.mouseUp, options);

        _this.canvas.addEventListener('mousedown', _this.mouseDown, options);

        _this.canvas.addEventListener('touchmove', _this.mouseMove, options);

        _this.canvas.addEventListener('touchend', _this.mouseUp, options);

        _this.canvas.addEventListener('touchstart', _this.mouseDown, options);
      }

      if (_this.uniforms.iDeviceOrientation.isNeeded) {
        window.addEventListener("deviceorientation", _this.onDeviceOrientationChange, options);
      }

      window.addEventListener('resize', _this.onResize, options);
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeEventListeners", function () {
      var options = {
        passive: true
      };

      if (_this.uniforms.iMouse.isNeeded) {
        _this.canvas.removeEventListener('mousemove', _this.mouseMove, options);

        _this.canvas.removeEventListener('mouseout', _this.mouseUp, options);

        _this.canvas.removeEventListener('mouseup', _this.mouseUp, options);

        _this.canvas.removeEventListener('mousedown', _this.mouseDown, options);

        _this.canvas.removeEventListener('touchmove', _this.mouseMove, options);

        _this.canvas.removeEventListener('touchend', _this.mouseUp, options);

        _this.canvas.removeEventListener('touchstart', _this.mouseDown, options);
      }

      if (_this.uniforms.iDeviceOrientation.isNeeded) {
        window.removeEventListener("deviceorientation", _this.onDeviceOrientationChange, options);
      }

      window.removeEventListener('resize', _this.onResize, options);
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDeviceOrientationChange", function (_ref2) {
      var alpha = _ref2.alpha,
          beta = _ref2.beta,
          gamma = _ref2.gamma;
      _this.uniforms.iDeviceOrientation.value = [alpha, beta, gamma, window.orientation || 0];
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mouseDown", function (e) {
      var clientX = e.clientX || e.changedTouches[0].clientX;
      var clientY = e.clientY || e.changedTouches[0].clientY;
      var mouseX = clientX - _this.canvasPosition.left;
      var mouseY = _this.canvasPosition.height - clientY - _this.canvasPosition.top;
      _this.mousedown = true;
      _this.uniforms.iMouse.value[2] = mouseX;
      _this.uniforms.iMouse.value[3] = mouseY;
      _this.lastMouseArr[0] = mouseX;
      _this.lastMouseArr[1] = mouseY;
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mouseMove", function (e) {
      var _this$props$lerp = _this.props.lerp,
          lerp = _this$props$lerp === void 0 ? 1 : _this$props$lerp;
      var clientX = e.clientX || e.changedTouches[0].clientX;
      var clientY = e.clientY || e.changedTouches[0].clientY;
      var mouseX = clientX - _this.canvasPosition.left;
      var mouseY = _this.canvasPosition.height - clientY - _this.canvasPosition.top;

      if (lerp !== 1) {
        _this.lastMouseArr[0] = mouseX;
        _this.lastMouseArr[1] = mouseY;
      } else {
        _this.uniforms.iMouse.value[0] = mouseX;
        _this.uniforms.iMouse.value[1] = mouseY;
      }
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mouseUp", function (e) {
      _this.uniforms.iMouse.value[2] = 0;
      _this.uniforms.iMouse.value[3] = 0;
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onResize", function () {
      var _assertThisInitialize3 = _assertThisInitialized(_assertThisInitialized(_this)),
          gl = _assertThisInitialize3.gl;

      var _this$props$devicePix2 = _this.props.devicePixelRatio,
          devicePixelRatio = _this$props$devicePix2 === void 0 ? 1 : _this$props$devicePix2;
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
        console.warn(SRLOG(src_templateObject()), shaderCodeAsText);
        var compilationLog = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        console.error(SRLOG("Shader compiler log: ".concat(compilationLog)));
      }
      /* eslint-enable no-console */


      return shader;
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initShaders", function (_ref3) {
      var fs = _ref3.fs,
          vs = _ref3.vs;

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
        console.error(SRLOG("Unable to initialize the shader program: ".concat(gl.getProgramInfoLog(_this.shaderProgram))));
        return;
      }
      /* eslint-enable no-console */


      gl.useProgram(_this.shaderProgram);
      _this.vertexPositionAttribute = gl.getAttribLocation(_this.shaderProgram, 'aVertexPosition');
      gl.enableVertexAttribArray(_this.vertexPositionAttribute);
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "processCustomUniforms", function () {
      var uniforms = _this.props.uniforms;

      if (uniforms) {
        Object.keys(uniforms).forEach(function (name, id) {
          var _this$props$uniforms$ = _this.props.uniforms[name],
              value = _this$props$uniforms$.value,
              type = _this$props$uniforms$.type;
          var glslType = uniformsType_uniformTypeToGLSLType(type);
          if (!glslType) return; // If the type specified doesn't exist

          var tempObject = {};

          if (type.includes('Matrix')) {
            var arrayLength = type.length;
            var val = type.charAt(arrayLength - 3);
            var numberOfMatrices = Math.floor(value.length / (val * val));

            if (value.length > val * val) {
              tempObject.arraySize = "[".concat(numberOfMatrices, "]");
            }
          } else if (type.includes('v') && value.length > type.charAt(0)) {
            tempObject.arraySize = "[".concat(Math.floor(value.length / type.charAt(0)), "]");
          }

          _this.uniforms[name] = _objectSpread({
            type: glslType,
            isNeeded: false,
            value: value
          }, tempObject);
        });
      }
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "processTextures", function () {
      var _assertThisInitialize7 = _assertThisInitialized(_assertThisInitialized(_this)),
          gl = _assertThisInitialize7.gl;

      var _this$props2 = _this.props,
          textures = _this$props2.textures,
          onDoneLoadingTextures = _this$props2.onDoneLoadingTextures;

      if (textures && textures.length > 0) {
        _this.uniforms["".concat(UNIFORM_CHANNELRESOLUTION)] = {
          type: 'vec3',
          isNeeded: false,
          arraySize: "[".concat(textures.length, "]"),
          value: []
        };
        var texturePromisesArr = textures.map(function (texture, id) {
          _this.uniforms["".concat(UNIFORM_CHANNEL).concat(id)] = {
            type: 'sampler2D',
            isNeeded: false
          }; // Dynamically add textures uniforms

          _this.setupChannelRes(texture, id); // initialize array with 0s


          _this.texturesArr[id] = new Texture_Texture(gl);
          return _this.texturesArr[id].load(texture, id).then(function (texture) {
            return _this.setupChannelRes(texture, id);
          });
        });
        Promise.all(texturePromisesArr).then(function () {
          return onDoneLoadingTextures && onDoneLoadingTextures();
        }).catch(function () {
          console.error(SRLOG(src_templateObject2()));
          if (onDoneLoadingTextures) onDoneLoadingTextures();
        });
      } else {
        if (onDoneLoadingTextures) onDoneLoadingTextures();
      }
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "preProcessShaders", function (fs, vs) {
      var isShadertoy = /mainImage/.test(fs);

      var fsString = _this.precision.concat(fs).replace(/texture\(/g, 'texture2D(');

      var indexOfPrecisionString = fsString.lastIndexOf(_this.precision);
      Object.keys(_this.uniforms).forEach(function (uniform) {
        if (fs.includes(uniform)) {
          fsString = insertStringAtIndex(fsString, "uniform ".concat(_this.uniforms[uniform].type, " ").concat(uniform).concat(_this.uniforms[uniform].arraySize || '', "; \n"), indexOfPrecisionString + _this.precision.length);
          _this.uniforms[uniform].isNeeded = true;
        }
      });
      if (isShadertoy) fsString = fsString.concat(FS_MAIN_SHADER); // console.log(fsString);

      return {
        fs: fsString,
        vs: vs
      };
    });

    src_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setUniforms", function (timestamp) {
      var _assertThisInitialize8 = _assertThisInitialized(_assertThisInitialized(_this)),
          gl = _assertThisInitialize8.gl;

      var delta = _this.lastTime ? (timestamp - _this.lastTime) / 1000 : 0;
      _this.lastTime = timestamp;

      if (_this.props.uniforms) {
        Object.keys(_this.props.uniforms).forEach(function (name) {
          var currentUniform = _this.props.uniforms[name];

          if (currentUniform.isNeeded) {
            var customUniformLocation = gl.getUniformLocation(_this.shaderProgram, name);
            processUniform(gl, customUniformLocation, currentUniform.type, currentUniform.value);
          }
        });
      }

      if (_this.uniforms.iMouse.isNeeded) {
        var mouseUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_MOUSE); // $FlowFixMe

        gl.uniform4fv(mouseUniform, _this.uniforms.iMouse.value);
      }

      if (_this.uniforms.iChannelResolution && _this.uniforms.iChannelResolution.isNeeded) {
        var channelResUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_CHANNELRESOLUTION);
        gl.uniform3fv(channelResUniform, _this.uniforms.iChannelResolution.value);
      }

      if (_this.uniforms.iDeviceOrientation.isNeeded) {
        var deviceOrientationUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_DEVICEORIENTATION);
        gl.uniform4fv(deviceOrientationUniform, _this.uniforms.iDeviceOrientation.value);
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
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var year = d.getFullYear();
        var time = d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() * 0.001;
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
          height: '100%',
          width: '100%'
        }, style)
      };
      return external_react_default.a.createElement("canvas", {
        style: currentStyle.glCanvas,
        ref: _this.registerCanvas
      });
    });

    var precision = _this.props.precision;
    var isValidPrecision = PRECISIONS.includes(precision);

    if (!isValidPrecision) {
      console.warn(SRLOG(_templateObject3(), precision));
    }

    _this.precision = "precision ".concat(isValidPrecision ? precision : PRECISIONS[1], " float;\n");
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
    }), src_defineProperty(_this$uniforms, UNIFORM_DEVICEORIENTATION, {
      type: 'vec4',
      isNeeded: false,
      value: [0, 0, 0, 0]
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
            gl.deleteTexture(texture._webglTexture);
          });
        }

        this.shaderProgram = null;
      }

      this.removeEventListeners();
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
  vs: BASIC_VS,
  precision: 'mediump'
});



/***/ })
/******/ ]);