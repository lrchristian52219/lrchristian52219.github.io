-- Insert sample users
INSERT INTO Users (username, password, email, role) 
VALUES 
('admin', 'admin123', 'admin@example.com', 'admin'),
('user1', 'password123', 'user1@example.com', 'user');

-- Insert sample categories
INSERT INTO Categories (name, priority_level) 
VALUES 
('Smartphones', 1),
('Laptops', 2),
('Gaming Consoles', 3),
('Accessories', 4),
('Wearables', 5);

-- Insert featured products
INSERT INTO Products (name, description, image_url, price, stock, category_id, is_featured)
VALUES 
('CyberPhone X', 'A futuristic smartphone with holographic display.', 'images/placeholder.jpg', 999.99, 10, 1, 1),
('NextGen Console', 'A gaming console with cutting-edge graphics.', 'images/placeholder.jpg', 499.99, 20, 3, 1),
('SmartWatch Pro', 'A smartwatch with advanced health tracking.', 'images/placeholder.jpg', 199.99, 15, 5, 1);

-- Insert additional products
INSERT INTO Products (name, description, image_url, price, stock, category_id, is_featured)
VALUES 
('Quantum Laptop', 'A laptop powered by quantum computing.', 'images/placeholder.jpg', 2499.99, 5, 2, 0),
('Gaming Headset', 'High-quality audio for immersive gaming.', 'images/placeholder.jpg', 79.99, 30, 4, 0),
('VR Headset', 'Experience virtual reality like never before.', 'images/placeholder.jpg', 299.99, 10, 3, 0),
('Fitness Tracker', 'Track your fitness goals with ease.', 'images/placeholder.jpg', 99.99, 25, 5, 0),
('Wireless Earbuds', 'Crystal-clear sound with noise cancellation.', 'images/placeholder.jpg', 149.99, 50, 4, 0);
