import {COLS, ROWS, BLOCK_SIZE, Keys, Time, pieceMoves, COLORS, TETRONOMIOS, POINTS} from "./src/constants.js";
import {Board} from "./src/board.js";
import {Piece} from "./src/piece.js";
let board: Board
let requestId: (number | null) = null
const time: Time = {
    start: 0,
    elapsed: 0,
    level: 1000,
}
const playerGamePoints: {score: number, lines: number, level: number} = {
    score: 0,
    lines: 0,
    level: 0,
}

const playerScore = new Proxy(playerGamePoints, {
    set(target: { score: number; lines: number }, key: string, value: any, receiver: any): boolean {
        target.score = value
        updateScore(key,value)
        return true
    }
})
const canvas = document.getElementById('board')! as HTMLCanvasElement
const context = canvas.getContext('2d')!
const playBtn = document.getElementById('play-btn')! as HTMLButtonElement
context.canvas.width = COLS * BLOCK_SIZE
context.canvas.height = ROWS * BLOCK_SIZE
context.scale(BLOCK_SIZE,BLOCK_SIZE)
const {width, height} = context.canvas

function play() {
    board = new Board(context)
    draw()
    if (requestId){
        cancelAnimationFrame(requestId)
    }
    time.start = performance.now()
    animate()
    playBtn.style.display = "none"
}

function draw() {
    context.clearRect(0,0,width,height)
    board.draw()
    board.piece.draw()
}
function drop(): boolean {
    let p = pieceMoves[Keys.DOWN](board.piece, board);
    if (board.validPieceLand(p)) {
    board.piece.movePiece(p);
    } else {
        board.freezePiece()
        let lines = board.clearLines()
        playerScore.score += board.getLineClearPoints(lines)
        if (board.piece.y === 0) {
            return false
        }
    board.piece = new Piece(board.context,COLORS[Math.floor(Math.random() * COLORS.length)],TETRONOMIOS[Math.floor(Math.random() * TETRONOMIOS.length)])
}
    return true
}
function animate(now: number = 0): void {
    time.elapsed = now - time.start
    if (time.elapsed > time.level) {
        time.start = now
        drop()
        if (!drop()) {
            gameOver()
            return
        }
    }
    draw()
    requestId = requestAnimationFrame(animate)

}

function gameOver() {
    cancelAnimationFrame(requestId!);
    context.fillStyle = 'black';
    context.fillRect(1, 3, 8, 1.2);
    context.font = '1px Arial';
    context.fillStyle = 'red';
    context.fillText('GAME OVER', 1.8, 4);
    playBtn.style.display = "block"
}

function updateScore(key: string = '', value: number) {
    const element = document.getElementById(key)
    if (element){
        element.textContent = `${value}`
    }
}
// Inicia el juego
playBtn.addEventListener('click', play)

// Aplica el movimiento de la pieza al presionar las flechitas
document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (pieceMoves[event.keyCode]) {
        let p = pieceMoves[event.keyCode](board.piece, board)
        if (event.keyCode === Keys.SPACE) {
            while (board.validPieceLand(p)) {
                board.piece.movePiece(p)
                p = pieceMoves[Keys.SPACE](board.piece, board)
                playerScore.score += POINTS.HARD_DROP
            }
        } else if (board.validPieceLand(p)){
            board.piece.movePiece(p)
            if (event.keyCode === Keys.DOWN) {
                playerScore.score += POINTS.SOFT_DROP
            }
        }
        board.validPieceLand(p) && board.piece.movePiece(p)
        draw()
    }
    return false
})






