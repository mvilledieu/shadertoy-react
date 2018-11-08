"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RepeatWrapping = exports.MirroredRepeatWrapping = exports.ClampToEdgeWrapping = exports.LinearMipMapLinearFilter = exports.NearestMipMapLinearFilter = exports.LinearMipMapNearestFilter = exports.NearestMipMapNearestFilter = exports.LinearFilter = exports.NearestFilter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _sylvesterEs = require("sylvester-es6");

var _builtInUniforms;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  height: 100%;\n  width: 100%;\n\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NearestFilter = 9728;
exports.NearestFilter = NearestFilter;
var LinearFilter = 9729;
exports.LinearFilter = LinearFilter;
var NearestMipMapNearestFilter = 9984;
exports.NearestMipMapNearestFilter = NearestMipMapNearestFilter;
var LinearMipMapNearestFilter = 9985;
exports.LinearMipMapNearestFilter = LinearMipMapNearestFilter;
var NearestMipMapLinearFilter = 9986;
exports.NearestMipMapLinearFilter = NearestMipMapLinearFilter;
var LinearMipMapLinearFilter = 9987;
exports.LinearMipMapLinearFilter = LinearMipMapLinearFilter;
var ClampToEdgeWrapping = 33071;
exports.ClampToEdgeWrapping = ClampToEdgeWrapping;
var MirroredRepeatWrapping = 33648;
exports.MirroredRepeatWrapping = MirroredRepeatWrapping;
var RepeatWrapping = 10497;
exports.RepeatWrapping = RepeatWrapping;
var FS_PRECISION_PREPROCESSOR = "\n  #ifdef GL_ES\n    precision mediump float;\n  #endif\n";
var BASIC_FS = "\n  void main(void) {\n    // Normalized pixel coordinates (from 0 to 1)\n    vec2 uv = gl_FragCoord.xy/iResolution.xy;\n\n    // Time varying pixel color\n    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));\n\n    // Output to screen\n    gl_FragColor = vec4(col,1.0);\n  }\n";
var BASIC_VS = "\n  attribute vec3 aVertexPosition;\n  uniform mat4 uMVMatrix;\n  uniform mat4 uOMatrix;\n\n  varying lowp vec4 vColor;\n\n  void main(void) {\n    gl_Position = uOMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n  }\n";
var UNIFORM_TIME = 'iTime';
var UNIFORM_MOUSE = 'iMouse';
var UNIFORM_RESOLUTION = 'iResolution';
var UNIFORM_CHANNEL = 'iChannel';
var builtInUniforms = (_builtInUniforms = {}, _defineProperty(_builtInUniforms, UNIFORM_TIME, {
  type: 'float',
  isNeeded: false
}), _defineProperty(_builtInUniforms, UNIFORM_MOUSE, {
  type: 'vec2',
  isNeeded: false
}), _defineProperty(_builtInUniforms, UNIFORM_RESOLUTION, {
  type: 'vec2',
  isNeeded: false
}), _builtInUniforms);

var StyledCanvas = _styledComponents.default.canvas(_templateObject(), function (props) {
  return props.customStyle;
});
/* eslint-disable */


var INCREMENT_TIME = 0.02;

var lerp = function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
};

var insertStringAtIndex = function insertStringAtIndex(currentString, string, index) {
  return index > 0 ? currentString.substring(0, index) + string + currentString.substring(index, currentString.length) : string + currentString;
}; // eslint-disable-next-line


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

var ShadertoyReact =
/*#__PURE__*/
function (_Component) {
  _inherits(ShadertoyReact, _Component);

  function ShadertoyReact() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ShadertoyReact);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ShadertoyReact)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      var _this$props = _this.props,
          fs = _this$props.fs,
          vs = _this$props.vs,
          textures = _this$props.textures,
          imagesLoaded = _this$props.imagesLoaded;

      _this.initWebGL();

      if (_this.gl) {
        _this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque


        _this.gl.clearDepth(1.0); // Clear everything


        _this.gl.enable(_this.gl.DEPTH_TEST); // Enable depth testing


        _this.gl.depthFunc(_this.gl.LEQUAL); // Near things obscure far things


        _this.gl.viewport(0, 0, _this.canvas.width, _this.canvas.height);

        _this.canvas.height = _this.canvas.clientHeight;
        _this.canvas.width = _this.canvas.clientWidth;

        if (textures && textures.length > 0) {
          var texturePromisesArr = textures.map(function (texture, id) {
            builtInUniforms["".concat(UNIFORM_CHANNEL).concat(id)] = {
              type: 'sampler2D',
              isNeeded: false
            };
            return _this.loadTexture(texture);
          });

          if (imagesLoaded) {
            Promise.all(texturePromisesArr).then(function () {
              return imagesLoaded();
            });
          }
        }

        var shaders = _this.preProcessShaders(fs || BASIC_FS, vs || BASIC_VS);

        _this.initShaders(shaders);

        _this.initBuffers();

        _this.drawScene();

        _this.addEventListeners();

        _this.onResize();
      }

      _this.timeoutId = setTimeout(function () {
        return _this.onResize();
      }, 500);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "shouldComponentUpdate", function () {
      return false;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "gl", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "squareVerticesBuffer", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mvMatrix", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "shaderProgram", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "vertexPositionAttribute", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "orthographicMatrix", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "animFrameId", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "timeoutId", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "canvas", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "pow2canvas", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mouse", {
      x: 0,
      y: 0
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mouseX", 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mouseY", 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "canvasPosition", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "timer", 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "textures", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initWebGL", function () {
      var contextOptions = _this.props.contextOptions; // $FlowFixMe

      _this.gl = _this.canvas.getContext('webgl', contextOptions) || _this.canvas.getContext('experimental-webgl', contextOptions); // $FlowFixMe

      _this.gl.getExtension('OES_standard_derivatives'); // $FlowFixMe


      _this.gl.getExtension('EXT_shader_texture_lod');
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initBuffers", function () {
      _this.squareVerticesBuffer = _this.gl.createBuffer();

      _this.gl.bindBuffer(_this.gl.ARRAY_BUFFER, _this.squareVerticesBuffer);

      var vertices = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];

      _this.gl.bufferData(_this.gl.ARRAY_BUFFER, new Float32Array(vertices), _this.gl.STATIC_DRAW);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addEventListeners", function () {
      if (builtInUniforms.iMouse.isNeeded) {
        _this.canvas.addEventListener('mousemove', _this.onMouseMove, {
          passive: true
        });

        _this.canvas.addEventListener('mouseout', _this.onMouseOut, {
          passive: true
        });
      }

      window.addEventListener('resize', _this.onResize, {
        passive: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeEventListeners", function () {
      if (builtInUniforms.iMouse.isNeeded) {
        _this.canvas.removeEventListener('mousemove', _this.onMouseMove, {
          passive: true
        });

        _this.canvas.removeEventListener('mouseout', _this.onMouseOut, {
          passive: true
        });
      }

      window.removeEventListener('resize', _this.onResize, {
        passive: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseMove", function (event) {
      var canvasPosition = _this.canvas.getBoundingClientRect();

      var mouseX = event.clientX - canvasPosition.left;
      var mouseY = event.clientY - canvasPosition.top;
      _this.mouseX = 2 * (mouseX / canvasPosition.width) - 1;
      _this.mouseY = 1 - 2 * (mouseY / canvasPosition.height);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onResize", function () {
      var _this$props$devicePix = _this.props.devicePixelRatio,
          devicePixelRatio = _this$props$devicePix === void 0 ? 1 : _this$props$devicePix;
      _this.canvasPosition = _this.canvas.getBoundingClientRect();
      var realToCSSPixels = devicePixelRatio; // Force pixel ratio to be one to avoid expensive calculus on retina display

      var displayWidth = Math.floor(_this.canvasPosition.width * realToCSSPixels);
      var displayHeight = Math.floor(_this.canvasPosition.height * realToCSSPixels);
      _this.gl.canvas.width = displayWidth;
      _this.gl.canvas.height = displayHeight;

      if (builtInUniforms.iResolution.isNeeded) {
        var rUniform = _this.gl.getUniformLocation(_this.shaderProgram, UNIFORM_RESOLUTION); // $FlowFixMe


        _this.gl.uniform2fv(rUniform, [_this.gl.canvas.width, _this.gl.canvas.height]);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseOut", function () {
      _this.mouseX = 0;
      _this.mouseY = 0;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "makePowerOfTwo", function (image) {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loadTexture", function (textureArgs) {
      var url = textureArgs.url,
          wrapS = textureArgs.wrapS,
          wrapT = textureArgs.wrapT,
          minFilter = textureArgs.minFilter,
          magFilter = textureArgs.magFilter,
          _textureArgs$flipY = textureArgs.flipY,
          flipY = _textureArgs$flipY === void 0 ? -1 : _textureArgs$flipY;

      var texture = _this.gl.createTexture();

      _this.gl.bindTexture(_this.gl.TEXTURE_2D, texture);

      var level = 0;
      var internalFormat = _this.gl.RGBA;
      var width = 1;
      var height = 1;
      var border = 0;
      var srcFormat = _this.gl.RGBA;
      var srcType = _this.gl.UNSIGNED_BYTE;
      var pixel = new Uint8Array([255, 255, 255, 0]);

      _this.gl.texImage2D(_this.gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);

      return new Promise(function (resolve, reject) {
        var image = new Image();

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

        _this.gl.bindTexture(_this.gl.TEXTURE_2D, texture);

        _this.gl.pixelStorei(_this.gl.UNPACK_FLIP_Y_WEBGL, flipY);

        _this.gl.texImage2D(_this.gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

        if (textureNeedsGenerateMipmaps(textureArgs, isPowerOfTwoImage)) {
          _this.gl.generateMipmap(_this.gl.TEXTURE_2D);
        }

        if (minFilter) {
          _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MIN_FILTER, minFilter);
        }

        if (magFilter) {
          _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MAG_FILTER, magFilter);
        }

        if (wrapS && wrapT) {
          _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_WRAP_S, wrapS);

          _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_WRAP_T, wrapT);
        }

        _this.textures.unshift(texture);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "drawScene", function () {
      _this.gl.viewport(0, 0, _this.gl.drawingBufferWidth, _this.gl.drawingBufferHeight);

      _this.gl.clear(_this.gl.COLOR_BUFFER_BIT | _this.gl.DEPTH_BUFFER_BIT); // eslint-disable-line no-bitwise


      _this.orthographicMatrix = _this.makeOrtho(-1.0, 1.0, -1.0, 1.0, 0.1, 100);

      _this.loadIdentity();

      _this.mvTranslate([-0.0, 0.0, -0.1]); // make sure the plane is in front of the camera


      _this.gl.bindBuffer(_this.gl.ARRAY_BUFFER, _this.squareVerticesBuffer);

      _this.gl.vertexAttribPointer(_this.vertexPositionAttribute, 3, _this.gl.FLOAT, false, 0, 0);

      _this.setUniforms();

      _this.gl.drawArrays(_this.gl.TRIANGLE_STRIP, 0, 4);

      _this.timer += INCREMENT_TIME;

      if (builtInUniforms.iMouse.isNeeded) {
        _this.mouse.x = lerp(_this.mouse.x, _this.mouseX, 0.1);
        _this.mouse.y = lerp(_this.mouse.y, _this.mouseY, 0.1);
      }

      _this.animFrameId = requestAnimationFrame(_this.drawScene);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "createShader", function (type, shaderCodeAsText) {
      var shader = _this.gl.createShader(type);

      _this.gl.shaderSource(shader, shaderCodeAsText);

      _this.gl.compileShader(shader);
      /* eslint-disable no-console */


      if (!_this.gl.getShaderParameter(shader, _this.gl.COMPILE_STATUS)) {
        console.warn('Error compiling the shader:', shaderCodeAsText);

        var compilationLog = _this.gl.getShaderInfoLog(shader);

        console.error("Shader compiler log: ".concat(compilationLog));
      }
      /* eslint-enable no-console */


      return shader;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initShaders", function (_ref) {
      var fs = _ref.fs,
          vs = _ref.vs;

      // console.log(fs, vs);
      var fragmentShader = _this.createShader(_this.gl.FRAGMENT_SHADER, fs);

      var vertexShader = _this.createShader(_this.gl.VERTEX_SHADER, vs);

      _this.shaderProgram = _this.gl.createProgram();

      _this.gl.attachShader(_this.shaderProgram, vertexShader);

      _this.gl.attachShader(_this.shaderProgram, fragmentShader);

      _this.gl.linkProgram(_this.shaderProgram);
      /* eslint-disable no-console */


      if (!_this.gl.getProgramParameter(_this.shaderProgram, _this.gl.LINK_STATUS)) {
        // $FlowFixMe
        console.error("Unable to initialize the shader program: ".concat(_this.gl.getProgramInfoLog(_this.shaderProgram)));
        return;
      }
      /* eslint-enable no-console */


      _this.gl.useProgram(_this.shaderProgram);

      _this.vertexPositionAttribute = _this.gl.getAttribLocation(_this.shaderProgram, 'aVertexPosition');

      _this.gl.enableVertexAttribArray(_this.vertexPositionAttribute);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "preProcessShaders", function (fs, vs) {
      var fsString = FS_PRECISION_PREPROCESSOR.concat(fs);
      var string = '#endif';
      var index = fsString.lastIndexOf(string);
      Object.keys(builtInUniforms).forEach(function (uniform) {
        if (fs.includes(uniform)) {
          fsString = insertStringAtIndex(fsString, "uniform ".concat(builtInUniforms[uniform].type, " ").concat(uniform, "; \n"), index + string.length + 1);
          builtInUniforms[uniform].isNeeded = true;
        }
      });
      console.log(fsString);
      return {
        fs: fsString,
        vs: vs
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loadIdentity", function () {
      _this.mvMatrix = _sylvesterEs.Matrix.I(4);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "multMatrix", function (m) {
      _this.mvMatrix = _this.mvMatrix.x(m);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mvTranslate", function (v) {
      return _this.multMatrix(_sylvesterEs.Matrix.Translation(new _sylvesterEs.Vector([v[0], v[1], v[2]])).ensure4x4());
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setUniforms", function () {
      var pUniform = _this.gl.getUniformLocation(_this.shaderProgram, 'uOMatrix');

      _this.gl.uniformMatrix4fv(pUniform, false, new Float32Array(_this.orthographicMatrix.flatten()));

      var mvUniform = _this.gl.getUniformLocation(_this.shaderProgram, 'uMVMatrix');

      _this.gl.uniformMatrix4fv(mvUniform, false, new Float32Array(_this.mvMatrix.flatten()));

      if (builtInUniforms.iMouse.isNeeded) {
        var mouseUniform = _this.gl.getUniformLocation(_this.shaderProgram, UNIFORM_MOUSE); // $FlowFixMe


        _this.gl.uniform2fv(mouseUniform, [_this.mouse.x, _this.mouse.y]);
      }

      if (builtInUniforms.iTime.isNeeded) {
        var timeUniform = _this.gl.getUniformLocation(_this.shaderProgram, UNIFORM_TIME);

        _this.gl.uniform1f(timeUniform, _this.timer);
      }

      if (_this.textures.length > 0) {
        _this.textures.forEach(function (texture, id) {
          if (builtInUniforms["iChannel".concat(id)].isNeeded) {
            var iChannel = _this.gl.getUniformLocation(_this.shaderProgram, "iChannel".concat(id));

            _this.gl.activeTexture(_this.gl["TEXTURE".concat(id)]);

            _this.gl.bindTexture(_this.gl.TEXTURE_2D, texture);

            _this.gl.uniform1i(iChannel, id);
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "makeOrtho", function (left, right, bottom, top, znear, zfar) {
      var tx = -(right + left) / (right - left);
      var ty = -(top + bottom) / (top - bottom);
      var tz = -(zfar + znear) / (zfar - znear);
      return new _sylvesterEs.Matrix([[2 / (right - left), 0, 0, tx], [0, 2 / (top - bottom), 0, ty], [0, 0, -2 / (zfar - znear), tz], [0, 0, 0, 1]]);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "registerCanvas", function (r) {
      _this.canvas = r;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      var customStyle = _this.props.customStyle;
      return _react.default.createElement(StyledCanvas, {
        customStyle: customStyle,
        ref: _this.registerCanvas
      });
    });

    return _this;
  }

  _createClass(ShadertoyReact, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      if (this.gl) {
        this.gl.getExtension('WEBGL_lose_context').loseContext();
        this.gl.useProgram(null);
        this.gl.deleteProgram(this.shaderProgram);

        if (this.textures.length > 0) {
          this.textures.forEach(function (texture) {
            _this2.gl.deleteTexture(texture);
          });
        }

        this.shaderProgram = null;
      }

      this.removeEventListeners();
      clearTimeout(this.timeoutId);
      cancelAnimationFrame(this.animFrameId);
    }
  }]);

  return ShadertoyReact;
}(_react.Component);

exports.default = ShadertoyReact;

_defineProperty(ShadertoyReact, "defaultProps", {
  textures: [],
  contextOptions: {
    premultipliedAlpha: false,
    alpha: true
  },
  devicePixelRatio: 1,
  vs: BASIC_VS,
  customStyle: ""
});