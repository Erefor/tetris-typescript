import {COLS, ROWS, COLORS, TETRONOMIOS, Keys, pieceMoves} from "./constants.js";
import {Piece} from "./piece.js";

class Board{
    context: CanvasRenderingContext2D
    grid: Array<Array<number>>
    piece: Piece
    constructor(context: CanvasRenderingContext2D) {
        this.context = context
        this.grid = this.emptyBoard()
        this.piece = new Piece(context, COLORS[Math.floor(Math.random() * COLORS.length)],TETRONOMIOS[Math.floor(Math.random() * TETRONOMIOS.length)])
    }
    emptyBoard():Array<Array<number>> {
        return Array.from({length: ROWS},() => Array(COLS).fill(0))
    }
    rotate(piece:Piece) {
        let p: Piece = JSON.parse(JSON.stringify(piece))
        for (let y = 0; y < p.shape.length; y++) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
            }
        }
        p.shape.forEach(row => row.reverse());
        return p
    }
    isInsideOfBoard(x: number, y:number){
        return (x >= 0 && x < COLS && y < ROWS)
    }
    freezePiece() {
        this.piece.shape.forEach((row, y) => {
            row.forEach(((value, x) => {
                if (value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value
                }
            }))
        })
    }
    draw() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.context.fillStyle = COLORS[value-1];
                    this.context.fillRect(x, y, 1, 1);
                }
            });
        });
    }
    isNotOccupied(x: number, y:number) {
        return this.grid[y] && this.grid[y][x] === 0;
    }
    validPieceLand(piece: Piece) {
        return piece.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = piece.x + dx;
                let y = piece.y + dy;
                return value === 0 || (this.isInsideOfBoard(x, y) && this.isNotOccupied(x, y));
            });
        });
    }
    clearLines() {
        this.grid.forEach((row, y) => {
            if (row.every(value => value > 0)) {
                this.grid.splice(y, 1);
                this.grid.unshift(Array(COLS).fill(0));
            }
        });
    }
}

export {Board}

