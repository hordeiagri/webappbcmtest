// Проверяем, поддерживает ли устройство события ориентации
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) {
        let beta = event.beta;  // Наклон вперед-назад (-180 до 180)
        let gamma = event.gamma; // Наклон влево-вправо (-90 до 90)

        // Ограничиваем диапазон движения
        let xMove = Math.min(Math.max(gamma, -30), 30); 
        let yMove = Math.min(Math.max(beta, -30), 30);  

        // Применяем смещение фона
        document.querySelector(".parallax").style.transform = `translate(${xMove * 1.5}px, ${yMove * 1.5}px)`;
    });
}

// Функция для изменения темы в зависимости от Telegram WebApp
function applyTelegramTheme() {
    if (window.Telegram && Telegram.WebApp) {
        const themeParams = Telegram.WebApp.themeParams;
        document.body.style.backgroundColor = themeParams.bg_color || "#f5f5f5";
        document.body.style.color = themeParams.text_color || "#000";
    }
}

// Вызываем функцию после загрузки страницы
document.addEventListener("DOMContentLoaded", applyTelegramTheme);
