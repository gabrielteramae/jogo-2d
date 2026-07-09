const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayButton = document.getElementById("overlay-button");

const GRAVITY = 0.6;
const MOVE_SPEED = 4;
const JUMP_FORCE = -12;
const GROUND_FRICTION = 0.8;
const GROUND_Y = 460;
const MAX_JUMPS = 2;

function buildLevel1() {
  return {
    width: 3200,
    platforms: [
      { x: 0, y: GROUND_Y, w: 700, h: 80 },
      { x: 820, y: GROUND_Y, w: 260, h: 80 },
      { x: 1180, y: GROUND_Y, w: 340, h: 80 },
      { x: 1620, y: GROUND_Y, w: 200, h: 80 },
      { x: 1920, y: GROUND_Y, w: 500, h: 80 },
      { x: 2520, y: GROUND_Y, w: 680, h: 80 },
      { x: 980, y: 360, w: 140, h: 24 },
      { x: 1260, y: 300, w: 140, h: 24 },
      { x: 1700, y: 340, w: 120, h: 24 },
      { x: 2080, y: 320, w: 160, h: 24 },
      { x: 2650, y: 340, w: 160, h: 24 },
    ],
    coins: [
      { x: 300, y: 400 }, { x: 340, y: 400 }, { x: 380, y: 400 },
      { x: 1000, y: 320 }, { x: 1040, y: 320 }, { x: 1080, y: 320 },
      { x: 1300, y: 260 }, { x: 1340, y: 260 },
      { x: 1650, y: 420 }, { x: 1690, y: 420 },
      { x: 1720, y: 300 }, { x: 1760, y: 300 },
      { x: 2000, y: 420 }, { x: 2040, y: 420 }, { x: 2080, y: 420 },
      { x: 2100, y: 280 }, { x: 2140, y: 280 },
      { x: 2600, y: 420 }, { x: 2680, y: 420 }, { x: 2760, y: 420 },
    ],
    enemies: [
      { x: 500, minX: 420, maxX: 650, speed: 1.6 },
      { x: 1250, minX: 1180, maxX: 1480, speed: 1.6 },
      { x: 2000, minX: 1920, maxX: 2300, speed: 1.6 },
      { x: 2700, minX: 2560, maxX: 3100, speed: 1.6 },
    ],
    flagX: 3100,
  };
}

function buildLevel2() {
  return {
    width: 3800,
    platforms: [
      { x: 0, y: GROUND_Y, w: 500, h: 80 },
      { x: 620, y: GROUND_Y, w: 180, h: 80 },
      { x: 900, y: GROUND_Y, w: 180, h: 80 },
      { x: 1180, y: GROUND_Y, w: 220, h: 80 },
      { x: 1520, y: GROUND_Y, w: 160, h: 80 },
      { x: 1820, y: GROUND_Y, w: 160, h: 80 },
      { x: 2120, y: GROUND_Y, w: 400, h: 80 },
      { x: 2640, y: GROUND_Y, w: 180, h: 80 },
      { x: 2940, y: GROUND_Y, w: 180, h: 80 },
      { x: 3240, y: GROUND_Y, w: 560, h: 80 },
      { x: 760, y: 340, w: 120, h: 24 },
      { x: 1050, y: 280, w: 120, h: 24 },
      { x: 1340, y: 340, w: 160, h: 24 },
      { x: 1660, y: 300, w: 120, h: 24 },
      { x: 1960, y: 340, w: 140, h: 24 },
      { x: 2300, y: 260, w: 160, h: 24 },
      { x: 2560, y: 340, w: 60, h: 24 },
      { x: 2800, y: 300, w: 120, h: 24 },
      { x: 3100, y: 340, w: 120, h: 24 },
    ],
    coins: [
      { x: 260, y: 400 }, { x: 300, y: 400 }, { x: 340, y: 400 },
      { x: 800, y: 300 }, { x: 840, y: 300 },
      { x: 1080, y: 240 }, { x: 1120, y: 240 },
      { x: 1380, y: 300 }, { x: 1420, y: 300 },
      { x: 1690, y: 260 }, { x: 1730, y: 260 },
      { x: 2000, y: 300 }, { x: 2040, y: 300 },
      { x: 2330, y: 220 }, { x: 2370, y: 220 }, { x: 2410, y: 220 },
      { x: 2830, y: 260 }, { x: 2870, y: 260 },
      { x: 3130, y: 300 }, { x: 3170, y: 300 },
      { x: 3400, y: 420 }, { x: 3440, y: 420 }, { x: 3480, y: 420 },
    ],
    enemies: [
      { x: 300, minX: 100, maxX: 450, speed: 2 },
      { x: 1250, minX: 1180, maxX: 1400, speed: 2.2 },
      { x: 1900, minX: 1820, maxX: 1980, speed: 2.2 },
      { x: 2200, minX: 2120, maxX: 2500, speed: 2.4 },
      { x: 3000, minX: 2940, maxX: 3120, speed: 2.2 },
      { x: 3400, minX: 3240, maxX: 3700, speed: 2.4 },
    ],
    flagX: 3700,
  };
}

function buildLevel3() {
  return {
    width: 4400,
    platforms: [
      { x: 0, y: GROUND_Y, w: 400, h: 80 },
      { x: 500, y: GROUND_Y, w: 120, h: 80 },
      { x: 720, y: GROUND_Y, w: 100, h: 80 },
      { x: 920, y: GROUND_Y, w: 100, h: 80 },
      { x: 1140, y: GROUND_Y, w: 260, h: 80 },
      { x: 1500, y: GROUND_Y, w: 100, h: 80 },
      { x: 1700, y: GROUND_Y, w: 100, h: 80 },
      { x: 1900, y: GROUND_Y, w: 100, h: 80 },
      { x: 2100, y: GROUND_Y, w: 300, h: 80 },
      { x: 2500, y: GROUND_Y, w: 100, h: 80 },
      { x: 2700, y: GROUND_Y, w: 100, h: 80 },
      { x: 2900, y: GROUND_Y, w: 100, h: 80 },
      { x: 3100, y: GROUND_Y, w: 260, h: 80 },
      { x: 3460, y: GROUND_Y, w: 100, h: 80 },
      { x: 3660, y: GROUND_Y, w: 100, h: 80 },
      { x: 3860, y: GROUND_Y, w: 540, h: 80 },
      { x: 600, y: 340, w: 100, h: 24 },
      { x: 820, y: 280, w: 100, h: 24 },
      { x: 1020, y: 340, w: 100, h: 24 },
      { x: 1600, y: 300, w: 100, h: 24 },
      { x: 1800, y: 240, w: 100, h: 24 },
      { x: 2000, y: 300, w: 100, h: 24 },
      { x: 2600, y: 340, w: 100, h: 24 },
      { x: 2800, y: 280, w: 100, h: 24 },
      { x: 3000, y: 340, w: 100, h: 24 },
      { x: 3560, y: 300, w: 100, h: 24 },
      { x: 3760, y: 240, w: 100, h: 24 },
    ],
    coins: [
      { x: 200, y: 400 }, { x: 240, y: 400 },
      { x: 650, y: 280 }, { x: 870, y: 220 }, { x: 1070, y: 280 },
      { x: 1200, y: 420 }, { x: 1240, y: 420 }, { x: 1280, y: 420 },
      { x: 1650, y: 240 }, { x: 1850, y: 180 }, { x: 2050, y: 240 },
      { x: 2160, y: 420 }, { x: 2200, y: 420 }, { x: 2240, y: 420 },
      { x: 2650, y: 280 }, { x: 2850, y: 220 }, { x: 3050, y: 280 },
      { x: 3160, y: 420 }, { x: 3200, y: 420 }, { x: 3240, y: 420 },
      { x: 3610, y: 240 }, { x: 3810, y: 180 },
      { x: 3920, y: 420 }, { x: 3960, y: 420 }, { x: 4000, y: 420 },
    ],
    enemies: [
      { x: 550, minX: 500, maxX: 620, speed: 2.6 },
      { x: 950, minX: 920, maxX: 1020, speed: 2.6 },
      { x: 1250, minX: 1140, maxX: 1400, speed: 2.8 },
      { x: 1750, minX: 1700, maxX: 1800, speed: 2.8 },
      { x: 2250, minX: 2100, maxX: 2400, speed: 2.8 },
      { x: 2750, minX: 2700, maxX: 2800, speed: 3 },
      { x: 3200, minX: 3100, maxX: 3360, speed: 3 },
      { x: 3900, minX: 3860, maxX: 4300, speed: 3 },
      { x: 4100, minX: 3860, maxX: 4300, speed: 2.6 },
    ],
    flagX: 4300,
  };
}

const LEVELS = [buildLevel1, buildLevel2, buildLevel3];

const menuMain = document.getElementById("menu-main");
const menuLevels = document.getElementById("menu-levels");
const menuSettings = document.getElementById("menu-settings");
const menuButton = document.getElementById("menu-button");
const menuStartBtn = document.getElementById("menu-start");
const menuLevelsOpenBtn = document.getElementById("menu-levels-open");
const menuSettingsOpenBtn = document.getElementById("menu-settings-open");
const menuLevelsBackBtn = document.getElementById("menu-levels-back");
const menuSettingsBackBtn = document.getElementById("menu-settings-back");
const settingsMuteToggle = document.getElementById("settings-mute-toggle");
const levelButtons = document.querySelectorAll("#menu-levels [data-level]");

function hideAllMenus() {
  menuMain.hidden = true;
  menuLevels.hidden = true;
  menuSettings.hidden = true;
}

function showMainMenu() {
  hideAllMenus();
  menuMain.hidden = false;
}

function goToGame(startLevelIndex) {
  ensureAudio();
  hideAllMenus();
  overlay.hidden = true;
  levelIndex = startLevelIndex;
  score = 0;
  lives = 3;
  status = "playing";
  loadLevel(levelIndex);
}

menuStartBtn.addEventListener("click", () => goToGame(0));

menuLevelsOpenBtn.addEventListener("click", () => {
  hideAllMenus();
  menuLevels.hidden = false;
});

menuSettingsOpenBtn.addEventListener("click", () => {
  hideAllMenus();
  menuSettings.hidden = false;
});

menuLevelsBackBtn.addEventListener("click", showMainMenu);
menuSettingsBackBtn.addEventListener("click", showMainMenu);

levelButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    goToGame(parseInt(btn.dataset.level, 10));
  });
});

settingsMuteToggle.addEventListener("click", () => {
  ensureAudio();
  muted = !muted;
  settingsMuteToggle.textContent = muted ? "Som: Desligado" : "Som: Ligado";
});

menuButton.addEventListener("click", () => {
  status = "menu";
  overlay.hidden = true;
  if (musicTimeoutId) clearTimeout(musicTimeoutId);
  showMainMenu();
});

let audioCtx = null;
let muted = false;
let musicToken = 0;
let musicTimeoutId = null;

const MELODIES = [
  {
    wave: "triangle",
    volume: 0.05,
    notes: [
      [523.25, 0.2], [587.33, 0.2], [659.25, 0.2], [783.99, 0.4],
      [659.25, 0.2], [587.33, 0.2], [523.25, 0.4], [0, 0.2],
    ],
  },
  {
    wave: "sine",
    volume: 0.045,
    notes: [
      [220.0, 0.4], [246.94, 0.4], [261.63, 0.6], [0, 0.2],
      [220.0, 0.4], [196.0, 0.4], [220.0, 0.8], [0, 0.4],
    ],
  },
  {
    wave: "sawtooth",
    volume: 0.035,
    notes: [
      [130.81, 0.15], [130.81, 0.15], [164.81, 0.15], [130.81, 0.15],
      [146.83, 0.15], [130.81, 0.15], [110.0, 0.3], [0, 0.15],
    ],
  },
];

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playTone(freq, dur, wave, vol) {
  if (muted || !audioCtx || freq <= 0) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = wave;
  osc.frequency.value = freq;
  const now = audioCtx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(vol, now + 0.02);
  gain.gain.linearRampToValueAtTime(0, now + dur);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + dur + 0.02);
}

function playSfx(freq, dur, wave) {
  if (muted || !audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = wave;
  const now = audioCtx.currentTime;
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + dur);
}

function playJumpSfx() {
  playSfx(440, 0.12, "square");
}

function playCoinSfx() {
  playSfx(1046.5, 0.1, "square");
  setTimeout(() => playSfx(1568, 0.1, "square"), 60);
}

function playStompSfx() {
  playSfx(220, 0.15, "sawtooth");
}

function playHitSfx() {
  playSfx(140, 0.3, "sawtooth");
}

function playFanfare(success) {
  const notes = success
    ? [[523.25, 0.15], [659.25, 0.15], [783.99, 0.15], [1046.5, 0.4]]
    : [[293.66, 0.2], [261.63, 0.2], [220.0, 0.5]];
  let t = 0;
  for (const [freq, dur] of notes) {
    setTimeout(() => playSfx(freq, dur, "triangle"), t * 1000);
    t += dur;
  }
}

function startMusic(themeIndex) {
  musicToken += 1;
  const token = musicToken;
  if (musicTimeoutId) clearTimeout(musicTimeoutId);

  const theme = MELODIES[themeIndex];
  let i = 0;

  function playNext() {
    if (token !== musicToken) return;
    const [freq, dur] = theme.notes[i % theme.notes.length];
    playTone(freq, dur, theme.wave, theme.volume);
    i += 1;
    musicTimeoutId = setTimeout(playNext, dur * 1000);
  }

  playNext();
}

const fullscreenButton = document.getElementById("settings-fullscreen-toggle");
const gameWrap = document.querySelector(".game-wrap");

function toggleFullscreen() {
  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
  if (!isFullscreen) {
    if (gameWrap.requestFullscreen) {
      gameWrap.requestFullscreen();
    } else if (gameWrap.webkitRequestFullscreen) {
      gameWrap.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

fullscreenButton.addEventListener("click", () => {
  ensureAudio();
  toggleFullscreen();
});

document.addEventListener("fullscreenchange", () => {
  fullscreenButton.textContent = document.fullscreenElement ? "Sair da tela cheia" : "Tela cheia";
});
document.addEventListener("webkitfullscreenchange", () => {
  fullscreenButton.textContent = document.webkitFullscreenElement ? "Sair da tela cheia" : "Tela cheia";
});

const THEMES = [
  { type: "sky" },
  { type: "castle" },
  { type: "volcano" },
];
let currentTheme = THEMES[0];

let platforms, coins, enemies, flag, LEVEL_WIDTH;
let player;
let camera = 0;
let status = "playing";
let score = 0;
let lives = 3;
let levelIndex = 0;
const keys = {};

function loadLevel(index) {
  const level = LEVELS[index]();
  platforms = level.platforms;
  coins = level.coins.map((c) => ({ ...c, collected: false }));
  enemies = level.enemies.map((e, i) => ({ ...e, dir: 1, w: 34, h: 28, alive: true, phase: i * 1.7 }));
  flag = { x: level.flagX, y: GROUND_Y - 220, w: 16, h: 220 };
  LEVEL_WIDTH = level.width;
  player = {
    x: 60, y: 380, w: 30, h: 46,
    vx: 0, vy: 0, onGround: false, facing: 1, jumps: 0, walkCycle: 0,
  };
  camera = 0;
  currentTheme = THEMES[index];
  startMusic(index);
  updateHud();
}

function updateHud() {
  scoreEl.textContent = `Moedas: ${score}`;
  livesEl.textContent = `Vidas: ${lives}`;
  levelEl.textContent = `Fase: ${levelIndex + 1}/${LEVELS.length}`;
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function respawnPlayer() {
  player.x = 60;
  player.y = 380;
  player.vx = 0;
  player.vy = 0;
  player.jumps = 0;
  camera = 0;
}

function tryJump() {
  if (status !== "playing") return;
  if (player.jumps < MAX_JUMPS) {
    player.vy = JUMP_FORCE;
    player.jumps += 1;
    player.onGround = false;
    playJumpSfx();
  }
}

function update(dt) {
  if (status !== "playing") return;

  if (keys["ArrowLeft"] || keys["a"]) {
    player.vx = -MOVE_SPEED;
    player.facing = -1;
  } else if (keys["ArrowRight"] || keys["d"]) {
    player.vx = MOVE_SPEED;
    player.facing = 1;
  } else {
    player.vx *= Math.pow(GROUND_FRICTION, dt);
  }

  player.vy += GRAVITY * dt;
  if (player.vy > 18) player.vy = 18;

  player.x += player.vx * dt;
  player.x = Math.max(0, Math.min(LEVEL_WIDTH - player.w, player.x));
  for (const p of platforms) {
    if (rectsOverlap(player, p)) {
      if (player.vx > 0) player.x = p.x - player.w;
      else if (player.vx < 0) player.x = p.x + p.w;
    }
  }

  player.y += player.vy * dt;
  player.onGround = false;
  for (const p of platforms) {
    if (rectsOverlap(player, p)) {
      if (player.vy > 0) {
        player.y = p.y - player.h;
        player.vy = 0;
        player.onGround = true;
      } else if (player.vy < 0) {
        player.y = p.y + p.h;
        player.vy = 0;
      }
    }
  }
  if (player.onGround) {
    player.jumps = 0;
  }

  if (player.onGround && Math.abs(player.vx) > 0.3) {
    player.walkCycle += Math.abs(player.vx) * 0.18 * dt;
  } else if (player.onGround) {
    player.walkCycle *= Math.pow(0.85, dt);
  }

  if (player.y > canvas.height + 100) {
    loseLife();
  }

  for (const coin of coins) {
    if (!coin.collected && rectsOverlap(player, { x: coin.x - 10, y: coin.y - 10, w: 20, h: 20 })) {
      coin.collected = true;
      score += 1;
      playCoinSfx();
      updateHud();
    }
  }

  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    enemy.x += enemy.dir * enemy.speed * dt;
    if (enemy.x < enemy.minX) {
      enemy.x = enemy.minX;
      enemy.dir = 1;
    } else if (enemy.x > enemy.maxX) {
      enemy.x = enemy.maxX;
      enemy.dir = -1;
    }

    const floatOffset = currentTheme.type === "castle"
      ? Math.sin(Date.now() / 260 + enemy.phase) * 6 - 14
      : 0;
    const box = { x: enemy.x, y: GROUND_Y - enemy.h + floatOffset, w: enemy.w, h: enemy.h };
    if (rectsOverlap(player, box)) {
      if (player.vy > 0 && player.y + player.h - box.y < 18) {
        enemy.alive = false;
        player.vy = JUMP_FORCE * 0.6;
        player.jumps = 1;
        score += 2;
        playStompSfx();
        updateHud();
      } else {
        loseLife();
      }
    }
  }

  if (player.x + player.w > flag.x) {
    completeLevel();
  }

  camera = Math.max(0, Math.min(LEVEL_WIDTH - canvas.width, player.x - canvas.width / 2));
}

function loseLife() {
  lives -= 1;
  playHitSfx();
  updateHud();
  if (lives <= 0) {
    loseGame();
  } else {
    respawnPlayer();
  }
}

function completeLevel() {
  if (levelIndex < LEVELS.length - 1) {
    levelIndex += 1;
    status = "playing";
    loadLevel(levelIndex);
  } else {
    winGame();
  }
}

function winGame() {
  status = "win";
  overlayTitle.textContent = "Você venceu as 3 fases! 🏁";
  overlay.hidden = false;
  if (musicTimeoutId) clearTimeout(musicTimeoutId);
  musicToken += 1;
  playFanfare(true);
}

function loseGame() {
  status = "lose";
  overlayTitle.textContent = "Game Over";
  overlay.hidden = false;
  if (musicTimeoutId) clearTimeout(musicTimeoutId);
  musicToken += 1;
  playFanfare(false);
}

function drawBackground() {
  if (currentTheme.type === "castle") {
    drawCastleBackground();
  } else if (currentTheme.type === "volcano") {
    drawVolcanoBackground();
  } else {
    drawSkyBackground();
  }
}

const gradientCache = {};

function getSkyGradient() {
  if (!gradientCache.sky) {
    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
    g.addColorStop(0, "#5b9fd6");
    g.addColorStop(1, "#bfe4f0");
    gradientCache.sky = g;
  }
  return gradientCache.sky;
}

function getCastleGradient() {
  if (!gradientCache.castle) {
    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
    g.addColorStop(0, "#1a1622");
    g.addColorStop(1, "#3a3040");
    gradientCache.castle = g;
  }
  return gradientCache.castle;
}

function getVolcanoGradient() {
  if (!gradientCache.volcano) {
    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
    g.addColorStop(0, "#2a0f0a");
    g.addColorStop(0.6, "#5c1c0e");
    g.addColorStop(1, "#c94a1a");
    gradientCache.volcano = g;
  }
  return gradientCache.volcano;
}

function drawSkyBackground() {
  ctx.fillStyle = getSkyGradient();
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.8)";
  for (let i = 0; i < 6; i++) {
    const cx = (i * 500 - camera * 0.3) % (canvas.width + 400) - 200;
    drawCloud(cx, 60 + (i % 3) * 30);
  }

  ctx.fillStyle = "#4c8a5a";
  for (let i = 0; i < 8; i++) {
    const hx = (i * 420 - camera * 0.6) % (canvas.width + 400) - 200;
    ctx.beginPath();
    ctx.ellipse(hx, canvas.height - 20, 220, 90, 0, Math.PI, 0);
    ctx.fill();
  }
}

function drawCloud(x, y) {
  ctx.beginPath();
  ctx.ellipse(x, y, 30, 18, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 25, y + 6, 24, 14, 0, 0, Math.PI * 2);
  ctx.ellipse(x - 25, y + 6, 24, 14, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawCastleBackground() {
  ctx.fillStyle = getCastleGradient();
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#252030";
  for (let i = 0; i < 8; i++) {
    const bx = (i * 320 - camera * 0.5) % (canvas.width + 350) - 175;
    ctx.fillRect(bx, 0, 90, canvas.height);
  }

  ctx.fillStyle = "#12101a";
  for (let i = 0; i < 5; i++) {
    const wx = (i * 460 - camera * 0.5) % (canvas.width + 400) - 200;
    ctx.beginPath();
    ctx.moveTo(wx, 120);
    ctx.arc(wx, 120, 40, Math.PI, 0);
    ctx.lineTo(wx + 40, 220);
    ctx.lineTo(wx - 40, 220);
    ctx.closePath();
    ctx.fill();
  }

  const flicker = 0.6 + Math.sin(Date.now() / 180) * 0.15;
  ctx.fillStyle = `rgba(255, 140, 60, ${flicker})`;
  for (let i = 0; i < 6; i++) {
    const tx = (i * 440 - camera * 0.7) % (canvas.width + 300) - 150;
    ctx.fillStyle = "#3a2a1a";
    ctx.fillRect(tx - 3, 260, 6, 40);
    ctx.fillStyle = `rgba(255, 140, 60, ${flicker})`;
    ctx.beginPath();
    ctx.ellipse(tx, 250, 10, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawVolcanoBackground() {
  ctx.fillStyle = getVolcanoGradient();
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const glowBase = 0.5 + Math.sin(Date.now() / 260) * 0.3;
  for (let i = 0; i < 4; i++) {
    const mx = (i * 700 - camera * 0.4) % (canvas.width + 700) - 350;
    ctx.fillStyle = "#1a0a06";
    ctx.beginPath();
    ctx.moveTo(mx - 260, canvas.height - 60);
    ctx.lineTo(mx, canvas.height - 340);
    ctx.lineTo(mx + 260, canvas.height - 60);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = `rgba(255, 120, 40, ${glowBase})`;
    ctx.beginPath();
    ctx.arc(mx, canvas.height - 330, 14, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(255,90,30,0.5)";
  ctx.fillRect(0, canvas.height - 70, canvas.width, 70);

  const time = Date.now() / 1000;
  ctx.fillStyle = "rgba(70,60,60,0.35)";
  for (let i = 0; i < 4; i++) {
    const sx = (i * 300 + time * 20 - camera * 0.3) % (canvas.width + 300) - 150;
    const sy = 80 + (i % 3) * 50;
    ctx.beginPath();
    ctx.ellipse(sx, sy, 50, 26, 0, 0, Math.PI * 2);
    ctx.ellipse(sx + 40, sy + 8, 40, 20, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(255,200,80,0.9)";
  for (let i = 0; i < 12; i++) {
    const seed = i * 37.7;
    const ex = (seed * 13 - camera * 0.5 + time * 40) % canvas.width;
    const ey = canvas.height - ((time * 50 + seed * 20) % (canvas.height - 100));
    ctx.beginPath();
    ctx.arc(ex, ey, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPlatforms() {
  for (const p of platforms) {
    const sx = p.x - camera;
    if (sx + p.w < 0 || sx > canvas.width) continue;

    if (currentTheme.type === "castle") {
      ctx.fillStyle = "#5a5560";
      ctx.fillRect(sx, p.y, p.w, p.h);
      ctx.fillStyle = "#726c78";
      ctx.fillRect(sx, p.y, p.w, 14);
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 1;
      for (let i = 0; i < p.w; i += 40) {
        ctx.strokeRect(sx + i, p.y, 40, p.h);
      }
    } else if (currentTheme.type === "volcano") {
      ctx.fillStyle = "#2b1712";
      ctx.fillRect(sx, p.y, p.w, p.h);
      ctx.fillStyle = "#5c2a16";
      ctx.fillRect(sx, p.y, p.w, 14);
      ctx.strokeStyle = "rgba(255,120,40,0.4)";
      ctx.lineWidth = 1;
      for (let i = 0; i < p.w; i += 50) {
        ctx.beginPath();
        ctx.moveTo(sx + i, p.y + 14);
        ctx.lineTo(sx + i + 20, p.y + p.h);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = "#8a5a3b";
      ctx.fillRect(sx, p.y, p.w, p.h);
      ctx.fillStyle = "#5fb85f";
      ctx.fillRect(sx, p.y, p.w, 14);
    }
  }
}

function drawCoins() {
  for (const coin of coins) {
    if (coin.collected) continue;
    const sx = coin.x - camera;
    if (sx < -20 || sx > canvas.width + 20) continue;
    ctx.fillStyle = "#ffd166";
    ctx.beginPath();
    ctx.arc(sx, coin.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#e0a52e";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawEnemies() {
  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    const sx = enemy.x - camera;
    if (sx + enemy.w < 0 || sx > canvas.width) continue;

    if (currentTheme.type === "castle") {
      drawGhostEnemy(sx, enemy);
    } else if (currentTheme.type === "volcano") {
      drawFireEnemy(sx, enemy);
    } else {
      drawSlimeEnemy(sx, enemy);
    }
  }
}

function drawSlimeEnemy(sx, enemy) {
  const y = GROUND_Y - enemy.h;
  ctx.fillStyle = "#4fae5a";
  ctx.beginPath();
  ctx.ellipse(sx + enemy.w / 2, y + enemy.h / 2, enemy.w / 2, enemy.h / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(sx + enemy.w / 2 - 7, y + enemy.h / 2 - 4, 4, 0, Math.PI * 2);
  ctx.arc(sx + enemy.w / 2 + 7, y + enemy.h / 2 - 4, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.arc(sx + enemy.w / 2 - 7, y + enemy.h / 2 - 4, 2, 0, Math.PI * 2);
  ctx.arc(sx + enemy.w / 2 + 7, y + enemy.h / 2 - 4, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawGhostEnemy(sx, enemy) {
  const bob = Math.sin(Date.now() / 260 + enemy.phase) * 6;
  const y = GROUND_Y - enemy.h - 14 + bob;
  const w = enemy.w;
  const h = enemy.h + 10;
  const cx = sx + w / 2;

  ctx.globalAlpha = 0.8;
  ctx.fillStyle = "#eef2f6";
  ctx.beginPath();
  ctx.moveTo(cx - w / 2, y + h * 0.5);
  ctx.quadraticCurveTo(cx - w / 2, y, cx, y);
  ctx.quadraticCurveTo(cx + w / 2, y, cx + w / 2, y + h * 0.5);
  ctx.lineTo(cx + w / 2, y + h);
  ctx.quadraticCurveTo(cx + w * 0.3, y + h - 8, cx + w * 0.15, y + h);
  ctx.quadraticCurveTo(cx, y + h - 8, cx - w * 0.15, y + h);
  ctx.quadraticCurveTo(cx - w * 0.3, y + h - 8, cx - w / 2, y + h);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.ellipse(cx - 6, y + h * 0.4, 3, 4.5, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 6, y + h * 0.4, 3, 4.5, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawFireEnemy(sx, enemy) {
  const flick = Math.sin(Date.now() / 90 + enemy.phase) * 3;
  const y = GROUND_Y - enemy.h;
  const w = enemy.w;
  const h = enemy.h;
  const cx = sx + w / 2;

  ctx.fillStyle = "#ff6a1f";
  ctx.beginPath();
  ctx.moveTo(cx, y - 10 + flick);
  ctx.quadraticCurveTo(cx + w / 2, y + h * 0.3, cx + w * 0.3, y + h);
  ctx.quadraticCurveTo(cx, y + h * 0.7, cx - w * 0.3, y + h);
  ctx.quadraticCurveTo(cx - w / 2, y + h * 0.3, cx, y - 10 + flick);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffd166";
  ctx.beginPath();
  ctx.moveTo(cx, y + 4 + flick * 0.6);
  ctx.quadraticCurveTo(cx + w * 0.22, y + h * 0.5, cx + w * 0.12, y + h * 0.85);
  ctx.quadraticCurveTo(cx, y + h * 0.65, cx - w * 0.12, y + h * 0.85);
  ctx.quadraticCurveTo(cx - w * 0.22, y + h * 0.5, cx, y + 4 + flick * 0.6);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#1a0a06";
  ctx.beginPath();
  ctx.arc(cx - 5, y + h * 0.55, 2.2, 0, Math.PI * 2);
  ctx.arc(cx + 5, y + h * 0.55, 2.2, 0, Math.PI * 2);
  ctx.fill();
}

function drawFlag() {
  const sx = flag.x - camera;
  ctx.fillStyle = "#c9c9c9";
  ctx.fillRect(sx, flag.y, 6, flag.h);
  ctx.fillStyle = "#ff6b6b";
  ctx.beginPath();
  ctx.moveTo(sx + 6, flag.y);
  ctx.lineTo(sx + 46, flag.y + 16);
  ctx.lineTo(sx + 6, flag.y + 32);
  ctx.closePath();
  ctx.fill();
}

function drawPlayer() {
  const sx = player.x - camera;
  const sy = player.y;
  const w = player.w;
  const h = player.h;
  const cx = sx + w / 2;

  const capeTop = sy + 8;
  const capeBottom = sy + h;
  const capeHalfTop = 9;
  const capeHalfBottom = w / 2 + 4;

  ctx.fillStyle = "#161616";
  ctx.beginPath();
  ctx.moveTo(cx, capeTop);
  ctx.lineTo(cx - capeHalfTop, capeTop + 6);
  ctx.lineTo(cx - capeHalfBottom, capeBottom - 14);
  ctx.lineTo(cx - capeHalfBottom * 0.55, capeBottom - 8);
  ctx.lineTo(cx - capeHalfBottom * 0.15, capeBottom - 18);
  ctx.lineTo(cx + capeHalfBottom * 0.15, capeBottom - 8);
  ctx.lineTo(cx + capeHalfBottom * 0.55, capeBottom - 18);
  ctx.lineTo(cx + capeHalfBottom, capeBottom - 8);
  ctx.lineTo(cx + capeHalfTop, capeTop + 6);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * (capeHalfTop / 2), capeTop + 8);
    ctx.lineTo(cx + i * (capeHalfBottom / 2.4), capeBottom - 12);
    ctx.stroke();
  }

  const legSwing = Math.sin(player.walkCycle) * 10;
  const legStartY = capeBottom - 8;
  const legBaseY = capeBottom;
  let legAX, legAY, legBX, legBY;

  if (!player.onGround) {
    legAX = cx - 7;
    legAY = legStartY + 6;
    legBX = cx + 7;
    legBY = legStartY + 6;
  } else {
    legAX = cx - 5 + legSwing * 0.6;
    legAY = legBaseY - Math.max(0, legSwing) * 0.5;
    legBX = cx + 5 - legSwing * 0.6;
    legBY = legBaseY - Math.max(0, -legSwing) * 0.5;
  }

  ctx.strokeStyle = "#0a0a0a";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(cx - 5, legStartY);
  ctx.lineTo(legAX, legAY);
  ctx.moveTo(cx + 5, legStartY);
  ctx.lineTo(legBX, legBY);
  ctx.stroke();

  ctx.fillStyle = "#1c1c1c";
  ctx.beginPath();
  ctx.moveTo(cx, sy - 14);
  ctx.quadraticCurveTo(cx - 15, sy - 6, cx - 13, sy + 14);
  ctx.quadraticCurveTo(cx, sy + 20, cx + 13, sy + 14);
  ctx.quadraticCurveTo(cx + 15, sy - 6, cx, sy - 14);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#f2ede6";
  ctx.beginPath();
  ctx.ellipse(cx, sy + 8, 8, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#111";
  const eyeOffset = player.facing === 1 ? 1 : -1;
  ctx.beginPath();
  ctx.arc(cx - 3.5 + eyeOffset, sy + 8, 1.8, 0, Math.PI * 2);
  ctx.arc(cx + 3.5 + eyeOffset, sy + 8, 1.8, 0, Math.PI * 2);
  ctx.fill();
}

function draw() {
  if (status === "menu") {
    ctx.fillStyle = "#0c1024";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return;
  }
  drawBackground();
  drawPlatforms();
  drawCoins();
  drawFlag();
  drawEnemies();
  drawPlayer();
}

let lastFrameTime = null;

function loop(timestamp) {
  if (lastFrameTime === null) lastFrameTime = timestamp;
  const rawDelta = (timestamp - lastFrameTime) / (1000 / 60);
  lastFrameTime = timestamp;
  const dt = Math.min(Math.max(rawDelta, 0), 3);

  update(dt);
  draw();
  requestAnimationFrame(loop);
}

canvas.addEventListener("click", ensureAudio);
canvas.addEventListener("touchstart", ensureAudio);

const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");
const btnJump = document.getElementById("btn-jump");

function bindHoldButton(el, key) {
  const press = (e) => {
    e.preventDefault();
    ensureAudio();
    keys[key] = true;
  };
  const release = (e) => {
    e.preventDefault();
    keys[key] = false;
  };
  el.addEventListener("touchstart", press, { passive: false });
  el.addEventListener("touchend", release, { passive: false });
  el.addEventListener("touchcancel", release, { passive: false });
  el.addEventListener("mousedown", press);
  el.addEventListener("mouseup", release);
  el.addEventListener("mouseleave", release);
}

bindHoldButton(btnLeft, "ArrowLeft");
bindHoldButton(btnRight, "ArrowRight");

function pressJump(e) {
  e.preventDefault();
  ensureAudio();
  tryJump();
}
btnJump.addEventListener("touchstart", pressJump, { passive: false });
btnJump.addEventListener("mousedown", pressJump);

window.addEventListener("keydown", (e) => {
  ensureAudio();
  keys[e.key] = true;
  if (e.key === " ") e.preventDefault();
  if ((e.key === " " || e.key === "ArrowUp" || e.key === "w") && !e.repeat) {
    tryJump();
  }
});
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

overlayButton.addEventListener("click", () => {
  goToGame(0);
});

status = "menu";
requestAnimationFrame(loop);
