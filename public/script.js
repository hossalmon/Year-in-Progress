// === Track Progress State ===
let activeMode = "year";
const heading = document.querySelector("h1");
const progressText = document.getElementById("text");
const progressBar = document.getElementById("progress");

// === Handle Mode Buttons (Day, Week, Month) ===
document.querySelectorAll(".mode-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.getAttribute("data-feature");

    if (selected === activeMode) {
      // Clicking the same button again: reset to "year"
      activeMode = "year";

      document.querySelectorAll(".mode-btn").forEach((b) =>
        b.classList.remove("active")
      );

      const { percent, label, headingText } = updateProgress();
      applyProgress(percent, label, headingText);
    } else {
      activeMode = selected;

      document.querySelectorAll(".mode-btn").forEach((b) =>
        b.classList.remove("active")
      );
      btn.classList.add("active");

      const { percent, label, headingText } = updateProgress();
      applyProgress(percent, label, headingText);
    }
  });
});



// === Return Progress Info Based on Active Mode ===
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

// === Apply Progress Visually ===
function applyProgress(percent, label, headingText) {
  requestAnimationFrame(() => {
    heading.textContent = headingText;
    progressText.innerHTML = label;
    progressBar.style.transition = "width 1.2s ease-in-out, filter 0.3s ease-in-out";
    progressBar.style.width = `${percent}%`;
  });
}

// === Animate on Page Load ===
window.addEventListener("DOMContentLoaded", () => {
  const defaultBtn = document.querySelector(`.mode-btn[data-feature="${activeMode}"]`);
  if (defaultBtn) defaultBtn.classList.add("active");

  const { percent, label, headingText } = updateProgress();
  progressBar.style.transition = "none";
  progressBar.style.width = "0%";
  void progressBar.offsetWidth;

  progressBar.style.transition = "width 2s ease-in-out, filter 0.3s ease-in-out";
  setTimeout(() => {
    applyProgress(percent, label, headingText);
  }, 50);
});

// === Update Every Second ===
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

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

const quoteBtn = document.querySelector('[data-feature="quote"]');
const quoteBox = document.getElementById("quote-box");
const quoteText = document.getElementById("quote-text");

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


// ===== HOURGLASS DVD TOGGLE =====
const dvdBtn = document.querySelector('[data-feature="dvd"]');
const dvd = document.getElementById("dvd");

if (dvdBtn) {
  dvdBtn.addEventListener("click", () => {
    dvdBtn.classList.toggle("active");
    const isActive = dvdBtn.classList.contains("active");
    dvd.style.display = isActive ? "block" : "none";
    isActive ? moveDVD() : cancelAnimationFrame(animationFrame);
  });
}

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
