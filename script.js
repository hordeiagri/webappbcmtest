if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) {
        let beta = event.beta;  // Наклон вперед-назад (-180 до 180)
        let gamma = event.gamma; // Наклон влево-вправо (-90 до 90)

        // Ограничиваем углы движения
        let maxTiltX = 5;  // Максимальный наклон по X
        let maxTiltY = 5;  // Максимальный наклон по Y

        let xMove = Math.min(Math.max(gamma, -maxTiltX), maxTiltX); 
        let yMove = Math.min(Math.max(beta, -maxTiltY), maxTiltY);  

        // Уменьшаем силу параллакса (замедляем движение)
        let intensity = 1; // Чем меньше, тем плавнее
        let translateX = xMove * intensity;
        let translateY = yMove * intensity;

        // Применяем ограниченное смещение фона
        document.querySelector(".parallax").style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
}
