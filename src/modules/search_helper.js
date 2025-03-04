import { playAudio } from "./songs_helper.js"; // On importe juste playAudio pour gérer la lecture et non en 
                                               // créer une nouvelle fonction qui écraserait l'autre

const searchInput = document.querySelector("#search-input");
const sectionList = document.querySelector("#list-section .list"); // Cible la liste où afficher les résultats
const searchIcon = document.querySelector("#search-trigger");


const toggleSearchInput = () => {
    searchInput.classList.toggle("active");

    if (searchInput.classList.contains("active")) {
        searchInput.focus();
    }
};

const changeEndpoint = async () => {
    window.location.hash = `search-${searchInput.value}`;
    const sectionArtistTitle = document.querySelector("#list-section h4");
    sectionArtistTitle.textContent = `Recherche > ${searchInput.value}`;

    try {
        let res = await fetch(`https://webmob-ui-22-spotlified.herokuapp.com/api/songs/search/${searchInput.value}`);
        let songs = await res.json();
        // console.log(songs);
        displaySearchResults(songs); // Appelle la nouvelle fonction pour afficher les résultats
    } catch (error) {
        console.error("Erreur lors de la récupération des chansons :", error);
    }
};

// Fonction spécifique pour afficher les résultats de recherche
const displaySearchResults = (songs) => {
    sectionList.innerHTML = ""; // Nettoyage avant affichage
    songs.forEach(song => {
        let songElement = document.createElement("song-element");
        songElement.setAttribute("song_title", song.title);
        songElement.setAttribute("favorite", false);
        sectionList.appendChild(songElement);

        // Ajouter l'écouteur pour jouer la chanson
        songElement.addEventListener("play_click", () => {
            playAudio(song, songs);
        });
    });
};

searchIcon.addEventListener("click",toggleSearchInput);
searchInput.addEventListener("input", changeEndpoint);