function toggleAccordion(element) {
    const content = element.nextElementSibling; // Получаем accordion-content
    if (!content) return; // Проверка на существование content

    const video = content.querySelector('video'); // Находим видео
    const allAccordions = document.querySelectorAll('.standart-content, .cyberskoof-content');
    const belowChoose = document.querySelector('.below-choose');

    content.classList.toggle("open"); // Переключаем класс для показа/скрытия

    if (video) { // Проверяем, существует ли видео
        if (content.classList.contains("open")) {
            video.play().catch(error => console.error('Ошибка воспроизведения видео:', error));
        } else {
            video.pause();
        }
    }

    // Проверяем, открыт ли хотя бы один аккордион
    const anyOpen = Array.from(allAccordions).some(acc => acc.classList.contains("open"));
    if (belowChoose) { // Проверяем, существует ли belowChoose
        if (anyOpen) {
            belowChoose.style.transform = "translateY(770px)"; // Высота открытого аккордеона
        } else {
            belowChoose.style.transform = "translateY(0)";
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Обработчик для кнопки "Вверх"
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        console.warn('Кнопка .scroll-to-top не найдена в DOM');
    }
});