// gets information from the API

fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity')
.then(res => res.json())
.then(data => data.top.slice(0, 5).forEach(createAnimeCards))


const animeCollection = document.getElementById('anime-collection')


function createAnimeCards(data) { 
    // creates a container for the anime cards
    const createAnimeDivs = document.createElement("div")
    animeCollection.append(createAnimeDivs)
    createAnimeDivs.className = "card"

    // create a header with name of Anime
    const createH2 = document.createElement('h2')
    createAnimeDivs.appendChild(createH2)
    createH2.textContent = data.title

    // create Anime image
    const createImg = document.createElement('img')
    createImg.src = data.image_url
    createImg.className = "anime-image"
    createAnimeDivs.appendChild(createImg)   

    
    // adding like count
    const likes = document.createElement('p')
    let like = parseInt(data.score)
    createAnimeDivs.appendChild(likes)
    likes.textContent = `${like} likes`
    
    // adding like button
    const addButton = document.createElement('button')
    createAnimeDivs.appendChild(addButton)
    addButton.textContent = "<3"
    
    // like button event
    addButton.addEventListener("click", () => {
        like++
        likes.textContent = `${like} likes`
    })

    // adding Rank
    const rank = document.createElement('p')
    createAnimeDivs.appendChild(rank)
    rank.textContent = `Rank #${data.rank}`
}

function darkMode() {
    const element = document.body;
    element.classList.toggle("dark-mode");
    const button = document.querySelectorAll("button")
    button.forEach(element => {
        element.classList.toggle("myDarkButton")

    })

}