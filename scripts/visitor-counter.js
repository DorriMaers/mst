document.addEventListener('DOMContentLoaded', () => {
    const visitorCountSpan = document.getElementById('visitor-count');
    if (!visitorCountSpan) {
        console.warn('Элемент #visitor-count не найден');
        return;
    }

    // Получаем текущее количество посещений из localStorage
    let visitorCount = parseInt(localStorage.getItem('visitorCount') || '0', 10);
    
    // Увеличиваем счётчик
    visitorCount += 1;
    
    // Сохраняем новое значение
    localStorage.setItem('visitorCount', visitorCount);
    
    // Обновляем текст на странице
    visitorCountSpan.textContent = visitorCount;
});