class ArtistCover extends HTMLElement {
    static observedAttributes = ['image_url', 'name', 'artist-id']

    render() {
        this.innerHTML = `
          <a href="#artists-${this.getAttribute('artist-id')}">
            <img src="${this.getAttribute('image_url')}" />
            <div artist-id="${this.getAttribute('artist-id')}" class="artist-list-item-title">${this.getAttribute('name')}</div>
          </a>
    `
    }
    connectedCallback() {
        this.render()
    }
    attributeChangedCallback() {
        this.render()
    }
    
}
customElements.define("artist-cover", ArtistCover)