/* eslint-disable no-undef */
async function getPhotographersInfo() {
  let response = await fetch("data/photographers.json");
  let datas = await response.json();
  return datas.photographers;
}

async function displayPhotographersGrid(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const photographers = await getPhotographersInfo();
  await displayPhotographersGrid(photographers);
}

init();
