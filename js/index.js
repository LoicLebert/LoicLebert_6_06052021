// this function display the photographers on pages
function displayPhotographer(photographerData) {
    // photographer profile creation
    const photographerProfile = document.createElement('div')

    // add photographer portrait
    const photographerPortrait = document.createElement("img")
    photographerPortrait.src = `/images/Photographers ID Photos/${photographerData.portrait}`
    photographerProfile.appendChild(photographerPortrait)

    // add photographer link
    const photographerLink = document.createElement("a")
    photographerLink.classList.add("nameLink")
    photographerLink.innerHTML = `<a href="../photographer_page.html"><h2>${photographerData.name}</h2></a>`;
    photographerProfile.appendChild(photographerLink)

    // add photographer city
    const photographerCity = document.createElement("p")
    photographerCity.classList.add("city")
    photographerCity.innerText = photographerData.city
    photographerProfile.appendChild(photographerCity)

    // add photographer country
    const photographerCountry = document.createElement("p")
    photographerCountry.classList.add("country")
    photographerCountry.innerText = photographerData.country
    photographerProfile.appendChild(photographerCountry)

    // add photographer tagline
    const photographerTagline = document.createElement("P")
    photographerTagline.classList.add("tagline")
    photographerTagline.innerText = photographerData.tagline
    photographerProfile.appendChild(photographerTagline)

    // add photographer price
    const photographerPrice = document.createElement("p")
    photographerPrice.classList.add("price")
    photographerPrice.innerText = `${photographerData.price}€/jour`
    photographerProfile.appendChild(photographerPrice)

    // add photographer tags
    const photographerTagsContainer = document.createElement("div")
    photographerTagsContainer.classList.add("tagsContainer")
    photographerData.tags.forEach(tag => {
        const photographerTags = document.createElement("p")
        photographerTags.classList.add("tagParagraphContainer")
        photographerTags.innerHTML = `<a class="photographerTagsFilter" href="${tag}">#${tag}</a></span>`
        photographerTagsContainer.appendChild(photographerTags)
    })
    photographerProfile.appendChild(photographerTagsContainer)

    // injects photographer profile to the photographer div
    document.getElementById("photographers").appendChild(photographerProfile)

}

// this function awaits the promise to be resolved to launch displayPhotographers
async function init() {
    let photographersData = await getPhotographersData();
    photographersData.forEach(photographerData => {
        displayPhotographer(photographerData)
    });
}

init()












