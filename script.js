function updateProgressBar() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const progress = ((now - start) / (end - start)) * 100;
  
    document.getElementById("progress").style.width = `${progress}%`;
    document.getElementById("text").textContent = `${now.getFullYear()} is ${progress.toFixed(6)}% complete.`;
  }
  
// Initial update
updateProgressBar();

// Update every second (or change this interval as you like)
setInterval(updateProgressBar, 1000);