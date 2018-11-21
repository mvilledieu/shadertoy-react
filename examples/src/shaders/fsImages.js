export default `
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy;
    vec4 text = texture(iChannel0, fragCoord/iChannelResolution[0].xy + vec2(0., iTime * 0.1));
    vec4 text1 = texture(iChannel1, fragCoord/iChannelResolution[1].xy);
    fragColor = mix(text, text1, abs(sin(iTime)));
}`;