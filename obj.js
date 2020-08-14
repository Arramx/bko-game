class Rectangle {
    constructor(width, height, vertexSrc, fragmentSrc, tex_url, tex_format, favourite) {
        this.width = width;
        this.height = height;
        this.widthP = this.width/canvas.width/2;
        this.heightP = this.height/canvas.height/2;
        this.shader = new Shader(vertexSrc, fragmentSrc);
        this.texture = new Texture(tex_url, tex_format);
        this.vertices = new Float32Array([-this.widthP,this.heightP,0,1,
                                        -this.widthP,-this.heightP,0,0,
                                        this.widthP,-this.heightP,1,0,
                                        this.widthP,this.heightP,1,1]);
        this.indices = new Uint16Array([0,1,2,0,2,3]);
        this.stride = Float32Array.BYTES_PER_ELEMENT * 4;
        this.pos = glMatrix.mat4.create();
        glMatrix.mat4.fromTranslation(this.pos, glMatrix.vec3.fromValues(Math.random()*(2-this.widthP)-1, -1.1, 0));
        this.v = 0.1;
        this.g = -0.004;

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
    
    resize() {
        this.widthP = this.width/canvas.width/2;
        this.heightP = this.height/canvas.height/2;
        this.vertices = new Float32Array([-this.widthP,this.heightP,0,1,
                                        -this.widthP,-this.heightP,0,0,
                                        this.widthP,-this.heightP,1,0,
                                        this.widthP,this.heightP,1,1]);
        
        gl.bindVertexArray(this.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
    }

    move() {
        glMatrix.mat4.translate(this.pos, this.pos, glMatrix.vec3.fromValues(0,this.v,0));
        this.v += this.g;
    }

    draw() {
        gl.useProgram(this.shader.ID);
        gl.bindVertexArray(this.vao);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.ID);
        const rotate = glMatrix.mat4.create();
        glMatrix.mat4.fromZRotation(rotate, Date.now()/2);

        this.shader.setUniformMatrix4fv('view', this.pos);
        this.shader.setUniformMatrix4fv('model', rotate);

        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }
}