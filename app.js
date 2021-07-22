/*
 * Author: Ngozi Young
 * Date: July 22, 2021
 * Description: A ping pong score keeper game for two players. The first player to reach the 'Playing To' score wins the game. Updating the 'Playing To' score mid game will reset the game. The 'Playing To' score ranges from 3-11.
 */
const playtoSelect = document.querySelector('#playto');
const resetButton = document.querySelector('#reset');
let winningScore = parseInt(playtoSelect.value);
let isGameOver = false;

const player1 = {
    score:0,
    display: document.querySelector('#p1Display'),
    button: document.querySelector('#p1Button')
};
const player2 = {
    score:0,
    display: document.querySelector('#p2Display'),
    button: document.querySelector('#p2Button')
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
        }
        player.display.textContent = player.score;
    }
}

// Resets the game and score display
function reset() {
    const players = [player1, player2];
    isGameOver = false;
    for(let player of players) {
        player.score = 0;
        player.display.textContent = 0;
        player.display.classList.remove('has-text-success', 'has-text-danger');
    }
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