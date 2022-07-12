// gets information from the API

limit = 5

fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity')
    .then(res => res.json())
    .then(data => data.top.slice(0, limit).forEach(createAnimeCards))


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

    // adding ul for details
    const ul = document.createElement("ul")
    createAnimeDivs.appendChild(ul)

    // like button event
    addButton.addEventListener("click", () => {
        like++
        likes.textContent = `${like} likes`
    })

    // adding Rank
    const episodes = document.createElement('p')
    createAnimeDivs.appendChild(episodes)
    episodes.textContent = `# of episodes:${data.episodes}`
}

// search bar

const searchForm = document.getElementById('search')
searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    animeCollection.innerHTML = ''

    const searching = document.getElementById('input-text').value
    fetch(`https://api.jikan.moe/v3/search/anime?q=${searching}&order_by=tytle&sort=asc&limit=${limit}`)
        .then(res => res.json())
        .then(data => console.log(data.results.forEach(createAnimeCards)))
})



// searchAnime(createAnimeCards)



// Dark mode toggle
function darkMode() {
    const element = document.body;
    element.classList.toggle("dark-mode");
    const buttons = document.querySelectorAll("button")
    buttons.forEach(button => {
        button.classList.toggle("myDarkButton")
    })
    const cards = document.querySelectorAll(".card")
    cards.forEach(card => {
        card.classList.toggle("darkCard")
    })
}
