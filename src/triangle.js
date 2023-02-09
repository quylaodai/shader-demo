const vsSource = `
attribute vec4 a_position;
void main() {
    gl_Position = a_position;
}`;

const fsSource = `
precision highp float;

uniform vec4 u_color;
void main() {
    gl_FragColor = u_color;
}`;

function drawTriangle(){
	const prg = createShaderProgram(vsSource, fsSource);
	gl.useProgram(prg);

	const trianglePos = [
		0, 0.7,
		0.5, -0.7,
		-0.5, -0.7,
	]
	const vertexPositions = new Float32Array(trianglePos); // buffer data 
	setAttribute(prg, 'a_position', vertexPositions);

	setUniform(prg, 'u_color', '4fv', [1, 0, 0, 1]);

	gl.drawArrays(gl.TRIANGLES, 0, 3);
}

drawTriangle();
