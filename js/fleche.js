const fleche = document.querySelector(".fleche_descendre");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        fleche.classList.add("fleche_disparait");
    }
});