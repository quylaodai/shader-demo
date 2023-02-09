const vsSource = `
attribute vec4 a_position;
attribute vec3 a_color;

varying vec3 v_color; 

void main() {
    gl_Position = a_position;
    v_color = a_color;
}`;

const fsSource = `
precision highp float;

varying vec3 v_color;

void main() {
    gl_FragColor = vec4(v_color, 1.0);
}`;

function start(){
	const prg = createShaderProgram(vsSource, fsSource);
    gl.useProgram(prg);

    const trianglePos = [
    //  X   Y
        0,  0.7,
        0.5, -0.7,
        -0.5, -0.7,
    ]
	const posBuffer = new Float32Array(trianglePos); 
	setAttribute(prg, 'a_position', posBuffer);

    const colors = [
        1, 0, 0, // red
        0, 1, 0, // green
        0, 0, 1 // blue
    ]
	const colorBuffer = new Float32Array(colors);
    setAttribute(prg, 'a_color', colorBuffer, { size: 3 });

	gl.drawArrays(gl.TRIANGLES, 0, 3);
}

start();
