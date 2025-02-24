// Тема для Telegram Web App
if (window.Telegram) {
    const theme = Telegram.WebApp.themeParams;
    document.body.style.backgroundColor = theme.bg_color || "#f5f5f5";
}

// Эффект пульсации
document.querySelector(".parallax").classList.add("pulse");