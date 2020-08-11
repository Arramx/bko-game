class Obj {
    constructor(vertices, indices, vertexSrc, fragmentSrc, tex_url, tex_format) {
        this.shader = new Shader(vertexSrc, fragmentSrc);
        this.texture = new Texture(tex_url, tex_format);
        this.vertices = new Float32Array(vertices);
        this.indices = new Uint16Array(indices);
        this.stride = Float32Array.BYTES_PER_ELEMENT * 4;
        this.pos = glMatrix.mat4.create();
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

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    }
    
    draw() {
        gl.useProgram(this.shader.ID);
        gl.bindVertexArray(this.vao);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.ID);

        this.shader.setUniformMatrix4fv('view', this.pos);

        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }
}