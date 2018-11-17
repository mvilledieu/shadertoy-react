export default `

#define PI 3.1415926535898

const float eps = 0.005;
const int maxIterations = 128;
const float stepScale = 0.5;
const float stopThreshold = 0.005; 
float sphere(in vec3 p, in vec3 centerPos, float radius) {

	return length(p-centerPos) - radius;
}

float sinusoidBumps(in vec3 p){

    return sin(p.x*16.+iTime*0.57)*cos(p.y*16.+iTime*2.17)*sin(p.z*16.-iTime*1.31) * 2.;
}

float scene(in vec3 p) {

	return sphere(p, vec3(0., 0. , 2.), 1.) + 0.04*sinusoidBumps(p);
}

vec3 getNormal(in vec3 p) {
	return normalize(vec3(
		scene(vec3(p.x+eps,p.y,p.z))-scene(vec3(p.x-eps,p.y,p.z)),
		scene(vec3(p.x,p.y+eps,p.z))-scene(vec3(p.x,p.y-eps,p.z)),
		scene(vec3(p.x,p.y,p.z+eps))-scene(vec3(p.x,p.y,p.z-eps))
	));
}

float rayMarching( vec3 origin, vec3 dir, float start, float end ) {

	float sceneDist = 1e4;
	float rayDepth = start; // Ray depth. "start" is usually zero, but for various reasons, you may wish to start the ray further away from the origin.
	for ( int i = 0; i < maxIterations; i++ ) {

		sceneDist = scene( origin + dir * rayDepth ); // Distance from the point along the ray to the nearest surface point in the scene.

      
		if (( sceneDist < stopThreshold ) || (rayDepth >= end)) {
			break;
		}
	
		rayDepth += sceneDist * stepScale;

	}
	if ( sceneDist >= stopThreshold ) rayDepth = end;
	else rayDepth += sceneDist;

	return rayDepth;
}

vec3 rotateByQuaternion(vec3 v, vec4 q)
{
    // Extract the vector part of the quaternion
    vec3 u = q.xyz;

    // Extract the scalar part of the quaternion
    float s = q.w;

    // Do the math
    return 2.0 * dot(u, v) * u
          + (s*s - dot(u, u)) * v
          + 2.0 * s * cross(u, v);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

    vec2 aspect = vec2(iResolution.x/iResolution.y, 1.0);
	vec2 screenCoords = (2.0*fragCoord.xy/iResolution.xy - 1.0)*aspect;

	vec3 lookAt = vec3(0., 0., -1.);  // This is the point you look towards, or at.
	vec3 camPos = vec3(0., 0., -3.); // This is the point you look from, or camera you look at the scene through. Whichever way you wish to look at it.

    // Camera setup.
    vec3 forward = normalize(lookAt-camPos); // Forward vector.
    vec3 right = normalize(vec3(forward.z, 0., -forward.x )); // Right vector... or is it left? Either way, so long as the correct-facing up-vector is produced.
    vec3 up = normalize(cross(forward,right)); // Cross product the two vectors above to get the up vector.

    float FOV = 0.25;

    // ro - Ray origin. Every ray starts from this point, then is cast in the rd direction.
    vec3 ro = camPos;
    // rd - Ray direction. This is our one-unit-long direction ray.
    vec3 rd = normalize(forward + FOV * screenCoords.x * right + FOV * screenCoords.y * up) * iDeviceOrientation;

	// The screen's background color.
    vec3 bgcolor = vec3(1.,0.97,0.92)*0.15;

    float bgshade = (1.0-length(vec2(screenCoords.x/aspect.x, screenCoords.y+0.5) )*0.8);
	bgcolor *= bgshade; //Shade the background a little.


	// Ray marching.
	const float clipNear = 0.0;
	const float clipFar = 100.0;
	float dist = rayMarching(ro, rd, clipNear, clipFar ); // See the function itself for an explanation.
	if ( dist >= clipFar ) {
	    // I prefer to do it this way in order to avoid an if-statement below, but I honestly couldn't say whether it's more
	    // efficient. It feels like it would be. Does that count? :)
	    fragColor = vec4(bgcolor, 1.0);
	    return;
		//discard; // If you want to return without rendering anything, I think.
	}

	vec3 sp = ro + rd*dist;

	vec3 surfNormal = getNormal(sp);
	vec3 lp = vec3(1.5*sin(iTime*0.5), 0.75+0.25*cos(iTime*0.5), -1.0);
	vec3 ld = lp-sp;
	vec3 lcolor = vec3(1.,0.97,0.92);

	float len = length( ld ); // Distance from the light to the surface point.
	ld /= len; // Normalizing the light-to-surface, aka light-direction, vector.
	float lightAtten = min( 1.0 / ( 0.25*len*len ), 1.0 ); // Keeps things between 0 and 1.

	vec3 ref = reflect(-ld, surfNormal);
	vec3 sceneColor = vec3(0.0);

	
	vec3 objColor = vec3(2.0, 1.6, 2.8);
	float bumps =  sinusoidBumps(sp);
    objColor = clamp(objColor*0.8-vec3(0.4, 0.2, 0.1)*bumps, 0.0, 1.0);

	float ambient = .1; //The object's ambient property. You can also have a global and light ambient property, but we'll try to keep things simple.
	float specularPower = 16.0; // The power of the specularity. Higher numbers can give the object a harder, shinier look.
	float diffuse = max( 0.0, dot(surfNormal, ld) ); //The object's diffuse value, which depends on the angle that the light hits the object.
    
	float specular = max( 0.0, dot( ref, normalize(camPos-sp)) );
	specular = pow(specular, specularPower); // Ramping up the specular value to the specular power for a bit of shininess.

	sceneColor += (objColor*(diffuse*0.8+ambient)+specular*0.5)*lcolor*lightAtten;

	fragColor = vec4(clamp(sceneColor, 0.0, 1.0), 1.0);
}
`;