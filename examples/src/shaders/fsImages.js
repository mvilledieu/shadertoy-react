export default `
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy;
    vec4 text = texture(iChannel0, fragCoord/iChannelResolution[0].xy + vec2(0., iTime * 0.1), sin(iTime) * 5.);
    fragColor = text;
}`;