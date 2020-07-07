const word = document.getElementById('word'),
      text = document.getElementById('text'),
      scoreEl = document.getElementById('score'),
      timeEl = document.getElementById('time'),
      endgameEl = document.getElementById('end-game-container'),
      settingsBtn = document.getElementById('settings-btn'),
      settings = document.getElementById('settings'),
      settingsForm = document.getElementById('settings-form'),
      difficutlySelect = document.getElementById('difficulty');


 // List of words for game
 
 const words = [
     'sigh',
     'tense',
     'airplane',
     'ball',
     'pies',
     'juice',
     'warlike',
     'bad',
     'north',
     'dependent',
     'steer',
     'silver',
     'highfalutin',
     'superficial',
     'quince',
     'eight',
     'feeble',
     'admit',
     'drag',
     'loving'
 ];

 // Init word
 let randomWord;

 // Initialize score
 let score = 0;

 // Init the time
 let time = 10;

 // Set difficulty to value in local storage or medium
 let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

 // Set difficulty select value
 difficutlySelect.value =  localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

 // Focus on text on start
 text.focus(); //when you refresh the page, it goes directly to the input instead of by clicking it

 // Start counting down
 const timeInterval = setInterval(updateTime, 1000);

 // Generate random word from array
 function getRandomWord(){
     return words[Math.floor(Math.random() * words.length)];
 }

// Add word to DOM
function addWordToDOM(){
     randomWord = getRandomWord();
     word.innerHTML = randomWord;
}

// Update score
function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

// Update time
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0){
      clearInterval(timeInterval);
      //end game
      gameOver();
    }
}

// Game over, show end screen;
function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if(insertedText === randomWord){
          addWordToDOM();
          updateScore();

      // Clear the input
       e.target.value = '';

      if(difficulty === 'hard'){
          time += 2;
      } else if (difficulty === 'medium'){
          time += 3;
      } else time += 5;

       updateTime();
    }
});

// Settings button click
settingsBtn.addEventListener('click', () => 
    settings.classList.toggle('hide'));

    //Settings select
    settingsForm.addEventListener('change', e => {
        difficulty = e.target.value;
        localStorage.setItem('difficulty', difficulty);
    });
