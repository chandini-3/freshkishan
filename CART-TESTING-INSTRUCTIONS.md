# 🛒 Cart Functionality Testing Instructions

## Steps to Test Cart Functionality

### 1. **Setup Database (If needed)**
Run this command to set up test users and products:
```sql
-- Create test users
INSERT INTO users (username, password, full_name, email, user_type) VALUES 
('testuser', 'test123', 'Test Customer', 'test@farmmarket.com', 'customer'),
('demo', 'demo123', 'Demo User', 'demo@farmmarket.com', 'customer');

-- Create test products  
INSERT INTO products (id, name, price, category, farmer_id, stock_quantity) VALUES
(1, 'Organic Tomatoes', 40.00, 'vegetables', 1, 100),
(2, 'Organic Potatoes', 25.00, 'vegetables', 1, 150),
(3, 'Fresh Carrots', 35.00, 'vegetables', 1, 80),
(4, 'Fresh Onions', 30.00, 'vegetables', 1, 120),
(5, 'Organic Cabbage', 20.00, 'vegetables', 1, 90),
(6, 'Garden Seeds Mix', 15.00, 'seeds', 1, 50);
```

### 2. **Access the Enhanced Garden E-Commerce Site**
- Open: `http://localhost:9090/gar/enhanced-garden-ecommerce/`
- Make sure Tomcat is running on port 9090

### 3. **Login with Test Credentials**
Click the "Login" button and use these credentials:
- **Username:** `testuser`
- **Password:** `test123`

OR

- **Username:** `demo`
- **Password:** `demo123`

### 4. **Test Adding Products to Cart**
1. Navigate to the "Products" section
2. Click "🛒 Add to Cart" on any product
3. You should see a success toast notification
4. The cart counter (🛒) in the top-right should update

### 5. **View Cart Contents**
1. Click the cart button (🛒) in the top-right corner
2. The cart modal should open showing your items
3. You should see "Proceed to Checkout" button if items are in cart

### 6. **Test Checkout Process**
1. Click "Proceed to Checkout" from the cart
2. Fill in the checkout form
3. Click "Place Order"
4. You should get an order confirmation with order number

## Debug Tools Available

### Cart Debug Test Page
Access: `http://localhost:9090/gar/cart-debug-test.html`

This page provides step-by-step testing:
1. Test user login
2. Test adding products to cart
3. View cart contents
4. Test servlet connections

### Browser Console Debugging
1. Open browser Developer Tools (F12)
2. Check Console tab for error messages
3. Look for network requests to CartServlet and OrderServlet

## Common Issues and Solutions

### Issue: "Please login first"
- **Solution:** Make sure you're logged in with valid credentials
- **Test credentials:** testuser/test123 or demo/demo123

### Issue: Cart appears empty after adding items
- **Check:** Are you logged in? The cart is user-specific
- **Check:** Browser console for JavaScript errors
- **Check:** Network tab for servlet response status

### Issue: "Proceed to Checkout" button doesn't appear
- **Solution:** Make sure items are actually added to cart
- **Check:** Cart counter shows items added
- **Check:** Use debug test page to verify cart contents

### Issue: Servlet errors
- **Check:** Tomcat is running on port 9090
- **Check:** CartServlet and OrderServlet are compiled and deployed
- **Check:** Database connection is working

## Manual Database Verification

Check cart contents directly in database:
```sql
SELECT c.*, p.name, p.price 
FROM cart c 
JOIN products p ON c.product_id = p.id 
WHERE c.user_id = 1;  -- Replace with your user ID
```

Check user login:
```sql
SELECT * FROM users WHERE username = 'testuser';
```

## Success Indicators

✅ **Cart is working correctly when:**
1. Products can be added to cart without errors
2. Cart counter updates when items are added
3. Cart modal shows added items with "Proceed to Checkout" button
4. Checkout form appears when clicking "Proceed to Checkout"
5. Orders are created successfully with confirmation

If any step fails, use the debug test page to isolate the issue!
