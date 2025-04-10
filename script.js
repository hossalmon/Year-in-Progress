function updateProgressBar() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const progress = ((now - start) / (end - start)) * 100;
  
    document.getElementById("progress").style.width = `${progress}%`;
    document.getElementById("text").innerHTML =
  `${now.getFullYear()} is <span class="highlight">${progress.toFixed(6)}%</span> complete.`;

  }
  
// Initial update
updateProgressBar();

// Update every second (or change this interval as you like)
setInterval(updateProgressBar, 1000);


// DVD Bounce Toggle
const dvd = document.getElementById("dvd");
const toggleDVD = document.getElementById("toggle-dvd");

let x = 100;
let y = 100;
let dx = 2;
let dy = 2;
let dvdWidth = 80;
let dvdHeight = 40;
let animationFrame;

const margin = 10; // space from edge

toggleDVD.addEventListener("change", () => {
  if (toggleDVD.checked) {
    dvd.style.display = "block";
    moveDVD();
  } else {
    dvd.style.display = "none";
    cancelAnimationFrame(animationFrame);
  }
});

function moveDVD() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  x += dx;
  y += dy;

  // Bounce logic with margin
  if (x + dvdWidth >= vw - margin || x <= margin) dx = -dx;
  if (y + dvdHeight >= vh - margin || y <= margin) dy = -dy;

  // Clamp to prevent going off screen
  x = Math.min(Math.max(x, margin), vw - dvdWidth - margin);
  y = Math.min(Math.max(y, margin), vh - dvdHeight - margin);

  // 🟠 Create sand trail
  const sandDot = document.createElement("div");
  sandDot.classList.add("sand-trail");
  sandDot.style.left = x + dvdWidth / 2 + "px";
  sandDot.style.top = y + dvdHeight / 2 + "px";
  document.body.appendChild(sandDot);

  // Remove sand dot after fade-out animation
  setTimeout(() => {
    sandDot.remove();
  }, 1000);

  dvd.style.left = x + "px";
  dvd.style.top = y + "px";

  animationFrame = requestAnimationFrame(moveDVD);
}
