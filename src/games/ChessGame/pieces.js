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
            ?.forEach(highlighted => {
                highlighted.classList.remove(className);
                highlighted.style.backgroundColor =
                    highlighted.classList.contains("box-shaded")
                        ? "none"
                        : "#585757";
                console.log(highlighted.id);
            });
    }
}

export class Pawn extends Piece {
    constructor(team, position, clicked, moved = false) {
        super(team, position, clicked);
        this.moved = moved;
    }

    highlightMoves() {
        const [col, row] = this.position.split('');
        const n = Number(row);
        const wside = this.team === "white";
        for (let r = wside ? n + 1 : n - 1;
            wside ? r <= n + 2 : r >= n - 2;
            wside ? r++ : r--) {
            const box = document.getElementById(`${col}${r}`);
            if (box) box.classList.add("highlighted");
        }
    }

    move() {
        if (!this.moved)
            this.moved = true;
    }
}
