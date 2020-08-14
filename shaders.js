class Shader {
    constructor(vertSrc, fragSrc) {
        this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
        this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(this.vertexShader, vertSrc);
        gl.shaderSource(this.fragmentShader, fragSrc);

        gl.compileShader(this.vertexShader);
        if (!gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS)) {
            console.error('Error compiling vertex shader', gl.getShaderInfoLog(this.vertexShader));
        }

        gl.compileShader(this.fragmentShader);
        if (!gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Error compiling vertex shader', gl.getShaderInfoLog(this.fragmentShader));
        }

        this.ID = gl.createProgram()
        gl.attachShader(this.ID, this.vertexShader);
        gl.attachShader(this.ID, this.fragmentShader);
        gl.linkProgram(this.ID);

        if (!gl.getProgramParameter(this.ID, gl.LINK_STATUS)) {
            console.error('Error linking program', gl.getProgramInfoLog(this.ID));
        }

        gl.validateProgram(this.ID);
        if (!gl.getProgramParameter(this.ID, gl.VALIDATE_STATUS)) {
            console.error('Error validating program', gl.getProgramInfoLog(this.ID));
        }
    }

    setAttrib(name, size, type, normalized, stride, offset) {
        const index = gl.getAttribLocation(this.ID, name);
        gl.enableVertexAttribArray(index);
        gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
    }

    setUniform1i(name, val) {
        gl.uniform1i(gl.getUniformLocation(this.ID, name), val);
    }

    setUniform1f(name, val) {
        gl.uniform1f(gl.getUniformLocation(this.ID, name), val);
    }

    setUniformMatrix4fv(name, val) {
        gl.uniformMatrix4fv(gl.getUniformLocation(this.ID, name), gl.FALSE, val);
    }
}