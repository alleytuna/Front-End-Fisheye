/* eslint-disable no-unused-vars */

function photographerFactory(data) {
    const { name, portrait, id, country, city, tagline, price } = data;
    const article = document.createElement( 'article' );
    const h1 = document.createElement( 'h1' );
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    // set id in URL
    const url = new URL('./photographer.html?id='+id, document.location);

    h1.textContent = name;
    h2.textContent = [city, (" ") + country];
    h3.textContent = tagline;


  function contactCard() {
    article.append(h1, h2, h3);
    return(article);
  }

    function getUserCardDOM() {
        const linkAndArticle = document.createElement('a');
        const picture = `assets/photographers/portrait/${portrait}`;
        const img = document.createElement( 'img' );
        const h4 = document.createElement('h4');

        linkAndArticle.setAttribute("href", url);
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        h4.textContent = [price + ("€/jour")];

        article.append(img, h1, h2, h3, h4);
        linkAndArticle.append(article);
        return (linkAndArticle);
    }
    return { getUserCardDOM, contactCard }
}