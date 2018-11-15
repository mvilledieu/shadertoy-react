export default `#define PI 3.14159

float circle(vec2 uv, vec2 pos, float radius, float blur)
{
    return 1.0 - smoothstep(radius, radius + blur + 0.001, length(uv - pos));
}

float defaultBlur = 0.005;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from -1 to 1)
    vec2 uv = fragCoord/iResolution.xy * 2.0 - 1.0;
    uv.y /= iResolution.x / iResolution.y;

    // Time varying pixel color
    vec3 psych = 0.5 + 0.5*cos(iTime+(fragCoord/iResolution.xy).xy.xyx+vec3(0.01,2,4));
    
       
    // ClockFace   
    float circles = circle(uv, vec2(0.0, 0.0), 0.2, defaultBlur);
    // Time
    float seconds = iDate.w / 60.0 * PI * 2.0;
    float minutes = iDate.w / 3600.0 * PI*2.0;
    float hours = iDate.w / 216000.0 * PI*2.0;
    
    // seconds hand
    circles += circle(uv, vec2(sin(seconds)/5.0, cos(seconds)/5.0), 0.025, defaultBlur);
    
    // Minutes hand
    circles += circle(uv, vec2(sin(minutes)/3.0, cos(minutes)/3.0), 0.04, defaultBlur);
    circles += circle(uv, vec2(sin(minutes)/2.5, cos(minutes)/2.5), 0.04, defaultBlur);
    
    // hours hand
    
    circles += circle(uv, vec2(sin(hours)/5.0, cos(minutes)/5.0), 0.03, defaultBlur);
    
	
    // using circle as a mask
    vec4 col = mix(vec4(psych,1.0), vec4( 1.0), circles);
    
    vec4 justCircle = vec4(vec3(circles), 1.0);
    
    // Output to screen
    fragColor = col;
}

`;