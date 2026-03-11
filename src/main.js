const gamesContainer = document.getElementById("games-container");

const games = ["Chess Game", "Ping Pong", "Snake Game",];
const gamesBasePath = "src/games";
const stylesPath = "src/styles";

document.addEventListener("DOMContentLoaded", () => {
    const popup = (() => {
        const div = document.createElement("div");
        div.className = "popup";
        document.body.appendChild(div);
        return {
            isOpen() {
                return div.classList.contains("active");
            },
            open(title) {
                div.textContent = title;
                div.classList.add("active");
            },
            close() {
                div.textContent = '';
                div.classList.remove("active");
            },
        }
    })();

    if (gamesContainer) {
        for (const game of games) {
            const div = document.createElement("div");
            const name = game.replace(' ', '');
            div.textContent = game;
            div.className = "game-container";
            loadScript(`${gamesBasePath}/${name}/index.js`)
                .then(() => window[`start${name}`]())
                .catch(() => console.error(`Failed to load '${game}' game.`));
            loadStyle(`${stylesPath}/${name}.css`)
                .then(() => console.log(`Successfully load styles for '${game}'`))
                .catch(() => console.error(`Failed to load '${game}' styles.`));
            gamesContainer.appendChild(div);
        }
    }

    document.querySelector(".popup").addEventListener("click", () => {
        popup.close();
    });

    document.querySelectorAll(".game-container")?.forEach(gameContainer => {
        gameContainer.addEventListener("click", () => {
            if (popup.isOpen()) popup.close();
            else popup.open(gameContainer.textContent);
        });
    });
});

function loadScript(path, parentID = null) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = path;
        script.type = "module";
        script.onload = resolve;
        script.onerror = reject;
        parentID
            ? document.getElementById(parentID).appendChild(script)
            : document.body.appendChild(script);
    });
}

function loadStyle(path, parentID = null) {
    return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = path;
        link.onload = resolve;
        link.onerror = reject;
        parentID
            ? document.getElementById(parentID).appendChild(link)
            : document.head.appendChild(link);
    });
}