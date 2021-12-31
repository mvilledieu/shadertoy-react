/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ClampToEdgeWrapping": () => (/* reexport */ ClampToEdgeWrapping),
  "LinearFilter": () => (/* reexport */ LinearFilter),
  "LinearMipMapLinearFilter": () => (/* reexport */ LinearMipMapLinearFilter),
  "LinearMipMapNearestFilter": () => (/* reexport */ LinearMipMapNearestFilter),
  "MirroredRepeatWrapping": () => (/* reexport */ MirroredRepeatWrapping),
  "NearestFilter": () => (/* reexport */ NearestFilter),
  "NearestMipMapLinearFilter": () => (/* reexport */ NearestMipMapLinearFilter),
  "NearestMipMapNearestFilter": () => (/* reexport */ NearestMipMapNearestFilter),
  "RepeatWrapping": () => (/* reexport */ RepeatWrapping),
  "default": () => (/* binding */ ShadertoyReact)
});

;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: ./src/prefixLogs.js
// $flow
var SRLOG = function SRLOG(text) {
  return "shadertoy-react: ".concat(text);
};
;// CONCATENATED MODULE: ./src/Texture.js
var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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

var Texture = /*#__PURE__*/_createClass(function Texture(_gl) {
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

    if (!url) {
      return Promise.reject(new Error(SRLOG(_templateObject || (_templateObject = _taggedTemplateLiteral(["Missing url, please make sure to pass the url of your texture { url: ... }"])))));
    }

    var isImage = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i.exec(url);
    var isVideo = /(\.mp4|\.3gp|\.webm|\.ogv)$/i.exec(url);

    if (isImage === null && isVideo === null) {
      return Promise.reject(new Error(SRLOG(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Please upload a video or an image with a valid format"]))), url));
    }

    Object.assign(_this, {
      url: url,
      wrapS: wrapS,
      wrapT: wrapT,
      minFilter: minFilter,
      magFilter: magFilter,
      flipY: flipY
    });
    var level = 0;
    var internalFormat = gl.RGBA;
    var width = 1;
    var height = 1;
    var border = 0;
    var srcFormat = gl.RGBA;
    var srcType = gl.UNSIGNED_BYTE;
    var pixel = new Uint8Array([255, 255, 255, 0]);
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
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

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, _this.wrapS || RepeatWrapping);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, _this.wrapT || RepeatWrapping);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, _this.minFilter || LinearMipMapLinearFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, _this.magFilter || LinearFilter);
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
});


;// CONCATENATED MODULE: ./src/uniformsType.js
var uniformsType_templateObject;

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
var uniformTypeToGLSLType = function uniformTypeToGLSLType(type) {
  switch (type) {
    case '1f':
      return FLOAT;

    case '2f':
      return 'vec2';

    case '3f':
      return 'vec3';

    case '4f':
      return 'vec4';

    case '1i':
      return INT;

    case '2i':
      return 'ivec2';

    case '3i':
      return 'ivec3';

    case '4i':
      return 'ivec4';

    case '1iv':
      return INT;

    case '2iv':
      return 'ivec2';

    case '3iv':
      return 'ivec3';

    case '4iv':
      return 'ivec4';

    case '1fv':
      return 'float';

    case '2fv':
      return 'vec2';

    case '3fv':
      return 'vec3';

    case '4fv':
      return 'vec4';

    case 'Matrix2fv':
      return 'mat2';
      break;

    case 'Matrix3fv':
      return 'mat3';

    case 'Matrix4fv':
      return 'mat4';

    default:
      console.error(SRLOG(uniformsType_templateObject || (uniformsType_templateObject = uniformsType_taggedTemplateLiteral(["The uniform type \"", "\" is not valid, please make sure your uniform type is valid"])), type));
  }
};
;// CONCATENATED MODULE: ./src/index.jsx
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var src_templateObject, src_templateObject2;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { src_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function src_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var PRECISIONS = ["lowp", "mediump", "highp"];
var FS_MAIN_SHADER = "\nvoid main(void){\n    vec4 color = vec4(0.0,0.0,0.0,1.0);\n    mainImage( color, gl_FragCoord.xy );\n    gl_FragColor = color;\n}";
var BASIC_FS = // Basic shadertoy shader
"void mainImage( out vec4 fragColor, in vec2 fragCoord ) {\n    vec2 uv = fragCoord/iResolution.xy;\n    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));\n    fragColor = vec4(col,1.0);\n}";
var BASIC_VS = "attribute vec3 aVertexPosition;\nvoid main(void) {\n    gl_Position = vec4(aVertexPosition, 1.0);\n}"; // Shadertoy built-in uniforms

var UNIFORM_TIME = "iTime";
var UNIFORM_TIMEDELTA = "iTimeDelta";
var UNIFORM_DATE = "iDate";
var UNIFORM_FRAME = "iFrame";
var UNIFORM_MOUSE = "iMouse";
var UNIFORM_RESOLUTION = "iResolution";
var UNIFORM_CHANNEL = "iChannel";
var UNIFORM_CHANNELRESOLUTION = "iChannelResolution"; // Uniforms not built-int in shadertoy

var UNIFORM_DEVICEORIENTATION = "iDeviceOrientation";
/* eslint-disable */

var lerpVal = function lerpVal(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
};

var insertStringAtIndex = function insertStringAtIndex(currentString, string, index) {
  return index > 0 ? currentString.substring(0, index) + string + currentString.substring(index, currentString.length) : string + currentString;
};

var ShadertoyReact = /*#__PURE__*/function (_Component) {
  _inherits(ShadertoyReact, _Component);

  var _super = _createSuper(ShadertoyReact);

  function ShadertoyReact(props) {
    var _this$uniforms;

    var _this;

    src_classCallCheck(this, ShadertoyReact);

    _this = _super.call(this, props);

    src_defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.initWebGL();

      var _this$props = _this.props,
          fs = _this$props.fs,
          vs = _this$props.vs,
          _this$props$clearColo = _this$props.clearColor,
          clearColor = _this$props$clearColo === void 0 ? [0, 0, 0, 1] : _this$props$clearColo;

      var _assertThisInitialize = _assertThisInitialized(_this),
          gl = _assertThisInitialize.gl;

      if (gl) {
        gl.clearColor.apply(gl, _toConsumableArray(clearColor));
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
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

    src_defineProperty(_assertThisInitialized(_this), "shouldComponentUpdate", function () {
      return false;
    });

    src_defineProperty(_assertThisInitialized(_this), "setupChannelRes", function (_ref, id) {
      var width = _ref.width,
          height = _ref.height;
      var _this$props$devicePix = _this.props.devicePixelRatio,
          devicePixelRatio = _this$props$devicePix === void 0 ? 1 : _this$props$devicePix;
      _this.uniforms.iChannelResolution.value[id * 3] = width * devicePixelRatio;
      _this.uniforms.iChannelResolution.value[id * 3 + 1] = height * devicePixelRatio;
      _this.uniforms.iChannelResolution.value[id * 3 + 2] = 0; // console.log(this.uniforms);
    });

    src_defineProperty(_assertThisInitialized(_this), "initWebGL", function () {
      var contextAttributes = _this.props.contextAttributes; // $FlowFixMe

      _this.gl = _this.canvas.getContext("webgl", contextAttributes) || _this.canvas.getContext("experimental-webgl", contextAttributes); // $FlowFixMe

      _this.gl.getExtension("OES_standard_derivatives"); // $FlowFixMe


      _this.gl.getExtension("EXT_shader_texture_lod");
    });

    src_defineProperty(_assertThisInitialized(_this), "initBuffers", function () {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          gl = _assertThisInitialize2.gl;

      _this.squareVerticesBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, _this.squareVerticesBuffer);
      var vertices = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    });

    src_defineProperty(_assertThisInitialized(_this), "addEventListeners", function () {
      var options = {
        passive: true
      };

      if (_this.uniforms.iMouse.isNeeded) {
        _this.canvas.addEventListener("mousemove", _this.mouseMove, options);

        _this.canvas.addEventListener("mouseout", _this.mouseUp, options);

        _this.canvas.addEventListener("mouseup", _this.mouseUp, options);

        _this.canvas.addEventListener("mousedown", _this.mouseDown, options);

        _this.canvas.addEventListener("touchmove", _this.mouseMove, options);

        _this.canvas.addEventListener("touchend", _this.mouseUp, options);

        _this.canvas.addEventListener("touchstart", _this.mouseDown, options);
      }

      if (_this.uniforms.iDeviceOrientation.isNeeded) {
        window.addEventListener("deviceorientation", _this.onDeviceOrientationChange, options);
      }

      window.addEventListener("resize", _this.onResize, options);
    });

    src_defineProperty(_assertThisInitialized(_this), "removeEventListeners", function () {
      var options = {
        passive: true
      };

      if (_this.uniforms.iMouse.isNeeded) {
        _this.canvas.removeEventListener("mousemove", _this.mouseMove, options);

        _this.canvas.removeEventListener("mouseout", _this.mouseUp, options);

        _this.canvas.removeEventListener("mouseup", _this.mouseUp, options);

        _this.canvas.removeEventListener("mousedown", _this.mouseDown, options);

        _this.canvas.removeEventListener("touchmove", _this.mouseMove, options);

        _this.canvas.removeEventListener("touchend", _this.mouseUp, options);

        _this.canvas.removeEventListener("touchstart", _this.mouseDown, options);
      }

      if (_this.uniforms.iDeviceOrientation.isNeeded) {
        window.removeEventListener("deviceorientation", _this.onDeviceOrientationChange, options);
      }

      window.removeEventListener("resize", _this.onResize, options);
    });

    src_defineProperty(_assertThisInitialized(_this), "onDeviceOrientationChange", function (_ref2) {
      var alpha = _ref2.alpha,
          beta = _ref2.beta,
          gamma = _ref2.gamma;
      _this.uniforms.iDeviceOrientation.value = [alpha, beta, gamma, window.orientation || 0];
    });

    src_defineProperty(_assertThisInitialized(_this), "mouseDown", function (e) {
      var clientX = e.clientX || e.changedTouches[0].clientX;
      var clientY = e.clientY || e.changedTouches[0].clientY;
      var mouseX = clientX - _this.canvasPosition.left - window.pageXOffset;
      var mouseY = _this.canvasPosition.height - clientY - _this.canvasPosition.top - window.pageYOffset;
      _this.mousedown = true;
      _this.uniforms.iMouse.value[2] = mouseX;
      _this.uniforms.iMouse.value[3] = mouseY;
      _this.lastMouseArr[0] = mouseX;
      _this.lastMouseArr[1] = mouseY;
    });

    src_defineProperty(_assertThisInitialized(_this), "mouseMove", function (e) {
      _this.canvasPosition = _this.canvas.getBoundingClientRect();
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

    src_defineProperty(_assertThisInitialized(_this), "mouseUp", function (e) {
      _this.uniforms.iMouse.value[2] = 0;
      _this.uniforms.iMouse.value[3] = 0;
    });

    src_defineProperty(_assertThisInitialized(_this), "onResize", function () {
      var _assertThisInitialize3 = _assertThisInitialized(_this),
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

    src_defineProperty(_assertThisInitialized(_this), "drawScene", function (timestamp) {
      var _assertThisInitialize4 = _assertThisInitialized(_this),
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

    src_defineProperty(_assertThisInitialized(_this), "createShader", function (type, shaderCodeAsText) {
      var _assertThisInitialize5 = _assertThisInitialized(_this),
          gl = _assertThisInitialize5.gl;

      var shader = gl.createShader(type);
      gl.shaderSource(shader, shaderCodeAsText);
      gl.compileShader(shader);
      /* eslint-disable no-console */

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(SRLOG(src_templateObject || (src_templateObject = src_taggedTemplateLiteral(["Error compiling the shader:"]))), shaderCodeAsText);
        var compilationLog = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        console.error(SRLOG("Shader compiler log: ".concat(compilationLog)));
      }
      /* eslint-enable no-console */


      return shader;
    });

    src_defineProperty(_assertThisInitialized(_this), "initShaders", function (_ref3) {
      var fs = _ref3.fs,
          vs = _ref3.vs;

      var _assertThisInitialize6 = _assertThisInitialized(_this),
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
      _this.vertexPositionAttribute = gl.getAttribLocation(_this.shaderProgram, "aVertexPosition");
      gl.enableVertexAttribArray(_this.vertexPositionAttribute);
    });

    src_defineProperty(_assertThisInitialized(_this), "processCustomUniforms", function () {
      var uniforms = _this.props.uniforms;

      if (uniforms) {
        Object.keys(uniforms).forEach(function (name, id) {
          var _this$props$uniforms$ = _this.props.uniforms[name],
              value = _this$props$uniforms$.value,
              type = _this$props$uniforms$.type;
          var glslType = uniformTypeToGLSLType(type);
          if (!glslType) return; // If the type specified doesn't exist

          var tempObject = {};

          if (type.includes("Matrix")) {
            var arrayLength = type.length;
            var val = type.charAt(arrayLength - 3);
            var numberOfMatrices = Math.floor(value.length / (val * val));

            if (value.length > val * val) {
              tempObject.arraySize = "[".concat(numberOfMatrices, "]");
            }
          } else if (type.includes("v") && value.length > type.charAt(0)) {
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

    src_defineProperty(_assertThisInitialized(_this), "processTextures", function () {
      var _assertThisInitialize7 = _assertThisInitialized(_this),
          gl = _assertThisInitialize7.gl;

      var _this$props2 = _this.props,
          textures = _this$props2.textures,
          onDoneLoadingTextures = _this$props2.onDoneLoadingTextures;

      if (textures && textures.length > 0) {
        _this.uniforms["".concat(UNIFORM_CHANNELRESOLUTION)] = {
          type: "vec3",
          isNeeded: false,
          arraySize: "[".concat(textures.length, "]"),
          value: []
        };
        var texturePromisesArr = textures.map(function (texture, id) {
          _this.uniforms["".concat(UNIFORM_CHANNEL).concat(id)] = {
            type: "sampler2D",
            isNeeded: false
          }; // Dynamically add textures uniforms

          _this.setupChannelRes(texture, id); // initialize array with 0s


          _this.texturesArr[id] = new Texture(gl);
          return _this.texturesArr[id].load(texture, id).then(function (texture) {
            return _this.setupChannelRes(texture, id);
          });
        });
        Promise.all(texturePromisesArr).then(function () {
          return onDoneLoadingTextures && onDoneLoadingTextures();
        })["catch"](function (e) {
          console.error(e);
          if (onDoneLoadingTextures) onDoneLoadingTextures();
        });
      } else {
        if (onDoneLoadingTextures) onDoneLoadingTextures();
      }
    });

    src_defineProperty(_assertThisInitialized(_this), "preProcessShaders", function (fs, vs) {
      var _this$props3 = _this.props,
          precision = _this$props3.precision,
          _this$props3$devicePi = _this$props3.devicePixelRatio,
          devicePixelRatio = _this$props3$devicePi === void 0 ? 1 : _this$props3$devicePi;
      var dprString = "#define DPR ".concat(devicePixelRatio.toFixed(1), "\n");
      var isValidPrecision = PRECISIONS.includes(precision);
      var precisionString = "precision ".concat(isValidPrecision ? precision : PRECISIONS[1], " float;\n");
      if (!isValidPrecision) console.warn(SRLOG(src_templateObject2 || (src_templateObject2 = src_taggedTemplateLiteral(["wrong precision type ", ", please make sure to pass one of a valid precision lowp, mediump, highp, by default you shader precision will be set to highp."])), precision));
      var fsString = precisionString.concat(dprString).concat(fs).replace(/texture\(/g, "texture2D(");
      var indexOfPrecisionString = fsString.lastIndexOf(precisionString);
      Object.keys(_this.uniforms).forEach(function (uniform) {
        if (fs.includes(uniform)) {
          fsString = insertStringAtIndex(fsString, "uniform ".concat(_this.uniforms[uniform].type, " ").concat(uniform).concat(_this.uniforms[uniform].arraySize || "", "; \n"), indexOfPrecisionString + precisionString.length);
          _this.uniforms[uniform].isNeeded = true;
        }
      });
      var isShadertoy = /mainImage/.test(fs);
      if (isShadertoy) fsString = fsString.concat(FS_MAIN_SHADER); // console.log(fsString);

      return {
        fs: fsString,
        vs: vs
      };
    });

    src_defineProperty(_assertThisInitialized(_this), "setUniforms", function (timestamp) {
      var _assertThisInitialize8 = _assertThisInitialized(_this),
          gl = _assertThisInitialize8.gl;

      var delta = _this.lastTime ? (timestamp - _this.lastTime) / 1000 : 0;
      _this.lastTime = timestamp;

      if (_this.props.uniforms) {
        Object.keys(_this.props.uniforms).forEach(function (name) {
          var currentUniform = _this.props.uniforms[name];

          if (_this.uniforms[name].isNeeded) {
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
        var timeUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_TIME);
        gl.uniform1f(timeUniform, _this.timer += delta);
      }

      if (_this.uniforms.iTimeDelta.isNeeded) {
        var timeDeltaUniform = gl.getUniformLocation(_this.shaderProgram, UNIFORM_TIMEDELTA);
        gl.uniform1f(timeDeltaUniform, delta);
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

        gl.uniform1i(_timeDeltaUniform, _this.uniforms.iFrame.value++);
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

    src_defineProperty(_assertThisInitialized(_this), "registerCanvas", function (r) {
      _this.canvas = r;
    });

    src_defineProperty(_assertThisInitialized(_this), "gl", void 0);

    src_defineProperty(_assertThisInitialized(_this), "squareVerticesBuffer", void 0);

    src_defineProperty(_assertThisInitialized(_this), "shaderProgram", void 0);

    src_defineProperty(_assertThisInitialized(_this), "vertexPositionAttribute", void 0);

    src_defineProperty(_assertThisInitialized(_this), "animFrameId", void 0);

    src_defineProperty(_assertThisInitialized(_this), "timeoutId", void 0);

    src_defineProperty(_assertThisInitialized(_this), "canvas", void 0);

    src_defineProperty(_assertThisInitialized(_this), "mousedown", false);

    src_defineProperty(_assertThisInitialized(_this), "canvasPosition", void 0);

    src_defineProperty(_assertThisInitialized(_this), "timer", 0);

    src_defineProperty(_assertThisInitialized(_this), "lastMouseArr", [0, 0]);

    src_defineProperty(_assertThisInitialized(_this), "texturesArr", []);

    src_defineProperty(_assertThisInitialized(_this), "lastTime", 0);

    src_defineProperty(_assertThisInitialized(_this), "render", function () {
      var style = _this.props.style;
      var currentStyle = {
        glCanvas: _objectSpread({
          height: "100%",
          width: "100%"
        }, style)
      };
      return /*#__PURE__*/external_react_default().createElement("canvas", {
        style: currentStyle.glCanvas,
        ref: _this.registerCanvas
      });
    });

    _this.uniforms = (_this$uniforms = {}, src_defineProperty(_this$uniforms, UNIFORM_TIME, {
      type: "float",
      isNeeded: false,
      value: 0
    }), src_defineProperty(_this$uniforms, UNIFORM_TIMEDELTA, {
      type: "float",
      isNeeded: false,
      value: 0
    }), src_defineProperty(_this$uniforms, UNIFORM_DATE, {
      type: "vec4",
      isNeeded: false,
      value: [0, 0, 0, 0]
    }), src_defineProperty(_this$uniforms, UNIFORM_MOUSE, {
      type: "vec4",
      isNeeded: false,
      value: [0, 0, 0, 0]
    }), src_defineProperty(_this$uniforms, UNIFORM_RESOLUTION, {
      type: "vec2",
      isNeeded: false,
      value: [0, 0]
    }), src_defineProperty(_this$uniforms, UNIFORM_FRAME, {
      type: "int",
      isNeeded: false,
      value: 0
    }), src_defineProperty(_this$uniforms, UNIFORM_DEVICEORIENTATION, {
      type: "vec4",
      isNeeded: false,
      value: [0, 0, 0, 0]
    }), _this$uniforms);
    return _this;
  }

  src_createClass(ShadertoyReact, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var gl = this.gl;

      if (gl) {
        gl.getExtension("WEBGL_lose_context").loseContext();
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
}(external_react_namespaceObject.Component);

src_defineProperty(ShadertoyReact, "defaultProps", {
  textures: [],
  contextAttributes: {},
  devicePixelRatio: 1,
  vs: BASIC_VS,
  precision: "highp"
});


module.exports = __webpack_exports__;
/******/ })()
;