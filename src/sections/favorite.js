import { displaySongArray } from "./songs"

const setItem = (id, value) => localStorage.setItem(id, JSON.stringify(value))
const getItem = (id) => JSON.parse(localStorage.getItem(id))
const getItems = () => Object.keys(localStorage).map(getItem)
const removeItem = (id) => localStorage.removeItem(id)

const titreList = document.querySelector('#list-section h4');

export const toggleFavorite = (song, songItem) => {
    if (!isInLocalStorage(song)) {
        setItem(song.id, song);
        console.log(`${song.title} à été ajouté au favoris !`)
        songItem.attributes[1].value = "true";
    } else {
        removeItem(song.id);
        songItem.attributes[1].value = "false";
        // songItem.remove();
    }
}

export const displayFavorites = () => {
    let favorites = getItems();
    titreList.textContent = "Vos favoris 😍";

    displaySongArray(favorites)
}

export const isInLocalStorage = (song) => {
    return getItem(song.id) ? true : false;
}