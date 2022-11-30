/* eslint-disable no-unused-vars */

function openLightbox(pos, array) {
  const mainSection = document.getElementById("main");
  const lightboxSection = document.querySelector(".lightboxSection");
  const mediaSection = document.querySelector(".mediaSection");
  const headerSection = document.getElementById("headerSection");

  const nextButton = document.querySelector(".nextButton");
  const prevButton = document.querySelector(".prevButton");
  const closeButton = document.querySelector(".closeLightbox");

  let media;
  let lightboxVisualBox = document.getElementById("lightboxVisualBox");
  let visual;
  let current = pos;

  lightboxSection.style.display = "flex";
  mediaSection.style.display = "none";
  mainSection.style.display = "none";
  headerSection.style.display = "none";

  lightboxSection.setAttribute('aria-hidden', 'false');
  mainSection.setAttribute('aria-hidden', 'true');

  loadLightboxVisual(array[current]);
  updateLightBoxContent();

  function loadLightboxVisual(array) {
    while (lightboxVisualBox.firstChild) {
      lightboxVisualBox.removeChild(lightboxVisualBox.firstChild);
    }
    array.video
      ? (visual = document.createElement("video"))
      : (visual = document.createElement("img"));
    array.video
      ? (media = `assets/photographers/${array.photographerId}/${array.video}`)
      : (media = `assets/photographers/${array.photographerId}/${array.image}`);
  }

  function updateLightBoxContent() {
    visual.setAttribute("src", media);
    visual.setAttribute("alt", array[current].title);
    visual.setAttribute("id", "lightboxMedia");
    lightboxVisualBox.appendChild(visual);
    lightboxSection.appendChild(lightboxVisualBox);
  }

  nextButton.addEventListener("click", function (e) {
    e.preventDefault();
    goNextSlide();
  });

  function goNextSlide() {
    if (current < array.length - 1) {
      current++;
    } else {
      current = 0;
    }
    loadLightboxVisual(array[current]);
    updateLightBoxContent();
  }

  prevButton.addEventListener("click", function (e) {
    e.preventDefault();
    goPreviousSlide();
  });

  function goPreviousSlide() {
    if (current > 0) {
      current--;
    } else {
      current = array.length - 1;
    }
    loadLightboxVisual(array[current]);
    updateLightBoxContent();
  }

  closeButton.addEventListener("click", function (e) {
    e.preventDefault();
    closeLightbox();
  });

  function closeLightbox() {
    while (lightboxVisualBox.firstChild) {
      lightboxVisualBox.removeChild(lightboxVisualBox.firstChild);
    }
    lightboxSection.style.display = "none";
    mediaSection.style.display = "grid";
    mainSection.style.display = "block";
    headerSection.style.display = "block";
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      goPreviousSlide();
    }
    if (e.key === "ArrowRight") {
      goNextSlide();
    }
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
}
