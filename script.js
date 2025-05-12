const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const toggleBtn = document.getElementById("toggle-theme");
const historyList = document.getElementById("history-list");

let history = [];

function updateHistory(result) {
  if (!result) return;

  history.unshift(result); // add new result to top
  if (history.length > 20) history.pop(); // keep max 20

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item}`;
    historyList.appendChild(li);
  });
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("clear")) {
      display.value = "";
    } else if (button.classList.contains("backspace")) {
      display.value = display.value.slice(0, -1);
    } else if (button.classList.contains("equal")) {
      try {
        const result = eval(display.value);
        updateHistory(`${display.value} = ${result}`);
        display.value = result;
      } catch {
        display.value = "Error";
      }
    } else {
      display.value += value;
    }
  });
});

// Theme toggle
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});
