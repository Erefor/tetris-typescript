import {COLS, ROWS} from "./constants.js";

class Piece{
    context: CanvasRenderingContext2D
    color: string
    shape: Array<Array<number>>
    x:number
    y:number
    constructor(context: CanvasRenderingContext2D, color: string, shape: Array<Array<number>>) {
        this.context = context
        this.color = color
        this.shape = shape
        this.x = 0
        this.y = 0
    }
    draw() {
        this.context.fillStyle = this.color
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.context.fillRect(this.x +x, this.y + y, 1,1)
                }
            })
        })
    }
    movePiece(piece: Piece) {
        this.x = piece.x
        this.y = piece.y
        this.shape = piece.shape
    }
}

export {Piece}

