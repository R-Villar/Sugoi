// gets information from the API
fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity')
.then(res => res.json())
.then(data => data.forEach(createAnimeCards))



const animeCollection = document.getElementById('anime-collection')


function createAnimeCards(data) {
    // creates a container for the anime cards
    const createAnimeDivs = document.createElement("div")
    animeCollection.append(createAnimeDivs)
    createAnimeDivs.className = "card"

    // create a header with name of Anime
    const createH2 = document.createElement('h2')
    createAnimeDivs.appendChild(createH2)

    // create Anime image
    const createImg = document.createElement('img')
    createImg.src = data.top.image_url
    createImg.className = "anime-image"
    createAnimeDivs.appendChild(createImg)
}

