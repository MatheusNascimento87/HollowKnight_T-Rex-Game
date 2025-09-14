const knight = document.querySelector('.knight');
const enemy = document.querySelector('.enemy');
const scoreEl = document.getElementById('score');
const gameOverEl = document.getElementById('game-over');

let score = 0;
let scoreInterval;
let loop;
let isGameOver = false;

const jump = () => {
    if (!isGameOver) {
        knight.classList.add('jump');
        setTimeout(() => {
            knight.classList.remove('jump');
        }, 650);
    }
}

function startGame() {
    enemy.style.animation = 'animacao-enemy 1.5s infinite linear';
    knight.src = './images/hollow-knight-running.gif';
    knight.style.width = '150px';
    knight.style.marginLeft = '0px';
    knight.style.animation = '';
    knight.style.bottom = '0px';
    gameOverEl.style.display = 'none';
    score = 0;
    scoreEl.innerText = `Score: ${score}`;
    isGameOver = false;

    loop = setInterval(() => {
        const posicaoEnemy = enemy.offsetLeft;
        const posicaoKnight = Number(window.getComputedStyle(knight).bottom.replace('px', ''));

        if (posicaoEnemy <= 120 && posicaoEnemy > 0 && posicaoKnight < 80) {
            gameOver();
        }
    }, 10);

    scoreInterval = setInterval(() => {
        score++;
        scoreEl.innerText = `Score: ${score}`;
    }, 100);
}

function gameOver() {
    clearInterval(loop);
    clearInterval(scoreInterval);

    enemy.style.animation = 'none';
    knight.style.animation = 'none';
    knight.src = './images/hollow-knight-death.gif';
    knight.style.marginLeft = '50px';

    isGameOver = true;

    gameOverEl.innerHTML = `<h1>Game Over</h1>
                            <p>Pontos: ${score}</p>
                            <p>Pressione "R" para reiniciar</p>`;
    gameOverEl.style.display = 'block';
}

document.addEventListener('keydown', (e) => {
    if (isGameOver && (e.key === 'r' || e.key === 'R')) {
        startGame();
    } else if (!isGameOver) {
        jump();
    }
});

startGame();
