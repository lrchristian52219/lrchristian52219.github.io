document.addEventListener("DOMContentLoaded", function () {
    const dishData = {
        sushi1: { name: "The Humble Miso Soup", price: 2.50 },
        sushi2: { name: "The Classic Bento Box", price: 11.00 },
        sushi3: { name: "The Sushi Tray", price: 11.95 },
        wings1: { name: "10 Classic Wings", price: 13.49 },
        wings2: { name: "Bacon Cheddar Burger", price: 12.49 },
        wings3: { name: "10 Boneless Wings", price: 12.99 },
        indian1: { name: "Chicken Tikka Masala", price: 14.13 },
        indian2: { name: "Chicken Curry", price: 14.13 },
        indian3: { name: "Chicken Biryani", price: 14.13 }
    };

    const dishList = document.getElementById("dish-list");
    const mealPlanList = document.getElementById("meal-plan-list");
    const totalAmount = document.getElementById("total-amount");

    // Populate the recommended dishes list
    for (const key in dishData) {
        const li = document.createElement("li");
        li.textContent = `${dishData[key].name} - $${dishData[key].price.toFixed(2)}`;
        li.dataset.key = key;
        li.addEventListener("click", addToMealPlan);
        dishList.appendChild(li);
    }

    function addToMealPlan(event) {
        const key = event.target.dataset.key;
        const dish = dishData[key];
        let mealItem = document.querySelector(`#meal-plan-list li[data-key="${key}"]`);

        if (mealItem) {
            const quantityElem = mealItem.querySelector(".quantity");
            const quantity = parseInt(quantityElem.textContent) + 1;
            quantityElem.textContent = quantity;
            mealItem.querySelector(".subtotal").textContent = (quantity * dish.price).toFixed(2);
        } else {
            mealItem = document.createElement("li");
            mealItem.dataset.key = key;
            mealItem.innerHTML = `
                ${dish.name} - $${dish.price.toFixed(2)} 
                <span class="quantity">1</span> 
                <button class="remove">Remove</button> 
                Subtotal: $<span class="subtotal">${dish.price.toFixed(2)}</span>
            `;
            mealItem.querySelector(".remove").addEventListener("click", removeFromMealPlan);
            mealPlanList.appendChild(mealItem);
        }

        updateTotal();
    }

    function removeFromMealPlan(event) {
        const mealItem = event.target.closest("li");
        const quantityElem = mealItem.querySelector(".quantity");
        const quantity = parseInt(quantityElem.textContent) - 1;

        if (quantity > 0) {
            quantityElem.textContent = quantity;
            const key = mealItem.dataset.key;
            mealItem.querySelector(".subtotal").textContent = (quantity * dishData[key].price).toFixed(2);
        } else {
            mealItem.remove();
        }

        updateTotal();
    }

    function updateTotal() {
        let total = 0;
        document.querySelectorAll("#meal-plan-list li").forEach(item => {
            const subtotal = parseFloat(item.querySelector(".subtotal").textContent);
            total += subtotal;
        });
        totalAmount.textContent = total.toFixed(2);
    }
});