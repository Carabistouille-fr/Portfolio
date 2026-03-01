const burger = document.querySelector(".burger");
const navUl = document.querySelector("header nav ul");
const navOverlay = document.querySelector(".nav-overlay");

function openMenu() {
    burger.classList.add("open");
    navUl.classList.add("nav-open");
    navOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    burger.classList.remove("open");
    navUl.classList.remove("nav-open");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

burger.addEventListener("click", () => {
    if (burger.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
});

navOverlay.addEventListener("click", closeMenu);

navUl.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && burger.classList.contains("open")) {
        closeMenu();
    }
});
