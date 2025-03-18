import { loadSongs, loadSearch, loadLyrics } from '../api.js'
import playSong from './player.js'
import { toggleFavorite, isInLocalStorage } from './favorite.js'

// Récupérer le tag contenant la liste des chansons et le titre de la section
const songList = document.querySelector('.list')
const titreList = document.querySelector('#list-section h4')

const displaySongArray = (songs) => {
  // Vider la liste
  songList.innerHTML = ''

  // Itérer le tableau d'artistes reçus et créer les éléments correspondants
  songs.forEach((song) => {
    const songItem = document.createElement('song-item')
    songItem.setAttribute('title', song.title)
    songItem.setAttribute('favorite', false)
    songItem.setAttribute('id',song.id)
    songItem.addEventListener('play_click', () => {
      playSong(song, songs)
    })
    songItem.addEventListener("favorite_click", () => {
      toggleFavorite(song, songItem);
    })
    songList.appendChild(songItem)

    if (isInLocalStorage(song)) {
      songItem.attributes[1].value = "true";
    }else{
      songItem.attributes[1].value = "false";
    }
  })
}

const displayArtistSongs = async (id) => {
  // Récupérer la liste des chansons depuis l'api
  const songs = await loadSongs(id)
  titreList.innerHTML = `Artistes > ${songs[0].artist.name}`

  displaySongArray(songs)
}

const displaySearchSongs = async (query) => {
  // Récupérer la liste des chansons depuis l'api
  const songs = await loadSearch(query)

  // Titre à jour
  titreList.innerHTML = `Résultats de recherche pour : ${decodeURIComponent(query)}`
  
  displaySongArray(songs)
}

const displayLyrics = async (id) => {
  const lyricsTextElement = document.querySelector("#lyrics-section p");
  const lyricsTitleSong = document.querySelector("#lyrics-section h4");
  const lyricsArtist = document.querySelector("#lyrics-section h5");


  const songs = await loadLyrics(id);
  const lyrics = songs.lyrics

  lyricsTextElement.innerHTML = lyrics;
  lyricsTitleSong.textContent = songs.title;
  lyricsArtist.textContent =songs.artist.name;
}



export { displayArtistSongs, displaySearchSongs, displaySongArray, displayLyrics }
