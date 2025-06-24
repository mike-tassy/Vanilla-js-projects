const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

const brickROwCount = 9;
const brickColumnCount = 5;

//create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// create bricks props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// create bricks array
const bricks = [];
for (let i = 0; i < brickROwCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

//draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// draw bricks on canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

// move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

//move ball on canvs
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  //wall collision (right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // ball.dx = ball.dx * -1
  }

  // wall collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1; // ball.dy = ball.dy * -1
  }

  // console.log(ball.x, ball.y);

  //paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed; // reverse ball direction
  }

  // brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        // Check collision between ball and brick
        if (
          ball.x + ball.size > brick.x && // Left side of ball is to the right of brick's left
          ball.x - ball.size < brick.x + brick.w && // Right side of ball is to the left of brick's right
          ball.y + ball.size > brick.y && // Top of ball is below brick's top
          ball.y - ball.size < brick.y + brick.h // Bottom of ball is above brick's bottom
        ) {
          // Collision detected
          ball.dy *= -1;
          brick.visible = false; // hide the brick

          increaseScore();
        }
      }
    });
  });

  // Hit bottom wall - lose
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

// Increase Score
function increaseScore() {
  score++;

  if (score % (brickROwCount * brickColumnCount) === 0) {
    showAllBricks();
  }
}

// make all bricks appear
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

// draw everything
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}
// update canvas drawing and animation
function update() {
  movePaddle();
  moveBall();

  // draw everything
  draw();

  requestAnimationFrame(update);
}

update();

// draw score on canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Keydown Event handlers
function keydown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

// keyup event handlers
function keyup(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

//keyboard event handlers
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

//rules and close event handlers '
rulesBtn.addEventListener("click", () => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rules.classList.remove("show");
});
