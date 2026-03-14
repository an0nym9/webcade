class Piece {
    constructor(team, position) {
        this.team = team;
        this.position = position;
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
    constructor(team, position, moved = false) {
        super(team, position);
        this.moved = moved;
        this.element = document.getElementById(`pawn-${team}-${position}`);
        this.parent = document.getElementById(position);
    }

    highlightMoves() {
        const [col, row] = this.position.split('');
        const n = Number(row);
        const distance = this.moved ? 1 : 2;
        const wside = this.team === "white";
        for (let i = -1; i <= 1; i += 2) {
            const newCol = String.fromCharCode(col.charCodeAt(0) + i);
            const box = document.getElementById(`${newCol}${wside ? n + 1 : n - 1}`);
            if (!box || !(new Array(...box.children))
                .map(child => child.className.split('-')[0])
                .includes("piece")) break;
            box.classList.add("highlighted");
        }
        for (let r = wside ? n + 1 : n - 1;
            wside ? r <= n + distance : r >= n - distance;
            wside ? r++ : r--) {
            const box = document.getElementById(`${col}${r}`);
            if (!box || (new Array(...box.children))
                .map(child => child.className.split('-')[0])
                .includes("piece")) break;
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
