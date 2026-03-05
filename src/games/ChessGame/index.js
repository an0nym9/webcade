window.startChessGame = function () {
    console.log("Chess Game loaded.");
    loadBoard();
}

function loadBoard() {
    const board = document.createElement("div");
    const boxSize = {
        width: "50px",
        height: "50px",
    };
    board.className = "board-container";
    let shade = true;
    for (let j = 8; j >= 1; j--) {
        for (let i = 'A'.charCodeAt(0); i <= 'H'.charCodeAt(0); i++) {
            const box = document.createElement("div");
            const pos = `${String.fromCharCode(i)}${j}`;
            box.name = pos;
            box.textContent = pos;
            box.className = shade ? 'black' : '';
            board.appendChild(box);
            shade = !shade;
        }
        shade = !shade;
    }
    board.style.gridTemplateColumns = (new Array(8).fill(boxSize.width)).join(' ');
    board.style.gridTemplateRows = (new Array(8).fill(boxSize.height)).join(' ');
    document.body.appendChild(board);
}
