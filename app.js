/* ---------- Hitung Mundur ---------- */
/* hitung mundur 1 minggu dari detik ini */
const launchDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance < 0) {
    document.getElementById("countdown").innerHTML =
      "<p style='grid-column:1/-1'>🚀 Sudah Rilis!</p>";
    clearInterval(countdownInterval); // hentikan interval
    return;
  }

  const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent    = String(days).padStart(2, '0');
  document.getElementById("hours").textContent   = String(hours).padStart(2, '0');
  document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
};

// Jalankan sekarang & setiap detik
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

/* ---------- Form Notifikasi ---------- */
document.getElementById("notify-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = this.querySelector("input[type='email']").value.trim();
  if (!email) return;
  alert(`Terima kasih! Kami akan kabari ${email} saat sudah rilis.`);
  this.reset();
});

/* ---------- Partikel Background ---------- */
const canvas = document.createElement("canvas");
const ctx    = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
Object.assign(canvas.style, {
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: -1
});
document.body.appendChild(canvas);

const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.2,
  d: Math.random() * 0.4 + 0.1
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 208, 132, 0.08)";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.d;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ---------- Resize Canvas ---------- */
window.addEventListener("resize", () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});
