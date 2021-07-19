const main = document.querySelector("main")
let currentImagePosition = 0
let listMedias = []
let totalLikes = 0

// this function displays the photographers on pages
function displayPhotographerInfos(photographerData) {
    // photographer form
    formTitle = document.querySelector("#form-title")
    formTitle.innerHTML = `Contactez-moi ${photographerData.name}`
    document.querySelector("#title-close").appendChild(formTitle)

    // photographer text infos container
    const photographerInfos = document.createElement("div")
    photographerInfos.id = "photographerInfos"

    // add photographer link
    const photographerLink = document.createElement("h2")
    photographerLink.id = "photographerName"
    photographerLink.innerHTML = `${photographerData.name}`
    document.querySelector("#photographerInfos").appendChild(photographerLink)

    const photographerLocation = document.createElement("div")
    photographerLocation.id = "photographerLocation"
    photographerLocation.innerHTML = `${photographerData.city}, ${photographerData.country}`
    document.querySelector("#photographerInfos").appendChild(photographerLocation)

    // add photographer tagline
    const photographerTagline = document.createElement("P")
    photographerTagline.id = "tagline"
    photographerTagline.innerText = photographerData.tagline
    document.querySelector("#photographerInfos").appendChild(photographerTagline)

    photographerData.tags.forEach(tag => {
        const photographerTags = document.createElement("span")
        photographerTags.setAttribute("id", `${tag} tag`)
        photographerTags.setAttribute("tabindex", "2")
        photographerTags.addEventListener("click", () => sortByTagsPhotographerPage(tag))
        photographerTags.addEventListener("keydown", function (e) {
            if (event.key === "Enter") {
                sortByTagsPhotographerPage(tag)
            }
        })
        photographerTags.innerHTML = `#${tag}`
        document.querySelector("#tagsContainer").appendChild(photographerTags)
    })

    // add photographer portrait
    const photographerPortrait = document.createElement("img")
    photographerPortrait.src = `/images/Photographers ID Photos/${photographerData.portrait}`
    document.querySelector("#photographerProfile").appendChild(photographerPortrait)
    photographerPortrait.setAttribute("alt", "")

    document.querySelector("#photographerProfile").appendChild(formBtn)
    document.querySelector("#totalLikesCount").innerHTML = totalLikes
    document.querySelector("#priceSummary").innerHTML = `${photographerData.price}€ / jour`

}


// MEDIA SECTION
// =============================================================== //

// this function displays medias on photographer page
async function displayPhotographerMedia(photographerMedias, index, countLike = 0) {

    let photographer = await getPhotographerData(photographerMedias[index].photographerId)

    // add photographer medias
    const photographerMediaContainer = document.createElement("a")
    photographerMediaContainer.classList.add("mediaContainer")
    photographerMediaContainer.setAttribute("id", `container${photographerMedias[index].id}`)
    photographerMediaContainer.setAttribute("href", `#`)

    // creates media's content
    if (photographerMedias[index].video) {
        const photographerVideo = document.createElement("video")
        photographerVideo.setAttribute("aria-label", `${photographerMedias[index].title}`)
        photographerVideo.setAttribute("alt", `${photographerMedias[index].description}`)
        photographerVideo.setAttribute("tabindex", "0")

        const lightboxFlexDisplay = document.querySelector("#lightboxFlexDisplay")

        photographerVideo.src = `/images/${photographer.name}/${photographerMedias[index].video}`
        photographerVideo.id = "video"

        photographerVideo.addEventListener("click", lightboxVideoCreation)
        photographerVideo.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                lightboxVideoCreation()
            }
        })

        const videoDescription = document.createElement("figcaption")
        videoDescription.id = "videoDescription"
        photographerMediaContainer.appendChild(videoDescription)

        const videoTitle = document.createElement("span")
        videoTitle.setAttribute("aria-label", "video title")
        videoTitle.id = "videoTitle"
        videoTitle.innerHTML = `${photographerMedias[index].title}`
        videoDescription.appendChild(videoTitle)

        const videoLikes = document.createElement("div")
        videoLikes.setAttribute("aria-label", "number of likes of the video")
        videoLikes.addEventListener("click", () => likeCount(photographerMedias, index))
        videoLikes.id = "videoLike"
        const likeIcon = document.createElement("span")
        likeIcon.setAttribute("aria-label", "like heart icon")
        likeIcon.classList.add("heart-icon")
        videoLikes.appendChild(likeIcon)
        const likePara = document.createElement("p")
        likePara.setAttribute("aria-label", "likes")
        likePara.id = "likePara"
        likePara.innerHTML = `${photographerMedias[index].likes}`
        if (countLike == 1) {
            document.querySelector("#totalLikesCount").innerText = parseInt(document.querySelector("#totalLikesCount").innerText) + photographerMedias[index].likes
        }
        videoLikes.appendChild(likePara)
        videoDescription.appendChild(videoLikes)

        // injects photographer profile to the photographer div
        photographerMediaContainer.appendChild(photographerVideo)
        lightboxFlexDisplay.appendChild(photographerMediaContainer)
    }
    else if (photographerMedias[index].image) {
        const photographerImage = document.createElement("img")
        photographerImage.setAttribute("aria-label", `${photographerMedias[index].title}`)
        photographerImage.setAttribute("alt", `${photographerMedias[index].description}`)
        photographerImage.setAttribute("tabindex", "0")

        const lightboxFlexDisplay = document.querySelector("#lightboxFlexDisplay")

        photographerImage.src = `/images/${photographer.name}/${photographerMedias[index].image}`
        photographerImage.id = "image"

        photographerImage.addEventListener("click", lightboxImageCreation)
        photographerImage.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                lightboxImageCreation()
            }
        })

        const photoDescription = document.createElement("figcaption")
        photoDescription.id = "photoDescription"
        photographerMediaContainer.appendChild(photoDescription)

        const photoTitle = document.createElement("span")
        photoTitle.setAttribute("aria-label", "video title")
        photoTitle.id = "photoTitle"
        photoTitle.innerHTML = `${photographerMedias[index].title}`
        photoDescription.appendChild(photoTitle)

        const photoLikes = document.createElement("div")
        photoLikes.setAttribute("aria-label", "number of likes of the image")
        photoLikes.addEventListener("click", () => likeCount(photographerMedias, index))
        photoLikes.id = "photoLike"
        const likeIcon = document.createElement("span")
        likeIcon.setAttribute("aria-label", "like heart icon")
        likeIcon.classList.add("heart-icon")
        photoLikes.appendChild(likeIcon)
        const likePara = document.createElement("p")
        likePara.setAttribute("aria-label", "likes")
        likePara.id = "likePara"
        likePara.innerHTML = `${photographerMedias[index].likes}`
        if (countLike == 1) {
            document.querySelector("#totalLikesCount").innerText = parseInt(document.querySelector("#totalLikesCount").innerText) + photographerMedias[index].likes
        }
        photoLikes.appendChild(likePara)
        photoDescription.appendChild(photoLikes)

        // injects photographer profile to the photographer div
        photographerMediaContainer.appendChild(photographerImage)
        lightboxFlexDisplay.appendChild(photographerMediaContainer)
    }

    function lightboxVideoCreation() {
        currentImagePosition = index
        document.querySelector("#lightboxImage").style.display = "none"
        document.querySelector("#lightboxVideo").style.display = "flex"
        document.querySelector("#photographerSummary").style.display = "none"
        document.querySelector("body").classList.add("lightbox")
        let lightboxBg = document.querySelector("#lightbox-bg")
        lightboxBg.classList.add("active")
        let lightbox = document.getElementById("lightbox")
        lightbox.classList.add("active")
        let lightboxNext = document.querySelector("#lightbox_next")
        lightboxNext.classList.add("active")
        let lightboxPrev = document.querySelector("#lightbox_prev")
        lightboxPrev.classList.add("active")
        let lightboxClose = document.querySelector("#lightbox_close")
        lightboxClose.classList.add("active")
        let lightboxVideo = document.querySelector("#lightboxVideo")
        lightboxVideo.src = `/images/${photographer.name}/${photographerMedias[index].video}`
        lightboxVideo.setAttribute("photographerName", photographer.name)
        lightboxImage.setAttribute("photographerName", photographer.name)
    }

    function lightboxImageCreation() {
        currentImagePosition = index
        document.querySelector("#lightboxImage").style.display = "flex"
        document.querySelector("#lightboxVideo").style.display = "none"
        document.querySelector("#photographerSummary").style.display = "none"
        document.querySelector("body").classList.add("lightbox")
        let lightboxBg = document.querySelector("#lightbox-bg")
        lightboxBg.classList.add("active")
        let lightbox = document.getElementById("lightbox")
        lightbox.classList.add("active")
        let lightboxNext = document.querySelector("#lightbox_next")
        lightboxNext.classList.add("active")
        let lightboxPrev = document.querySelector("#lightbox_prev")
        lightboxPrev.classList.add("active")
        let lightboxClose = document.querySelector("#lightbox_close")
        lightboxClose.classList.add("active")
        let lightboxImage = document.querySelector("#lightboxImage")
        lightboxImage.src = `/images/${photographer.name}/${photographerMedias[index].image}`
        lightboxImage.setAttribute("photographerName", photographer.name)
    }
}

async function displayAllMedias(photographerMedias, countLike = 0) {
    document.querySelector("#lightboxFlexDisplay").innerHTML = ""
    for (let i = 0; i < photographerMedias.length; i++) {
        await displayPhotographerMedia(photographerMedias, i, countLike)
    }
}

let photographerData = []

// this function displays the photographer medias according to the id in the url
async function init() {
    totalLikes = 0
    photographerList = getPhotographersData()
    var searchParams = new URLSearchParams(window.location.search)
    var photographerId = searchParams.get("id")
    listMedias = await getPhotographerMedia(photographerId)
    let photographerData = await getPhotographerData(photographerId)
    displayAllMedias(listMedias, 1)
    displayPhotographerInfos(photographerData)
}

init()

// LIKE COUNT
function likeCount(photographerMedias, index) {
    event.preventDefault()
    photographerMedias[index].isLiked = !photographerMedias[index].isLiked
    photographerMedias[index].likes += photographerMedias[index].isLiked ? 1 : -1;
    document.querySelector("#totalLikesCount").innerText = parseInt(document.querySelector("#totalLikesCount").innerText) + (photographerMedias[index].isLiked ? 1 : -1);
    document.querySelector(`#container${photographerMedias[index].id} #likePara`).textContent = `${photographerMedias[index].likes}`
}

// LIGHTBOX

const photographerPageMain = document.querySelector("#photographerPageMain")
const lightbox = document.createElement("section")
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
        document.querySelector("#formBg").classList.remove("active")
        closeLightbox()
    }
});

function closeLightbox() {
    // document.querySelector("#lightbox, #lightbox_prev, #lightbox_next, #lightbox_close").classList.remove("active")
    document.querySelector("#lightbox").classList.remove("active")
    document.querySelector("#lightbox_prev").classList.remove("active")
    document.querySelector("#lightbox_next").classList.remove("active")
    document.querySelector("#lightbox_close").classList.remove("active")
    document.querySelector("#photographerSummary").style.display = "flex"
    document.querySelector("#lightbox-bg").classList.remove("active")
    document.querySelector("body").classList.remove("lightbox")
}

document.querySelector("#lightbox_prev").addEventListener("click", lightboxPrev)
document.querySelector("#lightbox_next").addEventListener("click", lightboxNext)

window.addEventListener("keydown", function (e) {
    if (e.key == "ArrowLeft") {
        lightboxPrev()
    }
})
window.addEventListener("keydown", function (e) {
    if (e.key == "ArrowRight") {
        lightboxNext()
    }
})

function lightboxPrev() {
    console.log(`${lightboxImage.getAttribute("photographerName")}`)
    if (currentImagePosition > 0) {
        currentImagePosition--
        if (listMedias[currentImagePosition].video) {
            let lightboxVideo = document.querySelector("#lightboxVideo")
            lightboxVideo.src = `/images/${lightboxImage.getAttribute("photographerName")}/${listMedias[currentImagePosition].video}`
            lightboxVideo.style.display = "flex"
            lightboxImage.style.display = "none"
        }
        else {
            let lightboxImage = document.querySelector("#lightboxImage")
            lightboxImage.src = `/images/${lightboxImage.getAttribute("photographerName")}/${listMedias[currentImagePosition].image}`
            lightboxVideo.style.display = "none"
            lightboxImage.style.display = "flex"
        }
    }
}

function lightboxNext() {
    if (currentImagePosition < listMedias.length - 1) {
        currentImagePosition++
        if (listMedias[currentImagePosition].video) {
            let lightboxVideo = document.querySelector("#lightboxVideo")
            lightboxVideo.src = `/images/${lightboxImage.getAttribute("photographerName")}/${listMedias[currentImagePosition].video}`
            lightboxVideo.style.display = "flex"
            lightboxImage.style.display = "none"
        }
        else {
            let lightboxImage = document.querySelector("#lightboxImage")
            lightboxImage.src = `/images/${lightboxImage.getAttribute("photographerName")}/${listMedias[currentImagePosition].image}`
            lightboxVideo.style.display = "none"
            lightboxImage.style.display = "flex"
        }
    }
}

let sortPicsBtn = document.getElementById("sortPicsBtn")
sortPicsBtn.addEventListener("change", sortPics)

// this function sort photos
function sortPics(e) {
    let sortBtnValue = this.options[this.selectedIndex].value
    let sortedMedias = []
    switch (sortBtnValue) {
        case "popularity":
            sortedMedias = listMedias.sort(function (a, b) {
                return b.likes - a.likes
            })
            break
        case "date":
            sortedMedias = listMedias.sort(function (a, b) {
                let dateA = new Date(a.date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

                let dateB = new Date(b.date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

                return dateB - dateA;
            })
            break
        case "title":
            sortedMedias = listMedias.sort((a, b) => a.title.localeCompare(b.title))
            break
        default:
            console.log("Cette option n'existe pas.")
    }

    if (sortedMedias.length > 0) {
        displayAllMedias(sortedMedias)
    }
}






