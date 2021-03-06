const canvas = document.querySelector('#draw');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 6;
const gl = canvas.getContext('webgl2')

const vertexSrc = `# version 300 es
precision mediump float;

in vec2 vert_pos;
in vec2 in_tex_pos;
uniform mat4 view;

out vec2 tex_pos;

void main() {
    gl_Position = view * vec4(vert_pos, 0, 1);
    tex_pos = in_tex_pos;
}
`;

const fragmentSrc = `# version 300 es
precision mediump float;

in vec2 tex_pos;
uniform sampler2D tex_data;
uniform float color;
uniform float opacity;

out vec4 tex;

void main() {
    tex = mix(vec4(1,1,1,1), mix(texture(tex_data, tex_pos), vec4(0,1,0,1), color), opacity);
}
`;