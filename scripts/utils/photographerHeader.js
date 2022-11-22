/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

async function displayPhotographerInfo(photographer, media) {
  const photographerHeaderInfo = document.querySelector(
    ".photographerHeaderInfo"
  );
  const photographerHeaderPhoto = document.querySelector(
    ".photographerHeaderPortrait"
  );

  const priceAndLikesSidebar = document.querySelector(
    ".priceAndTotalLikesSidebar"
  );
  const picture = `assets/photographers/portrait/${photographer[0].portrait}`;
  const img = document.createElement("img");
  const totalLikes = document.createElement("h3");
  const likesAndHeart = document.createElement("h3");
  const price = document.createElement("h3");
  const heart = document.createElement("img");
  const heartIcon = `assets/icons/black-heart.svg`;

  heart.setAttribute("src", heartIcon);
  heart.setAttribute("class", "blackHeart");
  totalLikes.classList.add("totalLikes");
  likesAndHeart.classList.add("likesAndHeart");
  price.classList.add("photographerPrice");

  img.setAttribute("src", picture);
  const photographerModel = photographerFactory(photographer[0]);
  const contactCardDOM = photographerModel.contactCard();
  photographerHeaderInfo.appendChild(contactCardDOM);
  photographerHeaderPhoto.appendChild(img);

  totalLikes.textContent = media.reduce((total, a) => total + a.likes, 0);
  likesAndHeart.append(totalLikes, heart);
  price.textContent = `${photographer[0].price}€ / jour`;
  priceAndLikesSidebar.append(likesAndHeart, price);
}
