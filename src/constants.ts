import {Piece} from "./piece.js";
import {Board} from "./board.js";

export const COLS: number = 10
export const ROWS: number = 20
export const BLOCK_SIZE: number = 30

export enum Keys {
    LEFT= 37,
    RIGHT= 39,
    DOWN= 40,
    UP= 38,
    SPACE = 32,
}
export const pieceMoves: {[keyCode: number]: Function} = {
    [Keys.LEFT]: (piece: Piece) => ({...piece, x: piece.x - 1}),
    [Keys.RIGHT]: (piece: Piece) => ({...piece, x: piece.x + 1}),
    [Keys.DOWN]: (piece: Piece) => ({...piece, y: piece.y + 1}),
    [Keys.UP]: (piece: Piece, board: Board) => board.rotate(piece),
    [Keys.SPACE]:  (piece: Piece) => ({ ...piece, y: piece.y + 1 })
}
export interface Time {
    start: number,
    elapsed: number,
    level: number,
}

export interface pointsMap {
    1: POINTS,
    2: POINTS,
    3: POINTS,
    4: POINTS,
}

export const COLORS: string[] = [
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];

export enum POINTS  {
    SINGLE = 100,
    DOUBLE = 300,
    TRIPLE = 500,
    TETRIS = 800,
    SOFT_DROP = 1,
    HARD_DROP = 2
}

export const TETRONOMIOS: number[][][] = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    [
        [0, 2, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [2, 2, 0],
        [0, 2, 2]
    ],
    [
        [0, 0, 0],
        [0, 2, 2],
        [2, 2, 0]
    ],
    [
        [0, 0, 0],
        [2, 2, 0],
        [2, 2, 0]
    ],
]

