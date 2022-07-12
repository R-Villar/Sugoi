// gets information from the API

limit = 10

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

    // eventlistener for adding to list
    createImg.addEventListener("click", () => {
        console.log(data.title)
    })

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


    // adding detailList for details
    const detailList = document.createElement("p")
    createAnimeDivs.appendChild(detailList)
    // detailList.className = "ulStyle"

    // adding Episodes
    const episodes = document.createElement('li')
    detailList.appendChild(episodes)
    episodes.textContent = `Episodes: ${data.episodes}`

    // adding type of program
    const airedOn = document.createElement('li')
    detailList.appendChild(airedOn)
    airedOn.textContent = `Aired on: ${data.type}`

    // ****MAY REMOVE****
    // // adding start/end dates 
    // const dates = document.createElement('li')
    // const startDate = data.start_date
    // const endDate = data.end_date
    // detailList.appendChild(dates)
    // dates.textContent = `${startDate} - ${endDate}`

}

// search bar
const searchForm = document.getElementById('search')
searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Clears the cards
    animeCollection.innerHTML = ''

    const searching = document.getElementById('input-text').value
    fetch(`https://api.jikan.moe/v3/search/anime?q=${searching}&order_by=tytle&sort=asc&limit=${limit}`)
        .then(res => res.json())
        .then(data => console.log(data.results.forEach(createAnimeCards)))
    searchForm.reset()
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

// Adding mouseover functionality
// function mouseoverInfo() {
//     const cards = document.getElementsByClassName("card")
//     const details = document.querySelector("detailList")
//     cards.addEventListener("click", (e) => {
//         e.currentTarget.addEventListener("click", () => {
//             details.classList.toggle("dropDown")

//         })

//     })
// }
// console.log(mouseoverInfo())

