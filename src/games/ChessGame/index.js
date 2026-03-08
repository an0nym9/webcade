window.startChessGame = function () {
    loadPieces(loadBoard());
    console.log("Chess Game loaded.");
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
    const pieces = {
        pawn: { symbol: "P", points: 1, count: 8, },
        rook: { symbol: "R", points: 2, count: 2, },
        knight: { symbol: "N", points: 2, count: 2, },
        bishop: { symbol: "B", points: 2, count: 2, },
        queen: { symbol: "Q", points: 5, count: 1, },
        king: { symbol: "K", points: 30, count: 1, },
    };
    for (const position of positions) {
        const [col, row] = position.split('');
        if (!([8, 7, 2, 1].includes(+row))) continue;
        const box = document.getElementById(position);
        const piece = document.createElement("div");
        piece.id = ["piece", +row < 4 ? "white" : "black", position].join('-');
        piece.className = "piece" + (+row < 4 ? "-black" : '');
        if ([8, 1].includes(+row)) {
            switch (col) {
                case 'A': case 'H':
                    piece.textContent = pieces["rook"]["symbol"];
                    break;
                case 'B': case 'G':
                    piece.textContent = pieces["knight"]["symbol"];
                    break
                case 'C': case 'F':
                    piece.textContent = pieces["bishop"]["symbol"];
                    break;
                default:
                    piece.textContent =
                        +row === 8 ?
                            col === 'D'
                                ? pieces["queen"]["symbol"]
                                : pieces["king"]["symbol"]
                            : col === 'D'
                                ? pieces["king"]["symbol"]
                                : pieces["queen"]["symbol"];
            }
        } else piece.textContent = pieces["pawn"]["symbol"];
        box?.appendChild(piece);
    }
}
