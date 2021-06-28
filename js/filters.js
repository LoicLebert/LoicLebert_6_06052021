// this function sorts photographers according to their tags
function sortByTags(tag) {
    var photographers = document.getElementById("photographers")
    if (photographers.getAttribute("currentFilter") == tag) {
        tag = "All"
    }
    photographers.childNodes.forEach(element => {
        var tagAttribute = element.getAttribute("tagAttribute").split("|")
        if (tag == "All" || tagAttribute.includes(tag)) {
            element.setAttribute("style", "display:flex")
        }
        else { element.setAttribute("style", "display:none") }
    })
    photographers.setAttribute("currentFilter", tag)
};