let objs = [];
let hp = 3;
const maxHP = hp;
let score = 0;
const hpBar = document.querySelector('.hp-fill');
const scorePointer = document.querySelector('.score');

gl.clearColor(1,1,1,1);

const gameInterval = setInterval(() => {
    const favourite = Math.random() * 9 + 1;
    const width = canvas.width < 450 ? 0.2 : canvas.width < 650 ? 0.16 : 0.12;
    const height = canvas.width < 450 ? 0.25 : canvas.width < 650 ? 0.2 : 0.15;

    objs.push(new Rectangle(width, height, vertexSrc, fragmentSrc, 'file.png', 'rgba', favourite > 7));
}, 500);

const lowerHP = () => {
    hp--;
    hpBar.style.width = `${Math.round(hp/maxHP*100)}%`;

    if (hp === 0) {
        clearInterval(gameInterval);
        objs = [];
        document.querySelector('.title').innerHTML = `Wynik: ${score}`;
        document.querySelector('.container').style.display = 'block';
    }
}

const handleMove = (e, clientLocation) => {
    let clientX = clientLocation ? eval(`e.${clientLocation}.clientX`) : e.clientX;
    let clientY = clientLocation ? eval(`e.${clientLocation}.clientY`) : e.clientY;

    for (const obj of objs) {
        if (!obj.clicked) {
            const x1 = (1+obj.pos[0])*canvas.width/2;
            const x2 = x1 + obj.widthP*canvas.width/2;
            const y1 = (1-obj.pos[1])*canvas.height/2;
            const y2 = y1 + obj.heightP*canvas.height/2;
            if (clientX > x1 && clientX < x2 && clientY > y1 && clientY < y2) {
                obj.clicked = true;
                if (obj.favourite) {
                    lowerHP();
                } else {
                    score++;
                    scorePointer.innerHTML = score;
                }
                obj.fade();
            }
        }
    }
}

document.addEventListener('mousemove', e => handleMove(e, ''));
document.addEventListener('touchmove', e => handleMove(e, 'targetTouches[0]'));

const animate = () => {
    if (canvas.width != window.innerWidth || canvas.height != window.innerHeight - 6) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 6;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    for (const obj of objs) {
        obj.move();
        obj.draw();

        if (obj.pos[1] < -1 && obj.wasUp && !obj.favourite) {
            lowerHP();
        }
    }

    objs = objs.filter(a => !a.out);

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);