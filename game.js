const obj = new Rectangle(200, 100, vertexSrc, fragmentSrc, 'test.jpg', 'rgb', false);

const animate = () => {
    if (canvas.width != window.innerWidth || canvas.height != window.innerHeight - 4) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 4;
        gl.viewport(0, 0, canvas.width, canvas.height);
        obj.resize();
    }

    obj.move();
    obj.draw();

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);