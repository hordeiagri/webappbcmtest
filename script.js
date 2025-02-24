const carousel = document.querySelector(".carousel");
const tiles = document.querySelectorAll(".tile");

const totalTiles = tiles.length;
let angle = 0;
const step = 40; // Угол расхождения элементов

function updateCarousel() {
    tiles.forEach((tile, index) => {
        const rotation = (index - totalTiles / 2) * step + angle;
        const radian = (rotation * Math.PI) / 180;
        const y = Math.sin(radian) * 100;
        const z = Math.cos(radian) * 300;
        tile.style.transform = `translate3d(0, ${y}px, ${z}px) rotateX(${rotation}deg)`;
    });
}

let startY = 0;
let isDragging = false;

carousel.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
    isDragging = true;
});

carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    let moveY = e.touches[0].clientY;
    if (moveY - startY > 30) {
        angle += step;
        updateCarousel();
        isDragging = false;
    } else if (startY - moveY > 30) {
        angle -= step;
        updateCarousel();
        isDragging = false;
    }
});

carousel.addEventListener("touchend", () => {
    isDragging = false;
});

// Переход по страницам
tiles.forEach(tile => {
    tile.addEventListener("click", () => {
        window.location.href = tile.dataset.link;
    });
});

updateCarousel();
