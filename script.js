const urlParams = new URLSearchParams(window.location.search);
const tamu = urlParams.get("to");
if (tamu) {
  document.getElementById("guestName").value = tamu.replaceAll("+", " ");
}

const formInputs = {
  brideName: document.getElementById("inputBrideName"),
  groomName: document.getElementById("inputGroomName"),
  eventDate: document.getElementById("inputEventDate"),
  eventTime: document.getElementById("inputEventTime"),
  eventLocation: document.getElementById("inputEventLocation"),
  gallery: document.getElementById("inputGallery"),
};

const previewElements = {
  coupleName: document.getElementById("coupleName"),
  eventDateText: document.getElementById("eventDateText"),
  eventDateHeading: document.getElementById("eventDateHeading"),
  eventLocationText: document.getElementById("eventLocationText"),
  brideName: document.getElementById("brideName"),
  groomName: document.getElementById("groomName"),
  eventTimeText: document.getElementById("eventTimeText"),
  eventTimeSecondary: document.getElementById("eventTimeSecondary"),
  eventLocationDetail: document.getElementById("eventLocationDetail"),
  eventLocationSecondary: document.getElementById("eventLocationSecondary"),
  galleryGrid: document.getElementById("galleryGrid"),
  closingCouple: document.getElementById("closingCouple"),
  closingDate: document.getElementById("closingDate"),
  previewCouple: document.getElementById("previewCouple"),
  previewTime: document.getElementById("previewTime"),
  previewLocation: document.getElementById("previewLocation"),
  previewGallery: document.getElementById("previewGallery"),
};

const sampleInvitations = [
  {
    brideName: "Alya",
    groomName: "Reza",
    eventDate: "2025-08-16",
    eventTime: "10:00",
    eventLocation: "Hotel Savanna, Ballroom Mahoni, Surabaya",
    gallery: ["./images/couple.png", "./images/wanita.png", "./images/pria.png"],
  },
  {
    brideName: "Dinda",
    groomName: "Yoga",
    eventDate: "2025-11-02",
    eventTime: "18:30",
    eventLocation: "Grand Hall Arwana, Jl. Anggrek No. 12, Bandung",
    gallery: ["./images/pria.png", "./images/couple.png", "./images/wanita.png"],
  },
  {
    brideName: "Salsa",
    groomName: "Naufal",
    eventDate: "2026-01-20",
    eventTime: "15:30",
    eventLocation: "Taman Pinus Estate, Bogor",
    gallery: ["./images/wanita.png", "./images/couple.png", "./images/pria.png"],
  },
];

const defaultData = {
  brideName: "Istiqomah",
  groomName: "Muhammad Faruq",
  eventDate: "2025-12-07",
  eventTime: "13:00",
  eventLocation: "Kediaman mempelai putri, Dusun Morpao, Kalean, Tanah Merah Laok",
  gallery: ["./images/couple.png", "./images/wanita.png", "./images/pria.png"],
};

let targetDate = null;

const timerElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

function formatDateLong(dateValue) {
  if (!dateValue) return "Tentukan tanggal";
  const parsed = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "Tentukan tanggal";
  return parsed.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateShort(dateValue) {
  if (!dateValue) return "Tentukan tanggal";
  const parsed = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "Tentukan tanggal";
  return parsed.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(timeValue) {
  if (!timeValue) return "Tentukan jam";
  const [hours, minutes] = timeValue.split(":");
  if (!hours || !minutes) return "Tentukan jam";
  return `${hours}.${minutes} WIB`;
}

function parseGallery(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderGallery(container, items) {
  container.innerHTML = "";
  if (!items.length) {
    const placeholder = document.createElement("div");
    placeholder.className = "gallery-placeholder";
    placeholder.textContent = "Tambahkan link foto di dashboard.";
    container.appendChild(placeholder);
    return;
  }

  items.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Foto galeri";
    img.loading = "lazy";
    container.appendChild(img);
  });
}

function setTargetDate(dateValue, timeValue) {
  if (!dateValue || !timeValue) {
    targetDate = null;
    return;
  }
  const parsed = new Date(`${dateValue}T${timeValue}:00`);
  if (Number.isNaN(parsed.getTime())) {
    targetDate = null;
    return;
  }
  targetDate = parsed;
}

function updateCountdown() {
  if (!targetDate) {
    timerElements.days.textContent = "--";
    timerElements.hours.textContent = "--";
    timerElements.minutes.textContent = "--";
    timerElements.seconds.textContent = "--";
    return;
  }

  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance < 0) {
    timerElements.days.textContent = "00";
    timerElements.hours.textContent = "00";
    timerElements.minutes.textContent = "00";
    timerElements.seconds.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timerElements.days.textContent = days.toString().padStart(2, "0");
  timerElements.hours.textContent = hours.toString().padStart(2, "0");
  timerElements.minutes.textContent = minutes.toString().padStart(2, "0");
  timerElements.seconds.textContent = seconds.toString().padStart(2, "0");
}

function buildEventTimeText(dateValue, timeValue) {
  const dateText = formatDateShort(dateValue);
  const timeText = formatTime(timeValue);
  if (dateText === "Tentukan tanggal" && timeText === "Tentukan jam") {
    return "Tentukan tanggal dan jam acara";
  }
  return `${dateText} / ${timeText}`;
}

function updateInvitation(data) {
  const coupleText = `${data.brideName} & ${data.groomName}`;
  const longDate = formatDateLong(data.eventDate);
  const shortDate = formatDateShort(data.eventDate);
  const timeText = formatTime(data.eventTime);
  const eventTimeText = buildEventTimeText(data.eventDate, data.eventTime);

  previewElements.coupleName.textContent = coupleText;
  previewElements.eventDateText.textContent = shortDate;
  previewElements.eventDateHeading.textContent = longDate;
  previewElements.eventLocationText.textContent = data.eventLocation;
  previewElements.brideName.textContent = data.brideName;
  previewElements.groomName.textContent = data.groomName;
  previewElements.eventTimeText.textContent = eventTimeText;
  previewElements.eventTimeSecondary.textContent = `${eventTimeText} - Selesai`;
  previewElements.eventLocationDetail.textContent = data.eventLocation;
  previewElements.eventLocationSecondary.textContent = data.eventLocation;
  previewElements.closingCouple.textContent = coupleText;
  previewElements.closingDate.textContent = shortDate;

  previewElements.previewCouple.textContent = coupleText;
  previewElements.previewTime.textContent = `${longDate} • ${timeText}`;
  previewElements.previewLocation.textContent = data.eventLocation;

  renderGallery(previewElements.galleryGrid, data.gallery);
  renderGallery(previewElements.previewGallery, data.gallery);

  setTargetDate(data.eventDate, data.eventTime);
  updateCountdown();
}

function getFormData() {
  const galleryItems = parseGallery(formInputs.gallery.value);
  return {
    brideName: formInputs.brideName.value.trim() || defaultData.brideName,
    groomName: formInputs.groomName.value.trim() || defaultData.groomName,
    eventDate: formInputs.eventDate.value || defaultData.eventDate,
    eventTime: formInputs.eventTime.value || defaultData.eventTime,
    eventLocation: formInputs.eventLocation.value.trim() || defaultData.eventLocation,
    gallery: galleryItems.length ? galleryItems : defaultData.gallery,
  };
}

function applyData(data) {
  formInputs.brideName.value = data.brideName;
  formInputs.groomName.value = data.groomName;
  formInputs.eventDate.value = data.eventDate;
  formInputs.eventTime.value = data.eventTime;
  formInputs.eventLocation.value = data.eventLocation;
  formInputs.gallery.value = data.gallery.join("\n");
  updateInvitation(data);
}

Object.values(formInputs).forEach((input) => {
  input.addEventListener("input", () => {
    updateInvitation(getFormData());
  });
});

const sampleButtons = document.querySelectorAll(".sample-card");
sampleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sampleIndex = Number(button.dataset.sample || 0);
    const sample = sampleInvitations[sampleIndex] || sampleInvitations[0];
    applyData(sample);
  });
});

applyData(defaultData);
setInterval(updateCountdown, 1000);
