//API
const res = await fetch("https://webmob-ui-22-spotlified.herokuapp.com/api/artists")
const data = await res.json();

export default data;