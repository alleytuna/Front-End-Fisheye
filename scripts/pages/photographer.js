/* eslint-disable no-undef */

async function fetchPhotographersDatas() {
  let response = await fetch("data/photographers.json");
  let datas = await response.json();
  return datas;
}

async function getMediaById(id, datas) {
  let medias = datas.media.filter((element) => {
    return element.photographerId == id;
  });
  return medias;
}

async function getPhotographerInfoById(id, datas) {
  let photographerInfo = datas.photographers.filter((element) => {
    return element.id == id;
  });
  return photographerInfo;
}

async function displayMediaGrid(medias) {
  const mediaSection = document.querySelector(".mediaSection");
  while (mediaSection.firstChild) {
    mediaSection.removeChild(mediaSection.lastChild);
  }
  for (let i = 0; i < medias.length; i++) {
    const media = medias[i];
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaCardDOM.setAttribute("tabindex", 0);
    mediaCardDOM.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.path[0].classList == "media") {
        openLightbox(i, medias);
      }
    });
    mediaSection.appendChild(mediaCardDOM);
  }
}

function openLightbox(pos, array) {
  const lightbox = document.getElementById("lightboxSection");
  const mediaSection = document.querySelector(".mediaSection");
  const dropdownSection = document.querySelector(".dropdownSection");
  const photographHeader = document.querySelector(".photographHeader");
  const priceAndLikesSidebar = document.querySelector(".priceAndTotalLikesSidebar");

  let current = pos;
  const visualBox = document.createElement("span");
  const nextButton = document.querySelector(".nextButton");
  const prevButton = document.querySelector(".prevButton");
  let visual;
  let media;

  function createVisual(array) {
    visual.remove()
    array.video ? visual = document.createElement("video") : visual = document.createElement("img");
    array.video ? media = `assets/photographers/${array.photographerId}/${array.video}` : media = `assets/photographers/${array.photographerId}/${array.image}` 
    visual.classList.add("lightboxMedia");
  }

  // gérer la visibilité de la lightbox et des autres sections
  lightbox.style.display = "block";
  mediaSection.style.display = "none";
  dropdownSection.style.display = "none";
  photographHeader.style.display = "none";
  priceAndLikesSidebar.style.display = "none";

  // bouton pour aller à la photo suivante
  nextButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (current < array.length - 1) {
      current++;
    } else {
      current = 0;
    }
    createVisual(array[current]);
    updateLightBoxContent();
  });

  // bouton pour aller à la photo précédent
  prevButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (current > 0) {
      current--;
    } else {
      current = array.length - 1;
    }
    createVisual(array[current])
    updateLightBoxContent();
  });

  if (array[current].video) {
    visual = document.createElement("video");
    media = `assets/photographers/${array[current].photographerId}/${array[current].video}`;
  } else {
    visual = document.createElement("img");
    media = `assets/photographers/${array[current].photographerId}/${array[current].image}`;
  }
  console.log(media)
  updateLightBoxContent();

  // gérer le contenu de chaque élément
  function updateLightBoxContent() {
    visual.setAttribute("src", media);
    visual.setAttribute("alt", array[current].title);
    visualBox.appendChild(visual);
    lightbox.append(visualBox);
  }

  // attribuer des classes aux nouveaux éléments créés
  visualBox.classList.add("lightbox");
  visual.classList.add("lightboxMedia");
}

// function CloseLightbox() {
//   const lightbox = document.getElementById("lightboxSection");
//   const mediaSection = document.querySelector(".mediaSection");
//   const dropdownSection = document.querySelector(".dropdownSection");
//   const photographHeader = document.querySelector(".photographHeader");
//   lightbox.style.display = "none";
//   mediaSection.style.display = "flex";
//   dropdownSection.style.display = "flex";
//   photographHeader.style.display = "flex";
// }

async function init() {
  let params = new URL(document.location).searchParams;
  let urlId = parseInt(params.get("id"));
  let datas = await fetchPhotographersDatas();

  const media = await getMediaById(urlId, datas);
  const photographer = await getPhotographerInfoById(urlId, datas);
  const dropdownFilters = document.getElementById("dropdownList");

  dropdownFilters.addEventListener("change", function (e) {
    if (e.target.value === "popularitySort") {
      media.sort(function (a, b) {
        return new Number(b.likes) - new Number(a.likes);
      });
    }
    if (e.target.value === "dateSort") {
      media.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    }
    if (e.target.value === "titleSort") {
      media.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
    }
    displayMediaGrid(media);
  });
  displayMediaGrid(media);
  displayPhotographerInfo(photographer, media);
}

init();
