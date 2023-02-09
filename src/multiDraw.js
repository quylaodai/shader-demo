const vsSource = `
attribute vec2 a_position;
attribute vec2 a_uv;

uniform vec2 u_resolution;
varying vec2 v_uv;

void main() {
    vec2 clipSpace = a_position / u_resolution * 2.0;
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

function drawImage(prg, img, x, y, w, h) {
    const rectanglePos = createRectPos(x, y, w, h);
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
    drawImage(prg, img, 0, 0, 285, 200);
    drawImage(prg, img, -400, -300, 285, 200);
}
img.src = "./img.png";

