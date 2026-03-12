class Piece {
    constructor(team, position, clicked = false) {
        this.team = team;
        this.position = position;
        this.clicked = clicked;
    }

    highlightMoves() {
        throw new Error("Highlight moves is not yet supported for this piece!");
    }

    removeHighlights() {
        const className = "highlighted";
        document.querySelectorAll('.' + className)
            .forEach(highlighted => {
                highlighted.classList.remove(className);
                highlighted.style.backgroundColor = '';
            });
    }
}

export class Pawn extends Piece {
    constructor(team, position, clicked, moved = false) {
        super(team, position, clicked);
        this.moved = moved;
        this.element = document.getElementById(`pawn-${team}-${position}`);
        this.parent = document.getElementById(position);
    }

    highlightMoves() {
        const [col, row] = this.position.split('');
        const n = Number(row);
        const distance = this.moved ? 1 : 2;
        const wside = this.team === "white";
        for (let r = wside ? n + 1 : n - 1;
            wside ? r <= n + distance : r >= n - distance;
            wside ? r++ : r--) {
            const box = document.getElementById(`${col}${r}`);
            if (!box) throw new Error(`Box "${col}${r}" not found.`);
            box.classList.add("highlighted");
        }
    }

    move(boxID = '') {
        const newBox = document.getElementById(boxID);
        if (!newBox) throw new Error("Unknown box!");
        this.parent.removeChild(this.element);
        newBox.appendChild(this.element);
        this.position = boxID;
        this.parent = newBox;
        if (!this.moved) this.moved = true;
    }
}
