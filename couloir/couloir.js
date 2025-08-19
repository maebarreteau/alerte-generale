for (let i = 0; i < 50; i++) {
      let star = document.createElement("div");
      star.classList.add("stars");
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      document.body.appendChild(star);
    }

    const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const maze = [
  [1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,1,0,0,0,2],
  [1,1,1,1,1,1,1,1,1,1,1,1]
];

const tileSize = 50;
let player = {x:1, y:1};
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function update() {
  let newX = player.x;
  let newY = player.y;
  if (keys["ArrowUp"] || keys["w"]) newY--;
  if (keys["ArrowDown"] || keys["s"]) newY++;
  if (keys["ArrowLeft"] || keys["a"]) newX--;
  if (keys["ArrowRight"] || keys["d"]) newX++;

  if (maze[newY][newX] !== 1) {
    player.x = newX;
    player.y = newY;
  }

if (maze[player.y][player.x] === 2) {
  setTimeout(() => {
    window.location.href = "../salle_des_machines/salle_machine.html";
  }, 500);
}
} 


function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  for (let y=0; y<maze.length; y++) {
    for (let x=0; x<maze[0].length; x++) {
      if (maze[y][x] === 1) {
        ctx.fillStyle = "#222";
        ctx.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
      }
      if (maze[y][x] === 2) {
        ctx.fillStyle = "#0f0";
        ctx.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
      }
    }
  }

  const px = player.x * tileSize + tileSize/2;
  const py = player.y * tileSize + tileSize/2;

  const gradient = ctx.createRadialGradient(px, py, 10, px, py, 100);
  gradient.addColorStop(0, "rgba(255,255,200,0.8)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(px-100, py-100, 200, 200);

  ctx.fillStyle = "#ff0";
  ctx.beginPath();
  ctx.arc(px, py, 10, 0, Math.PI*2);
  ctx.fill();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}
  

gameLoop();
