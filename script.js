const carousel = document.querySelector(".carousel");
const tiles = document.querySelectorAll(".tile");

const totalTiles = tiles.length;
let angle = 0;
const step = 50; // Угол расхождения элементов

function updateCarousel() {
    tiles.forEach((tile, index) => {
        const rotation = (index - totalTiles / 2) * step + angle;
        const radian = (rotation * Math.PI) / 180;
        const x = Math.sin(radian) * 200;
        const z = Math.cos(radian) * 200;
        tile.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotation}deg)`;
    });
}

// Добавляем автоматическое пролистывание
let autoRotate = setInterval(() => {
    angle -= step;
    updateCarousel();
}, 3000);

carousel.addEventListener("mouseenter", () => clearInterval(autoRotate));
carousel.addEventListener("mouseleave", () => {
    autoRotate = setInterval(() => {
        angle -= step;
        updateCarousel();
    }, 3000);
});

updateCarousel();
