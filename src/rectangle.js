const vsSource = `
attribute vec2 a_position;

uniform vec2 u_resolution;

void main() {
   vec2 clipSpace = a_position / u_resolution * 2.0;
   gl_Position = vec4(clipSpace, 0, 1);
}`;

const fsSource = `
precision highp float;

void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`;

function start(){
	const prg = createShaderProgram(vsSource, fsSource);
    gl.useProgram(prg);
    setUniform(prg, "u_resolution", "2fv", [canvas.width, canvas.height]);

    const rectanglePos = createRectPos(0, 0, 285, 200);
	const posBuffer = new Float32Array(rectanglePos); 
	setAttribute(prg, 'a_position', posBuffer);
    
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

start();
