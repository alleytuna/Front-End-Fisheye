/* eslint-disable no-undef */

//récupération de toutes les data de photographes
async function fetchDatas() {
  let response = await fetch("../../data/photographers.json")
  let datas = await response.json()
  return datas;
}
// récupération des médias selon l'ID de l'URL
async function getMediaById(id, datas) {
  let medias = datas.media.filter(element => {
    return element.photographerId == id
  })
  return medias;
}
// récupération des infos contact du photographe selon l'ID de l'URL
async function getPhotographerInfoById(id, datas) {
  let photographerInfo = datas.photographers.filter(element => {
    return element.id == id
  })
  return photographerInfo;
}

// mettre les info contact du photographe dans l'encart
async function displayPhotographerInfoHeader(photographer) {
  const photographerHeaderInfo = document.querySelector(".photographerHeaderInfo");
  const photographerHeaderPhoto = document.querySelector(".photographerHeaderPortrait");
  const picture = `assets/photographers/portrait/${photographer[0].portrait}`;
  const img = document.createElement( 'img' );
  img.setAttribute("src", picture);
  const photographerModel = photographerFactory(photographer[0]);
  const contactCardDOM = photographerModel.contactCard();
  photographerHeaderInfo.appendChild(contactCardDOM);
  photographerHeaderPhoto.appendChild(img);
}

// afficher les photos du photographe en mosaïque
async function displayData(medias) {
  const mediaSection = document.querySelector(".media_section");
  while (mediaSection.firstChild) {
    mediaSection.removeChild(mediaSection.lastChild);
  }
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media); 
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  let params = (new URL(document.location)).searchParams
  let urlId = parseInt(params.get('id'))
  let datas = await fetchDatas();

  const media = await getMediaById(urlId, datas);
  const photographer = await getPhotographerInfoById(urlId, datas);
  const dropdownFilters = document.getElementById("dropdownList");

  dropdownFilters.addEventListener("change", function(e) {
    if(e.target.value === "popularitySort") {
      media.sort(function(a, b){
        return new Number(b.likes) - new Number (a.likes);
      })
    }
    if(e.target.value === "dateSort") {
      media.sort(function(a, b){
        return new Date(b.date) - new Date(a.date);
      })
    }
    if(e.target.value === "titleSort") {
      media.sort(function(a, b){
        return a.title.localeCompare(b.title);
      })
    }
    displayData(media);
  })
  displayData(media);
  displayPhotographerInfoHeader(photographer);
}

init();
