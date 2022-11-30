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
      console.log(e)
      if (e.path[0].classList == "media") {
        openLightbox(i, medias);
      }
    });
    mediaSection.appendChild(mediaCardDOM);
  }
}

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
