// Track toggle state
let activeMode = "year"; // default
const heading = document.querySelector("h1");
const progressText = document.getElementById("text");
const progressBar = document.getElementById("progress");

// Dropdown references
const modeToggle = document.querySelector(".mode-toggle");
const modeOptions = document.querySelector(".mode-options");

// Dropdown toggle
modeToggle.addEventListener("click", () => {
  const isVisible = modeOptions.style.display === "block";
  modeOptions.style.display = isVisible ? "none" : "block";
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".mode-dropdown")) {
    modeOptions.style.display = "none";
  }
});

// Handle dropdown mode selection
document.querySelectorAll(".mode-option").forEach(btn => {
  btn.addEventListener("click", () => {
    activeMode = btn.getAttribute("data-feature");

    // Update UI
    document.querySelectorAll(".mode-option").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    updateProgress();
    modeOptions.style.display = "none";
  });
});



// Define update logic
function updateProgress() {
  const now = new Date();
  let percent, label;

  if (activeMode === "day") {
    const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    percent = (secondsSinceMidnight / 86400) * 100;
    label = `${now.toLocaleDateString()} is <span class="highlight">${percent.toFixed(4)}%</span> complete.`;
    heading.textContent = "Day in Progress";

  } else if (activeMode === "week") {
    const dayOfWeek = now.getDay(); // Sunday = 0, Saturday = 6
    const secondsToday = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const totalSeconds = (dayOfWeek * 86400) + secondsToday;
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

// Toggle Button Stuff
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const feature = btn.getAttribute("data-feature");

    if (feature === "dvd") {
      btn.classList.toggle("active");
      const isActive = btn.classList.contains("active");
      dvd.style.display = isActive ? "block" : "none";
      if (isActive) moveDVD(); else cancelAnimationFrame(animationFrame);
    }

    if (["day", "week", "month"].includes(feature)) {
      if (currentMode === feature) {
        // Toggle off — return to year
        currentMode = "year";
      } else {
        currentMode = feature;
      }

      // Update active button states
      document.querySelectorAll(".toggle-btn").forEach(b => {
        const f = b.getAttribute("data-feature");
        if (["day", "week", "month"].includes(f)) {
          b.classList.toggle("active", f === currentMode);
        }
      });

      updateProgress();
    }
  });
});



// ✅ THEN start updating every second
updateProgress(); // call once on page load
setInterval(updateProgress, 1000);



// Get the hourglass element 
const dvd = document.getElementById("dvd");
let x = 100, y = 100, dx = 2, dy = 2;
let dvdWidth = 80, dvdHeight = 40;
let animationFrame;

const margin = 10; // edge buffer

function moveDVD() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  x += dx;
  y += dy;

  // Bounce off edges
  if (x + dvdWidth >= vw - margin || x <= margin) dx = -dx;
  if (y + dvdHeight >= vh - margin || y <= margin) dy = -dy;

  // Clamp within viewport
  x = Math.min(Math.max(x, margin), vw - dvdWidth - margin);
  y = Math.min(Math.max(y, margin), vh - dvdHeight - margin);

  // === Create sand trail ===
  const sandDot = document.createElement("div");
  sandDot.classList.add("sand-trail");
  sandDot.style.left = x + dvdWidth / 2 + "px";
  sandDot.style.top = y + dvdHeight / 2 + "px";
  document.body.appendChild(sandDot);

  setTimeout(() => {
    sandDot.remove();
  }, 1000); // matches CSS animation duration

  // Apply position
  dvd.style.left = x + "px";
  dvd.style.top = y + "px";

  // Loop
  animationFrame = requestAnimationFrame(moveDVD);
}

