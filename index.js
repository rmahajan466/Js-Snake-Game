const board = document.getElementById('gameBoard');
const scoreElement = document.getElementById('score');
const controls = document.getElementById('controls');
const overlay = document.getElementById('overlay');
const gameOverMessage = document.getElementById('gameOverMessage');
const playButton = document.getElementById(playButton);

const boardSize = 400;
const blockSize = 20;
let snake = [{x: 100, y:100}];
let direction = 'ArrowRight';
let food = {x: 200, y:200};
let score = 0;
let interval;
let gameActive = false;

function createSnake() {
    document.querySelectorAll('.snake').forEach(el => el.remove());
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x}px`;
        snakeElement.style.top = `${segment.y}px`;
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })
}

function createFood() {
    let existingFood = document.querySelector('.food');
    if (existingFood){
        existingFood.remove()
    }

    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    foodElement.setAttribute('id', 'food');
    board.appendChild(foodElement);
}

function generateFood(){
    let x,y;
    do {
        x = Math.floor(Math.random() * ((boardSize/blockSize) - 2) + 1) * blockSize;
        y = Math.floor(Math.random() * ((boardSize/blockSize) - 2) + 1) * blockSize;
    } while (snake.some(segment => segment.x === x && segment.y === y));

    return {x,y}
}

function moveSnake(){
    const head = { ...snake(0) };

    switch (direction) {
        case 'ArrowUp':
            head.y -= blockSize;
            break;

        case 'ArrowRight':
            head.x += blockSize;
            break;

        case 'ArrowDown':
            head.y += blockSize;
            break;

        case 'ArrowLeft':
            head.x -= blockSize;
            break;
    }

    if(head.x < 0 || head.y < 0 || head.x >=boardSize || head.y >= blockSize ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameActive = false;
        overlay.classList.toggle('hidden');
        controls.classList.toggle('active');
        gameOverMessage.textContent = 'Game Over';
        playButton.textContent = "Restart";
        return;
    }

    snake.unshift(head);

    if(head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = `Score: {score}`;
        food = generateFood();
    } else {
        snake.pop();
    }

    createFood();
    createSnake();

}

function startGame() {
    snake = [{x:100, y:100}];
    direction = 'ArrowRight';
    food = generateFood();
    score = 0;
    gameActive = true;
    scoreElement.textContent = `Score: ${score}`;
    overlay.classList.toggle('hidden');
    controls.classList.toggle('active');
    gameOverMessage.textContent = '';
    playButton.textContent = "Play";
    // clearInterval(interval);
    // interval = setInterval(moveSnake, 400);
    createSnake();
    createFood();
}
