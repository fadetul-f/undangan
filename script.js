const urlParams = new URLSearchParams(window.location.search);
const tamu = urlParams.get('to');
if (tamu) {
  document.getElementById("guestName").value = tamu.replaceAll('+', ' ');
}

const defaultInvitation = {
  brideName: "Istiqomah",
  groomName: "Muhammad Faruq",
  eventDate: "2025-12-07",
  eventTime: "13:00",
  eventVenue: "Kediaman mempelai putri, Dusun Morpao, Kalean, Tanah Merah Laok",
  galleryUrls: ["./images/couple1.jpeg", "./images/couple2.jpeg", "./images/couple.png"]
};

const samples = {
  A: {
    brideName: "Rani",
    groomName: "Bima",
    eventDate: "2026-06-15",
    eventTime: "10:00",
    eventVenue: "Grand Ballroom, Hotel Arjuna",
    galleryUrls: ["./images/couple1.jpeg", "./images/couple2.jpeg", "./images/couple.png"]
  },
  B: {
    brideName: "Najwa",
    groomName: "Adit",
    eventDate: "2025-11-03",
    eventTime: "19:00",
    eventVenue: "Taman Anggrek, Bandung",
    galleryUrls: ["./images/couple2.jpeg", "./images/couple1.jpeg", "./images/couple.png"]
  },
  C: {
    brideName: "Sari",
    groomName: "Daffa",
    eventDate: "2026-02-21",
    eventTime: "15:30",
    eventVenue: "Villa Mahoni, Lombok",
    galleryUrls: ["./images/couple.png", "./images/couple1.jpeg", "./images/couple2.jpeg"]
  }
};

const form = document.getElementById("invitationForm");
const galleryPreview = document.getElementById("galleryPreview");
const heroNames = document.getElementById("heroNames");
const heroDate = document.getElementById("heroDate");
const eventDay = document.getElementById("eventDay");
const eventTimeLabel = document.getElementById("eventTimeLabel");
const eventVenueLabel = document.getElementById("eventVenueLabel");
const brideNamePreview = document.getElementById("brideNamePreview");
const groomNamePreview = document.getElementById("groomNamePreview");
const akadDateTime = document.getElementById("akadDateTime");
const akadVenue = document.getElementById("akadVenue");
const resepsiDateTime = document.getElementById("resepsiDateTime");
const resepsiVenue = document.getElementById("resepsiVenue");
const closingNames = document.getElementById("closingNames");
const closingDate = document.getElementById("closingDate");

let countdown = null;

const formatDate = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return {
      longDate: "Tanggal belum dipilih",
      dayDate: "Tanggal belum dipilih"
    };
  }
  const longDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const dayDate = date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  return { longDate, dayDate };
};

const formatTime = (timeValue) => {
  if (!timeValue) return "Jam belum dipilih";
  return timeValue.replace(":", ".") + " WIB";
};

const updateCountdown = (targetDate) => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    clearInterval(countdown);
    countdown = null;
    document.getElementById("timer").innerHTML = "Sudah Berlangsung";
    return;
  }

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
};

const renderGallery = (urls) => {
  galleryPreview.innerHTML = "";
  const sanitized = urls.filter((url) => url.trim() !== "");
  if (sanitized.length === 0) {
    galleryPreview.innerHTML = "<p class=\"text-center text-sm text-espresso/70\">Belum ada foto galeri.</p>";
    return;
  }
  sanitized.forEach((url, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "gallery-item";
    const img = document.createElement("img");
    img.src = url;
    img.alt = `Galeri ${index + 1}`;
    wrapper.appendChild(img);
    galleryPreview.appendChild(wrapper);
  });
};

const applyInvitation = (data) => {
  const { longDate, dayDate } = formatDate(data.eventDate);
  const timeLabel = formatTime(data.eventTime);
  const fullNames = `${data.brideName} & ${data.groomName}`;

  heroNames.textContent = fullNames;
  heroDate.textContent = longDate;
  eventDay.textContent = dayDate;
  eventTimeLabel.textContent = `Pukul ${timeLabel}`;
  eventVenueLabel.textContent = data.eventVenue;
  brideNamePreview.textContent = data.brideName;
  groomNamePreview.textContent = data.groomName;
  akadDateTime.textContent = `${longDate} / ${timeLabel}`;
  akadVenue.textContent = data.eventVenue;
  resepsiDateTime.textContent = `${longDate} / ${timeLabel} - Selesai`;
  resepsiVenue.textContent = data.eventVenue;
  closingNames.textContent = fullNames;
  closingDate.textContent = longDate;

  renderGallery(data.galleryUrls);

  const targetDate = new Date(`${data.eventDate}T${data.eventTime || "00:00"}`).getTime();
  if (countdown) {
    clearInterval(countdown);
  }
  updateCountdown(targetDate);
  countdown = setInterval(() => updateCountdown(targetDate), 1000);
};

const fillForm = (data) => {
  document.getElementById("brideName").value = data.brideName;
  document.getElementById("groomName").value = data.groomName;
  document.getElementById("eventDate").value = data.eventDate;
  document.getElementById("eventTime").value = data.eventTime;
  document.getElementById("eventVenue").value = data.eventVenue;
  document.getElementById("galleryUrls").value = data.galleryUrls.join(", ");
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    brideName: document.getElementById("brideName").value.trim() || defaultInvitation.brideName,
    groomName: document.getElementById("groomName").value.trim() || defaultInvitation.groomName,
    eventDate: document.getElementById("eventDate").value || defaultInvitation.eventDate,
    eventTime: document.getElementById("eventTime").value || defaultInvitation.eventTime,
    eventVenue: document.getElementById("eventVenue").value.trim() || defaultInvitation.eventVenue,
    galleryUrls: document.getElementById("galleryUrls").value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
  };
  if (data.galleryUrls.length === 0) {
    data.galleryUrls = defaultInvitation.galleryUrls;
  }
  applyInvitation(data);
  document.getElementById("invitation").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".sample-card").forEach((card) => {
  const key = card.dataset.sample;
  const button = card.querySelector(".sample-button");
  button.addEventListener("click", () => {
    const data = samples[key];
    fillForm(data);
    applyInvitation(data);
    document.getElementById("invitation").scrollIntoView({ behavior: "smooth" });
  });
});

fillForm(defaultInvitation);
applyInvitation(defaultInvitation);
