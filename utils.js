const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl', { premultipliedAlpha: false });
let prg;

function createShaderProgram(vsSource, fsSource) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(vertexShader))
    };

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(fragmentShader))
    };

    const prg = gl.createProgram();
    gl.attachShader(prg, vertexShader);
    gl.attachShader(prg, fragmentShader);
    gl.linkProgram(prg);
    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(prg))
    };
    return prg;
}

function setAttribute(program, attribute, data, options) {
    const opt = { size: 2, type: gl.FLOAT, normalized: false, stride: 0, offset: 0 };
    if (options) {
        Object.assign(opt, options);
    }

    const { size, type, normalized, stride, offset } = opt;
    const attrLocation = gl.getAttribLocation(program, attribute);
    gl.enableVertexAttribArray(attrLocation);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(attrLocation, size, type, normalized, stride, offset);
}

function setUniform(program, uniform, type, ...data){
    const uniformLoc = gl.getUniformLocation(program, uniform);
    gl["uniform" + type](uniformLoc, ...data);
}

function setUniformMatrix(program, uniform, type,transpose, matrix){
    const uniformLoc = gl.getUniformLocation(program, uniform);
    gl["uniformMatrix" + type](uniformLoc, transpose, matrix);
}

function createRectPos(x, y, w, h) {
    return [
    //  X       Y
        x,      y,
        x + w,  y,
        x,      y + h,
        x,      y + h,
        x + w,  y,
        x + w,  y + h,
    ];
}

function createTexture(img) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    return texture;
}
