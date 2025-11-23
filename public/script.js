const urlParams = new URLSearchParams(window.location.search);
const tamu = urlParams.get('to');
if (tamu) {
  document.getElementById("guestName").value = tamu.replaceAll('+', ' ');
}

const targetDate = new Date("December 7, 2025 13:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    if (distance < 0) {
      clearInterval(countdown);
      document.getElementById("timer").innerHTML = "Sudah Berlangsung";
    }
  }

  const countdown = setInterval(updateCountdown, 1000);