class Texture {
    constructor(url, format) {
        this.ID = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.ID);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MINMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        this.image = new Image()
        this.image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, this.ID);
            gl.texImage2D(gl.TEXTURE_2D, 0, eval(`gl.${format.toUpperCase()}`),
            this.image.width, this.image.height, 0, eval(`gl.${format.toUpperCase()}`), gl.UNSIGNED_BYTE, image);
            gl.generateMinmap(gl.TEXTURE_2D);
        }
        this.image.src = url;
    }
}