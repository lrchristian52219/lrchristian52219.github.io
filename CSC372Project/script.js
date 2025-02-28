document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const deliveryFeeElement = document.getElementById('delivery-fee');
    const serviceFeeElement = document.getElementById('service-fee');
    const totalElement = document.getElementById('total');

    function updateCartTotals() {
        let subtotal = 0;
        const cartItemElements = document.querySelectorAll('.cart-item');
        
        cartItemElements.forEach(item => {
            const price = parseFloat(item.getAttribute('data-price'));
            const quantity = parseInt(item.querySelector('.quantity').value);
            const total = price * quantity;
            item.querySelector('.cart-item-total p').textContent = `Total: $${total.toFixed(2)}`;
            subtotal += total;
        });

        const tax = subtotal * 0.0675;
        const deliveryFee = parseFloat(deliveryFeeElement.textContent);
        const serviceFee = parseFloat(serviceFeeElement.textContent);
        const total = subtotal + tax + deliveryFee + serviceFee;

        subtotalElement.textContent = subtotal.toFixed(2);
        taxElement.textContent = tax.toFixed(2);
        totalElement.textContent = total.toFixed(2);
    }

    cartItems.addEventListener('change', (event) => {
        if (event.target.classList.contains('quantity')) {
            updateCartTotals();
        }
    });

    cartItems.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const cartItem = event.target.closest('.cart-item');
            cartItem.remove();
            updateCartTotals();
        }
    });

    updateCartTotals();
});