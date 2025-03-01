import { displaySongs } from "./songs_helper";

//Gère les sections active
const setActiveSection = (hash) => {
    document.querySelectorAll('section').forEach(section => section.classList.remove("active"));
    document.querySelector(`${hash}-section`).classList.add("active");
};
//Gère la couleur des boutons dans le nav
export const setActiveNavLink = (hash) => {
    document.querySelectorAll("nav > a").forEach(a => a.classList.remove("active"));
    const activeLink = document.querySelector(`a[href='${hash}']`);
    if (activeLink) activeLink.classList.add("active");
};

const routeur = async () => {
    const hash = window.location.hash;
    const hashSplit = hash.split("-");
    

    //Vérifie le hash de là ou on se trouve
    if (hashSplit[0] == "#artists") {
        setActiveNavLink(hashSplit[0]);
        //Désactive toutes les section vu qu'on est dans artiste
        document.querySelectorAll('section').forEach((section) => section.classList.remove("active"));
        //Vérifie si il y a un deuxième élément au hash donc ici le id de artist
        if (hashSplit[1]) {
            displaySongs(hashSplit[1]);
        }
        else {
            //Ici si il n'y a pas de deuxième élément au hash on remet la section de base avec les artiste
            document.querySelector(`${hashSplit[0]}-section`).classList.add("active");
        }
    } else if (hashSplit[0] == "#player") {
        setActiveSection(hashSplit[0]);
        setActiveNavLink(hashSplit[0]);
    } else if (hashSplit[0] == "#home") {
        setActiveSection(hashSplit[0]);
        setActiveNavLink(hashSplit[0]);
    }else if(hashSplit[0] == "#favorites") {
        setActiveSection("#list");
        setActiveNavLink(hashSplit[0]);
    }
    // else if(hashSplit[0] == ""){
    //     //Refaire avec favorites en bien
    //     document.querySelectorAll('section').forEach((section) => section.classList.remove("active"));
    //     document.querySelector(`#home-section`).classList.add("active");

    //     document.querySelectorAll("nav > a").forEach((a) => a.classList.remove("active"));
    //     document.querySelector(`a[href='#home']`).classList.add("active");
    // }

}

export default routeur;