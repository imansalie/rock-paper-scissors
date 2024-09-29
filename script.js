// Pseudocode for Rock Paper Scissors Game

// Function to get the computer's choice:
// - Generate a random number between 0 and 2
// - If 0, return "rock"
// - If 1, return "paper"
// - If 2, return "scissors"

// Function to get the human's choice:
// - Use prompt to get input from the user
// - Return the user's choice

// Global variables:
// - Initialize humanScore to 0
// - Initialize computerScore to 0

// Function to play a single round:
// - Take humanChoice and computerChoice as parameters
// - Compare choices to determine the winner
// - Increment scores accordingly
// - Log the result

// Function to play the entire game:
// - Loop 5 times to play 5 rounds
// - Call playRound each time
// - Log the final scores and declare the overall winner


let humanScore = 0; // Global score variable for human
let computerScore = 0; // Global score variable for computer

function getComputerChoice() {
    const randomNum = Math.random();
    if (randomNum < 0.34) {
        return "rock";
    } else if (randomNum < 0.67) {
        return "paper";
    } else {
        return "scissors";
    }
}

function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase(); // Ensure case-insensitivity
    let resultMessage = '';

    if (humanChoice === computerChoice) {
        resultMessage = `It's a tie! You both chose ${humanChoice}.`;
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        humanScore++;
        resultMessage = `Heck yeah! You win! ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)} beats ${computerChoice}.`;
    } else {
        computerScore++;
        resultMessage = `BooHoo! You lose! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${humanChoice}.`;
    }

    // Update the results display
    displayResult(resultMessage);
}

function displayResult(resultMessage) {
    const resultElement = document.getElementById('result');
    resultElement.innerText += `\n${resultMessage}`; // Show the result message
    resultElement.classList.add('fade-in'); // Add class for animation

    // Update scores
    document.getElementById('humanScore').innerText = `You: ${humanScore}`;
    document.getElementById('computerScore').innerText = `Computer: ${computerScore}`;

    // Check if game has ended after 5 rounds
    if (humanScore + computerScore === 5) {
        announceWinner();
        resetGame();
    }
}

function announceWinner() {
    let finalMessage = '';
    if (humanScore > computerScore) {
        finalMessage = `You win the game! Final Score - You: ${humanScore}, Computer: ${computerScore}`;
    } else if (computerScore > humanScore) {
        finalMessage = `You lose the game! Final Score - You: ${humanScore}, Computer: ${computerScore}`;
    } else {
        finalMessage = `The game is a tie! Final Score - You: ${humanScore}, Computer: ${computerScore}`;
    }
    alert(finalMessage); // Alert the winner
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    document.getElementById('result').innerText = ''; // Clear results
    document.getElementById('humanScore').innerText = `You: ${humanScore}`;
    document.getElementById('computerScore').innerText = `Computer: ${computerScore}`;
}

// Add event listeners for the choice buttons
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.choice-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const choice = button.getAttribute('data-choice'); // Get choice from button data attribute
            const computerChoice = getComputerChoice(); // Get computer choice
            playRound(choice, computerChoice); // Play the round
        });
    });

    // Add reset game functionality
    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reset Game';
    resetButton.classList.add('button'); // Use the same styling
    resetButton.addEventListener('click', resetGame); // Call resetGame function on click
    document.getElementById('game').appendChild(resetButton); // Append the reset button
});
