document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');
    const confirmation = document.getElementById('confirmation');
    const userName = document.getElementById('userName');
    const userPhone = document.getElementById('userPhone');
    const userEmail = document.getElementById('userEmail');
    const program = document.getElementById('program');
    const totalCost = document.getElementById('totalCost');
    const confName = document.getElementById('confName');
    const confPhone = document.getElementById('confPhone');
    const confEmail = document.getElementById('confEmail');
    const confProgram = document.getElementById('confProgram');
    const confCost = document.getElementById('confCost');
    const cancelButton = document.querySelector('.cancel-btn');
    const confirmButton = document.querySelector('.confirm-btn');
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const card3 = document.getElementById('card3');
    const card4 = document.getElementById('card4');
    const cardHolder = document.getElementById('cardHolder');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCvv = document.getElementById('cardCvv');
    const frequencySelect = document.getElementById('frequency');
    const durationSelect = document.getElementById('duration');
    const paymentTermSelect = document.getElementById('payment-term');

    // Проверка наличия всех элементов
    if (!paymentForm || !confirmation || !userName || !userPhone || !userEmail || !program ||
        !totalCost || !confName || !confPhone || !confEmail || !confProgram || !confCost ||
        !card1 || !card2 || !card3 || !card4 || !cardHolder || !cardExpiry || !cardCvv ||
        !frequencySelect || !durationSelect || !paymentTermSelect) {
        console.warn('Один или более элементов не найдены');
        alert('Ошибка: один или более элементов формы не найдены');
        return;
    }

    // Расчёт стоимости
    function calculateCost() {
        // Базовая стоимость в зависимости от программы
        let baseCost = program.value === 'advanced' ? 12000 : 7500; // 7500 для базовой или по умолчанию, 12000 для продвинутой
        let cost = baseCost;
        let modifier = 1;

        // Частота занятий
        const frequency = parseFloat(frequencySelect.value);
        if (frequency < 1 || (frequency > 3 && frequency <= 4)) {
            modifier += 0.1; // +10% для < 1 или 3 < frequency <= 4
        } else if (frequency > 4) {
            modifier += 0.2; // +20% для > 4
        }

        // Продолжительность
        const duration = parseFloat(durationSelect.value);
        if (duration < 1 || duration > 2) {
            modifier += 0.1; // +10%
        }

        // Срок оплаты
        const paymentTerm = parseFloat(paymentTermSelect.value);
        if (paymentTerm === 6) {
            modifier += 1; // +100% (х2) для 6 месяцев
        } else if (paymentTerm > 2 && paymentTerm <= 3) {
            modifier += 0.1; // +10% за 3 месяца
        } else if (paymentTerm >= 4 && paymentTerm < 6) {
            modifier += 0.3; // +30% за 4–5 месяцев
        }

        // Применяем модификаторы
        cost *= modifier;

        // Скидка за оплату сразу (менее 1 месяца)
        if (paymentTerm < 1) {
            cost *= 0.9; // -10%
        }

        // Округление до целого и форматирование
        const finalCost = Math.round(cost);
        totalCost.textContent = `${finalCost.toLocaleString()} ₽`;
        confCost.textContent = `${finalCost.toLocaleString()} ₽`;
    }

    // Пересчёт стоимости при изменении программы или селектов
    program.addEventListener('change', calculateCost);
    frequencySelect.addEventListener('change', calculateCost);
    durationSelect.addEventListener('change', calculateCost);
    paymentTermSelect.addEventListener('change', calculateCost);
    calculateCost(); // Инициализация (по умолчанию 7500 ₽)

    // Валидация и переход для полей карты
    const cardInputs = [card1, card2, card3, card4];
    cardInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
            if (e.target.value.length === 4 && index < cardInputs.length - 1) {
                cardInputs[index + 1].focus();
            } else if (e.target.value.length === 4 && index === cardInputs.length - 1) {
                cardHolder.focus();
            }
        });
    });

    cardHolder.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-zА-Яа-яЁё\s-]/g, '').slice(0, 50);
    });

    cardHolder.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.value.trim().length >= 2) {
            e.preventDefault();
            cardExpiry.focus();
        }
    });

    cardExpiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        e.target.value = value;
        if (value.length === 5) {
            cardCvv.focus();
        }
    });

    cardCvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
        if (e.target.value.length === 3) {
            document.querySelector('.sendrequest').focus();
        }
    });

    // Проверка заполненности полей
    function validateForm() {
        const cardNumberValid = cardInputs.every(input => input.value.match(/^\d{4}$/));
        const cardHolderValid = cardHolder.value.match(/^[A-Za-zА-Яа-яЁё\s-]+$/);
        const cardExpiryValid = cardExpiry.value.match(/^\d{2}\/\d{2}$/);
        const cardCvvValid = cardCvv.value.match(/^\d{3}$/);
        if (!userName.value.trim() || !userPhone.value.trim() || !userEmail.value.trim() || program.value === '') {
            alert('Пожалуйста, заполните все поля и выберите программу!');
            return false;
        }
        if (!cardNumberValid || !cardHolderValid || !cardExpiryValid || !cardCvvValid) {
            alert('Пожалуйста, заполните все поля карты корректно: номер карты (4 поля по 4 цифры), имя и фамилия (буквы), дата (MM/YY), CVV (3 цифры).');
            return false;
        }
        return true;
    }

    // Показать подтверждение
    function showConfirmation() {
        confName.textContent = userName.value;
        confPhone.textContent = userPhone.value;
        confEmail.textContent = userEmail.value;
        confProgram.textContent = program.value === 'basic' ? 'Базовая программа' : 'Продвинутая программа';
        confirmation.style.display = 'flex';
    }

    // Обработчик отправки формы
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            showConfirmation();
        }
    });

    // Обработчик кнопок подтверждения
    cancelButton.addEventListener('click', () => {
        confirmation.style.display = 'none';
    });

    confirmButton.addEventListener('click', () => {
        alert('Оплата подтверждена! В ближайшее время с вами свяжутся.');
        confirmation.style.display = 'none';
        paymentForm.reset();
        calculateCost(); // Сбрасываем стоимость до начальной (7500 ₽)
    });
});