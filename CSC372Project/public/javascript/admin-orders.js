document.addEventListener('DOMContentLoaded', async () => {
    const ordersTableBody = document.querySelector('#orders-table tbody');

    async function loadOrders() {
        try {
            const response = await fetch('/api/admin/orders');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const orders = await response.json();

            if (orders.length === 0) {
                ordersTableBody.innerHTML = '<tr><td colspan="4">No orders found.</td></tr>';
                return;
            }

            // Populate the table with orders
            orders.forEach((order) => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.user_id}</td>
                    <td>$${order.total.toFixed(2)}</td>
                    <td>${new Date(order.created_at).toLocaleString()}</td>
                `;

                ordersTableBody.appendChild(row);
            });

            // Add a scroll bar if there are more than 10 orders
            if (orders.length > 10) {
                const ordersContainer = document.getElementById('orders-container');
                ordersContainer.style.maxHeight = '400px';
                ordersContainer.style.overflowY = 'scroll';
            }
        } catch (error) {
            console.error('Failed to load orders:', error);
            ordersTableBody.innerHTML = '<tr><td colspan="4">Failed to load orders. Please try again later.</td></tr>';
        }
    }

    loadOrders();
});