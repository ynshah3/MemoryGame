// Global Variables and constants
let pattern = [];
let progress = 0;
let gamePlaying = false;
let tonePlaying = false;
let volume = 0.5;
let guessCounter = 0;
let clueHoldTime = 1000;
let mistakes = 0;

const CLUEPAUSETIME = 333;
const NEXTCLUEWAITTIME = 1000;

//Change Theme
document.getElementById("change-theme").addEventListener("click", () => {
  let theme = document.getElementById("theme");
  if (theme.href == "/style.css") {
    theme.href = "/style2.css";
  } else {
    theme.href = "/style.css";
  }
});

/**
 * Start the game upon clicking start button
 */
function startGame() {
  generateRandom();
  progress = 0;
  mistakes = 0;
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

//Randomly generate numbers
function generateRandom() {
  for (let i = 0; i < 8; i++) {
    pattern.push(Math.floor(Math.random() * 6) + 1);
  }
}

/**
 * Stop the game upon clicking stop button
 */
function stopGame() {
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

// Link buttons to event listeners
document.getElementById("startBtn").addEventListener("click", startGame);

document.getElementById("stopBtn").addEventListener("click", stopGame);

/**
 * Start playing tone for button for specified time
 * @param btn button number {1-6}
 * @param len time length to play tone
 */
function playTone(btn, len) {
  document.getElementById("audio" + btn).play();
  tonePlaying = true;
  setTimeout(function() {
    stopTone(btn);
  }, len);
}

/**
 * Start playing tone for specified button
 * @param btn button number
 */
function startTone(btn) {
  if (!tonePlaying) {
    document.getElementById("audio" + btn).play();
    tonePlaying = true;
  }
}

/**
 * Stop playing tone for specified button
 * @param btn button number
 */
function stopTone(btn) {
  document.getElementById("audio" + btn).pause();
  tonePlaying = false;
}

// Link audio to buttons
document.getElementById("button1").addEventListener("mousedown", () => {
  startTone(1);
});
document.getElementById("button1").addEventListener("mouseup", () => {
  stopTone(1);
});

document.getElementById("button2").addEventListener("mousedown", () => {
  startTone(2);
});
document.getElementById("button2").addEventListener("mouseup", () => {
  stopTone(2);
});

document.getElementById("button3").addEventListener("mousedown", () => {
  startTone(3);
});
document.getElementById("button3").addEventListener("mouseup", () => {
  stopTone(3);
});

document.getElementById("button4").addEventListener("mousedown", () => {
  startTone(4);
});
document.getElementById("button4").addEventListener("mouseup", () => {
  stopTone(4);
});

document.getElementById("button5").addEventListener("mousedown", () => {
  startTone(5);
});
document.getElementById("button5").addEventListener("mouseup", () => {
  stopTone(5);
});

document.getElementById("button6").addEventListener("mousedown", () => {
  startTone(6);
});
document.getElementById("button6").addEventListener("mouseup", () => {
  stopTone(6);
});

/**
 * Light button automatically on cue
 * @param btn button number
 */
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

/**
 * Clear lighting on button automatically on cue
 * @param btn button number
 */
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

/**
 * Play single clue on specified button
 * @param btn button number
 */
function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

/**
 * Play sequence of clues
 */
function playClueSequence() {
  guessCounter = 0;
  let delay = NEXTCLUEWAITTIME;
  for (let i = 0; i <= progress; i++) {
    setTimeout(playSingleClue, delay, pattern[i]);
    clueHoldTime -= 15;
    delay += clueHoldTime;
    delay += CLUEPAUSETIME;
  }
}

/**
 * Upon losing the game
 */
function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}

/**
 * Upon winning the game
 */
function winGame() {
  stopGame();
  alert("Game Over. You won!");
}

/**
 * Check each guess with the specified button
 * @param btn button pressed
 */
function guess(btn) {
  if (!gamePlaying) {
    return;
  }
  if (btn == pattern[guessCounter]) {
    if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        winGame();
      } else {
        progress++;
        playClueSequence();
      }
    } else {
      guessCounter++;
    }
  } else {
    mistakes++;
    if (mistakes == 3) {
      loseGame();
    } else {
      guessCounter = 0;
      alert("Your last guess was incorrect. You have " + (3 - mistakes) + " strikes left. Try again.")
    }
  }
}

// Link guessed to buttons
document.getElementById("button1").addEventListener("click", () => {
  guess(1);
});
document.getElementById("button2").addEventListener("click", () => {
  guess(2);
});
document.getElementById("button3").addEventListener("click", () => {
  guess(3);
});
document.getElementById("button4").addEventListener("click", () => {
  guess(4);
});
document.getElementById("button5").addEventListener("click", () => {
  guess(5);
});
document.getElementById("button6").addEventListener("click", () => {
  guess(6);
});
