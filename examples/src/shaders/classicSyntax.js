export default `
void main(void){
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    gl_FragColor = vec4(uv, 0., 1.);
}
`;