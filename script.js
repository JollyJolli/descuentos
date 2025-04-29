document.addEventListener('DOMContentLoaded', () => {
    const priceInput = document.getElementById('price');
    const discountInput = document.getElementById('discount');
    const calculateBtn = document.getElementById('calculate');
    const savingsElement = document.getElementById('savings');
    const finalPriceElement = document.getElementById('final-price');

    const formatCurrency = (value) => {
        try {
            return new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR'
            }).format(value);
        } catch (error) {
            console.error('Error al formatear el valor:', error);
            return '€0.00';
        }
    };

    const calculateDiscount = () => {
        try {
            const price = parseFloat(priceInput.value);
            const discount = parseFloat(discountInput.value);

            if (isNaN(price) || price <= 0) {
                throw new Error('Por favor, ingrese un precio válido mayor a 0');
            }

            if (isNaN(discount) || discount < 0 || discount > 100) {
                throw new Error('El descuento debe estar entre 0 y 100');
            }

            const savings = (price * discount) / 100;
            const finalPrice = price - savings;

            // Animación suave para los resultados
            savingsElement.style.transition = 'opacity 0.3s';
            finalPriceElement.style.transition = 'opacity 0.3s';

            savingsElement.style.opacity = '0';
            finalPriceElement.style.opacity = '0';

            setTimeout(() => {
                savingsElement.textContent = formatCurrency(savings);
                finalPriceElement.textContent = formatCurrency(finalPrice);

                savingsElement.style.opacity = '1';
                finalPriceElement.style.opacity = '1';
            }, 300);
        } catch (error) {
            alert(error.message);
            savingsElement.textContent = formatCurrency(0);
            finalPriceElement.textContent = formatCurrency(0);
        }
    };

    // Eventos para calcular en tiempo real
    calculateBtn.addEventListener('click', calculateDiscount);

    // Validación de entrada para el precio
    priceInput.addEventListener('input', (e) => {
        if (e.target.value < 0) {
            e.target.value = 0;
        }
    });

    // Validación de entrada para el descuento
    discountInput.addEventListener('input', (e) => {
        if (e.target.value < 0) {
            e.target.value = 0;
        } else if (e.target.value > 100) {
            e.target.value = 100;
        }
    });

    // Permitir calcular con la tecla Enter
    [priceInput, discountInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateDiscount();
            }
        });
    });
});