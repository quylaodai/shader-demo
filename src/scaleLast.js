const vsSource = `
attribute vec2 a_position;
attribute vec2 a_uv;

uniform vec2 u_resolution;
uniform vec2 u_translation;
uniform vec2 u_rotation;
uniform vec2 u_scale;

varying vec2 v_uv;

vec2 rotate(vec2 pos,vec2 rotation){
    return vec2(
        pos.x * rotation.x - pos.y * rotation.y,
        pos.y * rotation.x + pos.x * rotation.y
    );
}

void main() {
    vec2 rotatePos = rotate(a_position, u_rotation);
    vec2 tranPos = rotatePos + u_translation;
    vec2 scalePos = tranPos * u_scale;

    vec2 clipSpace = scalePos / u_resolution * 2.0;
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
    const { x, y, scaleX, scaleY, angle } = transform;
    let rad = angle / 180 * Math.PI;
    setUniform(prg, "u_scale", "2fv", [scaleX, scaleY]);
    setUniform(prg, "u_rotation", "2fv", [Math.cos(rad), Math.sin(rad)]);
    setUniform(prg, "u_translation", "2fv", [x, y]);

    const rectanglePos = createRectPos(0, 0, 285, 200);
	const posBuffer = new Float32Array(rectanglePos); 
	setAttribute(prg, 'a_position', posBuffer);

    const uv = createRectPos(0, 0, 1, 1);
    const uvBuffer = new Float32Array(uv); 
    setAttribute(prg, "a_uv", uvBuffer);

    createTexture(img);
    
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

const img = new Image();
img.onload = function(){
    const prg = createShaderProgram(vsSource, fsSource);
    gl.useProgram(prg);
    setUniform(prg, "u_resolution", "2fv", [canvas.width, canvas.height]);
    let transform = { x: -300, y: -150, angle: -10, scaleX: 2, scaleY: 2 };
    drawImage(prg, img, transform);
}
img.src = "./img.png";


