/* ---------- Konfigurasi Durasi (menit) ---------- */
const DURATION_MINUTES = 2; // <-- ubah durasi di sini
const LS_KEY_TIME = 'countdownTarget_v4';
const LS_KEY_DURATION = 'countdownDuration_v4';

/* ---------- Reset otomatis kalau durasi berubah ---------- */
const savedDuration = localStorage.getItem(LS_KEY_DURATION);
if (Number(savedDuration) !== DURATION_MINUTES) {
  localStorage.removeItem(LS_KEY_TIME);
  localStorage.setItem(LS_KEY_DURATION, DURATION_MINUTES);
}

/* ---------- Hitung waktu target ---------- */
let launchDate = localStorage.getItem(LS_KEY_TIME);
if (!launchDate) {
  launchDate = new Date().getTime() + DURATION_MINUTES * 60 * 1000;
  localStorage.setItem(LS_KEY_TIME, launchDate);
}
launchDate = Number(launchDate);

/* ---------- Update DOM ---------- */
const elDays = document.getElementById('days');
const elHours = document.getElementById('hours');
const elMinutes = document.getElementById('minutes');
const elSeconds = document.getElementById('seconds');

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    document.getElementById('countdown').innerHTML =
      '<p style="grid-column:1/-5;">🚀 Sedang mengalihkan...</p>';
    setTimeout(() => {
      window.location.replace('https://shoutaverse-capital-group.wasmer.app');
    }, 1500);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  elDays.textContent = String(days).padStart(2, '0');
  elHours.textContent = String(hours).padStart(2, '0');
  elMinutes.textContent = String(minutes).padStart(2, '0');
  elSeconds.textContent = String(seconds).padStart(2, '0');
};

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

/* ---------- Form notifikasi ---------- */
document.getElementById('notify-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value.trim();
  if (!email) return;
  alert(`Terima kasih! Kami akan kabari ${email} saat sudah rilis.`);
  this.reset();
});
