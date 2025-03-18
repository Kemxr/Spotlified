// Cache la section en cours et affiche celle correspondant à l'id passé en paramètre
const displaySection = (id) => {
  document.querySelector('section.active')?.classList.remove('active')

  document.querySelector(`${id}-section`)?.classList.add('active')
}

const activateLink = (id) => {
  // Same same, avec les liens
  document.querySelector(`nav a.active`)?.classList.remove('active')
  document.querySelector(`nav a[href="${id}"]`)?.classList.add('active')
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Partie recherche, coté UI
const searchButton = document.querySelector('#search-trigger')
const searchInput = document.querySelector('#search-input')

searchButton.addEventListener('click', () => {
  searchInput.classList.toggle('active')
  if(searchInput.classList.contains('active'))
    searchInput.focus()
})

searchInput.addEventListener('input', () => {
  window.location.hash = `#search-${encodeURIComponent(searchInput.value)}`
})

export {displaySection, activateLink}
