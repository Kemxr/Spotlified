import formatTimestamp from '../lib/formatTimestamp'

////////// Constantes des différents tags HTML
// Tag audio
const audioPlayer = document.querySelector('#audio-player')

// Song infos
const playerThumbnail = document.querySelector('#player-thumbnail-image')
const playerSongTitle = document.querySelector('#player-infos-song-title')
const playerArtistName = document.querySelector('#player-infos-artist-name')

// Controls
const playerPrev = document.querySelector('#player-control-previous')
const playerNext = document.querySelector('#player-control-next')
const playerPlay = document.querySelector('#player-control-play')
const playerPlayIcon = playerPlay.querySelector('.material-icons') // see what i did there?

// Progress
const playerTimeCurrent = document.querySelector('#player-time-current')
const playerTimeDuration = document.querySelector('#player-time-duration')
const playerProgress = document.querySelector('#player-progress-bar')

// Logo
const logo = document.querySelector('#logo')

////////// Logique

// contiendra la liste des chansons en cours de lecture, afin de pouvoir se déplacer entre les chansons
let currentSongList = []
// La chanson en cours de lecture
let currentSong = null

// Lire une chanson sur laquelle on clique
const playSong = (song, songs) => {
  // On enregistre la chanson en cours de lecture
  currentSong = song

  // si un tableau est transmis, on le met à jour. Cela nous permet d'utiliser juste playSong(song) à l'interne,
  // sans devoir le repasser à chaque fois (depuis previous/next, par exemple)
  if (songs)
    currentSongList = songs

  // On donne l'url au player et démarre la lecture
  audioPlayer.src = song.audio_url
  audioPlayer.play()

  // Remplacement des différentes informations au sein des tags
  playerSongTitle.innerText = song.title
  playerArtistName.innerText = song.artist.name
  playerThumbnail.src = song.artist.image_url
}

// Lis la chanson suivante, d'après la chanson en cours
const playNextSong = () => {
  let newIndex = currentSongList.indexOf(currentSong) + 1
  // On s'assure qu'on n'arrive jamais en dehors du tableau et on reboucle sur le début
  if (newIndex == currentSongList.length)
    newIndex = 0

  playSong(currentSongList[newIndex])
}

// Lis la chanson précédente, d'après la chanson en cours
const playPreviousSong = () => {
  let newIndex = currentSongList.indexOf(currentSong) - 1

  if (newIndex == -1)
    newIndex = currentSongList.length - 1

  playSong(currentSongList[newIndex])
}

// On écoute le clique sur le bouton play et on transmets l'instruction au player
playerPlay.addEventListener('click', () => {
  if (audioPlayer.paused)
    audioPlayer.play()
  else
    audioPlayer.pause()
})

// Bouton précédent
playerPrev.addEventListener('click', playPreviousSong)

// Bouton suivant
playerNext.addEventListener('click', playNextSong)

playerProgress.addEventListener('change', (event) => {
  audioPlayer.currentTime = event.currentTarget.value
})

audioPlayer.addEventListener('durationchange', () => {
  playerProgress.max = audioPlayer.duration
  playerTimeDuration.innerText = formatTimestamp(audioPlayer.duration)
})

audioPlayer.addEventListener('timeupdate', () => {
  playerProgress.value = audioPlayer.currentTime
  playerTimeCurrent.innerText = formatTimestamp(audioPlayer.currentTime)
})

audioPlayer.addEventListener('play', () => {
  playerPlayIcon.innerText = 'pause'
  logo.classList.add('animated')
})

audioPlayer.addEventListener('pause', () => {
  playerPlayIcon.innerText = 'play_arrow'
  logo.classList.remove('animated')
})

export default playSong
