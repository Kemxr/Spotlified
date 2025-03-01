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

    //Affichage des musiques (essayer de faire un custom element) => réussi
    songs.forEach(song => {
        let songElement = document.createElement("song-element");
        const audio = document.querySelector("#audio-player");
        songElement.setAttribute("song_title", song.title);
        songElement.setAttribute("favorite", false);
        songElement.addEventListener("click", () => {
            playAudio(song, audio, songs);
            //Change l'affichage
            document.querySelectorAll('section').forEach(section => section.classList.remove("active"));
            document.querySelector(`#player-section`).classList.add("active");
        })
        sectionList.appendChild(songElement);
    })
}

let currentSong = null;
let currentTableau = null;

const playAudio = (song, audio, songs) => {
    currentSong = song
    currentTableau = songs

    audio.src = song.audio_url;
    audio.play();
}

export const togglePlayPause = () => {
    const audio = document.querySelector("#audio-player");
    if (audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
}

export const changeIcone = () => {
    const audio = document.querySelector("#audio-player");
    const playerBtn = document.querySelector("#player-control-play span");
    if (audio.paused) {
        playerBtn.textContent = "play_arrow";
    } else {
        playerBtn.textContent = "pause";
    }
}

export const nextSong = () => {
    const audio = document.querySelector("#audio-player");

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

    playAudio(nextSong, audio, currentTableau);
};

export const previousSong = () => {
    const audio = document.querySelector("#audio-player");

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

    playAudio(previousSong, audio, currentTableau);
};