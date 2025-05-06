document.addEventListener("DOMContentLoaded", function () {
    const dishes = document.querySelectorAll(".dish");

    // Data for each dish
    const dishData = {
        sushi1: {
            name: "The Humble Miso Soup",
            price: "$2.50",
            description: "A classic Japanese soup made with miso paste, tofu, seaweed, and green onions. Brings comfort and warmth to the soul."
        },
        sushi2: {
            name: "The Classic Bento Box",
            price: "$11.00",
            description: "The Staple go to lunch for any Japanese food lover. Comes with rice, miso soup, salad, spring rolls, and your choice of protein with rice."
        },
        sushi3: {
            name: "The Sushi Tray",
            price: "$11.95",
            description: "A fantastic assortment of sushi rolls. Comes with 1 roll and 6 pieces of nigiri. Perfect for a light and cheap lunch."
        },
        wings1: {
            name: "10 Classic Wings",
            price: "$13.49",
            description: "A classic American favorite. Comes with 10 wings and your choice of sauce. Perfect for a quick snack or a meal."
        },
        wings2: {
            name: "Bacon Cheddar Burger",
            price: "$12.49",
            description: "Two seasoned quarter-pound Angus beef patties stacked with Applewood smoked bacon, cheddar cheese, crisp lettuce, tomato, and mayo on a lightly toasted bun"
        },
        wings3: {
            name: "10 Boneless Wings",
            price: "$12.99",
            description: "A classic American favorite. Comes with 10 boneless wings and your choice of sauce. Perfect for a quick snack or a meal."
        },
        indian1: {
            name: "Chicken Tikka Masala",
            price: "$14.13",
            description: "A classic Indian dish. Comes with chicken marinated in yogurt and spices and served in a tomato cream sauce. Served with rice and naan."
        },
        indian2: {
            name: "Chicken Curry",
            price: "$14.13",
            description: "A classic Indian dish. Comes with chicken cooked in a spiced tomato sauce. Served with rice and naan."
        },
        indian3: {
            name: "Chicken Biryani",
            price: "$14.13",
            description: "A classic Indian dish. Comes with chicken cooked with basmati rice and spices. Served with raita and naan."
        },
    };

    dishes.forEach(dish => {
        dish.addEventListener("click", function () {
            // Clear all dish details
            document.querySelectorAll('.dish-details h3').forEach(el => el.textContent = '');
            document.querySelectorAll('.dish-details p').forEach(el => el.textContent = '');

            // Reset the scale of all images
            dishes.forEach(img => {
                img.style.transform = "scale(1)";
            });

            // Scale the clicked image
            this.style.transform = "scale(1.2)";

            // Get the parent restaurant and the dish details elements
            const parentRestaurant = this.closest('.restaraunt');
            const dishName = parentRestaurant.querySelector('.dish-details h3');
            const dishPrice = parentRestaurant.querySelector('.dish-details p:nth-of-type(1)');
            const dishDescription = parentRestaurant.querySelector('.dish-details p:nth-of-type(2)');

            // Get the selected dish data
            const selectedDish = this.getAttribute("alt").toLowerCase().replace(" ", "");
            if (dishData[selectedDish]) {
                dishName.textContent = dishData[selectedDish].name;
                dishPrice.textContent = "Price: " + dishData[selectedDish].price;
                dishDescription.textContent = dishData[selectedDish].description;
            }
        });
    });
});
