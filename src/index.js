import "./modules/artist-cover";
import "./modules/artist-songs";
import data from "./modules/api_artists";
import routeur from "./modules/routeur";
import { togglePlayPause, changeIcone, nextSong, previousSong, clickOnBarProgression, changeDuration, updateTime} from "./modules/songs_helper";
import { toggleSearchInput, changeEndpoint } from "./modules/search_helper";

const audioPlayer = document.querySelector("#audio-player");
const playerPlay = document.querySelector("#player-control-play");
const playerNext = document.querySelector("#player-control-next");
const playerPrev = document.querySelector("#player-control-previous");
const playerProgress = document.querySelector("#player-progress-bar");

const sectionList = document.querySelector("#list-section .list");
const sectionArtistTitle = document.querySelector("#list-section h4");
const artistList = document.querySelector("artist-list");

const searchIcon = document.querySelector("#search-trigger");
const searchInput = document.querySelector("#search-input");

//Element composer pour pouvoir faire des trucs précis à chaque fois qu'on ajoute l'élément au dom
//Mais pour l'artiste-list, on a pas besoin de ça vu que c'est juste une div
artistList.innerHTML = " ";

//ARTISTES
data.forEach(el => {
    let artistCover = document.createElement("artist-cover");
    artistCover.setAttribute("image_url", el.image_url);
    artistCover.setAttribute("name", el.name);
    artistCover.setAttribute("artist-id", el.id)
    artistList.appendChild(artistCover);
});

//PLAYER
audioPlayer.addEventListener("play",changeIcone);
audioPlayer.addEventListener("pause",changeIcone);
playerPlay.addEventListener("click", togglePlayPause);
playerNext.addEventListener("click", nextSong);
playerPrev.addEventListener("click", previousSong);
playerProgress.addEventListener("change", (e) => {
    clickOnBarProgression(e);
});
audioPlayer.addEventListener("durationchange", changeDuration);
audioPlayer.addEventListener("timeupdate",updateTime);

//SEARCH
searchIcon.addEventListener("click",toggleSearchInput);
searchInput.addEventListener("change", changeEndpoint);


//MUSIQUES
sectionArtistTitle.innerHTML = " ";
sectionList.innerHTML = " ";
//Appelle la fonction routeur quand le hash change
window.addEventListener("hashchange", routeur);
//On appelle ici routeur() pour que la fonction se fasse au load de la page
routeur();
