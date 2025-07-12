const submitBtn = document.getElementById("submit-btn");
const numberInput = document.getElementById("number-input");
const mainContainer = document.getElementById("main-container");
const errorMsg = document.getElementById("error-msg");

const messages = [
    "Reading minds...",
    "Analyzing human...",
    "Consulting the oracle...",
    "Crunching numbers...",
    "Making a wild guess...",
    "Calibrating brainwaves...",
    "Accessing hidden knowledge..."
];

function validateInput(value) {
    return value >= 1 && value <= 10;
}

function showThinkingWindow(userNumber) {
    document.title = "Thinking...";
    mainContainer.innerHTML = `
        <h1>Please wait...</h1>
        <div id="progress-container">
            <div id="progress-bar">
                <div id="progress-fill"></div>
            </div>
        </div>
        <p id="status-msg"></p>
    `;

    const progressFill = document.getElementById("progress-fill");
    const statusMsg = document.getElementById("status-msg");

    let progress = 0;
    let msgIndex = 0;

    const interval = setInterval(() => {
        progress += 1;
        progressFill.style.width = progress + "%";

        if (progress % 20 === 0) {
            statusMsg.textContent = messages[msgIndex % messages.length];
            msgIndex++;
        }

        if (progress >= 100) {
            clearInterval(interval);
            showResultWindow(userNumber);
        }
    }, 50);
}

function showResultWindow(userNumber) {
    document.title = "Result";
    mainContainer.innerHTML = `
        <h1>Result</h1>
        <p>You guessed: <strong>${userNumber}</strong></p>
        <button id="try-again-btn">Try Again</button>
    `;

    const tryAgainBtn = document.getElementById("try-again-btn");

    tryAgainBtn.addEventListener("click", () => {
        location.reload();
    });

    // Add Enter key listener to trigger reload on Enter key press
    document.addEventListener("keydown", function onEnter(e) {
        if (e.key === "Enter") {
            location.reload();
            document.removeEventListener("keydown", onEnter); // Clean up listener after use
        }
    });
}


function handleSubmit() {
    const userInput = numberInput.value.trim();
    const userNumber = parseFloat(userInput);

    if (userInput === "" || isNaN(userNumber)) {
        errorMsg.textContent = "Please enter a valid number.";
    } else if (!Number.isInteger(userNumber)) {
        errorMsg.textContent = "Please enter a whole number (no decimals).";
    } else if (!validateInput(userNumber)) {
        errorMsg.textContent = "Please enter a number between 1 and 10.";
    } else {
        errorMsg.textContent = "";
        showThinkingWindow(userNumber);
    }
}
submitBtn.addEventListener("click", handleSubmit);
numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleSubmit();
    }
});

document.addEventListener("keydown", (e) => {
  // If input is focused, do nothing here (letting your existing input handlers work)
  if (document.activeElement === numberInput) return;

  // Append digits 0-9 typed anywhere
  if (/^\d$/.test(e.key)) {
    numberInput.value += e.key;
  }
  // Handle Backspace key globally
  else if (e.key === "Backspace") {
    numberInput.value = numberInput.value.slice(0, -1);
  }
  // If Enter pressed anywhere, trigger submit
  else if (e.key === "Enter") {
    handleSubmit();
  }
});
