function hideDialog() {
    const confirmDialog = document.getElementById('confirmDialog');
    if (confirmDialog) {
        confirmDialog.style.display = 'none';
        console.log('Модал подтверждения скрыт');
    }
}

function saveReview() {
    alert('Отзыв отправлен!');
    hideDialog();
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.reset();
        console.log('Отзыв сохранён, форма сброшена');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const confirmDialog = document.getElementById('confirmDialog');
    const userName = document.getElementById('userName');
    const userFeedback = document.getElementById('userFeedback');
    const displayName = document.getElementById('displayName');
    const displayFeedback = document.getElementById('displayFeedback');

    if (!reviewForm || !confirmDialog || !userName || !userFeedback || !displayName || !displayFeedback) {
        console.error('Один или более элементов не найдены');
        return;
    }

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Форма отправлена, предотвращаем стандартное поведение');
        showConfirmation();
    });

    function showConfirmation() {
        const name = userName.value.trim();
        const feedback = userFeedback.value.trim();

        if (name && feedback) {
            displayName.textContent = name;
            displayFeedback.textContent = feedback;
            confirmDialog.style.display = 'flex';
            console.log('Модал подтверждения показан');
        } else {
            alert('Пожалуйста, заполните все поля.');
        }
    }
});