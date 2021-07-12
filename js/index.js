// this function displays the photographers on pages
function displayPhotographers(photographerData) {
    // photographer profile creation
    const photographerContainer = document.createElement('div')
    photographerContainer.setAttribute("tagAttribute", photographerData.tags.join("|"))
    photographerContainer.classList.add("photographerContainer")

    const photographerLink = document.createElement("a")
    photographerLink.href = `/html/photographer_page.html?id=${photographerData.id}`
    photographerContainer.appendChild(photographerLink)

    // add photographer portrait
    const photographerPortrait = document.createElement("img")
    photographerPortrait.src = `/images/Photographers ID Photos/${photographerData.portrait}`
    photographerLink.appendChild(photographerPortrait)

    // add photographer link
    const photographerName = document.createElement("h2")
    photographerName.classList.add("photographerName")
    photographerName.innerHTML = `${photographerData.name}`
    photographerLink.appendChild(photographerName)

    const photographerDetails = document.createElement("div")
    photographerDetails.classList.add("photographerDetails")
    photographerContainer.appendChild(photographerDetails)

    // add photographer city
    const photographerCity = document.createElement("p")
    photographerCity.classList.add("city")
    photographerCity.innerText = photographerData.city
    photographerDetails.appendChild(photographerCity)

    // add photographer country
    const photographerCountry = document.createElement("p")
    photographerCountry.classList.add("country")
    photographerCountry.innerText = photographerData.country
    photographerDetails.appendChild(photographerCountry)

    // add photographer tagline
    const photographerTagline = document.createElement("P")
    photographerTagline.classList.add("tagline")
    photographerTagline.innerText = photographerData.tagline
    photographerDetails.appendChild(photographerTagline)

    // add photographer price
    const photographerPrice = document.createElement("p")
    photographerPrice.classList.add("price")
    photographerPrice.innerText = `${photographerData.price}€/jour`
    photographerDetails.appendChild(photographerPrice)

    // add photographer tags
    const photographerTagsContainer = document.createElement("div")
    photographerTagsContainer.classList.add("tagsContainer")
    photographerData.tags.forEach(tag => {
        const photographerTags = document.createElement("span")
        photographerTags.setAttribute("class", `${tag} tag`)
        photographerTags.setAttribute("onclick", `sortByTags('${tag}')`)
        photographerTags.innerHTML = `#${tag}`
        photographerTagsContainer.appendChild(photographerTags)
    })
    photographerDetails.appendChild(photographerTagsContainer)

    // injects photographer profile to the photographer div
    document.querySelector("#photographers").appendChild(photographerContainer)

}

// this function awaits the promise to be resolved to launch displayPhotographers
async function init() {
    let photographersData = await getPhotographersData();
    photographersData.forEach(photographerData => {
        displayPhotographers(photographerData)
    });
}

init()













