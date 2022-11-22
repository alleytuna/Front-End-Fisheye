/* eslint-disable no-unused-vars */

function mediaFactory(data) {
  const { photographerId, image, likes, video, title } = data;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    const lightboxVisualBox = document.createElement("span");
    const textBox = document.createElement("span");
    const h2 = document.createElement("h2");
    const likeBox = document.createElement("span");
    const numberOfLikes = document.createElement("h2");
    const heart = document.createElement("img");
    const heartIcon = `assets/icons/heart-plain.svg`;
    let visual;
    let media;
    let likeTotal = likes;
    let alreadyClicked = false;

    if (video) {
      visual = document.createElement("video");
      media = `assets/photographers/${photographerId}/${video}`;
    } else {
      visual = document.createElement("img");
      media = `assets/photographers/${photographerId}/${image}`;
    }
    visual.setAttribute("src", media);
    visual.setAttribute("alt", title);
    visual.classList.add("media");
    lightboxVisualBox.appendChild(visual);

    h2.textContent = title;
    h2.classList.add("mediaTitle");

    heart.setAttribute("src", heartIcon);
    heart.setAttribute("class", "heart");
    numberOfLikes.textContent = likeTotal;
    numberOfLikes.classList.add("numberLikesBlack");

    heart.addEventListener("click", function (e) {
      let totalLikes = document.querySelector(".totalLikes");
      if (alreadyClicked == true) {
        numberOfLikes.innerHTML = --likeTotal;
        --totalLikes.textContent;
        numberOfLikes.classList.remove("numberLikesRed");
        alreadyClicked = false;
      } else {
        numberOfLikes.innerHTML = ++likeTotal;
        ++totalLikes.textContent;
        numberOfLikes.classList.add("numberLikesRed");
        alreadyClicked = true;
      }
    });

    likeBox.append(numberOfLikes, heart);
    likeBox.classList.add("likeBox");

    textBox.append(h2, likeBox);
    textBox.classList.add("textBox");
    article.append(lightboxVisualBox, textBox);
    return article;
  }

  return { getMediaCardDOM, likes };
}
