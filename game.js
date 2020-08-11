const animate = () => {
    if (canvas.width != window.innerWidth || canvas.height != window.innerHeight - 4) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 4;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);