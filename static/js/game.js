const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gameInfoElement = document.getElementById('gameInfo');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let dx = 0;
let dy = 0;
let foodX = 15;
let foodY = 15;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gamePaused = false;
let gameSpeed = 180;

highScoreElement.textContent = highScore;

function drawGame() {
    clearCanvas();

    if (shouldUpdateGame()) {
        updateGameLogic();
    }

    renderGame();
}

function shouldUpdateGame() {
    return gameRunning && !gamePaused;
}

function updateGameLogic() {
    moveSnake();

    if (hasCollided()) {
        handleGameOver();
        return;
    }

    handleFoodInteraction();
}

function hasCollided() {
    return checkCollision();
}

function handleGameOver() {
    gameOver();
}

function handleFoodInteraction() {
    if (checkFoodCollision()) {
        incrementScore();
        updateHighScore();
        generateFood();
        adjustGameSpeed();
    } else {
        removeSnakeTail();
    }
}

function incrementScore() {
    score++;
    scoreElement.textContent = score;
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        localStorage.setItem('snakeHighScore', highScore);
    }
}

function adjustGameSpeed() {
    gameSpeed = Math.max(80, 180 - score * 3);
}

function removeSnakeTail() {
    snake.pop();
}

function renderGame() {
    drawFood();
    drawSnake();
}

function clearCanvas() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#4d0026';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
}

function drawSnake() {
    snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.fillStyle = '#ff1493';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff1493';
        } else {
            ctx.fillStyle = '#ff69b4';
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#ff69b4';
        }

        ctx.fillRect(
            segment.x * gridSize + 1,
            segment.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(
            segment.x * gridSize + 1,
            segment.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );
    });

    ctx.shadowBlur = 0;
}

function drawFood() {
    ctx.font = `${gridSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff69b4';
    ctx.fillText(
        '🧑',
        foodX * gridSize + gridSize / 2,
        foodY * gridSize + gridSize / 2
    );
    ctx.shadowBlur = 0;
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
}

function isOutOfBounds(coordinate, maxBounds) {
    return coordinate < 0 || coordinate >= maxBounds;
}

function checkWallCollision(head) {
    return isOutOfBounds(head.x, tileCount) || isOutOfBounds(head.y, tileCount);
}

function isSamePosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function checkSelfCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (isSamePosition(head, snake[i])) {
            return true;
        }
    }
    return false;
}

function checkCollision() {
    const head = snake[0];
    return checkWallCollision(head) || checkSelfCollision(head);
}

function checkFoodCollision() {
    return snake[0].x === foodX && snake[0].y === foodY;
}

function generateFood() {
    let validPosition = false;
    
    while (!validPosition) {
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        
        validPosition = !snake.some(segment => 
            segment.x === foodX && segment.y === foodY
        );
    }
}

function gameOver() {
    gameRunning = false;
    gamePaused = false;
    gameInfoElement.textContent = `GAME OVER! PONTOS: ${score} - PRESSIONE ESPAÇO`;
    gameInfoElement.style.animation = 'blink 0.5s infinite';
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    generateFood();
    gameSpeed = 180;
}

function startGame() {
    if (!gameRunning) {
        resetGame();
        gameRunning = true;
        gamePaused = false;
        gameInfoElement.textContent = 'JOGANDO';
        gameInfoElement.style.animation = 'none';
    } else {
        gamePaused = !gamePaused;
        gameInfoElement.textContent = gamePaused ? 'PAUSADO' : 'JOGANDO';
        gameInfoElement.style.animation = gamePaused ? 'blink 1.5s infinite' : 'none';
    }
}

function handleSpaceKey(e) {
    e.preventDefault();
    startGame();
}

function changeDirection(newDx, newDy, canChange) {
    if (canChange) {
        dx = newDx;
        dy = newDy;
    }
}

const CONTROLS = {
    'Space': handleSpaceKey,
    'ArrowUp': () => changeDirection(0, -1, dy === 0),
    'ArrowDown': () => changeDirection(0, 1, dy === 0),
    'ArrowLeft': () => changeDirection(-1, 0, dx === 0),
    'ArrowRight': () => changeDirection(1, 0, dx === 0)
};

document.addEventListener('keydown', (e) => {
    const key = e.code === 'Space' ? 'Space' : e.key;
    const handler = CONTROLS[key];

    if (handler) {
        if (key === 'Space') {
            handler(e);
        } else if (gameRunning && !gamePaused) {
            handler();
        }
    }
});

function gameLoop() {
    drawGame();
    setTimeout(gameLoop, gameSpeed);
}

generateFood();
gameLoop();

