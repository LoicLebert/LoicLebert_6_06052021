// this function displays the photographers on pages
function displayPhotographers(photographerData) {
    // photographer profile creation
    const photographerContainer = document.createElement('section')
    photographerContainer.setAttribute("tagAttribute", photographerData.tags.join("|"))
    photographerContainer.id = "photographerContainer"

    const photographerLink = document.createElement("a")
    photographerLink.href = `photographer_page.html?id=${photographerData.id}`
    photographerContainer.appendChild(photographerLink)

    // add photographer portrait
    const photographerPortrait = document.createElement("img")
    photographerPortrait.src = `images/Photographers ID Photos/${photographerData.portrait}`
    photographerPortrait.setAttribute("alt", "")
    photographerLink.appendChild(photographerPortrait)

    // add photographer link
    const photographerName = document.createElement("h2")
    photographerName.id = "photographerName"
    photographerName.innerHTML = `${photographerData.name}`
    photographerLink.appendChild(photographerName)
    photographerName.setAttribute("aria-label", `${photographerData.name}`)

    const photographerDetails = document.createElement("div")
    photographerDetails.setAttribute("aria-label", "photographer details")
    photographerDetails.id = "photographerDetails"
    photographerContainer.appendChild(photographerDetails)

    // add photographer city
    const photographerCity = document.createElement("p")
    photographerCity.id = "city"
    photographerCity.innerText = photographerData.city
    photographerDetails.appendChild(photographerCity)

    // add photographer country
    const photographerCountry = document.createElement("p")
    photographerCountry.id = "country"
    photographerCountry.innerText = photographerData.country
    photographerDetails.appendChild(photographerCountry)

    // add photographer tagline
    const photographerTagline = document.createElement("P")
    photographerTagline.id = "tagline"
    photographerTagline.innerText = photographerData.tagline
    photographerDetails.appendChild(photographerTagline)

    // add photographer price
    const photographerPrice = document.createElement("p")
    photographerPrice.id = "price"
    photographerPrice.innerText = `${photographerData.price}€/jour`
    photographerDetails.appendChild(photographerPrice)

    // add photographer tags
    const photographerTagsContainer = document.createElement("nav")
    photographerTagsContainer.setAttribute("tabindex", "0")
    photographerTagsContainer.id = "tagsContainer"
    photographerData.tags.forEach(tag => {
        const photographerTags = document.createElement("span")
        photographerTags.setAttribute("class", `${tag} tag`)
        photographerTags.setAttribute("onclick", `sortByTags('${tag}')`)
        photographerTags.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                sortByTags(`${tag}`)
            }
        })
        photographerTags.setAttribute("tabindex", "0")
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
    let searchParams = new URLSearchParams(window.location.search)
    let tag = searchParams.get("tag")
    if (tag) {
        sortByTags(tag)
    }
}

init()













