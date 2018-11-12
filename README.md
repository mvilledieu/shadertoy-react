WIP WIP WIP WIP WIP

Shadertoy React
==============

Simple react component letting you easily add shaders you've been building on Shadertoy to your React page. I found myself using Shadertoy most of the time when I needed to create some shader for projects, since the live reload functionnality makes it really easy to start working on the visual quickly. 

**The problem:** 
Most of the time I endup having to change the name of uniforms and built in to make sure my shader is going to run on my website. 

 Can be really usefull when you want to add some interactive pieces in your web page or even just replace static images by interactive/generative shader.

### The way it works

I tried to stay as close as possible to the Shadertoy implementation. Basically it uses a WebGL context on a `<canvas/>` element. The module matches the size of the parent div by default. 

### Built in uniforms

Uniforms you can use in your shader.

  * `uniform float iTime` -- shader playback time (in seconds).
  * `uniform float iTimeDelta` -- Render time (in seconds).
  * `uniform int iFrame` -- Shader playback frame.
  * `uniform vec2 iResolution` -- viewport resolution (in pixels).
  * `uniform vec2 iMouse` -- The mouse position (normalized value in between -1 -> 1) this differs from the uniform Shadertoy provides you, `iMouse` is in pixel in shadertoy. 
  * `uniform sampler2D iChannel^n` -- The textures input channel you've passed; numbered in the same order as the textures passed as prop in your react component.

### How to use it

Example of React Component using ShadertoyReact:

    import React from  'react';
	import { render} from  'react-dom';
    import ShadertoyReact, { LinearFilter, NearestFilter, } from 'ShadertoyReact';

	const ExampleApp = () =>
		<Container>
			<ShadertoyReact fs={fs}/>
		</Container>;
	

Example of shader : 

    void main(void) {
	    // Normalized pixel coordinates (from 0 to 1)
	    vec2 uv = gl_FragCoord.xy/iResolution.xy;
	    
	    // Time varying pixel color
	    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
	    
	    // Output to screen
	    gl_FragColor = vec4(col,1.0);
    }

### What's next

* Add support to multi passes as Shadertoy is doing.
* Add support for Cube texture.
* Add the rest of Shadertoy built in uniforms.
* Add support for video textures.
* Add support for WebGL2.
* Add support for iChannelResolution.
* Add support for iChannelTime.
* Add uniform for phone device orientation / gyroscope based effects.

WIP WIP WIP WIP WIP
