let chances = parseInt(localStorage.getItem('chances')) || 10;
let lastPlayedDate = localStorage.getItem('lastPlayedDate') || getTodayDate();

const input = document.getElementById('userInput');
const okBtn = document.getElementById('okBtn');
const rollingNumber = document.getElementById('rollingNumber');
const resultMessage = document.getElementById('resultMessage');
const chancesDisplay = document.getElementById('chances');

// Get today's date in YYYY-MM-DD
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Reset chances if new day
if (lastPlayedDate !== getTodayDate()) {
  chances = 10;
  lastPlayedDate = getTodayDate();
  localStorage.setItem('lastPlayedDate', lastPlayedDate);
  localStorage.setItem('chances', chances);
}

// Update UI
function updateUI() {
  chancesDisplay.textContent = chances;
  localStorage.setItem('chances', chances);
}

// Game Logic
okBtn.addEventListener('click', () => {
  const guess = parseInt(input.value);

  if (isNaN(guess) || guess < 0 || guess > 10) {
    resultMessage.textContent = "❌ Enter a number between 0 and 10.";
    resultMessage.style.color = "#ffd700";
    return;
  }

  if (chances <= 0) {
    resultMessage.textContent = "🚫 No chances left. Come back tomorrow!";
    resultMessage.style.color = "#ff4d4d";
    return;
  }

  // Start animation
  okBtn.disabled = true;
  input.disabled = true;
  resultMessage.textContent = "Rolling... 🎲";
  resultMessage.style.color = "#ffffff";

  const rollInterval = setInterval(() => {
    rollingNumber.textContent = Math.floor(Math.random() * 11 + 1  );
  }, 100);

  setTimeout(() => {
    clearInterval(rollInterval);
    const finalNumber = Math.floor(Math.random() * 11 + 1);
    rollingNumber.textContent = finalNumber;

    if (finalNumber === guess) {
      resultMessage.textContent = "🎉 Oh! You are a magician 🪄";
      resultMessage.style.color = "#00ffb3";
    } else {
      resultMessage.textContent = `❌ Oops! The number was ${finalNumber}`;
      resultMessage.style.color = "#ff4d4d";
    }

    chances--;
    updateUI();

    // Re-enable input
    okBtn.disabled = false;
    input.disabled = false;
    input.value = '';
  }, 2000);
});

// Initialize display
updateUI();
