<<<<<<< HEAD
const modal = document.querySelector(".project_modal");
const modalTrack = document.querySelector(".modal_track");
const closeModal = document.querySelector(".close_modal");
const nextBtn = document.querySelector(".modal_btn.next");
const prevBtn = document.querySelector(".modal_btn.prev");
const counter = document.querySelector(".modal_counter");

let currentIndex = 0;
let images = [];

// OUVERTURE MODAL

document.querySelectorAll(".open_modal").forEach((bloc) => {
    bloc.addEventListener("click", () => {
        images = bloc.dataset.images.split(",").map((item) => {
            const [src, title] = item.split("|");
            return {
                src: src.trim(),
                title: title ? title.trim() : "",
            };
        });

        modalTrack.innerHTML = "";
        currentIndex = 0;
        images.forEach((data) => {
            const wrapper = document.createElement("div");
            wrapper.style.position = "relative";
            wrapper.style.minWidth = "100%";

            const img = document.createElement("img");
            img.src = data.src;
            img.style.width = "100%";

            const title = document.createElement("div");
            title.textContent = data.title;
            title.classList.add("modal_image_title");

            wrapper.appendChild(img);
            wrapper.appendChild(title);
            modalTrack.appendChild(wrapper);
        });

        updateSlide();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

// FONCTION SLIDE

function updateSlide() {
    modalTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (counter) {
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
}

// BOUTONS

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide();
});

// FERMETURE

function close() {
    modal.classList.remove("active");
    modal.classList.add("closing");
    document.body.style.overflow = "";
    setTimeout(() => {
        modal.classList.remove("closing");
    }, 300);
}

closeModal.addEventListener("click", close);

modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
});

document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        close();
    }

    if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide();
    }

    if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlide();
    }
});

// ADAPTATION POUR APPAREILS TACTILES

let startX = 0;
let endX = 0;

modalTrack.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

modalTrack.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
});

modalTrack.addEventListener("touchend", () => {
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            currentIndex = (currentIndex + 1) % images.length;
        } else {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }

        updateSlide();
    }
});
=======
const modal = document.querySelector(".project_modal");
const modalTrack = document.querySelector(".modal_track");
const closeModal = document.querySelector(".close_modal");
const nextBtn = document.querySelector(".modal_btn.next");
const prevBtn = document.querySelector(".modal_btn.prev");
const counter = document.querySelector(".modal_counter");

let currentIndex = 0;
let images = [];

// OUVERTURE MODAL

document.querySelectorAll(".open_modal").forEach((bloc) => {
    bloc.addEventListener("click", () => {
        images = bloc.dataset.images.split(",").map((item) => {
            const [src, title] = item.split("|");
            return {
                src: src.trim(),
                title: title ? title.trim() : "",
            };
        });

        modalTrack.innerHTML = "";
        currentIndex = 0;
        images.forEach((data) => {
            const wrapper = document.createElement("div");
            wrapper.style.position = "relative";
            wrapper.style.minWidth = "100%";

            const img = document.createElement("img");
            img.src = data.src;
            img.style.width = "100%";

            const title = document.createElement("div");
            title.textContent = data.title;
            title.classList.add("modal_image_title");

            wrapper.appendChild(img);
            wrapper.appendChild(title);
            modalTrack.appendChild(wrapper);
        });

        updateSlide();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

// FONCTION SLIDE

function updateSlide() {
    modalTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (counter) {
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
}

// BOUTONS

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide();
});

// FERMETURE

function close() {
    modal.classList.remove("active");
    modal.classList.add("closing");
    document.body.style.overflow = "";
    setTimeout(() => {
        modal.classList.remove("closing");
    }, 300);
}

closeModal.addEventListener("click", close);

modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
});

document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        close();
    }

    if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide();
    }

    if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlide();
    }
});

// ADAPTATION POUR APPAREILS TACTILES

let startX = 0;
let endX = 0;

modalTrack.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

modalTrack.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
});

modalTrack.addEventListener("touchend", () => {
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            currentIndex = (currentIndex + 1) % images.length;
        } else {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }

        updateSlide();
    }
});
>>>>>>> ebe4cb9 (fix img directories)
