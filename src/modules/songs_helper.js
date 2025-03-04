import formatTimeStamp from "../lib/formatTimestamp";

const audio = document.querySelector("#audio-player");

const playerThumbnail = document.querySelector("#player-thumbnail-image");
const playerArtistName = document.querySelector("#player-infos-artist");
const playerSongTitle = document.querySelector("#player-infos-song-title");

const playerProgress = document.querySelector("#player-progress-bar");
const playerCurrentTime = document.querySelector("#player-time-current");
const playerTimeDuration = document.querySelector("#player-time-duration");

const audioPlayer = document.querySelector("#audio-player");
const playerPlay = document.querySelector("#player-control-play");
const playerNext = document.querySelector("#player-control-next");
const playerPrev = document.querySelector("#player-control-previous");


const logo = document.querySelector("#logo");

export const displaySongs = async (hash) => {
    const sectionList = document.querySelector("#list-section .list");
    const sectionArtistTitle = document.querySelector("#list-section h4");
    //On fais la requête à l'api pour afficher les musiques
    //On active la liste et on rajoute les musiques
    sectionList.innerHTML = " ";
    document.querySelector(`#list-section`).classList.add("active");

    //API
    const artistId = hash;
    const res = await fetch(`https://webmob-ui-22-spotlified.herokuapp.com/api/artists/${artistId}/songs`);
    const songs = await res.json();
    console.log(songs)

    //Gestion du nom afficher
    sectionArtistTitle.textContent = `Artistes > ${songs[0].artist.name}`;

    //Affichage des musiques
    songs.forEach(song => {
        let songElement = document.createElement("song-element");
        songElement.setAttribute("song_title", song.title);
        songElement.setAttribute("favorite", false);
        sectionList.appendChild(songElement);
        songElement.addEventListener("play_click", (e) => {
            playAudio(song, songs);
        })
    })
}

let currentSong = null;
let currentTableau = null;

export const playAudio = (song, songs) => {
    //Change l'affichage
    document.querySelectorAll('section').forEach(section => section.classList.remove("active"));
    document.querySelector(`#player-section`).classList.add("active");

    currentSong = song
    currentTableau = songs

    playerThumbnail.src = song.artist.image_url;
    playerArtistName.textContent = song.artist.name;
    playerSongTitle.textContent = song.title;
    
    audio.src = song.audio_url;
    audio.play();
}

export const togglePlayPause = () => {
    if (audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
}

export const changeIcone = () => {
    const playerBtn = document.querySelector("#player-control-play span");
    if (audio.paused) {
        playerBtn.textContent = "play_arrow";
        logo.classList.remove("animated");
    } else {
        playerBtn.textContent = "pause";
        logo.classList.add("animated");
    }
}

export const nextSong = () => {
    // Trouve l'index actuel
    let actualSong = currentTableau.indexOf(currentSong);
    let nextIndex;

    // Vérifie si on est à la fin du tableau
    if (actualSong === currentTableau.length - 1) {
        nextIndex = 0; // Retour au début
    } else {
        nextIndex = actualSong + 1; // Sinon, on passe à la suivante
    }

    // Récupère la chanson suivante
    let nextSong = currentTableau[nextIndex];

    playAudio(nextSong, currentTableau);
};

export const previousSong = () => {
    // Trouve l'index actuel
    let actualSong = currentTableau.indexOf(currentSong);
    let previousIndex;

    // Vérifie si on est au début du tableau
    if (actualSong === 0) {
        previousIndex = currentTableau.length - 1; // Retour à la dernière chanson
    } else {
        previousIndex = actualSong - 1; // Sinon, on recule d'une chanson
    }

    // Récupère la chanson précédente
    let previousSong = currentTableau[previousIndex];

    playAudio(previousSong, currentTableau);
};

//Change la valeur de la progress bar et de l'audio avec notre click
export const clickOnBarProgression = (e) => {
    audio.currentTime = e.currentTarget.value;
}

export const changeDuration = () => {
    playerProgress.max = audio.duration;
    playerTimeDuration.textContent = formatTimeStamp(audio.duration);
}

export const updateTime = () => {
    playerProgress.value = audio.currentTime;
    playerCurrentTime.textContent = formatTimeStamp(audio.currentTime);
}

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