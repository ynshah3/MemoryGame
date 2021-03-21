// Global Variables and constants
let pattern = [2, 2, 4, 3, 2, 1, 2, 4];
let progress = 0;
let gamePlaying = false;
let tonePlaying = false;
let volume = 0.5;
let guessCounter = 0;

const CLUEHOLDTIME = 1000;
const CLUEPAUSETIME = 333;
const NEXTCLUEWAITTIME = 1000;

/**
 * Start the game upon clicking start button
 */
function startGame() {
  progress = 0;
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
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

// Sound Synthesis Functions
const FREQMAP = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2
};

/**
 * Start playing tone for button for specified time
 * @param btn button number {1-4}
 * @param len time length to play tone
 */
function playTone(btn, len) {
  o.frequency.value = FREQMAP[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}

/**
 * Start playing tone for specified button
 * @param btn button number
 */
function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = FREQMAP[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}

/**
 * Stop playing tone
 */
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

// Page Initialization
// Init Sound Synthesizer
let context = new AudioContext();
let o = context.createOscillator();
let g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

// Link audio to buttons
document.getElementById("button1").addEventListener("mousedown", () => {
  startTone(1);
});
document.getElementById("button1").addEventListener("mouseup", stopTone);

document.getElementById("button2").addEventListener("mousedown", () => {
  startTone(2);
});
document.getElementById("button2").addEventListener("mouseup", stopTone);

document.getElementById("button3").addEventListener("mousedown", () => {
  startTone(3);
});
document.getElementById("button3").addEventListener("mouseup", stopTone);

document.getElementById("button4").addEventListener("mousedown", () => {
  startTone(4);
});
document.getElementById("button4").addEventListener("mouseup", stopTone);

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
    playTone(btn, CLUEHOLDTIME);
    setTimeout(clearButton, CLUEHOLDTIME, btn);
  }
}

/**
 * Play sequence of clues
 */
function playClueSequence() {
  guessCounter = 0;
  let delay = NEXTCLUEWAITTIME;
  for (let i = 0; i <= progress; i++) {
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]);
    delay += CLUEHOLDTIME;
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
  console.log("user guessed: " + btn);
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
    loseGame();
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
