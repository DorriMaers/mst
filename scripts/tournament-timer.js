document.addEventListener('DOMContentLoaded', () => {
    const countdownSpan = document.getElementById('tournament-countdown');
    if (!countdownSpan) {
        console.warn('Элемент #tournament-countdown не найден');
        return;
    }

    const targetDate = new Date('2025-06-15T20:00:00+03:00'); // 15 июня 2025, 20:00 MSK

    function updateCountdown() {
        const now = new Date();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            countdownSpan.textContent = 'Турнир начался!';
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownSpan.textContent = `${days} дн. ${hours} ч. ${minutes} мин. ${seconds} сек.`;
    }

    updateCountdown(); // Первичное обновление
    const timerInterval = setInterval(updateCountdown, 1000); // Обновление каждую секунду
});