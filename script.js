// Telegram Web App API - изменение цветов в зависимости от темы
document.addEventListener("DOMContentLoaded", function() {
    const tg = window.Telegram.WebApp;
    tg.expand(); // Разворачиваем на весь экран

    // Подключение к теме Telegram
    document.body.style.backgroundColor = tg.themeParams.bg_color || "#f5f5f5";
    document.body.style.color = tg.themeParams.text_color || "black";
});
