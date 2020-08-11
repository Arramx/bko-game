class Texture {
    constructor(url, format) {
        this.ID = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.ID);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255,255,255,255]));

        const formatVal = eval(`gl.${format.toUpperCase()}`);

        const image = new Image();
        image.src = url;
        image.addEventListener('load', () => {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.bindTexture(gl.TEXTURE_2D, this.ID);
            gl.texImage2D(gl.TEXTURE_2D, 0, formatVal, formatVal, gl.UNSIGNED_BYTE, image);
        })
    }
}