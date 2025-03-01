class SongElement extends HTMLElement {
    static observedAttributes = ['song_title','favorite']

    render() {
        const icon = this.getAttribute('favorite') == 'true' ? 'favorite' : 'favorite_border';

        this.innerHTML = `
                            <a href="#">
                                <div class="list-item-title">${this.getAttribute('song_title')}</div>
                                <div class="list-item-actions">
                                    <button type="button" class="icon-button favorite-button ">
                                        <span class="material-icons">${icon}</span>
                                    </button>
                                    <button type="button" class="icon-button play-button">
                                        <span class="material-icons">play_arrow</span>
                                    </button>
                                </div>
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
customElements.define("song-element", SongElement);


