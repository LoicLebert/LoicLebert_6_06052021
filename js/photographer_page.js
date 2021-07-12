const main = document.querySelector("main")
let currentImagePosition = 0
let listMedias = []
let totalLikes = 0

// this function displays the photographers on pages
function displayPhotographerInfos(photographerData) {
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
    photographerLink.innerHTML = `${photographerData.name}`
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
    const photographerTotalLikes = document.createElement("div")
    photographerTotalLikes.innerHTML = totalLikes + `<i class="fas fa-heart"></i>`
    photographerTotalLikes.classList.add = ("likeCount")
    photographerSummary.appendChild(photographerTotalLikes)
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
async function displayPhotographerMedia(photographerMedias, index) {

    let photographer = await getPhotographerData(photographerMedias[index].photographerId)

    // add photographer medias
    const photographerMediaContainer = document.createElement("div")
    photographerMediaContainer.classList.add("mediaContainer")
    photographerMediaContainer.setAttribute("id", `container${photographerMedias[index].id}`)
    const photographerMedia = document.createElement("img")
    const lightboxFlexDisplay = document.querySelector(".lightboxFlexDisplay")
    photographerMedia.src = `/images/${photographer.name}/${photographerMedias[index].image}`
    photographerMedia.classList.add("photographerMedia")
    // photographerMedia.setAttribute("id", `${photographerMedias[index].id}`)
    // shows lightbox
    photographerMedia.addEventListener("click", function (e) {
        currentImagePosition = index
        e.preventDefault
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
    })

    const photoDescription = document.createElement("div")
    photoDescription.classList.add("photoDescription")
    photographerMediaContainer.appendChild(photoDescription)

    const photoTitle = document.createElement("span")
    photoTitle.classList.add("photoTitle")
    photoTitle.innerHTML = `${photographerMedias[index].title}`
    photoDescription.appendChild(photoTitle)

    const photoLikes = document.createElement("div")
    photoLikes.addEventListener("click", () => likeCount(photographerMedias, index))
    photoLikes.classList.add("photoLike")
    const likeIcon = document.createElement("span")
    likeIcon.innerHTML = `<i class="fas fa-heart"></i>`
    photoLikes.appendChild(likeIcon)
    const likePara = document.createElement("p")
    likePara.classList.add("likePara")
    likePara.innerHTML = `${photographerMedias[index].likes}`
    totalLikes += photographerMedias[index].likes
    photoLikes.appendChild(likePara)
    photoDescription.appendChild(photoLikes)

    // injects photographer profile to the photographer div
    photographerMediaContainer.appendChild(photographerMedia)
    lightboxFlexDisplay.appendChild(photographerMediaContainer)
}

async function displayAllMedias(photographerMedias) {
    document.querySelector(".lightboxFlexDisplay").innerHTML = ""
    for (let i = 0; i < photographerMedias.length; i++) {
        await displayPhotographerMedia(photographerMedias, i)
    }
}

// this function displays the photographer medias according to the id in the url
async function init() {
    var searchParams = new URLSearchParams(window.location.search)
    var id = searchParams.get("id")
    listMedias = await getPhotographerMedia(id)
    let photographerData = await getPhotographerData(id)
    displayAllMedias(listMedias)
    // verifier valeur totalLikes
    // verifier le selecteur de photographerTotalLikes
    // verifier les 3 fonctions displayPhotographerMedia, displayPhotographerInfos, LikeCount
    displayPhotographerInfos(photographerData)
}

init()

// LIKE COUNT

function likeCount(photographerMedias, index) {
    photographerMedias[index].isLiked = !photographerMedias[index].isLiked
    photographerMedias[index].likes += photographerMedias[index].isLiked ? 1 : -1;
    totalLikes += photographerMedias[index].isLiked ? 1 : -1;
    document.querySelector(`#container${photographerMedias[index].id} .likePara`).textContent = `${photographerMedias[index].likes}`
    photographerTotalLikes.innerHTML = totalLikes
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
    // document.querySelector("#lightbox, #lightbox_prev, #lightbox_next, #lightbox_close").classList.remove("active")
    document.querySelector("#lightbox").classList.remove("active")
    document.querySelector("#lightbox_prev").classList.remove("active")
    document.querySelector("#lightbox_next").classList.remove("active")
    document.querySelector("#lightbox_close").classList.remove("active")
}

document.querySelector("#lightbox_prev").addEventListener("click", lightboxPrev)
document.querySelector("#lightbox_next").addEventListener("click", lightboxNext)

window.addEventListener("keydown", function (e) {
    if (e.code == "ArrowLeft") {
        lightboxPrev()
    }
})
window.addEventListener("keydown", function (e) {
    if (e.code == "ArrowRight") {
        lightboxNext()
    }
})

function lightboxPrev() {
    if (currentImagePosition > 0) {
        currentImagePosition--
        let lightboxImage = document.querySelector("#lightboxImage")
        lightboxImage.src = `/images/${lightboxImage.getAttribute("photographerName")}/${listMedias[currentImagePosition].image}`
    }
}

function lightboxNext() {
    if (currentImagePosition < listMedias.length - 1) {
        currentImagePosition++
        let lightboxImage = document.querySelector("#lightboxImage")
        lightboxImage.src = `/images/${lightboxImage.getAttribute("photographerName")}/${listMedias[currentImagePosition].image}`
    }
}

// totalLikesCount() {
//     let totalLikes = 0
//     let likes = document.querySelectorAll(".likePara")
//     likes = Array.from(likes)
//     likes.forEach(like => {
//         like.addEventListener("click", e =>{
//             e.preventDefault()
//             like[0].innerHTML = (parseInt(like[0].innerHTML) +1).toString();
//         })
//     })
// }

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






