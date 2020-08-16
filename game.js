let objs = [];
let hp = 3;
const maxHP = hp;
let score = 0;
let mouseClick = false;
const hpBar = document.querySelector('.hp-fill');
const scorePointer = document.querySelector('.score');

setInterval(() => {
    const favourite = Math.random() * 9 + 1
    objs.push(new Rectangle(0.12, 0.15, vertexSrc, fragmentSrc, 'file.png', 'rgba', favourite > 9));
}, 500);

document.addEventListener('mousedown', () => mouseClick = true);
document.addEventListener('mouseup', () => mouseClick = false);
document.addEventListener('mousemove', e => {
    if (mouseClick) {
        for (const obj of objs) {
            if (!obj.clicked) {
                const x1 = (1+obj.pos[0])*canvas.width/2;
                const x2 = x1 + obj.widthP*canvas.width/2;
                const y1 = (1-obj.pos[1])*canvas.height/2;
                const y2 = y1 + obj.heightP*canvas.height/2;
    
                if (e.clientX > x1 && e.clientX < x2 && e.clientY > y1 && e.clientY < y2) {
                    obj.clicked = true;
                    if (obj.favourite) {
                        hp--;
                        hpBar.style.width = `${Math.round(hp/maxHP*100)}%`;
                    } else {
                        score++;
                        scorePointer.innerHTML = score;
                    }
                    obj.fade();
                }
            }
        }
    }
});

const animate = () => {
    if (canvas.width != window.innerWidth || canvas.height != window.innerHeight - 4) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 4;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    for (const obj of objs) {
        obj.move();
        obj.draw();
    }

    objs = objs.filter(a => !a.out);

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);