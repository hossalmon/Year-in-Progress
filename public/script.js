// Track toggle state
let activeMode = "year";
const heading = document.querySelector("h1");
const progressText = document.getElementById("text");
const progressBar = document.getElementById("progress");

// References
const modeToggle = document.querySelector(".mode-toggle");
const modeOptions = document.querySelector(".mode-options");
const modeDropdown = document.querySelector(".mode-dropdown");

// Show dropdown on hover
modeDropdown.addEventListener("mouseenter", () => {
  modeOptions.style.display = "block";
});
modeDropdown.addEventListener("mouseleave", () => {
  modeOptions.style.display = "none";
});

// Toggle between active mode and reset to "year" when clicking the toggle
modeToggle.addEventListener("click", () => {
  if (activeMode !== "year") {
    activeMode = "year";
    modeToggle.classList.remove("active");

    document.querySelectorAll(".mode-option").forEach(b => b.classList.remove("active"));

    const { percent, label, headingText } = updateProgress();
    applyProgress(percent, label, headingText);

    modeOptions.style.display = "none";
  }
});

// Handle dropdown selection
document.querySelectorAll(".mode-option").forEach(btn => {
  btn.addEventListener("click", () => {
    const selected = btn.getAttribute("data-feature");

    if (selected !== activeMode) {
      activeMode = selected;

      document.querySelectorAll(".mode-option").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      modeToggle.classList.add("active");

      const { percent, label, headingText } = updateProgress();
      applyProgress(percent, label, headingText);
    }

    modeOptions.style.display = "none";
  });
});

// Return progress info based on activeMode
function updateProgress() {
  const now = new Date();
  let percent, label, headingText;

  if (activeMode === "day") {
    const seconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    percent = (seconds / 86400) * 100;
    label = `${now.toLocaleDateString()} is <span class="highlight">${percent.toFixed(6)}%</span> complete.`;
    headingText = "Day in Progress";
  } else if (activeMode === "week") {
    const day = now.getDay();
    const secondsToday = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const totalSeconds = day * 86400 + secondsToday;
    percent = (totalSeconds / (7 * 86400)) * 100;
    label = `This week is <span class="highlight">${percent.toFixed(6)}%</span> complete.`;
    headingText = "Week in Progress";
  } else if (activeMode === "month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const total = end - start;
    const elapsed = now - start;
    percent = (elapsed / total) * 100;
    label = `${now.toLocaleString('default', { month: 'long' })} is <span class="highlight">${percent.toFixed(6)}%</span> complete.`;
    headingText = "Month in Progress";
  } else {
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const total = end - start;
    const elapsed = now - start;
    percent = (elapsed / total) * 100;
    label = `${now.getFullYear()} is <span class="highlight">${percent.toFixed(6)}%</span> complete.`;
    headingText = "Year in Progress";
  }

  return { percent, label, headingText };
}

// Visually update the bar, text, and heading
function applyProgress(percent, label, headingText) {
  requestAnimationFrame(() => {
    heading.textContent = headingText;
    progressText.innerHTML = label;

    progressBar.style.transition = "width 1.2s ease-in-out, filter 0.3s ease-in-out";
    progressBar.style.width = `${percent}%`;
  });
}


// Animate progress on page load
window.addEventListener("DOMContentLoaded", () => {
  const { percent, label, headingText } = updateProgress();

  // Reset and reflow bar
  progressBar.style.transition = "none";
  progressBar.style.width = "0%";
  void progressBar.offsetWidth;

  // Animate and apply UI updates
  progressBar.style.transition = "width 2s ease-in-out, filter 0.3s ease-in-out";
  setTimeout(() => {
    applyProgress(percent, label, headingText);
  }, 50);
});

setInterval(() => {
  const { percent, label, headingText } = updateProgress();
  applyProgress(percent, label, headingText);
}, 1000);





// ===== RANDOM QUOTE TOGGLE =====

const quotes = [
  "Small steps every day add up to big change.",
  "Discipline is remembering what you want.",
  "The secret of getting ahead is getting started.",
  "Success is the sum of small efforts repeated daily.",
  "You don’t have to be extreme, just consistent.",
  "Push yourself, because no one else is going to do it for you.",
  "Done is better than perfect.",
  "It always seems impossible until it’s done.",
  "Your future is created by what you do today, not tomorrow.",
  "A year from now, you’ll wish you started today.",
  "The journey of a thousand miles begins with a single step.",
  "You are what you do, not what you say you’ll do.",
  "Motivation gets you going. Discipline keeps you growing.",
  "Show up. That’s half the battle.",
  "Create before you consume.",
  "Progress, not perfection.",
  "Momentum beats motivation.",
  "You won’t always be motivated. You must learn to be disciplined.",
  "Simplicity is the ultimate sophistication.",
  "Don’t wait for opportunity. Create it."
];

// Helper to get a random quote
function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// DOM elements
const quoteBtn = document.querySelector('[data-feature="quote"]');
const quoteBox = document.getElementById("quote-box");
const quoteText = document.getElementById("quote-text");

// Toggle event
quoteBtn.addEventListener("click", () => {
  const isVisible = quoteBox.style.display === "block";

  if (isVisible) {
    quoteBox.style.display = "none";
    quoteBtn.classList.remove("active");
  } else {
    quoteText.textContent = `"${getRandomQuote()}"`;
    quoteBox.style.display = "block";
    quoteBtn.classList.add("active");
  }
});







// Hourglass toggle
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const feature = btn.getAttribute("data-feature");
    if (feature === "dvd") {
      btn.classList.toggle("active");
      const isActive = btn.classList.contains("active");
      dvd.style.display = isActive ? "block" : "none";
      isActive ? moveDVD() : cancelAnimationFrame(animationFrame);
    }
  });
});

// Initial and repeating updates
updateProgress();
setInterval(updateProgress, 1000);

// Bouncing DVD logic ***inactive***
const dvd = document.getElementById("dvd");
let x = 100, y = 100, dx = 2, dy = 2;
let dvdWidth = 80, dvdHeight = 40;
let animationFrame;
const margin = 10;

function moveDVD() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  x += dx;
  y += dy;

  if (x + dvdWidth >= vw - margin || x <= margin) dx = -dx;
  if (y + dvdHeight >= vh - margin || y <= margin) dy = -dy;

  x = Math.min(Math.max(x, margin), vw - dvdWidth - margin);
  y = Math.min(Math.max(y, margin), vh - dvdHeight - margin);

  const sandDot = document.createElement("div");
  sandDot.classList.add("sand-trail");
  sandDot.style.left = x + dvdWidth / 2 + "px";
  sandDot.style.top = y + dvdHeight / 2 + "px";
  document.body.appendChild(sandDot);

  setTimeout(() => sandDot.remove(), 1000);

  dvd.style.left = x + "px";
  dvd.style.top = y + "px";

  animationFrame = requestAnimationFrame(moveDVD);
}



