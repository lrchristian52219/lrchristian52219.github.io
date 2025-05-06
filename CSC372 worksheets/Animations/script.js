document.getElementById("animate").addEventListener("click", divtransform);
function divtransform(event) {
    let myDiv = event.currentTarget;
    myDiv.style.transform = "translate(100px, 100px)";
}

function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
}

function createRandomKeyframes() {
    const keyframes = `
        @keyframes slide {
            0% { left: ${getRandomPosition(450)}px; top: ${getRandomPosition(115)}px; }
            100% { left: ${getRandomPosition(450)}px; top: ${getRandomPosition(115)}px; }
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
}

function updateAnimation() {
    createRandomKeyframes();
    const ball = document.getElementById("ball");
    ball.style.animation = "slide 10s linear infinite";
}

document.addEventListener("DOMContentLoaded", () => {
    updateAnimation();
    const ball = document.getElementById("ball");
    ball.addEventListener("animationiteration", updateAnimation); // Update keyframes at the end of each animation cycle
});