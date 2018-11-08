export default `
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy;
    vec4 text1 = texture2D(iChannel1, uv * 2.);
    vec4 text = texture2D(iChannel0, uv + sin(iTime) + text1.rg);

    fragColor = text;
}`;