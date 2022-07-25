/* eslint-disable no-unused-vars */
function mediaFactory(data) {
  const { photographerId, image, likes, video, title } = data;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    const visualBox = document.createElement("span");
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
      // créer un élément source (nav)
      visual = document.createElement("video");
      media = `assets/photographers/${photographerId}/${video}`;
    } else {
      visual = document.createElement("img");
      media = `assets/photographers/${photographerId}/${image}`;
    }
    visual.setAttribute("src", media);
    visual.setAttribute("alt", title);
    visual.classList.add("media");
    visualBox.appendChild(visual);

    h2.textContent = title;
    h2.classList.add("mediaTitle");

    heart.setAttribute("src", heartIcon);
    heart.setAttribute("class", "heart");
    numberOfLikes.textContent = likeTotal;
    numberOfLikes.classList.add("numberLikesBlack");

    // like and dislike the media only once
    heart.addEventListener("click", function (e) {
      if (alreadyClicked == true) {
        numberOfLikes.innerHTML = --likeTotal;
        numberOfLikes.classList.remove("numberLikesRed");
        alreadyClicked = false;
      } else {
        numberOfLikes.innerHTML = ++likeTotal;
        numberOfLikes.classList.add("numberLikesRed");
        alreadyClicked = true;
      }
    });

    likeBox.appendChild(numberOfLikes);
    likeBox.appendChild(heart);
    likeBox.classList.add("likeBox");

    textBox.appendChild(h2);
    textBox.appendChild(likeBox);
    textBox.classList.add("textBox");
    article.appendChild(visualBox);
    article.appendChild(textBox);

    // open carousel when clicking on media
    // visualBox.addEventListener("click", function() {
    //   const carousel = document.getElementById("carouselWrapper");
    //   const mediaSection = document.getElementById("main");
    //   const headerSection = document.getElementById("headerSection");
    //   const mediaCarousel = visual.cloneNode();
    //   mediaCarousel.classList.add("mediaCarousel");
    //   const mainPicture = document.getElementsByClassName("carouselMainImage");
    //   carousel.style.display = "block";
    //   mediaSection.style.display = "none";
    //   headerSection.style.display = "none";
    //   mainPicture[0].appendChild(mediaCarousel);

    //   // const carouselImg = document.createElement("div");
    //   // carouselImg.appendChild(mediaCarousel);
    //   // carouselMainSection.appendChild(carouselImg);
    //   // console.log(carouselImg);
    // })
    return article;
  }

  return { getMediaCardDOM, likes };
}
