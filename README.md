shadertoy-react :art:
==============

[![npm version](https://badge.fury.io/js/shadertoy-react.svg)](https://badge.fury.io/js/shadertoy-react)
[![Build Size][build-size]][build-size-url]
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

#### Shadertoy like React Component ####

Small react component letting you easily add responsive full canvas shader to your React page. `shadertoy-react` supports `shadertoy` glsl syntax, but also the classic glsl syntax, so you can easily build your shader in shadertoy leveraging the live reload functionality and copy past it to your React app once you are done without having to worry about converting the syntax to the classic glsl syntax.

`shadertoy-react` also gives you access to almost all the built in uniforms existing on `shadertoy` plus some new ones like for example the gyroscope data of your phone etc. Start writting code using any of these built in uniforms without having to worry about passing anything to the shader, `shadertoy-react` takes care of all that for you. Also, you can still pass customs uniforms as a prop if you actually need some more flexibility.

You could for example use postprocessing on images and videos, raytracing, raymarching, etc... the limitation are yours, now you have everything you need to focus on the shader art itself.

## The way it works

Same as the Shadertoy implementation. Basically it uses WebGL on a `<canvas/>` and render a material on a full viewport quad composed of 2 triangles. The canvas size matches the css size of your element, by default it it 100% 100% of your parent element size, this can be changed by passing a custom `style={}` prop to your component. It is also making sure that anything that is not used in your shader is not being processed in the JS side to avoid useless event listeners, etc. so if you don't use the `iMouse` uniform the mouse event listener will not be activated and the `iMouse` uniform will not be added and passed to your shader.

### Playground

  Try `shadertoy-react` on codesandbox to get a taste of the functionalities.
  
* [Basic](https://codesandbox.io/s/ojllzxvww6)
* [Demos](https://codesandbox.io/s/434qm4x4w0)

## How to use it

### Basic example:

Example of the simplest React Component using `shadertoy-react`:

```javascript
import React from  'react';
import { render} from  'react-dom';
import ShadertoyReact from 'shadertoy-react';

const ExampleApp = () =>
  <Container>
    <ShadertoyReact fs={fs}/>
  </Container>;
```

Example of working shader with `shadertoy` like syntax:

```c
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 uv = fragCoord.xy/iResolution.xy;
  vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
  fragColor = vec4(col,1.0);
}
```

Example of working shader with classic GLSL syntax:

```c
void main(void) {
  vec2 uv = gl_FragCoord.xy/iResolution.xy;
  vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
  gl_FragColor = vec4(col,1.0);
}
```

## Available props

Here are a few built in react props you can pass to your component. Feel free to suggest more.

* `fs` -- A string containing your fragment shader.
* `textures` -- An array of textures objects following that structure `{url: ... , minFilter: , magFilter: , wrapS: ,wrapT: }` the format supported are (.jpg, .jpeg, .png, .bmp) for images, and (.mp4, .3gp, .webm, .ogv) for videos. Textures needs to be squared otherwise they will be automatically squared for you. minFilter, magFilter, wrapS, wrapT are optionals, by default their values are set to `{url: ... , minFilter: LinearMipMapLinearFilter, magFilter: LinearFilter, wrapS: ReapeatWrapping, wrapT: ReapeatWrapping}`.
* `uniforms` -- An object containing uniforms objects following that structure { uTest: {type: , value: }, uTest2: {type: , value: }, uTest3: {type: , value: } ... }. To know more about the supported types please refer to the [custom uniforms section](#Custom-uniforms).
* `clearColor` -- An array `[red, green, blue, alpha]` Specifies the color values used when clearing color buffers method of the [WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearColor) by default `[0, 0, 0, 1]`.
* `precision` -- GLSL Precision qualifier, by default highp, it can be lowp, mediump, highp depending on how much precision the GPU uses when calculating floats.
* `devicePixelRatio` -- A value passed to set the [pixel density](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) of the canvas. By default 1.
* `contextAttributes` -- To customize your [WebGL context attributes.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext)
* `style` -- Pass a [React Inline style](https://reactjs.org/docs/dom-elements.html#style) to customize the style of your canvas.
* `onDoneLoadingTextures` -- Callback called once all textures are done being loaded, usefull when you want to wait for your shader to have all the needed texture before seeing it on screen. Using that callback you could for example simply fade the canvas in using css.
* `lerp` -- A value in between 0 - 1 used to lerp the mouse position in your fragment shader.

## Uniforms

#### Shadertoy's Built-in:

Built in uniforms are uniforms that are being passed automatically to your shader without having you doing anything. You can start using every single one of them without having to do anything. We are taking care of that for you. 

* `uniform float iTime` -- Shader playback time (in seconds).
* `uniform float iTimeDelta` -- Render time (in seconds).
* `uniform int iFrame` -- Shader playback frame.
* `uniform vec2 iResolution` -- Viewport resolution (in pixels).
* `uniform vec4 iDate` -- (Year, month, day, time in seconds).
* `uniform vec4 iMouse` -- Mouse pixel coords. xy: current (if MLB down), zw: click.
* `uniform sampler2D iChannel^n` -- The textures input channel you've passed; numbered in the same order as the textures passed as prop in your react component.
* `uniform vec3 iChannelResolution[n]` -- An array containing the texture channel resolution (in pixels).
  
##### shadertoy-react's only built-in:

* `uniform vec4 iDeviceOrientation` -- Raw data from [device orientation](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation) where respectively x: Alpha, y: Beta, z: Gamma and w: [window.orientation](https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation).
* `#define DPR 1.0` -- The canvas device pixel ratio (1.0 by default or props.devicePixelRatio).
  
#### Custom uniforms:

Shadertoy React now supports adding your owns uniforms by passing an uniforms props containing uniforms objects. Here is a list of the supported uniforms and their respective formats. 
***Note:*** If you are whiling to pass multiple Vectors, Matrices, Ints, Floats, make sure to pass flat arrays as shown below.

| Type  | GLSL Type  | Uniforms values in JS  | Read in GLSL |
|---|---|---|---|
| `1f`  | `float`  | `val`  | `uValue` |
| `2f` | `vec2`  | `[x, y]`  | `uValue.xy` |
| `3f` | `vec3`  | `[x, y, z]` | `uValue.xyz` |
| `4f` | `vec4`  | `[x, y, z, w]`  | `uValue.xyzw` |
| `1fv` | `float` or `float` array  | `val` or `[val, val, ...]`  | `uValue` or `uValue[n]` |
| `2fv` | `vec2` or `vec2` array  | `[x, y]` or `[x, y, x, y, ...]` | `uValue.xy` or `uValue[n].xy` |
| `3fv` | `vec3` or `vec3` array  | `[x, y, z]` or `[x, y, z, x, y, z, ...]`  | `uValue.xyz` or `uValue[n].xyz` |
| `4fv` | `vec4` or `vec4` array  | `[x, y, z, w]` or `[x, y, z, w, x, y, z, w ...]` | `uValue.xyzw` or `uValue[n].xyzw` |
| `1i` | `int`  |  `val` | `uValue` |
| `2i` | `ivec2`  | `[x, y]`  | `uValue.xy` |
| `3i` | `ivec3`  | `[x, y, z]`  | `uValue.xyz` |
| `4i` | `ivec4` | `[x, y, z, w]`  | `uValue.xyzw` |
| `1iv` | `int` or `int` array  | `val` or `[val, val, val, ...]`  | `uValue` or `uValue[n]` |
| `2iv` | `ivec2` or `ivec2` array | `[x, y]` or `[x, y, x, y, ...]`  | `uValue.xy` or `uValue[n].xy` |
| `3iv` | `ivec3` or `ivec3` array  | `[x, y, z]` or `[x, y, z, x, y, z, ...]`  | `uValue.xyz` or `uValue[n].xyz` |
| `4iv` | `ivec4` or `ivec4` array  | `[x, y, z, w]` or `[x, y, z, w, x, y, z, w ...]`  | `uValue.xyzw` or `uValue[n].xyzw` |
| `Matrix2fv` | `mat2` or `mat2` array | `[m00, m01, m10, m11]` or `[m00, m01, m10, m11, m00, m01, m10, m11 ...]` | `uValue[0->1][0->1]` or `uValue[n][0->1][0->1]` |
| `Matrix3fv` | `mat3` or `mat3` array  | `[m00, m01, m02, m10, m11, m12, m20, m21, m22]` or `[m00, m01, m02, m10, m11, m10, m12, m20, m21, m22, m00, m01, m02, m10, m11, m10, m12, m20, m21, m22 ...]`  | `uValue[0->2][0->2]` or `uValue[n][0->2][0->2]` |
| `Matrix4fv` | `mat4` or `mat4` array  | `[m00, m01, m02, m03, m10, m11, m10, m12, m20, m21, m22, m30, m31, m32, m33]` or `[m00, m01, m02, m03, m10, m11, m10, m12, m20, m21, m22, m30, m31, m32, m33,  m00, m01, m02, m03, m10, m11, m10, m12, m20, m21, m22, m30, m31, m32, m33 ...]` | `uValue[0->3][0->3]` or `uValue[n][0->3][0->3]` |

How to do it:

```javascript
import React from  'react';
import { render} from  'react-dom';
import ShadertoyReact from 'shadertoy-react';

const ExampleApp = () => {
  const { scrollY } = this.state;

  const uniforms = {
    uScrollY : {type: '1f', value: scrollY }, // float
    uTestArrayFloats : {type: '1fv', value: [0.2, 0.4, 0.5, 0.5, 0.6] }, // Array of float
    uTestArrayVecs2 : {type: '2fv', value: [0.2, 0.4, 0.5, 0.5] }, // 2 vec2 passed as a flat array
    uTestMatrix : {
        type: 'Matrix2fv', 
        value: [0., 1., 2., 3.] // 2x2 Matrix 
    }
  };

  return  
    (<Container>
      <ShadertoyReact
        fs={fs}
        uniforms={uniforms}
      />
    </Container>);
}
```

Example of shader you could write using these custom uniforms:

```c
  void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    // You can then directly use uScrollY, uTestMatrix, uTestArrayFloats without having to worry about anything else.
    gl_FragColor = vec4(uScrollY, uTestMatrix[0][0], uTestArrayFloats[0], uTestArrayVecs2[0].xy); 
  }
```

#### Working with textures:

By default `shadertoy-react` lets you pass an array of texture object, `shadertoy-react` takes care of loading the textures for you. A callback is available and called once all the textures are done loading. Each texture gets a uniform name `iChannel(n)` following the same order that in the prop passed to the react component, you can then directly use `iChanel(n)` in your shader.

```javascript
import React from  'react';
import { render} from  'react-dom';
import ShadertoyReact, { LinearFilter, RepeatWrapping } from 'shadertoy-react';

const ExampleApp = () =>
  <Container>
    <ShadertoyReact
      fs={fs}
      textures={[
        { url: './mytexture.png' },
      ]}
    />
  </Container>;
```

In your shader you can directly do for example:

```c
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 uv = fragCoord.xy / iResolution.xy;
  vec4 texture = texture(iChannel0, uv);
  gl_FragColor = texture;
}
```

##### Texture Filtering:

  By default all of your textures are being squared if they aren't, then the default Texture Filtering and Wrapping are being applied to them, using `shadertoy-react` you can  apply your own filters. `shadertoy-react` contains all the WebGL texture filtering constants and texture wrapping constants. So you can easily import them in your code and make sure to pass the right one to your texture options.

**Example of optionnal texture related imports:**

```javascript
import ShadertoyReact, {
  NearestFilter,
  LinearFilter,
  NearestMipMapNearestFilter,
  LinearMipMapNearestFilter,
  NearestMipMapLinearFilter,
  LinearMipMapLinearFilter,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  RepeatWrapping,
} from 'shadertoy-react';
```

**Example of usage of optionnal texture filtering:**

```javascript
import React from  'react';
import { render} from  'react-dom';
import ShadertoyReact, { LinearFilter, RepeatWrapping } from 'shadertoy-react';

const ExampleApp = () =>
  <Container>
    <ShadertoyReact
      fs={fs}
      textures={[
        { url: ..., minFilter: LinearFilter, magFilter: LinearFilter, wrapS: RepeatWrapping, wrapT: RepeatWrapping },
        { url: ..., minFilter: LinearFilter, magFilter: LinearFilter, wrapS: RepeatWrapping, wrapT: RepeatWrapping },
        { url: ..., minFilter: LinearFilter, magFilter: LinearFilter, wrapS: RepeatWrapping, wrapT: RepeatWrapping },
      ]}
    />
  </Container>;
```

## What's next ordered by priority

* Module Support for props IntelliSense.
* Dynamically load new texture when textures props changes.
* Add lazy loading logic with 1x 2x 3x etc. so your shader can receive ```<img />``` like src files.
* Add support for #define constantes in shader from prop.
* Add camera feed as a texture.
* Add support for Data texture.
* Add support for WebGL2 and GLSL 3.0.
* Add support to multi passes as Shadertoy is doing.
* Add support for Cube texture.
* Add support for keyboard uniforms / inputs.
* Add support for iChannelTime.
* ~~Add possibility to specify gl clearColor in a prop~~ v1.0.4
* ~~Add shader precision as react prop.~~ v1.0.2
* ~~Add support for classic syntax (void main(void)) etc.~~ v1.0.2
* ~~Add support for custom uniforms.~~ v1.0.1
* ~~Add props for optionnal mouse lerping.~~ v1.0.0
* ~~Add built in uniform for phone device orientation / gyroscope based effects.~~  v1.0.0
* ~~Add support for iDate.~~ v1.0.0
* ~~Add support for video textures.~~ v1.0.0
* ~~Add support for iChannelResolution.~~ v1.0.0

[build-size]: https://badge-size.herokuapp.com/mvilledieu/shadertoy-react/master/lib/shadertoy-react.min.js.svg?compression=gzip
[build-size-url]: https://github.com/mvilledieu/shadertoy-react/master/lib/