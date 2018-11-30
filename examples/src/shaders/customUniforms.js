export default `
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	fragColor = vec4(sin(uTest), 0., 0., 1.);
}`;