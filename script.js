// Проверяем, поддерживает ли устройство события ориентации
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) {
        let beta = event.beta;  // Наклон вперед-назад (-180 до 180)
        let gamma = event.gamma; // Наклон влево-вправо (-90 до 90)

        // Ограничиваем углы движения
        let maxTiltX = 20;  // Максимальный наклон по X
        let maxTiltY = 20;  // Максимальный наклон по Y

        let xMove = Math.min(Math.max(gamma, -maxTiltX), maxTiltX); 
        let yMove = Math.min(Math.max(beta, -maxTiltY), maxTiltY);  

        // Уменьшаем силу параллакса (замедляем движение)
        let intensity = 0.5; // Чем меньше, тем плавнее
        let translateX = xMove * intensity;
        let translateY = yMove * intensity;

        // Применяем ограниченное смещение фона
        document.querySelector(".parallax").style.transform = `translate(${translateX}px, ${translateY}px)`;

        // Изменение угла карусели при свайпе
        let currentAngle = 0;
        const totalItems = document.querySelectorAll('.carousel .tile').length;
        const carousel = document.querySelector('.carousel');

        // Функция для смены угла карусели
        function rotateCarousel() {
            carousel.style.transform = `rotateY(${currentAngle}deg)`;
        }

        // Переключение на следующую кнопку
        document.querySelector('.next-btn').addEventListener('click', function() {
            currentAngle -= 45; // Поворачиваем на 45 градусов влево
            rotateCarousel();
        });

        // Переключение на предыдущую кнопку
        document.querySelector('.prev-btn').addEventListener('click', function() {
            currentAngle += 45; // Поворачиваем на 45 градусов вправо
            rotateCarousel();
        });

    });
}
