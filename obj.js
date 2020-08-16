class Rectangle {
    constructor(width, height, vertexSrc, fragmentSrc, tex_url, tex_format, favourite) {
        this.widthP = width;
        this.heightP = height;
        this.wasUp = false;
        this.v = 0.1;
        this.g = -0.004;
        this.rotate = glMatrix.mat4.create();
        glMatrix.mat4.fromZRotation(this.rotate, Date.now());

        this.shader = new Shader(vertexSrc, fragmentSrc);
        this.texture = new Texture(tex_url, tex_format);
        this.vertices = new Float32Array([0,0,0,1,
                                        0,-this.heightP,0,0,
                                        this.widthP,-this.heightP,1,0,
                                        this.widthP,0,1,1]);
        this.indices = new Uint16Array([0,1,2,0,2,3]);
        this.stride = Float32Array.BYTES_PER_ELEMENT * 4;
        const border = Math.sqrt(Math.pow(this.widthP, 2) + Math.pow(this.heightP, 2));
        this.pos = glMatrix.vec3.fromValues(Math.random() * (2-2*border) - 1+border, -1.1, 0);

        this.vao = gl.createVertexArray();
        this.vbo = gl.createBuffer();
        this.ebo = gl.createBuffer();

        gl.bindVertexArray(this.vao);
        gl.useProgram(this.shader.ID);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        this.shader.setAttrib('vert_pos', 2, gl.FLOAT, gl.FALSE, this.stride, 0);
        this.shader.setAttrib('in_tex_pos', 2, gl.FLOAT, gl.FALSE, this.stride, Float32Array.BYTES_PER_ELEMENT*2);
        this.shader.setUniform1i('tex_data', 0);
        if (favourite) {
            this.shader.setUniform1f('color', 0.4);
        } else {
            this.shader.setUniform1f('color', 0.0);
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    }

    move() {
        this.pos[1] += this.v;
        this.v += this.g;

        if (this.pos[1] > -1 && !this.wasUp) {
            this.wasUp = true;
        } else if (this.pos[1] < -1 && this.wasUp) {
            return true;
        }
    }

    draw() {
        gl.useProgram(this.shader.ID);
        gl.bindVertexArray(this.vao);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.ID);
        const translation = glMatrix.mat4.create();
        glMatrix.mat4.fromTranslation(translation, this.pos);

        this.shader.setUniformMatrix4fv('view', translation);
        this.shader.setUniformMatrix4fv('model', this.rotate);

        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }
}