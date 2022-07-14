// main card collection
const animeCollection = document.getElementById('anime-collection')
let limit = 10

// on load fetch
fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
    .then(res => res.json())
    .then(data => data.top.slice(0, limit).forEach(createAnimeCards))


// dropdown function
function selectDropdownList() {
    // dropdown
    const dropdownList = document.getElementById("dropdownList")
    dropdownList.addEventListener("change", (e) => {
        let picked = e.target.value

        // clears cards
        animeCollection.innerHTML = ''

        fetch(`https://api.jikan.moe/v3/top/${picked}/1/bypopularity`)
            .then(res => res.json())
            .then(data => data.top.slice(0, limit).forEach(createAnimeCards))

        selectLimitDropdown(picked)
    })
}
selectDropdownList(selectLimitDropdown)

// dropdown function
function selectLimitDropdown(picked) {
    // limit dropdown 
    const limitDropdown = document.getElementById('limit-dropdown')
    limitDropdown.addEventListener('change', (e) => {
        let limit = e.target.value

        animeCollection.innerHTML = ''

        fetch(`https://api.jikan.moe/v3/top/${picked}/1/bypopularity`)
            .then(res => res.json())
            .then(data => data.top.slice(0, limit).forEach(createAnimeCards))
    })
}

// creates main group of cards on screen
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
        faveName = data.title + '  ' // adds space between title and btn
        addToUserList(faveName)
    })

    // adding like count
    const likes = document.createElement('p')
    let like = parseInt(data.score)
    createAnimeDivs.appendChild(likes)
    likes.textContent = `${like} likes`

    // adding like button
    const addButton = document.createElement('a')
    createAnimeDivs.appendChild(addButton)
    addButton.className = "like-button"
    addButton.textContent = "❤️"

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
    if (typeof data.episodes === 'undefined') {
        episodes.textContent = 'Episodes: Not Found'
    }

    // adding type of program
    const airedOn = document.createElement('li')
    detailList.appendChild(airedOn)
    airedOn.textContent = `Aired on: ${data.type}`

    // // Adding mouseover functionality
    // createImg.addEventListener("mouseover", () => {
    //     createImg.classList.toggle("dropDown")
    // })




}

// creating the user personal list
const userList = document.getElementsByClassName('user-list')
const listTitle = document.getElementById('list-title')

// add to user list
function addToUserList(faveName) {
    const newFavItem = document.createElement('li')
    listTitle.appendChild(newFavItem)
    newFavItem.textContent = faveName

    // adding remove button to user list items
    const addButton = document.createElement("button")
    addButton.innerText = "Remove"
    newFavItem.append(addButton)
    addButton.addEventListener("click", () => {
        newFavItem.remove()
    })
}

// search bar
const searchForm = document.getElementById('search')
searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // Clears the cards
    animeCollection.innerHTML = ''
    const searching = document.getElementById('input-text').value
    // checking to see if search is empty
    if (!emptyFields(searching)) {
        fetch(`https://api.jikan.moe/v3/search/anime?q=${searching}&order_by=tytle&sort=asc&limit=${limit}`)
            .then(res => res.json())
            .then(data => data.results.forEach(createAnimeCards))
        // selectDropdownList(picked) 
        searchForm.reset()
    } else {
        fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
            .then(res => res.json())
            .then(data => data.top.slice(0, limit).forEach(createAnimeCards))
    }

})
// alert for empty text field
function emptyFields(field) {
    if (field === '') {
        alert('Please enter text.')
        return true
    }
}

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
    const titles = document.querySelectorAll(".title")
    titles.forEach(title => {
        title.classList.toggle("darkTitle")
    })
}
