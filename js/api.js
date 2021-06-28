// DATA

// this function gets the photographers' datas
async function getPhotographersData() {
    let data = await fetch("../js/FishEyeData.json")
        .then(res => res.json())
        .then(jsonData => {
            return jsonData.photographers
        });
    return data
}

// this function gets the id of the photographer
async function getPhotographerData(id) {
    let data = await fetch("../js/FishEyeData.json")
        .then(res => res.json())
        .then(jsonData => {
            return jsonData.photographers.filter(p => p.id == id)[0]
        });
    return data
}


// MEDIA

// this function gets the id of the photographer media
async function getPhotographerMedia(photographerId) {
    let photographerMedia = await fetch("../js/FishEyeData.json")
        .then(res => res.json())
        .then(jsonData => {
            return jsonData.media.filter(medium => medium.photographerId == photographerId)
        });
    return photographerMedia
    // console.log(photographerMedia)
}


