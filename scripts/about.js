document.addEventListener('DOMContentLoaded', () => {
    // Кастомная функция для плавной прокрутки
    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();

        function scrollStep(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            window.scrollTo(0, startY + distance * ease(progress));
            if (elapsed < duration) {
                requestAnimationFrame(scrollStep);
            }
        }

        requestAnimationFrame(scrollStep);
    }

    // Обработчик прокрутки
    const header = document.querySelector('.headerdiv');
    const videoSection = document.querySelector('.demons-tion');
    const contentSection = document.querySelector('.aboutdiv');
    let hasScrolledDown = false;
    const videoHeight = videoSection.offsetHeight;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollThreshold = 20;

        // Прокрутка вниз
        if (!hasScrolledDown && currentScrollY > scrollThreshold) {
            hasScrolledDown = true;
            smoothScrollTo(videoHeight, 1000);
            header.classList.add('fixed');
            contentSection.classList.add('visible');
            // Скрываем видео после анимации
            setTimeout(() => {
                videoSection.classList.add('hidden');
            }, 1500);
            window.removeEventListener('scroll', handleScroll); // Отключаем обработчик после анимации
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Код для опросов
    const slides = document.querySelectorAll('.poll-slide');
    const prevButton = document.querySelector('.poll-prev');
    const nextButton = document.querySelector('.poll-next');
    const submitButton = document.querySelector('.poll-submit');
    const modal = document.querySelector('.poll-modal');
    const modalAnswers = document.querySelector('#poll-answers');
    const confirmButton = document.querySelector('.poll-modal-confirm');
    const cancelButton = document.querySelector('.poll-modal-cancel');
    let currentSlide = 0;

    slides[currentSlide].classList.add('active');
    updateButtons();

    nextButton.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            slides[currentSlide].classList.remove('active');
            currentSlide++;
            slides[currentSlide].classList.add('active');
            updateButtons();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide--;
            slides[currentSlide].classList.add('active');
            updateButtons();
        }
    });

    submitButton.addEventListener('click', () => {
        const forms = document.querySelectorAll('.poll-form');
        let allAnswered = true;
        const answers = {};

        forms.forEach(form => {
            const pollName = form.getAttribute('data-poll');
            const selected = form.querySelector('input[type="radio"]:checked');
            if (!selected) {
                allAnswered = false;
            } else {
                answers[pollName] = selected.value;
            }
        });

        if (!allAnswered) {
            alert('Пожалуйста, ответьте на все вопросы!');
            return;
        }

        const answerLabels = {
            nation: 'Нация',
            class: 'Класс техники',
            map: 'Карта',
            style: 'Стиль игры',
            mode: 'Режим игры'
        };
        const answerValues = {
            ussr: 'СССР',
            germany: 'Германия',
            usa: 'США',
            france: 'Франция',
            other: 'Другая',
            heavy: 'Тяжёлые танки',
            medium: 'Средние танки',
            light: 'Лёгкие танки',
            td: 'ПТ-САУ',
            arty: 'САУ',
            malinovka: 'Малиновка',
            prokhorovka: 'Прохоровка',
            himmelsdorf: 'Химмельсдорф',
            mines: 'Рудники',
            aggressive: 'Агрессивный',
            passive: 'Пассивный',
            mixed: 'Смешанный',
            random: 'Рандомные бои',
            tournaments: 'Турниры',
            both: 'И то, и другое'
        };

        modalAnswers.innerHTML = '';
        for (const [key, value] of Object.entries(answers)) {
            const li = document.createElement('li');
            li.textContent = `${answerLabels[key]}: ${answerValues[value] || value}`;
            modalAnswers.appendChild(li);
        }

        modal.style.display = 'flex';
    });

    confirmButton.addEventListener('click', () => {
        modal.style.display = 'none';
        alert('Спасибо за участие! Ответы отправлены.');
    });

    cancelButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    function updateButtons() {
        prevButton.disabled = currentSlide === 0;
        nextButton.style.display = currentSlide === slides.length - 1 ? 'none' : 'inline-block';
        submitButton.style.display = currentSlide === slides.length - 1 ? 'inline-block' : 'none';
    }

    const scrollToTopBtn = document.querySelector('.scroll-to-top');

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
});