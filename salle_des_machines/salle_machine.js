for (let i = 0; i < 50; i++) {
      let star = document.createElement("div");
      star.classList.add("stars");
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      document.body.appendChild(star);
    }

const canvas = document.getElementById('cableCanvas');
const ctx = canvas.getContext('2d');

const wires = [
  {color: 'red', start: {x: 50, y: 50}, end: {x: 550, y: 200}, connected: false},
  {color: 'blue', start: {x: 50, y: 150}, end: {x: 550, y: 50}, connected: false},
  {color: 'green', start: {x: 50, y: 250}, end: {x: 550, y: 300}, connected: false}
];

let draggingWire = null;
let mousePos = {x:0, y:0};

canvas.addEventListener('mousedown', e => {
  const rect = canvas.getBoundingClientRect();
  mousePos = {x: e.clientX - rect.left, y: e.clientY - rect.top};
  wires.forEach(w => {
    if (Math.hypot(mousePos.x - w.start.x, mousePos.y - w.start.y) < 15) draggingWire = w;
  });
});

canvas.addEventListener('mousemove', e => {
  if(draggingWire){
    const rect = canvas.getBoundingClientRect();
    mousePos = {x: e.clientX - rect.left, y: e.clientY - rect.top};
  }
});

canvas.addEventListener('mouseup', e => {
  if(draggingWire){
    const rect = canvas.getBoundingClientRect();
    const releasePos = {x: e.clientX - rect.left, y: e.clientY - rect.top};
    const dx = releasePos.x - draggingWire.end.x;
    const dy = releasePos.y - draggingWire.end.y;
    if(Math.hypot(dx, dy) < 20) draggingWire.connected = true;
    draggingWire = null;
    checkWin();
  }
});

function checkWin(){
  if(wires.every(w => w.connected)){
    setTimeout(() => alert('Mission accomplie !'), 100);
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#222';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  wires.forEach(w => {
    ctx.fillStyle = w.color;
    ctx.beginPath();
    ctx.arc(w.start.x, w.start.y, 15, 0, Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(w.end.x, w.end.y, 15, 0, Math.PI*2);
    ctx.fill();

    ctx.strokeStyle = w.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w.start.x, w.start.y);
    if(draggingWire === w){
      ctx.lineTo(mousePos.x, mousePos.y);
    } else if(w.connected){
      ctx.lineTo(w.end.x, w.end.y);
    } else {
      ctx.lineTo(w.start.x, w.start.y);
    }
    ctx.stroke();
  });

  requestAnimationFrame(draw);
}

draw();
