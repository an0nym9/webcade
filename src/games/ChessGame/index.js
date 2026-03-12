import { Pawn } from "./pieces.js";

window.startChessGame = function () {
    const pieces = loadPieces(loadBoard());
    pieces.forEach(piece => {
        const args = piece.id.split('-').slice(1, 3);
        if (piece.id.includes("pawn")) {
            const pawn = new Pawn(...args, false);
            piece.addEventListener("click", () => {
                if (pawn.clicked) {
                    pawn.highlightMoves();
                    document.querySelectorAll(".highlighted")
                        ?.forEach(highlighted => {
                            highlighted.addEventListener("click", () => {
                                pawn.move(highlighted.id);
                                pawn.removeHighlights();
                            });
                        });
                }
                else pawn.removeHighlights();
                pawn.clicked = !pawn.clicked;
            });
        }
    });
}

function loadBoard() {
    const board = document.createElement("div");
    const boxSize = {
        width: "50px",
        height: "50px",
    };
    board.className = "board-container";
    const positions = [];
    let shade = true;
    for (let j = 8; j >= 1; j--) {
        for (let i = 'A'.charCodeAt(0); i <= 'H'.charCodeAt(0); i++) {
            const box = document.createElement("div");
            const pos = `${String.fromCharCode(i)}${j}`;
            box.id = pos;
            box.name = pos;
            box.textContent = pos;
            box.className = "box" + (shade ? '-shaded' : '');
            board.appendChild(box);
            shade = !shade;
            positions.push(pos);
        }
        shade = !shade;
    }
    board.style.gridTemplateColumns = (new Array(8).fill(boxSize.width)).join(' ');
    board.style.gridTemplateRows = (new Array(8).fill(boxSize.height)).join(' ');
    document.body.appendChild(board);
    return positions;
}

function loadPieces(positions) {
    const basePath = "src/games/ChessGame/assets/";
    const pieces = [];
    for (const position of positions) {
        const [col, row] = position.split('');
        if (!([8, 7, 2, 1].includes(+row))) continue;
        const box = document.getElementById(position);
        const piece = document.createElement("img");
        const shade = +row < 4 ? "white" : "black";
        const id = [shade, position];
        piece.className = "piece" + (+row < 4 ? "-black" : '');
        piece.src = basePath + shade + "-";
        if ([8, 1].includes(+row)) {
            switch (col) {
                case 'A': case 'H':
                    piece.src = piece.src
                        + `rook.${piece.src.includes("white")
                            ? "png"
                            : "webp"}`;
                    id.unshift("rook");
                    break;
                case 'B': case 'G':
                    piece.src = piece.src + "knight.webp";
                    id.unshift("knight");
                    break
                case 'C': case 'F':
                    piece.src = piece.src + "bishop.webp";
                    id.unshift("bishop");
                    break;
                default:
                    piece.src =
                        +row === 8 ?
                            col === 'D'
                                ? piece.src + "king.png"
                                : piece.src + "queen.webp"
                            : col === 'D'
                                ? piece.src + "queen.webp"
                                : piece.src + "king.webp";
                    id.unshift(piece.src.includes("king") ? "king" : "queen");
            }
        } else {
            piece.src = piece.src + "pawn.webp";
            id.unshift("pawn");
        }
        piece.id = id.join('-');
        box?.appendChild(piece);
        pieces.push(piece);
    }
    return pieces;
}
