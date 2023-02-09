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

function multiDraw(prg, img) {
    const posUv = genPosUv();
    const buffer = new Float32Array(posUv); 
    setAttribute(prg, 'a_position', buffer, { stride: 16 });
    setAttribute(prg, "a_uv", buffer, { stride: 16, offset: 8 });
    createTexture(img);
	gl.drawArrays(gl.TRIANGLES, 0, 6 * 4);
}

function genPosUv(){
    let posUv = [];
    let total = 4, w = 285, h = 200;
    for (let col, row, index = 0; index < total; index++) {
        col = Math.floor(index / 2);
        row = index % 2;
        let newPos = createRectPos(-400 + row * 400, -300 + col * 300, w*.4, h);
        let newUv = createRectPos(0.3, 0, .4, 1);
        for(let i = 0; i < 6; i++){
            posUv.push(newPos.shift(), newPos.shift());
            posUv.push(newUv.shift(), newUv.shift());
        }
    }
    return posUv;
}

const img = new Image();
img.onload = function(){
    const prg = createShaderProgram(vsSource, fsSource);
    gl.useProgram(prg);
    setUniform(prg, "u_resolution", "2fv", [canvas.width, canvas.height]);
    multiDraw(prg, img);
}
img.src = "./img.png";

