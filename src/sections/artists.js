import { loadArtists } from '../api.js'

const artistList = document.querySelector('artist-list')

const displayArtists = async () => {

  // Vider la liste
  artistList.innerHTML = ''

  // Récupérer la liste d'artistes depuis l'api
  const artists = await loadArtists()

  // Itérer le tableau d'artistes reçus et créer les éléments correspondants
  artists.forEach((artist) => {
    // Créer l'élément
    const artistItem = document.createElement('artist-cover')

    // Mettre les attributs
    artistItem.setAttribute('image_url', artist.image_url)
    artistItem.setAttribute('name', artist.name)
    artistItem.setAttribute('href', `#artists-${artist.id}`)

    // Insérer dans la liste
    artistList.append(artistItem)
  })
}

export { displayArtists }
