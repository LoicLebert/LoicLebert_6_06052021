const main = document.querySelector("main");

// this function displays the photographers on pages
function displayPhotographer(photographerData) {
    // photographer form
    const photographerForm = document.createElement("span")
    photographerForm.classList.add("photographerForm")
    photographerForm.innerHTML = `Contactez-moi
    ${photographerData.name}`
    document.querySelector(".formBg").appendChild(photographerForm)

    // photographer profile creation
    const photographerProfile = document.createElement('div')
    photographerProfile.classList.add("photographerProfile")

    // photographer text infos container
    const photographerInfos = document.createElement("div")
    photographerInfos.classList.add("photographerInfos")

    // add photographer link
    const photographerLink = document.createElement("h2")
    photographerLink.classList.add("photographerName")
    photographerLink.innerHTML = `${photographerData.name}`;
    photographerInfos.appendChild(photographerLink)

    const photographerLocation = document.createElement("div")
    photographerLocation.classList.add("photographerLocation")
    photographerLocation.innerHTML = `${photographerData.city}, ${photographerData.country}`
    photographerInfos.appendChild(photographerLocation)

    // add photographer tagline
    const photographerTagline = document.createElement("P")
    photographerTagline.classList.add("tagline")
    photographerTagline.innerText = photographerData.tagline
    photographerInfos.appendChild(photographerTagline)

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
    photographerInfos.appendChild(photographerTagsContainer)

    // add photographer portrait
    const photographerPortrait = document.createElement("img")
    photographerPortrait.src = `/images/Photographers ID Photos/${photographerData.portrait}`
    photographerProfile.appendChild(photographerPortrait)

    photographerProfile.appendChild(formBtn)

    photographerProfile.appendChild(photographerInfos)

    // add photographer total likes
    const photographerSummary = document.querySelector(".photographerSummary")
    const likeCount = document.createElement("div")
    likeCount.innerHTML = `<i class="fas fa-heart">`
    likeCount.classList.add = ("likeCount")
    photographerSummary.appendChild(likeCount)
    const priceSummary = document.createElement("div")
    priceSummary.innerHTML = `${photographerData.price}€ / jour`
    priceSummary.classList.add("priceSummary")
    photographerSummary.appendChild(priceSummary)

    // injects photographer profile to the photographer div
    main.appendChild(photographerProfile)

}


// MEDIA SECTION
// =============================================================== //

// this function displays medias on photographer page
async function displayPhotographerMedia(media) {

    let photographer = await getPhotographerData(media.photographerId)

    // add photographer medias
    const photographerMediaContainer = document.createElement("div")
    photographerMediaContainer.classList.add("mediaContainer")
    const photographerMedia = document.createElement("img")
    const lightboxFlexDisplay = document.querySelector(".lightboxFlexDisplay")
    photographerMedia.src = `/images/${photographer.name}/${media.image}`
    photographerMedia.classList.add("photographerMedia")
    photographerMedia.setAttribute("id", `${media.id}`)
    photographerMedia.addEventListener("click", e => {
        let lightbox = document.getElementById("lightbox")
        lightbox.classList.add("active")
        let lightboxNext = document.querySelector("#lightbox_next")
        lightboxNext.classList.add("active")
        let lightboxPrev = document.querySelector("#lightbox_prev")
        lightboxPrev.classList.add("active")
        let lightboxClose = document.querySelector("#lightbox_close")
        lightboxClose.classList.add("active")
        const img = document.createElement("img")
        img.src = `/images/${photographer.name}/${media.image}`
        img.id = "lightboxImage"
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild)
        }
        lightbox.appendChild(img)
    })

    const photoDescription = document.createElement("div")
    photoDescription.classList.add("photoDescription")
    photographerMediaContainer.appendChild(photoDescription)

    const photoTitle = document.createElement("span")
    photoTitle.classList.add("photoTitle")
    photoTitle.innerHTML = `${media.title}`
    photoDescription.appendChild(photoTitle)

    const photoLike = document.createElement("div")
    photoLike.addEventListener("click", () => likeCount())
    photoLike.classList.add("photoLike")
    const likeIcon = document.createElement("span")
    likeIcon.innerHTML = `<i class="fas fa-heart"></i>`
    photoLike.appendChild(likeIcon)
    const likePara = document.createElement("p")
    likePara.classList.add("likePara")
    likePara.innerHTML = `${media.likes}`
    photoLike.appendChild(likePara)
    photoDescription.appendChild(photoLike)

    // injects photographer profile to the photographer div
    photographerMediaContainer.appendChild(photographerMedia)
    lightboxFlexDisplay.appendChild(photographerMediaContainer)
}


// this function finds photographer's id and awaits the promise to be resolved to launch displayPhotographers
async function init() {
    var searchParams = new URLSearchParams(window.location.search)
    var id = searchParams.get("id")
    let photographerData = await getPhotographerData(id)
    displayPhotographer(photographerData)
}

init()

// this function displays the photographer medias according to the id in the url
async function initMedias() {
    var searchParams = new URLSearchParams(window.location.search)
    var photographerId = searchParams.get("id")
    let photographerMedias = await getPhotographerMedia(photographerId)

    photographerMedias.forEach(photographerMedia => {
        displayPhotographerMedia(photographerMedia)
    });
}

// async function initMedias() {
//     var searchParams = new URLSearchParams(window.location.search)
//     var photographerId = searchParams.get("id")
//     let photographerMedias = await getPhotographerMedia(photographerId)

//     var last_id = 0
//     var pmedia_last = 0
//     var previous_id = 0
//     var next_id = 0

//     photographerMedias.forEach(photographerMedia => {
//         pmedia_last = 0
//         photographerMedias.forEach(pMedia => {
//             if (last_id == pMedia.id) {
//                 console.log(last_id)
//                 previous_id = last_id
//             }

//             if (pmedia_last == photographerMedia.id) {
//                 next_id = pMedia.id
//             }

//             pmedia_last = pMedia.id
//         });
//         displayPhotographerMedia(photographerMedia, previous_id, next_id)
//         last_id = photographerMedia.id
//     });
// }

initMedias()

// LIKE COUNT

// let liked = false
// let likes = `${media.likes}`

function likeCount(media) {
    media.isLiked = !media.isLiked
    media.likes += media.isLiked ? 1 : -1;

    document.querySelector(".likeA").textContent = `${media.likes}`
}

// LIGHTBOX

const photographerPageMain = document.querySelector(".photographerPageMain")
const lightbox = document.createElement("div")
lightbox.id = "lightbox"
photographerPageMain.appendChild(lightbox)

lightbox.addEventListener("click", e => {
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove("active")
})

const closeButton = document.querySelector("#lightbox_close")
closeButton.addEventListener("click", closeLightbox)

window.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        document.querySelector(".formBg").classList.remove("active")
        closeLightbox()
    }
});

function closeLightbox() {
    document.querySelector("#lightbox").classList.remove("active")
    document.querySelector("#lightbox_prev").classList.remove("active")
    document.querySelector("#lightbox_next").classList.remove("active")
    document.querySelector("#lightbox_close").classList.remove("active")
}

// PREVIOUS & NEXT BUTTONS
// const previousButton = document.querySelector("#lightbox_prev")
// previousButton.addEventListener("click", lightboxNavigation)

// const nextButton = document.querySelector("#lightbox_next")
// nextButton.addEventListener("click", lightboxNavigation)

// function lightboxNavigation(e) {
//     let new_id = this.getAttribute("mediaId")
//     var photographerId = new URLSearchParams(window.location.search).get("id")
//     changeLightbox(photographerId, new_id)
// }

// async function changeLightbox(photographerId, new_id) {
//     let data = await getPhotographerMedia(photographerId)
//     let last_id = 0
//     let previous_id = 0
//     let next_id = 0
//     let img = document.getElementById("lightboxImage")
//     let s_source = img.getAttribute("src")
//     data.forEach(media => {
//         if (`${media.id}` == new_id) {
//             previous_id = last_id
//             s_source.substring(0, s_source.lastIndexOf("/")) + `${media.title}`;
//             console.log(s_source)
//             img.setAttribute("src", s_source)
//         }
//         if (last_id == new_id) {
//             next_id = `${media.id}`
//         }
//         last_id = `${media.id}`
//     })

//     // displayButtonOnLightbox(previous_id, next_id) => {

//     // }
// }

// class MediaLightbox {

//     constructor(photographer, photographerMedia, displayedMediumId) {
//         super();

//         this._photographer = photographer;
//         this._photographerMedia = photographerMedia
//         this._displayedMediumId = displayedMediumId;
//     }

//     get _displayedMedia() {
//         for (const medium of this.mediaList.media) {
//             if (medium.id == this._displayedMediumId) return medium;
//         }
//         return null;
//     }

//     get _displayedMediumIndex() {
//         for (const medium of this._mediaList.media) {
//             if (medium.id == this._displayedMediumId) {
//                 return this._mediaList.media.indexOf(medium);
//             }
//         }
//         return null;
//     }

//     get html() {
//         const displayedMediumHtml = new Dis
//     }








// class MediaLightbox {

//     static init() {
//         const links = Array.from(document.querySelector(".photographerMedia"))
//         const gallery = links.map(link => link.getAttribute("blabla"))
//         console.log(gallery)
//     }
// }


// next(e) {
//     e.preventDefault()
//     let i = this.images.findIndex(image => image === this.url)
//     this.loadImage(this.images[i + 1])
// }




