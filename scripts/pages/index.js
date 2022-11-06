    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json

        // fetch les datas
        let response = await fetch("data/photographers.json")
        let datas = await response.json()

        // et bien retourner le tableau photographers seulement une fois
        return datas.photographers;
    }

    async function displayData(photographers) { 
        const photographersSection = document.querySelector(".photographer_section");     
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        await displayData(photographers);
    }
    
    init();
    