//récupération de toutes les data de photographes
async function fetchDatas() {
  let response = await fetch("data/photographers.json");
  let datas = await response.json();
  return datas;
}

// récupération des médias selon l'ID de l'URL
async function getMediaById(id, datas) {
  let medias = datas.media.filter((element) => {
    return element.photographerId == id;
  });
  return medias;
}

// récupération des infos contact du photographe selon l'ID de l'URL
async function getPhotographerInfoById(id, datas) {
  let photographerInfo = datas.photographers.filter((element) => {
    return element.id == id;
  });
  return photographerInfo;
}

// mettre les info contact du photographe dans l'encart
async function displayPhotographerInfo(photographer, media) {
  const photographerHeaderInfo = document.querySelector(
    ".photographerHeaderInfo"
  );
  const photographerHeaderPhoto = document.querySelector(
    ".photographerHeaderPortrait"
  );
  
  const priceAndLikesSidebar = document.querySelector(".priceAndTotalLikesSidebar");
  const picture = `assets/photographers/portrait/${photographer[0].portrait}`;
  const img = document.createElement("img");
  const totalLikes = document.createElement("h3");
  const price = document.createElement("h3");
  const heart = document.createElement("img");
  const heartIcon = `assets/icons/black-heart.svg`;

  heart.setAttribute("src", heartIcon);
  heart.setAttribute("class", "blackHeart");

  img.setAttribute("src", picture);
  const photographerModel = photographerFactory(photographer[0]);
  const contactCardDOM = photographerModel.contactCard();
  photographerHeaderInfo.appendChild(contactCardDOM);
  photographerHeaderPhoto.appendChild(img);

  totalLikes.textContent = media.reduce((total, a) => total + a.likes, 0);
  totalLikes.appendChild(heart)
  price.textContent = `${photographer[0].price}€ / jour`;
  priceAndLikesSidebar.append(totalLikes, price);
}

// afficher les photos du photographe en mosaïque
async function displayData(medias) {
  const mediaSection = document.querySelector(".mediaSection");
  while (mediaSection.firstChild) {
    mediaSection.removeChild(mediaSection.lastChild);
  }
  for (let i = 0; i < medias.length; i++) {
    const media = medias[i];
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaCardDOM.addEventListener("click", function (e) {
      console.log(e)
      // if on clique sur la carte, ça fait openlightbox, sinon
      e.preventDefault();
      openLightbox(i, medias);
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
  // Récupère les datas des photographes
  let params = new URL(document.location).searchParams;
  let urlId = parseInt(params.get("id"));
  let datas = await fetchDatas();

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
    displayData(media);
  });
  displayData(media);
  displayPhotographerInfo(photographer, media);
}

init();
