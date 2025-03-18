const playClick = new CustomEvent('play_click');
const favoriteClick = new CustomEvent('favorite_click');

class SongItem extends HTMLElement {
  // Définit la liste des attributs qui seront observés et donc appelerons attributeChangedCallback
  // lorsqu'il y a une modification
  static observedAttributes = ['favorite']

  // Appelé lorsque que l'on insert l'élément dans le DOM, typiquement au moment de:
  // songList.appendChild(newElement)
  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  // Methode "custom" pour faire le rendering. Nom arbitraire
  render() {
    const icon = this.getAttribute('favorite') == 'true' ? 'favorite' : 'favorite_border'

    // On agglomère le HTML
    this.innerHTML = `<a href="#songs-${this.getAttribute('id')}">
      <div class="list-item-title">${this.getAttribute('title')}</div>
      <div class="list-item-actions">
        <button type="button" class="icon-button favorite-button ">
          <span class="material-icons">${icon}</span>
        </button>
        <button type="button" class="icon-button play-button">
          <span class="material-icons">play_arrow</span>
        </button>
      </div>
    </a>`

    this.querySelector('.play-button').addEventListener('click', (e) => {
      e.preventDefault()
      this.dispatchEvent(playClick)
    }),

    this.querySelector(".favorite-button").addEventListener("click", (e) => {
      e.preventDefault();
      this.dispatchEvent(favoriteClick)
    })
  }
}

// Déclare le tag du custom element et la classe à utiliser pour le créer dans le DOM
// Pas besoin d'exporter, juste d'être appelé une fois
customElements.define('song-item', SongItem)
