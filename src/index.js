// Importer une fois le code des custom elements pour que customElements.define soit appelé au moins une fois
// et fasse le lien entre le tag html (p.ex: artist-cover) avec la classe qui lui correspond (p.ex: ArtistCover)
import './elements/artist-cover'
import './elements/song-item'

// Les helpers pour cacher/afficher une section et colorier les liens du menu
import { displaySection, activateLink } from './helpers.js'

// Code des sections
import { displayArtists } from './sections/artists.js'
import { displayFavorites } from './sections/favorite.js'
import { displayArtistSongs, displaySearchSongs, displayLyrics } from './sections/songs.js'

const router = () => {
  const hash = window.location.hash || '#home'
  const hashSplit = hash.split('-')

  activateLink(hashSplit[0])

  switch(hashSplit[0]) {
    case '#home':
      displaySection('#home')
    break;

    case '#player':
      displaySection('#player')
    break;

    case '#artists':
      // S'il y a un id qui suit, c'est qu'il faut afficher les chansons d'un artiste
      if(hashSplit[1]) {
        displaySection('#list')
        displayArtistSongs(hashSplit[1])
      }
      else {
        displaySection('#artists')
        displayArtists()
      }
    break;

    case '#search':
      displaySection('#list')
      displaySearchSongs(hashSplit[1])
    break;

    case '#favorites':
      displaySection('#list')
      displayFavorites();
    break;

    case '#songs':
      if (hashSplit[1]) {
        displayLyrics(hashSplit[1]);
        displaySection('#lyrics');
      }
  }
}

window.addEventListener("hashchange", router)

router()

window.addEventListener('offline',(e) => document.querySelector("body").classList.add("offline"));
window.addEventListener('online', (e) => document.querySelector("body").classList.remove("offline"));

navigator.serviceWorker.register("/OneSignalSDKWorker.js");
console.log("Test netlify")