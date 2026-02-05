ALTER TABLE products
ADD COLUMN stock INT NOT NULL DEFAULT 100,
ADD COLUMN unit VARCHAR(20) NOT NULL DEFAULT 'per kg';

-- Add some more realistic sample data
UPDATE products SET stock = 500, unit = 'per kg' WHERE id = 1; -- Tomatoes
UPDATE products SET stock = 800, unit = 'per kg' WHERE id = 2; -- Carrots
UPDATE products SET stock = 1000, unit = 'per kg' WHERE id = 3; -- Potatoes
