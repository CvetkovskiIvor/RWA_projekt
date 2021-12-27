const board_border = 'black';
const board_background = 'lightblue';
const snake_col = 'lightgreen';
const snake_border = 'darkgreen';

let snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 },
    { x: 140, y: 200 },
    { x: 120, y: 200 }
]

let score = 0;
let lastScore = score;

createCookie("score", score);

let game_over = "";
// True if changing direction
let changing_direction = false;
// Horizontal velocity
let food_x;
let food_y;
let dx = 20;
// Vertical velocity
let dy = 0;

// Get the canvas element
const gameCanvas = document.getElementById("gameCanvas");
// Return a two dimensional drawing context
const gameCanvas_ctx = gameCanvas.getContext("2d");

gen_food();

document.addEventListener("keydown", changeDirection);

function main() {
    if (has_game_ended()) return;

    changing_direction = false;
    setTimeout(function onTick() {
        clear_board();
        drawFood();
        move_snake();
        drawSnake();
        // Repeat
        main();
    }, 100)
}

// draw a border around the canvas
function clear_board() {
    //  Select the colour to fill the drawing
    gameCanvas_ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    gameCanvas_ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    gameCanvas_ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    // Draw a "border" around the entire canvas
    gameCanvas_ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

// Draw the snake on the canvas
function drawSnake() {
    // Draw each part
    snake.forEach(drawSnakePart)
}

function drawFood() {
    gameCanvas_ctx.fillStyle = 'red';
    gameCanvas_ctx.strokestyle = 'black';
    gameCanvas_ctx.fillRect(food_x, food_y, 20, 20);
    gameCanvas_ctx.strokeRect(food_x, food_y, 20, 20);
}

// Draw one snake part
function drawSnakePart(snakePart) {

    // Set the colour of the snake part
    gameCanvas_ctx.fillStyle = snake_col;
    // Set the border colour of the snake part
    gameCanvas_ctx.strokestyle = snake_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    gameCanvas_ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    // Draw a border around the snake part
    gameCanvas_ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            game_over = "Game over! Your score: " + score;
            document.getElementById('score').innerHTML = game_over;

            if(score > lastScore){
                maxScore = score;
            }

            createCookie("score", lastScore);

            return true;
        }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 20;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 20;

    if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) {
        game_over = "Game over! Your score: " + score;
        document.getElementById('score').innerHTML = game_over;
        
        if(score > lastScore){
            maxScore = score;
        }

        createCookie("score", lastScore);

        return true;
    }
}

function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function gen_food() {
    // Generate a random number the food x-coordinate
    food_x = random_food(0, gameCanvas.width - 20);
    // Generate a random number for the food y-coordinate
    food_y = random_food(0, gameCanvas.height - 20);
    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
    });
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    // Prevent the snake from reversing

    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -20;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -20;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 20;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 20;
    }
}

function move_snake() {
    // Create the new Snake's head
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    // Add the new head to the beginning of snake body
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        // Generate new food location
        gen_food();
    } else {
        // Remove the last part of snake body
        snake.pop();
    }
}

function createCookie(name, value){
    document.cookie = name + "=" + 
        value + "; path=/";
}