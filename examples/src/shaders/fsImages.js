export default `
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy;
    vec4 text = texture2D(iChannel0, uv + sin(iTime));
    vec4 text1 = texture2D(iChannel1, uv + text.rg);
    vec4 text2 = texture2D(iChannel2, uv + (fragCoord/iChannelResolution[0].xy));

    fragColor = mix(mix(text, text1, 0.8), text2, sin(iTime));
}`;