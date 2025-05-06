document.addEventListener("DOMContentLoaded", () => {
    const choices = document.querySelectorAll(".choice");
    const computerChoiceImg = document.getElementById("computer-choice");
    const resultText = document.getElementById("result");
    const winsText = document.getElementById("wins");
    const lossesText = document.getElementById("losses");
    const tiesText = document.getElementById("ties");
    let playerSelection = "";
    let wins = 0;
    let losses = 0;
    let ties = 0;
    
    const options = ["rock", "paper", "scissors"];
    const images = {
        rock: "rock.PNG",
        paper: "paper.PNG",
        scissors: "scissors.PNG",
        question: "question-mark.PNG"
    };
    
    choices.forEach(choice => {
        choice.addEventListener("click", () => {
            choices.forEach(c => c.classList.remove("selected"));
            choice.classList.add("selected");
            playerSelection = choice.getAttribute("data-choice");
            startComputerTurn();
        });
    });
    
    function startComputerTurn() {
        let shuffleCount = 0;
        let shuffleInterval = setInterval(() => {
            let randomChoice = options[Math.floor(Math.random() * options.length)];
            computerChoiceImg.src = images[randomChoice];
            shuffleCount++;
            if (shuffleCount === 10) {
                clearInterval(shuffleInterval);
                determineWinner(randomChoice);
            }
        }, 100);
    }
    
    function determineWinner(computerSelection) {
        if (playerSelection === computerSelection) {
            resultText.textContent = "RESULTS: IT'S A TIE!";
            ties++;
            tiesText.textContent = ties;
        } else if (
            (playerSelection === "rock" && computerSelection === "scissors") ||
            (playerSelection === "paper" && computerSelection === "rock") ||
            (playerSelection === "scissors" && computerSelection === "paper")
        ) {
            resultText.textContent = "RESULTS: YOU WIN!";
            wins++;
            winsText.textContent = wins;
        } else {
            resultText.textContent = "RESULTS: YOU LOSE!";
            losses++;
            lossesText.textContent = losses;
        }
    }
    
    window.resetGame = function () {
        choices.forEach(c => c.classList.remove("selected"));
        computerChoiceImg.src = images.question;
        resultText.textContent = "RESULTS:";
        playerSelection = "";
    };
});