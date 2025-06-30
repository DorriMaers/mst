document.addEventListener('DOMContentLoaded', () => {
    const frequencySelect = document.getElementById('frequency');
    const durationSelect = document.getElementById('duration');
    const paymentTermSelect = document.getElementById('payment-term');
    const totalCostSpan = document.getElementById('total-cost');
    if (!frequencySelect || !durationSelect || !paymentTermSelect || !totalCostSpan) {
        console.warn('Один или более элементов калькулятора не найдены');
        return;
    }

    const baseCost = 10000; // Базовая стоимость в рублях

    function calculateCost() {
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
        if (paymentTerm == 6) {
            modifier += 1; // +100% (х2) для 6 месяцев
        } else if (paymentTerm > 2 && paymentTerm <= 3) {
            modifier += 0.1; // +10% за 3 месяца
        } else if (paymentTerm >= 4 && paymentTerm < 6) {
            modifier += 0.3; // +30% за 4–5 месяцев
        }

        // Применяем модификаторы (кроме оплаты сразу)
        cost *= modifier;

        // Скидка за оплату сразу (менее 1 месяца)
        if (paymentTerm < 1) {
            cost *= 0.9; // -10%
        }

        // Округление до целого и форматирование
        totalCostSpan.textContent = `${Math.round(cost)} ₽`;
    }

    frequencySelect.addEventListener('change', calculateCost);
    durationSelect.addEventListener('change', calculateCost);
    paymentTermSelect.addEventListener('change', calculateCost);

    calculateCost(); // Инициализация при загрузке
});