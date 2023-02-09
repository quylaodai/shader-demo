const vsSource = `
attribute vec2 a_position;
attribute vec2 a_uv;

uniform vec2 u_resolution;
uniform mat3 u_matrix;

varying vec2 v_uv;

void main() {
    vec2 position = (u_matrix * vec3(a_position, 1.0)).xy;
    vec2 clipSpace = position / u_resolution * 2.0;
    gl_Position = vec4(clipSpace, 0, 1);
    v_uv = a_uv;
}`;

const fsSource = `
precision highp float;

uniform sampler2D mainTexture;
varying vec2 v_uv;

void main() {
    gl_FragColor = texture2D(mainTexture, v_uv);
    // gl_FragColor = vec4(1,0,0,1);
}`;

function drawImage(prg, img, transform){
    let matrix = getMatrix(transform);
    setUniformMatrix(prg, "u_matrix", "3fv", 0, matrix);

    const rectanglePos = createRectPos(0, 0, 285, 200);
	const posBuffer = new Float32Array(rectanglePos); 
	setAttribute(prg, 'a_position', posBuffer);

    const uv = createRectPos(0, 0, 1, 1);
    const uvBuffer = new Float32Array(uv); 
    setAttribute(prg, "a_uv", uvBuffer);

    createTexture(img);
    
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function getMatrix(transform){
    const { x, y, scaleX, scaleY, angle } = transform;
    let rad = angle / 180 * Math.PI;
    // Compute the matrices
    const translationMatrix = m3.translation(x, y);
    const scaleMatrix = m3.scaling(scaleX, scaleY);
    const rotationMatrix = m3.rotation(rad);

    // Multiply the matrices.
    let matrix = m3.multiply(translationMatrix, rotationMatrix);
    matrix = m3.multiply(matrix, scaleMatrix);
    return matrix;
}

const img = new Image();
img.onload = function(){
    const prg = createShaderProgram(vsSource, fsSource);
    gl.useProgram(prg);
    setUniform(prg, "u_resolution", "2fv", [canvas.width, canvas.height]);
    let transform = { x: -300, y: -150, angle: 10, scaleX: 2, scaleY: 2 };
    drawImage(prg, img, transform);
}
img.src = "./img.png";


