import "./modules/artist-cover";
import "./modules/artist-songs";
import data from "./modules/api_artists";
import routeur from "./modules/routeur";
import "./modules/search_helper";

//ARTISTES
const sectionList = document.querySelector("#list-section .list");
const sectionArtistTitle = document.querySelector("#list-section h4");
const artistList = document.querySelector("artist-list");

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

//MUSIQUES
sectionArtistTitle.innerHTML = " ";
sectionList.innerHTML = " ";
//Appelle la fonction routeur quand le hash change
window.addEventListener("hashchange", routeur);
//On appelle ici routeur() pour que la fonction se fasse au load de la page
routeur();