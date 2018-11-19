export default `
#define PI 3.1415926535898
#define DEGTORAD PI / 180.

// from https://www.shadertoy.com/view/XlXBRn

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

float map(vec3 p)
{
    vec3 q = fract(p)*2.-1.;
    return length(q)-0.25;
}

float trace(vec3 origin, vec3 ray)
{
    float t=0.;
    for(int i=0; i<32; i++){
        vec3 p = origin + t*ray;
        float d=map(p);
        t += d*0.5;
    }
    return t;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
    uv = uv*2. -1.;
    uv.x *= iResolution.x/iResolution.y;

    //code ported over to glsl from https://dev.opera.com/articles/w3c-device-orientation-usage/
    mat3 rotationMatrix = getBaseRotationMatrix(vec3(iDeviceOrientation.x, -iDeviceOrientation.y, -iDeviceOrientation.z)); // R
	//mat3 screenTransform = getScreenTransformationMatrix( iDeviceOrientation.w ); // r_s
    //mat3 screenAdjustedMatrix = rotationMatrix * screenTransform; // R_s
    mat3 screenAdjustedMatrix = rotationMatrix;
	mat3 worldTransform = getWorldTransformationMatrix(); // r_w
    mat3 finalMatrix = screenAdjustedMatrix * worldTransform; // R_w
    
    vec3 ray = normalize(vec3(uv,1.)) * finalMatrix; //Multiply the raydirection by our device rotation matrix.
    
    //vec3 ori = vec3(0.,0.,-3.);
    vec3 ori = vec3(0., 0., iTime * 2.);
    float t = trace(ori, ray);
    
    float fog = 1.0/(1.0+t*t*0.1);
    vec3 color = vec3(fog);
    
	fragColor = vec4(color,1.0);
}

`;