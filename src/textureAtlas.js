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
    let pos = [], uv = [];
    let total = 4;
    for (let col, row, index = 0; index < total; index++) {
        col = index % 2;
        row = Math.floor(index / 2);
        let newRect = createRectPos(-400 + col * 400, -300 + row * 300, 285, 100);
        pos = pos.concat(newRect);
        uv = uv.concat(createRectPos(0, 0, 1, .5));
    }
    const posBuffer = new Float32Array(pos); 
	setAttribute(prg, 'a_position', posBuffer);

    const uvBuffer = new Float32Array(uv); 
    setAttribute(prg, "a_uv", uvBuffer);

    createTexture(img);
    
	gl.drawArrays(gl.TRIANGLES, 0, 6 * total);
}

function drawOnce(){
    
}

const img = new Image();
img.onload = function(){
    const prg = createShaderProgram(vsSource, fsSource);
    gl.useProgram(prg);
    setUniform(prg, "u_resolution", "2fv", [canvas.width, canvas.height]);
    multiDraw(prg, img);
}
img.src = "./img.png";

