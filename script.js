// Инициализация Swiper для вертикальной прокрутки
const swiper = new Swiper('.swiper-container', {
    direction: 'vertical', // Вертикальная прокрутка
    slidesPerView: 'auto', // Автоматическое количество видимых слайдов
    spaceBetween: 30, // Отступы между слайдами
    loop: true, // Зацикливание
    centeredSlides: true, // Центрирование текущего слайда
    grabCursor: true, // Показывать курсор захвата
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // Настройка для экранов до 768px
      768: {
        slidesPerView: 1.2, // Показывать 1.2 слайда на экранах меньше 768px
        spaceBetween: 10, // Уменьшаем отступы
      },
      // Настройка для экранов больше 768px
      1024: {
        slidesPerView: 3, // Показывать 3 слайда на экранах больше 1024px
        spaceBetween: 30, // Увеличиваем отступы
      }
    }
  });
  
  // Обработка события для параллакса с наклоном устройства
  if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", function(event) {
          let beta = event.beta;  // Наклон вперед-назад (-180 до 180)
          let gamma = event.gamma; // Наклон влево-вправо (-90 до 90)
  
          // Ограничиваем углы движения
          let maxTiltX = 15;  // Максимальный наклон по X
          let maxTiltY = 15;  // Максимальный наклон по Y
  
          let xMove = Math.min(Math.max(gamma, -maxTiltX), maxTiltX); 
          let yMove = Math.min(Math.max(beta, -maxTiltY), maxTiltY);  
  
          // Уменьшаем силу параллакса (замедляем движение)
          let intensity = 0.75; // Чем меньше, тем плавнее
          let translateX = xMove * intensity;
          let translateY = yMove * intensity;
  
          // Применяем ограниченное смещение фона
          document.querySelector(".parallax").style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
  }
  