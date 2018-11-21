export default `
#define PI 3.1415926535898
#define DEGTORAD PI / 180.

// This was my shader for the shader showdown at Outline demoparty 2018 in Nederland.
// Shader showdown is a live-coding competition where two participants are
// facing each other during 25 minutes.
// (Round 1)

// I don't have access to the code I typed at the event, so it might be
// slightly different.

// Original algorithm on shadertoy from fb39ca4: https://www.shadertoy.com/view/4dX3zl
// I used the implementation from shane: https://www.shadertoy.com/view/MdVSDh

// Thanks to shadertoy community & shader showdown paris.

// This is under CC-BY-NC-SA (shadertoy default licence)

mat2 r2d(float a) {
	float c = cos(a), s = sin(a);
	return mat2(c, s, -s, c);
}

vec2 path(float t) {
	float a = sin(t*.2 + 1.5), b = sin(t*.2);
	return vec2(2.*a, a*b);
}

float g = 0.;
float de(vec3 p) {
	p.xy -= path(p.z);

	float d = -length(p.xy) + 4.;// tunnel (inverted cylinder)

	p.xy += vec2(cos(p.z + iTime)*sin(iTime), cos(p.z + iTime));
	p.z -= 6. + iTime * 6.;
	d = min(d, dot(p, normalize(sign(p))) - 1.); // octahedron (LJ's formula)
	// I added this in the last 1-2 minutes, but I'm not sure if I like it actually!

	// Trick inspired by balkhan's shadertoys.
	// Usually, in raymarch shaders it gives a glow effect,
	// here, it gives a colors patchwork & transparent voxels effects.
	g += .015 / (.01 + d * d);
	return d;
}

// helper converting your euler values to a rotation matrix.
// code ported over to glsl from https://dev.opera.com/articles/w3c-device-orientation-usage/
mat3 getBaseRotationMatrix( vec3 euler ) {
    float _x = euler.y * DEGTORAD;
    float _y = euler.z * DEGTORAD;
    float _z = euler.x * DEGTORAD;
  
    float cX = cos( _x );
    float cY = cos( _y );
    float cZ = cos( _z );
  
    float sX = sin( _x );
    float sY = sin( _y );
    float sZ = sin( _z );
  
    float m11 = cZ * cY - sZ * sX * sY;
    float m12 = - cX * sZ;
    float m13 = cY * sZ * sX + cZ * sY;
  
    float m21 = cY * sZ + cZ * sX * sY;
    float m22 = cZ * cX;
    float m23 = sZ * sY - cZ * cY * sX;
  
    float m31 = - cX * sY;
    float m32 = sX;
    float m33 = cX * cY;
  
    return mat3(
      m11,    m12,    m13,
      m21,    m22,    m23,
      m31,    m32,    m33
    );
}

mat3 getScreenTransformationMatrix( float screenOrientation ) {
	float orientationAngle = screenOrientation * DEGTORAD;

	float cA = cos( orientationAngle );
	float sA = sin( orientationAngle );

	// Construct our screen transformation matrix
	return mat3(
		cA,    -sA,    0,
		sA,    cA,     0,
		0,     0,      1
	);
}

mat3 getWorldTransformationMatrix() {
	float x = 90. * DEGTORAD;

	float cA = cos( x );
	float sA = sin( x );

	return mat3 (
		1,     0,    0,
		0,     cA,   -sA,
		0,     sA,   cA
	);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord / iResolution.xy - .5;
	uv.x *= iResolution.x / iResolution.y;

	//code ported over to glsl from https://dev.opera.com/articles/w3c-device-orientation-usage/
    mat3 rotationMatrix = getBaseRotationMatrix(vec3(-iDeviceOrientation.x, -iDeviceOrientation.y, iDeviceOrientation.z)); // R
	//mat3 screenTransform = getScreenTransformationMatrix( iDeviceOrientation.w ); // r_s
    //mat3 screenAdjustedMatrix = rotationMatrix * screenTransform; // R_s
    mat3 screenAdjustedMatrix = rotationMatrix;
	mat3 worldTransform = getWorldTransformationMatrix(); // r_w
	mat3 finalMatrix = screenAdjustedMatrix * worldTransform; // R_w
	

	float dt = iTime * 6.;
	vec3 ro = vec3(0, 0, -5. + dt);
	vec3 ta = vec3(0, 0, dt);

	//ro.xy += path(ro.z);
	//ta.xy += path(ta.z);

	vec3 fwd = normalize(ta - ro);
	vec3 right = cross(fwd, vec3(0, 1, 0));
	vec3 up = cross(right, fwd);
	
	vec3 rd = normalize(fwd + uv.x*right + uv.y*up) * finalMatrix;

	// rd.xy *= r2d(sin(-ro.x / 3.14)*.3);

	// Raycast in 3d to get voxels.
	// Algorithm fully explained here in 2D (just look at dde algo):
	// http://lodev.org/cgtutor/raycasting.html
	// Basically, tracing a ray in a 3d grid space, and looking for 
	// each voxel (think pixel with a third dimension) traversed by the ray.
	vec3 p = floor(ro) + .5;
	vec3 mask;
	vec3 drd = 1. / abs(rd);
	rd = sign(rd);
	vec3 side = drd * (rd * (p - ro) + .5);

	float t = 0., ri = 0.;
	for (float i = 0.; i < 1.; i += .01) {
		ri = i;

		/*
		// sphere tracing algorithm (for comparison)
		p = ro + rd * t;
		float d = de(p);
		if(d<.001) break;
		t += d;
		*/

		if (de(p) < 0.) break;// distance field
							  // we test if we are inside the surface

		mask = step(side, side.yzx) * step(side, side.zxy);
		// minimum value between x,y,z, output 0 or 1

		side += drd * mask;
		p += rd * mask;
	}
	t = length(p - ro);

	vec3 c = vec3(1) * length(mask * vec3(1., .5, .75));
	c = mix(vec3(.2, .2, .7), vec3(.2, .1, .2), c);
	c += g * .4;
	c.r += sin(iTime)*.2 + sin(p.z*.5 - iTime * 6.);// red rings
	c = mix(c, vec3(.2, .1, .2), 1. - exp(-.001*t*t));// fog

	fragColor = vec4(c, 1.0);
}`;