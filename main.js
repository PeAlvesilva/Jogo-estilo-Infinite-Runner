// Seleciona o canvas e ajusta o tamanho
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variáveis do jogo
const gravity = 1;
const jumpStrength = 20;
const player = {
  x: 100,
  y: canvas.height - 150,
  width: 50,
  height: 50,
  color: '#FF6347',
  dy: 0,
  isJumping: false,
};
const obstacles = [];
let gameSpeed = 5;
let score = 0;

// Criação de obstáculos
function createObstacle() {
  const height = Math.random() * 50 + 50;
  obstacles.push({
    x: canvas.width,
    y: canvas.height - height,
    width: 50,
    height: height,
    color: '#2E8B57',
  });
}

// Atualização do jogador
function updatePlayer() {
  player.y += player.dy;
  player.dy += gravity;

  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.isJumping = false;
  }
}

// Atualização dos obstáculos
function updateObstacles() {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i];
    obstacle.x -= gameSpeed;

    // Remove obstáculos fora da tela
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(i, 1);
      score++;
    }

    // Checa colisão
    if (
      player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y
    ) {
      alert(`Game Over! Pontuação: ${score}`);
      document.location.reload();
    }
  }
}

// Renderiza o jogador
function renderPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Renderiza os obstáculos
function renderObstacles() {
  obstacles.forEach((obstacle) => {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

// Loop principal do jogo
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Atualização e renderização
  updatePlayer();
  updateObstacles();
  renderPlayer();
  renderObstacles();

  // Pontuação
  ctx.fillStyle = '#000';
  ctx.font = '24px Arial';
  ctx.fillText(`Pontuação: ${score}`, 20, 40);

  requestAnimationFrame(gameLoop);
}

// Intervalo para gerar obstáculos
setInterval(createObstacle, 2000);

// Evento de salto
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !player.isJumping) {
    player.dy = -jumpStrength;
    player.isJumping = true;
  }
});

// Inicia o jogo
gameLoop();