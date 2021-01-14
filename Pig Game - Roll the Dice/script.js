var scores, roundScores, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

//document.querySelector('#current-' + activePlayer).textContent = dice;
//var x = document.querySelector('#score-0').textContent;
document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';




document.querySelector('.btn-roll').addEventListener('click', btn);

function btn() {
    // Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
        // Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // Next player
        nextPlayer();
    }
}

document.querySelector('.btn-hold').addEventListener('click', function () {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 21) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {

        // Next Player
        nextPlayer();
    }

})


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

