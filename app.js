/* ---------- Hitung Mundur 10 Hari (Tetap) ---------- */
const LS_KEY = 'countdownTarget_v2';
let launchDate = localStorage.getItem(LS_KEY);

if (!launchDate) {
  launchDate = new Date().getTime() + 10 * 24 * 60 * 60 * 1000; // 10 hari ke depan
  localStorage.setItem(LS_KEY, launchDate);
}
launchDate = Number(launchDate);

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    // Tampilkan pesan sejenak lalu redirect
    document.getElementById("countdown").innerHTML =
      "<p style='grid-column:1/-1'>🚀 Sedang mengalihkan...</p>";
    setTimeout(() => {
      window.location.replace("https://shoutaverse-capital-group.wasmer.app"); // <-- ganti URL rilis
    }, 1500);
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
const ctx = canvas.getContext("2d");
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

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
