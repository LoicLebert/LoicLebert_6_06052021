// this function gets the photographers' data
async function getPhotographersData() {
    let data = await fetch("js/FishEyeData.json")
        .then(res => res.json())
        .then(jsonData => {
            return jsonData.photographers
        });
    return data
}




// let tag = document.getElementsByClassName("tags");
// tag.addEventListener("click", showPhotographerByTag);
// // this function sorts photographers by tags
// function showPhotographerByTag() {

// }