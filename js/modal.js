const modal = document.querySelector(".project_modal");
const modalTrack = document.querySelector(".modal_track");
const closeModal = document.querySelector(".close_modal");
const nextBtn = document.querySelector(".modal_btn.next");
const prevBtn = document.querySelector(".modal_btn.prev");
const counter = document.querySelector(".modal_counter");
const imageCaption = document.querySelector(".modal_caption");

let currentIndex = 0;
let images = [];

document.querySelectorAll(".open_modal").forEach((bloc) => {
    bloc.addEventListener("click", () => {
        images = bloc.dataset.images
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item.length > 0)
            .map((item) => {
                const pipeIndex = item.indexOf("|");
                if (pipeIndex === -1) return { src: item, title: "" };
                return {
                    src: item.slice(0, pipeIndex).trim(),
                    title: item.slice(pipeIndex + 1).trim(),
                };
            });

        modalTrack.innerHTML = "";
        currentIndex = 0;
        images.forEach((data) => {
            const wrapper = document.createElement("div");
            wrapper.style.position = "relative";
            wrapper.style.width = "100%";  // minWidth
            wrapper.style.flexShrink = "0";
            wrapper.style.display = "flex";
            wrapper.style.justifyContent = "center";
            wrapper.style.alignItems = "center";

            const isVideo = /\.(mp4|webm|ogg)$/i.test(data.src);
            let media;

            if (isVideo) {
                media = document.createElement("video");
                media.src = data.src;
                media.controls = true;
                media.muted = true;
                media.autoplay = true;
                media.loop = true;
                media.style.width = "100%";
                media.style.maxHeight = "75vh";
                media.style.display = "block";
            } else {
                media = document.createElement("img");
                media.src = data.src;
                media.style.width = "100%";
            }

            const titleEl = document.createElement("div");
            titleEl.textContent = data.title;
            titleEl.classList.add("modal_image_title");

            wrapper.appendChild(media);
            wrapper.appendChild(titleEl);
            modalTrack.appendChild(wrapper);
        });

        updateSlide();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

function updateSlide() {
    modalTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    const counterText = `${currentIndex + 1} / ${images.length}`;
    document.querySelectorAll(".modal_counter").forEach((el) => {
        el.textContent = counterText;
    });

    if (imageCaption) {
        imageCaption.textContent = images[currentIndex]?.title || "";
    }
}

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide();
});

function close() {
    modalTrack.querySelectorAll("video").forEach((v) => {
        v.pause();
        v.currentTime = 0;
    });

    modal.classList.remove("active");
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
