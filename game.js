objs = [];

setInterval(() => {
    const favourite = Math.random() * 9 + 1
    objs.push(new Rectangle(0.12, 0.15, vertexSrc, fragmentSrc, 'file.png', 'rgba', favourite > 9));
}, 500);

const animate = () => {
    if (canvas.width != window.innerWidth || canvas.height != window.innerHeight - 4) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 4;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    for (obj of objs) {
        const out = obj.move();
        obj.draw();

        if (out) {
            objs = objs.filter(a => a !== obj);
        }

    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);