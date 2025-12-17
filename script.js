// ----------------------------------------------------
// 配置与数据映射
// ----------------------------------------------------
const SIZE = 4;
let grid = [];
let score = 0;
let startX, startY;

// 职位映射表
const roleMap = {
    2: "蓝色生死恋\n(病历本)",
    4: "见习生\n(Observer)",
    8: "实习生\n(Intern)",
    16: "规培生\n(Resident)",
    32: "总住院\n(Chief)",
    64: "主治医师\n(Attending)",
    128: "副主任医师\n(Assoc. Prof)",
    256: "主任医师\n(Professor)",
    512: "科室主任\n(Director)",
    1024: "院长\n(Dean)",
    2048: "卫健委专家\n(Expert)"
};

const container = document.getElementById('tile-container');
const scoreDisplay = document.getElementById('score');
const messageOverlay = document.getElementById('game-message');
const messageText = document.getElementById('message-text');
const gameBoard = document.getElementById('game-board');

// ----------------------------------------------------
// 游戏核心逻辑
// ----------------------------------------------------

function initGame() {
    grid = Array(SIZE).fill().map(() => Array(SIZE).fill(0));
    score = 0;
    updateScore();
    container.innerHTML = '';
    messageOverlay.classList.remove('active');
    
    addNewTile();
    addNewTile();
    updateView();
}

function addNewTile() {
    let emptyCells = [];
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (grid[r][c] === 0) emptyCells.push({r, c});
        }
    }
    if (emptyCells.length > 0) {
        let {r, c} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateView() {
    container.innerHTML = '';
    
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (grid[r][c] !== 0) {
                createTileElement(r, c, grid[r][c]);
            }
        }
    }
}

function createTileElement(row, col, value, isMerged = false) {
    const tile = document.createElement('div');
    
    // 基础样式
    tile.classList.add('tile');
    tile.classList.add(`tile-${value}`);
    
    // 文本内容
    tile.innerText = roleMap[value] || value;
    
    // 位置计算
    const gap = 10; 
    const sizePercent = 25;
    
    tile.style.left = `calc(${col * 25}% + 5px)`;
    tile.style.top = `calc(${row * 25}% + 5px)`;
    tile.style.width = `calc(25% - 10px)`;
    tile.style.height = `calc(25% - 10px)`;

    container.appendChild(tile);
    return tile;
}

// ----------------------------------------------------
// 移动逻辑
// ----------------------------------------------------

function move(direction) {
    let moved = false;
    let mergedTiles = []; // 记录合并位置

    let createdChief = false;

    if (direction === 'Up') {
        for (let c = 0; c < SIZE; c++) {
            for (let r = 1; r < SIZE; r++) {
                if (grid[r][c] !== 0) {
                    let currentRow = r;
                    while (currentRow > 0) {
                        if (grid[currentRow - 1][c] === 0) {
                            grid[currentRow - 1][c] = grid[currentRow][c];
                            grid[currentRow][c] = 0;
                            currentRow--;
                            moved = true;
                        } else if (grid[currentRow - 1][c] === grid[currentRow][c] && !mergedTiles.some(m => m.r === currentRow - 1 && m.c === c)) {
                            grid[currentRow - 1][c] *= 2;
                            grid[currentRow][c] = 0;
                            score += grid[currentRow - 1][c];
                            mergedTiles.push({r: currentRow - 1, c: c});
                            if (grid[currentRow - 1][c] === 32) createdChief = true;
                            moved = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    } else if (direction === 'Down') {
        for (let c = 0; c < SIZE; c++) {
            for (let r = SIZE - 2; r >= 0; r--) {
                if (grid[r][c] !== 0) {
                    let currentRow = r;
                    while (currentRow < SIZE - 1) {
                        if (grid[currentRow + 1][c] === 0) {
                            grid[currentRow + 1][c] = grid[currentRow][c];
                            grid[currentRow][c] = 0;
                            currentRow++;
                            moved = true;
                        } else if (grid[currentRow + 1][c] === grid[currentRow][c] && !mergedTiles.some(m => m.r === currentRow + 1 && m.c === c)) {
                            grid[currentRow + 1][c] *= 2;
                            grid[currentRow][c] = 0;
                            score += grid[currentRow + 1][c];
                            mergedTiles.push({r: currentRow + 1, c: c});
                            if (grid[currentRow + 1][c] === 32) createdChief = true;
                            moved = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    } else if (direction === 'Left') {
        for (let r = 0; r < SIZE; r++) {
            for (let c = 1; c < SIZE; c++) {
                if (grid[r][c] !== 0) {
                    let currentCol = c;
                    while (currentCol > 0) {
                        if (grid[r][currentCol - 1] === 0) {
                            grid[r][currentCol - 1] = grid[r][currentCol];
                            grid[r][currentCol] = 0;
                            currentCol--;
                            moved = true;
                        } else if (grid[r][currentCol - 1] === grid[r][currentCol] && !mergedTiles.some(m => m.r === r && m.c === currentCol - 1)) {
                            grid[r][currentCol - 1] *= 2;
                            grid[r][currentCol] = 0;
                            score += grid[r][currentCol - 1];
                            mergedTiles.push({r: r, c: currentCol - 1});
                            if (grid[r][currentCol - 1] === 32) createdChief = true;
                            moved = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    } else if (direction === 'Right') {
        for (let r = 0; r < SIZE; r++) {
            for (let c = SIZE - 2; c >= 0; c--) {
                if (grid[r][c] !== 0) {
                    let currentCol = c;
                    while (currentCol < SIZE - 1) {
                        if (grid[r][currentCol + 1] === 0) {
                            grid[r][currentCol + 1] = grid[r][currentCol];
                            grid[r][currentCol] = 0;
                            currentCol++;
                            moved = true;
                        } else if (grid[r][currentCol + 1] === grid[r][currentCol] && !mergedTiles.some(m => m.r === r && m.c === currentCol + 1)) {
                            grid[r][currentCol + 1] *= 2;
                            grid[r][currentCol] = 0;
                            score += grid[r][currentCol + 1];
                            mergedTiles.push({r: r, c: currentCol + 1});
                            if (grid[r][currentCol + 1] === 32) createdChief = true;
                            moved = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    }

    if (moved) {
        addNewTile();
        updateScore();
        updateView();
        
        if (createdChief) {
            gameBoard.classList.add('shake');
            setTimeout(() => gameBoard.classList.remove('shake'), 500);
        }

        if (checkGameOver()) {
            showGameOver();
        }
    }
}

// ----------------------------------------------------
// 游戏状态检测
// ----------------------------------------------------

function updateScore() {
    scoreDisplay.innerText = score;
}

function checkGameOver() {
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (grid[r][c] === 0) return false;
            if (r < SIZE - 1 && grid[r][c] === grid[r + 1][c]) return false;
            if (c < SIZE - 1 && grid[r][c] === grid[r][c + 1]) return false;
        }
    }
    return true;
}

function showGameOver() {
    messageText.innerText = "晋升失败!\n请重新规培";
    messageOverlay.classList.add('active');
}

function restartGame() {
    initGame();
}

// ----------------------------------------------------
// 输入处理 (键盘 + 触摸)
// ----------------------------------------------------

document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        move(e.key.replace('Arrow', ''));
    }
});

// Touch handling
gameBoard.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}, {passive: false});

gameBoard.addEventListener('touchend', (e) => {
    if (!startX || !startY) return;

    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let diffX = endX - startX;
    let diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal
        if (Math.abs(diffX) > 30) {
            move(diffX > 0 ? 'Right' : 'Left');
        }
    } else {
        // Vertical
        if (Math.abs(diffY) > 30) {
            move(diffY > 0 ? 'Down' : 'Up');
        }
    }

    startX = null;
    startY = null;
});

// Start
initGame();