const stage = document.querySelector("#stage");
const panels = [...document.querySelectorAll(".panel")];
const currentEl = document.querySelector("#current");
const totalEl = document.querySelector("#total");
const progress = document.querySelector(".progress span");
const menu = document.querySelector(".menu");
const menuToggle = document.querySelector(".menu-toggle");
const brand = document.querySelector(".brand");
const modal = document.querySelector(".video-modal");
const iframe = modal.querySelector("iframe");

let current = 0;
let wheelLocked = false;

totalEl.textContent = String(panels.length).padStart(2, "0");

function goTo(index) {
  current = Math.max(0, Math.min(index, panels.length - 1));
  stage.style.transform = `translate3d(${-current * 100}vw, 0, 0)`;
  currentEl.textContent = String(current + 1).padStart(2, "0");
  progress.style.width = `${((current + 1) / panels.length) * 100}%`;

  panels.forEach((panel, i) => panel.classList.toggle("active", i === current));
  closeMenu();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

function closeMenu() {
  menu.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-hidden", "true");
}

menuToggle.addEventListener("click", () => {
  const open = !menu.classList.contains("open");
  menu.classList.toggle("open", open);
  menuToggle.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-hidden", String(!open));
});

document.querySelectorAll("[data-go]").forEach(el => {
  el.addEventListener("click", () => goTo(Number(el.dataset.go)));
});

window.addEventListener("keydown", e => {
  if (modal.classList.contains("open")) {
    if (e.key === "Escape") closeVideo();
    return;
  }

  if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
    e.preventDefault();
    next();
  }

  if (e.key === "ArrowLeft" || e.key === "PageUp") {
    e.preventDefault();
    prev();
  }

  if (e.key === "Home") {
    e.preventDefault();
    goTo(0);
  }

  if (e.key === "End") {
    e.preventDefault();
    goTo(panels.length - 1);
  }

  if (e.key === "Escape") closeMenu();
});

window.addEventListener("wheel", e => {
  if (window.innerWidth <= 800 || wheelLocked || modal.classList.contains("open")) return;
  if (Math.abs(e.deltaY) < 8 && Math.abs(e.deltaX) < 8) return;

  wheelLocked = true;
  if (e.deltaY > 0 || e.deltaX > 0) next();
  else prev();

  setTimeout(() => wheelLocked = false, 850);
}, { passive: true });

let touchStartX = 0;
let touchStartY = 0;

window.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchend", e => {
  if (window.innerWidth <= 800 || modal.classList.contains("open")) return;

  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;

  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    dx < 0 ? next() : prev();
  }
});

document.querySelectorAll(".video-link, .play-video").forEach(button => {
  button.addEventListener("click", () => openVideo(button.dataset.video));
});

function openVideo(id) {
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeVideo() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  iframe.src = "";
}

document.querySelector(".close-video").addEventListener("click", closeVideo);

modal.addEventListener("click", e => {
  if (e.target === modal) closeVideo();
});

document.addEventListener("mousemove", e => {
  document.querySelector(".cursor-dot").style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  document.querySelector(".cursor-ring").style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("hovering"));
});

goTo(0);
