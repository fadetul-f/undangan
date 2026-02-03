const urlParams = new URLSearchParams(window.location.search);
const tamu = urlParams.get("to");
if (tamu) {
  document.getElementById("guestName").value = tamu.replaceAll("+", " ");
}

const form = document.getElementById("invitationForm");
const previewGallery = document.getElementById("previewGallery");
const galleryGrid = document.getElementById("galleryGrid");
const exampleGrid = document.getElementById("exampleGrid");
const applyChangesButton = document.getElementById("applyChanges");

const examples = [
  {
    title: "Minimalis Elegan",
    coupleName: "Alya & Fajar",
    brideName: "Alya Rahma",
    groomName: "Fajar Pratama",
    eventDate: "18 Januari 2026",
    eventTime: "09.00 WIB",
    eventVenue: "Gedung Serbaguna Mahkota, Bandung",
    gallery: ["./images/couple1.jpeg", "./images/couple2.jpeg", "./images/couple.png"],
  },
  {
    title: "Outdoor Garden",
    coupleName: "Rani & Dimas",
    brideName: "Rani Putri",
    groomName: "Dimas Ardiansyah",
    eventDate: "21 Februari 2026",
    eventTime: "15.30 WIB",
    eventVenue: "Taman Sukma, Yogyakarta",
    gallery: ["./images/couple2.jpeg", "./images/couple1.jpeg", "./images/couple.png"],
  },
  {
    title: "Akad & Resepsi Hangat",
    coupleName: "Nabila & Reza",
    brideName: "Nabila Salsabila",
    groomName: "Reza Alfarizi",
    eventDate: "10 Maret 2026",
    eventTime: "10.00 WIB",
    eventVenue: "Hotel Nusantara, Surabaya",
    gallery: ["./images/couple.png", "./images/couple1.jpeg", "./images/couple2.jpeg"],
  },
];

const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  timer: document.getElementById("timer"),
};

let countdownInterval;
let targetDate = new Date("December 7, 2025 13:00:00").getTime();

const parseGallery = (value) =>
  value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);

const updateFields = (data) => {
  document.querySelectorAll("[data-field='coupleName']").forEach((el) => {
    el.textContent = data.coupleName || "";
  });
  document.querySelectorAll("[data-field='brideName']").forEach((el) => {
    el.textContent = data.brideName || "";
  });
  document.querySelectorAll("[data-field='groomName']").forEach((el) => {
    el.textContent = data.groomName || "";
  });
  document.querySelectorAll("[data-field='eventDate']").forEach((el) => {
    el.textContent = data.eventDate || "";
  });
  document.querySelectorAll("[data-field='eventTime']").forEach((el) => {
    el.textContent = data.eventTime || "";
  });
  document.querySelectorAll("[data-field='eventVenue']").forEach((el) => {
    el.textContent = data.eventVenue || "";
  });
};

const renderGallery = (images) => {
  previewGallery.innerHTML = "";
  galleryGrid.innerHTML = "";
  images.forEach((src, index) => {
    const previewImg = document.createElement("img");
    previewImg.src = src;
    previewImg.alt = `Preview ${index + 1}`;
    previewGallery.appendChild(previewImg);

    const galleryImg = document.createElement("img");
    galleryImg.src = src;
    galleryImg.alt = `Galeri ${index + 1}`;
    galleryImg.className = "gallery-item";
    galleryGrid.appendChild(galleryImg);
  });
};

const updateCountdownTarget = (dateText, timeText) => {
  const parsedDate = Date.parse(`${dateText} ${timeText}`);
  if (!Number.isNaN(parsedDate)) {
    targetDate = parsedDate;
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
  }
};

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = targetDate - now;
  const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

  countdownElements.days.textContent = String(days).padStart(2, "0");
  countdownElements.hours.textContent = String(hours).padStart(2, "0");
  countdownElements.minutes.textContent = String(minutes).padStart(2, "0");
  countdownElements.seconds.textContent = String(seconds).padStart(2, "0");

  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownElements.timer.innerHTML = "Sudah Berlangsung";
  }
};

const getFormData = () => ({
  coupleName: document.getElementById("coupleName").value.trim(),
  brideName: document.getElementById("brideName").value.trim(),
  groomName: document.getElementById("groomName").value.trim(),
  eventDate: document.getElementById("eventDate").value.trim(),
  eventTime: document.getElementById("eventTime").value.trim(),
  eventVenue: document.getElementById("eventVenue").value.trim(),
  gallery: parseGallery(document.getElementById("galleryUrls").value),
});

const applyFormData = (data) => {
  updateFields(data);
  renderGallery(data.gallery);
  updateCountdownTarget(data.eventDate, data.eventTime);
};

const setFormValues = (data) => {
  document.getElementById("coupleName").value = data.coupleName;
  document.getElementById("brideName").value = data.brideName;
  document.getElementById("groomName").value = data.groomName;
  document.getElementById("eventDate").value = data.eventDate;
  document.getElementById("eventTime").value = data.eventTime;
  document.getElementById("eventVenue").value = data.eventVenue;
  document.getElementById("galleryUrls").value = data.gallery.join("\n");
  applyFormData(data);
};

const renderExamples = () => {
  exampleGrid.innerHTML = "";
  examples.forEach((example, index) => {
    const card = document.createElement("div");
    card.className = "example-card";

    const info = document.createElement("div");
    info.innerHTML = `<strong>${example.title}</strong><br><span>${example.coupleName}</span>`;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Gunakan";
    button.addEventListener("click", () => setFormValues(example));

    card.appendChild(info);
    card.appendChild(button);
    exampleGrid.appendChild(card);
  });
};

form.addEventListener("input", () => {
  applyFormData(getFormData());
});

applyChangesButton.addEventListener("click", () => {
  applyFormData(getFormData());
  document.getElementById("invitation").scrollIntoView({ behavior: "smooth" });
});

renderExamples();
applyFormData(getFormData());
countdownInterval = setInterval(updateCountdown, 1000);
