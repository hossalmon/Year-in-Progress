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

    // Clear dropdown highlights
    document.querySelectorAll(".mode-option").forEach(b => b.classList.remove("active"));

    updateProgress();
    modeOptions.style.display = "none";
  }
});

// Handle dropdown selection
document.querySelectorAll(".mode-option").forEach(btn => {
  btn.addEventListener("click", () => {
    const selected = btn.getAttribute("data-feature");

    if (selected !== activeMode) {
      activeMode = selected;

      // Highlight correct dropdown item
      document.querySelectorAll(".mode-option").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Mark calendar toggle as active
      modeToggle.classList.add("active");

      updateProgress();
    }

    modeOptions.style.display = "none";
  });
});

// Update progress bar and label
function updateProgress() {
  const now = new Date();
  let percent, label;

  if (activeMode === "day") {
    const seconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    percent = (seconds / 86400) * 100;
    label = `${now.toLocaleDateString()} is <span class="highlight">${percent.toFixed(4)}%</span> complete.`;
    heading.textContent = "Day in Progress";

  } else if (activeMode === "week") {
    const day = now.getDay();
    const secondsToday = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const totalSeconds = day * 86400 + secondsToday;
    percent = (totalSeconds / (7 * 86400)) * 100;
    label = `This week is <span class="highlight">${percent.toFixed(2)}%</span> complete.`;
    heading.textContent = "Week in Progress";

  } else if (activeMode === "month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const total = end - start;
    const elapsed = now - start;
    percent = (elapsed / total) * 100;
    label = `${now.toLocaleString('default', { month: 'long' })} is <span class="highlight">${percent.toFixed(2)}%</span> complete.`;
    heading.textContent = "Month in Progress";

  } else {
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const total = end - start;
    const elapsed = now - start;
    percent = (elapsed / total) * 100;
    label = `${now.getFullYear()} is <span class="highlight">${percent.toFixed(6)}%</span> complete.`;
    heading.textContent = "Year in Progress";
  }

  progressBar.style.width = `${percent}%`;
  progressText.innerHTML = label;
}

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

// Bouncing DVD logic
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



