/*
 * Author: Ngozi Young
 * Date: July 22, 2021
 * Description: A ping pong score keeper game for two players. The first player to reach the 'Playing To' score wins the game. Updating the 'Playing To' score mid game will reset the game. The 'Playing To' score ranges from 3-11.
 */
const playtoSelect = document.querySelector('#playto');
const resetButton = document.querySelector('#reset');
const winnerMsg = document.querySelector('#winner');
const scoreBoard = document.querySelector('#scoreBoard');
let winningScore = parseInt(playtoSelect.value);
let isGameOver = false;
let gameRound = 1;

const player1 = {
    id: 1,
    score: 0,
    display: document.querySelector('#p1Display'),
    button: document.querySelector('#p1Button'),
    scores: [],
};
const player2 = {
    id: 2,
    score: 0,
    display: document.querySelector('#p2Display'),
    button: document.querySelector('#p2Button'),
    scores: [],
};

/* Updates the score and score display depending on which player button was clicked
 * - if Player One button is clicked, player1 and player2 objects are passed as agruments 
 * to the player and opponent parameters respectfully, and
 * - if player Two button is clicked, the objects reversed (player2 and player1) are passed
 * as arguments to the player and opponent parameters respectfully.
*/
function updateScores(player, opponent) {
    if(!isGameOver) {
        player.score += 1;
        if(player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            updateScoreBoard(player, opponent);
        }
        player.display.textContent = player.score;
    }
}
// Update score board after a player wins a game
function updateScoreBoard(player, opponent) {
    scoreBoard.rows[gameRound].cells[player.id].innerText = player.score;
    scoreBoard.rows[gameRound].cells[opponent.id].innerText = opponent.score;
    player.scores.push(1);
    opponent.scores.push(0);
    gameRound += 1;
    if(gameRound > 3) {
        annouceWinner(player, opponent);
    }
}

// Displays to screen the player that wins best out of three games
function annouceWinner(player, opponent) {
    let winnerId = (tally(player.scores) > tally(opponent.scores)) ? player.id : opponent.id;
    winnerMsg.textContent = `***Player ${winnerId} is the winner!!!***`
}

function tally(scores) {
    let total = 0;
    for(let score of scores) {
        total += score;
    }
    return total;
}

// Resets only the score board after playing three games
function resetScoreBoard() {
    gameRound = 1;
    for(let i=1; i<scoreBoard.rows.length; i++) {
        for(let j=1; j<scoreBoard.rows[i].cells.length; j++)
            scoreBoard.rows[i].cells[j].textContent = '-';
    }
    player1.scores = [];
    player2.scores = [];
    winnerMsg.textContent = '';
}

// Resets only the score display when reset button is clicked
function reset() {
    const players = [player1, player2];
    isGameOver = false;
    for(let player of players) {
        player.score = 0;
        player.display.textContent = 0;
        player.display.classList.remove('has-text-success', 'has-text-danger');
    }
    if(gameRound > 3) resetScoreBoard()
}

// Player One and Play Two buttons events
player1.button.addEventListener('click', function() {
    updateScores(player1, player2);
});
player2.button.addEventListener('click', function() {
    updateScores(player2, player1);
});

// Resets the game when a different 'Playing To' value is selected
playtoSelect.addEventListener('input', function() {
    winningScore = parseInt(playtoSelect.value);
    reset();
});

resetButton.addEventListener('click', reset);