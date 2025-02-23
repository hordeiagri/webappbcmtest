const carousel = document.querySelector(".carousel");
const tiles = document.querySelectorAll(".tile");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const parallax = document.querySelector(".parallax");

const totalTiles = tiles.length;
let angle = 0;
const step = 360 / totalTiles;

function updateCarousel() {
    tiles.forEach((tile, index) => {
        const rotation = index * step + angle;
        const radian = (rotation * Math.PI) / 180;
        const x = Math.sin(radian) * 200;
        const z = Math.cos(radian) * 200;
        tile.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotation}deg)`;
    });
    highlightActive();
}

function highlightActive() {
    tiles.forEach(tile => tile.classList.remove("active"));
    let activeIndex = Math.round((-angle / step) % totalTiles);
    if (activeIndex < 0) activeIndex += totalTiles;
    tiles[activeIndex].classList.add("active");
}

nextBtn.addEventListener("click", () => {
    angle -= step;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    angle += step;
    updateCarousel();
});

// Сенсорное управление
let startX = 0;
let isDragging = false;

carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    let moveX = e.touches[0].clientX;
    if (moveX - startX > 30) {
        angle += step;
        updateCarousel();
        isDragging = false;
    } else if (startX - moveX > 30) {
        angle -= step;
        updateCarousel();
        isDragging = false;
    }
});

carousel.addEventListener("touchend", () => {
    isDragging = false;
});

// Параллакс-эффект
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) {
        let beta = event.beta;  
        let gamma = event.gamma; 

        let maxTiltX = 10;
        let maxTiltY = 10;

        let xMove = Math.min(Math.max(gamma, -maxTiltX), maxTiltX); 
        let yMove = Math.min(Math.max(beta, -maxTiltY), maxTiltY);  

        let intensity = 0.5;
        let translateX = xMove * intensity;
        let translateY = yMove * intensity;

        parallax.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
}

updateCarousel();
