// this function get photographers data
async function getPhotographersData() {
    let data = await fetch("js/FishEyeData.json")
        .then(res => res.json())
        .then(jsonData => {
            return jsonData.photographers
        });
    return data
}

// this function display the photographers on pages
function displayPhotographers(photographerData) {
    // photographer profile creation
    const photographersProfile = document.createElement('div')
    // add photographer portrait
    const photographersPortrait = document.createElement("img")
    photographersPortrait.src = `/images/Photographers ID Photos/${photographerData.portrait}`
    photographersProfile.appendChild(photographersPortrait)
    // add photographer name
    const photographersName = document.createElement("P")
    photographersName.classList.add("name")
    photographersName.innerText = photographerData.name
    photographersProfile.appendChild(photographersName)
    // add photographer city
    const photographersCity = document.createElement("p")
    photographersCity.classList.add("city")
    photographersCity.innerText = photographerData.city
    photographersProfile.appendChild(photographersCity)
    // add photographer country
    const photographersCountry = document.createElement("p")
    photographersCountry.classList.add("country")
    photographersCountry.innerText = photographer.country
    photographersProfile.appendChild(photographersCountry)
    // add photographer tagline
    const photographersTagline = document.createElement("P")
    photographersTagline.classList.add("tagline")
    photographersTagline.innerText = photographerData.tagline
    photographersProfile.appendChild(photographersTagline)
    // add photographer price
    const photographersPrice = document.createElement("p")
    photographersPrice.classList.add("price")
    photographersPrice.innerText = `${photographerData.price}€/jour`
    photographersProfile.appendChild(photographersPrice)
    // add photographer tags
    const photographersTags = document.createElement("p")
    photographersTags.classList.add("tags")
    // split + href
    photographersTags.innerText = photographerData.tags.split
    photographersProfile.appendChild(photographersTags)
    // inject photographer profile to the photographer div
    document.getElementById("photographers").appendChild(photographersProfile)

}

// this function awaits the promise to be resolved to launch displayPhotographers
async function init() {
    let photographersData = await getPhotographersData();
    photographersData.forEach(photographer => {
        displayPhotographers(photographersData)
    });
}

init()

// fetch("js/FishEyeData.json")
//     .then(res => res.json())
//     .then(jsonData => {
//         console.log(jsonData)
//         const photographers = jsonData.photographers
//         jsonData.photographers.forEach(photographer => {
//             // photographer profile creation
//             const photographersProfile = document.createElement('div')
//             // add photographer portrait
//             const photographersPortrait = document.createElement("img")
//             photographersPortrait.src = `/images/Photographers ID Photos/${photographer.portrait}`
//             photographersProfile.appendChild(photographersPortrait)
//             // add photographer name
//             const photographersName = document.createElement("P")
//             photographersName.classList.add("name")
//             photographersName.innerText = photographer.name
//             photographersProfile.appendChild(photographersName)
//             // add photographer city
//             const photographersCity = document.createElement("p")
//             photographersCity.classList.add("city")
//             photographersCity.innerText = photographer.city
//             photographersProfile.appendChild(photographersCity)
//             // add photographer country
//             const photographersCountry = document.createElement("p")
//             photographersCountry.classList.add("country")
//             photographersCountry.innerText = photographer.country
//             photographersProfile.appendChild(photographersCountry)
//             // add photographer tagline
//             const photographersTagline = document.createElement("P")
//             photographersTagline.classList.add("tagline")
//             photographersTagline.innerText = photographer.tagline
//             photographersProfile.appendChild(photographersTagline)
//             // add photographer price
//             const photographersPrice = document.createElement("p")
//             photographersPrice.classList.add("price")
//             photographersPrice.innerText = `${photographer.price}€/jour`
//             photographersProfile.appendChild(photographersPrice)
//             // add photographer tags
//             const photographersTags = document.createElement("p")
//             photographersTags.classList.add("tags")
//             // split + href
//             photographersTags.innerText = photographer.tags.split
//             photographersProfile.appendChild(photographersTags)
//             // photographersTags.forEach(tag => {
//             //     tag.style.border = "0.5px solid #C4C4C4";
//             // })
//             // inject photographer profile to the photographer div
//             document.getElementById("photographers").appendChild(photographersProfile)
//         })
//     });










