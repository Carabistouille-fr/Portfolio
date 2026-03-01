const fleche = document.querySelector(".fleche_descendre");
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        fleche.classList.add("fleche_disparait");
    }
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
            }
        });
    },
    {
        threshold: 0.2,
    },
);

reveals.forEach((reveal) => {
    observer.observe(reveal);
});
