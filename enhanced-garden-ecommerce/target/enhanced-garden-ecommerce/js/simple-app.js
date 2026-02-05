// Simple Enhanced Garden E-Commerce Application
console.log('Simple JavaScript file loading...');

// User management system
let currentUser = null;
let users = JSON.parse(localStorage.getItem('farmMarketUsers') || '[]');

// Sample demo users for testing
if (users.length === 0) {
    users = [
        {
            id: 1,
            username: 'demo',
            password: 'demo123',
            email: 'demo@farmmarket.com',
            fullName: 'Demo Customer',
            userType: 'customer'
        },
        {
            id: 2,
            username: 'farmer1',
            password: 'farmer123',
            email: 'farmer@farmmarket.com',
            fullName: 'John Farmer',
            userType: 'farmer'
        }
    ];
    localStorage.setItem('farmMarketUsers', JSON.stringify(users));
}

// Simple content loading function
function loadContent(section) {
    console.log('loadContent called with:', section);
    
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) {
        console.error('mainContent element not found');
        return;
    }

    let content = '';
    
    switch(section) {
        case 'products':
            content = `
                <div class="content-section">
                    <h2>🛒 Fresh Organic Products</h2>
                    <p>Fresh, organic vegetables directly from certified farmers</p>
                    
                    <div class="products-grid">
                        <div class="product-card">
                            <div class="product-image">
                                <img src="images/tomatoes.jpg" alt="Organic Tomatoes">
                            </div>
                            <div class="product-info">
                                <h3>🍅 Organic Tomatoes</h3>
                                <p class="price">₹40 per kg</p>
                                <p class="farmer">By Rajesh Kumar</p>
                                <p class="description">Fresh, red organic tomatoes harvested this morning. Rich in vitamins and perfect for salads, cooking, or eating fresh.</p>
                                <button class="add-to-cart-btn" onclick="addToCartDB(1, 'Organic Tomatoes', 40, this)">🛒 Add to Cart</button>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">
                                <img src="images/potatoes.jpg" alt="Organic Potatoes">
                            </div>
                            <div class="product-info">
                                <h3>🥔 Organic Potatoes</h3>
                                <p class="price">₹25 per kg</p>
                                <p class="farmer">By Rajesh Kumar</p>
                                <p class="description">Fresh organic potatoes grown without chemicals. Great source of energy and perfect for various cooking methods.</p>
                                <button class="add-to-cart-btn" onclick="addToCartDB(2, 'Organic Potatoes', 25, this)">🛒 Add to Cart</button>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">
                                <img src="images/veg1.jpg" alt="Fresh Vegetables Mix">
                            </div>
                            <div class="product-info">
                                <h3>🥬 Fresh Vegetables Mix</h3>
                                <p class="price">₹80 per basket</p>
                                <p class="farmer">By Rajesh Kumar</p>
                                <p class="description">Mixed basket of fresh seasonal vegetables directly from our organic farm.</p>
                                <button class="add-to-cart-btn" onclick="addToCartDB(6, 'Garden Seeds Mix', 15, this)">🛒 Add to Cart</button>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">
                                <img src="images/carrots.jpg" alt="Organic Carrots">
                            </div>
                            <div class="product-info">
                                <h3>🥕 Organic Carrots</h3>
                                <p class="price">₹35 per kg</p>
                                <p class="farmer">By Priya Sharma</p>
                                <p class="description">Sweet, crunchy organic carrots rich in beta-carotene and perfect for cooking or snacking.</p>
                                <button class="add-to-cart-btn" onclick="addToCartDB(3, 'Fresh Carrots', 35, this)">🛒 Add to Cart</button>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">
                                <img src="images/onions.jpg" alt="Fresh Onions">
                            </div>
                            <div class="product-info">
                                <h3>🧅 Fresh Onions</h3>
                                <p class="price">₹30 per kg</p>
                                <p class="farmer">By Amit Patel</p>
                                <p class="description">Fresh, pungent onions essential for cooking. Grown without pesticides in rich soil.</p>
                                <button class="add-to-cart-btn" onclick="addToCartDB(4, 'Fresh Onions', 30, this)">🛒 Add to Cart</button>
                            </div>
                        </div>

                        <div class="product-card">
                            <div class="product-image">
                                <img src="images/cabbage.jpg" alt="Green Cabbage">
                            </div>
                            <div class="product-info">
                                <h3>🥬 Green Cabbage</h3>
                                <p class="price">₹20 per piece</p>
                                <p class="farmer">By Sunita Devi</p>
                                <p class="description">Fresh green cabbage heads perfect for salads, cooking, or making traditional dishes.</p>
                                <button class="add-to-cart-btn" onclick="addToCartDB(5, 'Organic Cabbage', 20, this)">🛒 Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'farmers':
            content = `
                <div class="content-section">
                    <h2>👨‍🌾 Our Farmers</h2>
                    <p>Meet the dedicated farmers who bring you fresh, quality produce.</p>
                    <div class="farmers-grid">
                        <div class="farmer-card">
                            <h3>🚜 Green Valley Farm</h3>
                            <p><strong>Owner:</strong> John Smith</p>
                            <p><strong>Specialty:</strong> Organic Vegetables</p>
                            <p><strong>Location:</strong> Springfield Valley</p>
                            <p>Family-owned farm with 20 years of organic farming experience.</p>
                        </div>
                        <div class="farmer-card">
                            <h3>🌻 Sunny Farm</h3>
                            <p><strong>Owner:</strong> Maria Garcia</p>
                            <p><strong>Specialty:</strong> Fresh Fruits & Vegetables</p>
                            <p><strong>Location:</strong> Riverside County</p>
                            <p>Sustainable farming practices with focus on local community.</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'about':
            content = `
                <div class="content-section">
                    <h2>ℹ️ About Fresh Farm Market</h2>
                    <p>We connect local farmers directly with customers, ensuring fresh produce and fair prices for everyone.</p>
                    <h3>Our Mission</h3>
                    <p>To support local agriculture while providing customers with the freshest, highest-quality produce available.</p>
                    <h3>Why Choose Us?</h3>
                    <ul>
                        <li>✅ Direct from farmers - No middlemen</li>
                        <li>✅ Fresh produce harvested within 24 hours</li>
                        <li>✅ Support local farming communities</li>
                        <li>✅ Competitive prices and fair trade</li>
                    </ul>
                </div>
            `;
            break;
        case 'contact':
            content = `
                <div class="content-section">
                    <h2>📞 Contact Us</h2>
                    <p>Get in touch with our customer service team!</p>
                    <div class="contact-info">
                        <p><strong>📧 Email:</strong> support@freshfarmmarket.com</p>
                        <p><strong>📱 Phone:</strong> (555) 123-FARM</p>
                        <p><strong>📍 Address:</strong> 123 Farm Market St, Agriculture City, AC 12345</p>
                        <p><strong>🕒 Hours:</strong> Monday-Saturday 8AM-6PM</p>
                    </div>
                </div>
            `;
            break;
        case 'home':
            content = `
                <div class="hero-section">
                    <h1>🚜 Welcome to Fresh Farm Market</h1>
                    <p class="hero-text">Connect directly with local farmers and get the freshest produce delivered to your door!</p>
                    <div class="hero-stats">
                        <div class="stat">
                            <h3>500+</h3>
                            <p>Local Farmers</p>
                        </div>
                        <div class="stat">
                            <h3>2000+</h3>
                            <p>Happy Customers</p>
                        </div>
                        <div class="stat">
                            <h3>100%</h3>
                            <p>Fresh Guarantee</p>
                        </div>
                    </div>
                    <button class="cta-button" onclick="loadContent('products')">
                        <i class="fas fa-shopping-cart"></i> Start Shopping Fresh Produce
                    </button>
                </div>
                
                <div class="content-section">
                    <h2>Why Choose Our Marketplace?</h2>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">🚜</div>
                            <h3>Direct from Farmers</h3>
                            <p>Buy directly from local farmers, ensuring freshness and supporting your community.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🥬</div>
                            <h3>Farm Fresh Quality</h3>
                            <p>Get the freshest produce harvested within 24 hours of delivery.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🚚</div>
                            <h3>Fast Delivery</h3>
                            <p>Same-day or next-day delivery available from farms near you.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">💰</div>
                            <h3>Fair Prices</h3>
                            <p>No middlemen means better prices for customers and fair pay for farmers.</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        default:
            content = `
                <div class="content-section">
                    <h2>🌟 Welcome to Fresh Farm Market</h2>
                    <p>Content section: ${section}</p>
                </div>
            `;
    }
    
    mainContent.innerHTML = content;
    console.log('Content loaded for:', section);
    
    // Scroll to top after loading content
    window.scrollTo(0, 0);
    
    // If loading products section, also update cart counter
    if (section === 'products' && currentUser) {
        updateCartCounterDB();
    }
}

// Simple modal functions
function showLoginModal() {
    console.log('showLoginModal called');
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Login modal shown');
    } else {
        alert('Login Modal - JavaScript Working!\nModal element not found, but function executed.');
    }
}

function showRegisterModal() {
    console.log('showRegisterModal called');
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Register modal shown');
    } else {
        alert('Register Modal - JavaScript Working!\nModal element not found, but function executed.');
    }
}

function showFarmerOnboarding() {
    console.log('showFarmerOnboarding called');
    const modal = document.getElementById('farmerOnboardingModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Farmer onboarding modal shown');
    } else {
        alert('Farmer Onboarding - JavaScript Working!\nModal element not found, but function executed.');
    }
}

function closeModal(modalId) {
    console.log('closeModal called for:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        console.log('Modal closed:', modalId);
    }
}

// Login functionality
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt:', username);
    
    // Show loading state
    const loginBtn = document.querySelector('#loginForm button[type="submit"]');
    if (loginBtn) {
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;
    }
    
    // Authenticate with database
    fetch('/gar/LoginServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (loginBtn) {
            loginBtn.textContent = 'Login';
            loginBtn.disabled = false;
        }
        
        if (data.success) {
            // Set current user from database response
            currentUser = {
                id: data.user_id,
                username: data.username,
                fullName: data.full_name,
                email: data.email,
                userType: data.user_type || 'customer'
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Update UI to show logged in state
            updateAuthUI();
            closeModal('loginModal');
            
            // Update cart counter from database
            updateCartCounterDB();
            
            // Show success message
            showToast(`Welcome back, ${currentUser.fullName}!`, 'success');
            
            console.log('Login successful:', currentUser);
        } else {
            // Show error message
            const loginMessage = document.getElementById('loginMessage');
            if (loginMessage) {
                loginMessage.innerHTML = '<p style="color: red;">❌ ' + (data.message || 'Invalid username or password') + '</p>';
            }
            console.log('Login failed:', data.message);
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        if (loginBtn) {
            loginBtn.textContent = 'Login';
            loginBtn.disabled = false;
        }
        const loginMessage = document.getElementById('loginMessage');
        if (loginMessage) {
            loginMessage.innerHTML = '<p style="color: red;">❌ Login failed. Please try again.</p>';
        }
    });
}

// Registration functionality
function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Check if passwords match
    if (password !== confirmPassword) {
        const registerMessage = document.getElementById('registerMessage');
        if (registerMessage) {
            registerMessage.innerHTML = '<p style="color: red;">❌ Passwords do not match</p>';
        }
        return;
    }
    
    // Show loading state
    const registerBtn = document.querySelector('#registerForm button[type="submit"]');
    if (registerBtn) {
        registerBtn.textContent = 'Creating Account...';
        registerBtn.disabled = true;
    }
    
    // Register with database
    const registrationData = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
        if (key !== 'confirmPassword') { // Don't send confirm password
            registrationData.append(key, value);
        }
    }
    
    fetch('/gar/RegistrationServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: registrationData.toString()
    })
    .then(response => response.json())
    .then(data => {
        if (registerBtn) {
            registerBtn.textContent = 'Create Account';
            registerBtn.disabled = false;
        }
        
        if (data.success) {
            // Set current user from database response
            currentUser = {
                id: data.user_id,
                username: formData.get('username'),
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                userType: formData.get('userType') || 'customer'
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Update UI
            updateAuthUI();
            closeModal('registerModal');
            
            // Show success message
            showToast(`Welcome, ${currentUser.fullName}! Your account has been created.`, 'success');
            
            console.log('Registration successful:', currentUser);
        } else {
            // Show error message
            const registerMessage = document.getElementById('registerMessage');
            if (registerMessage) {
                registerMessage.innerHTML = '<p style="color: red;">❌ ' + (data.message || 'Registration failed') + '</p>';
            }
            console.log('Registration failed:', data.message);
        }
    })
    .catch(error => {
        console.error('Registration error:', error);
        if (registerBtn) {
            registerBtn.textContent = 'Create Account';
            registerBtn.disabled = false;
        }
        const registerMessage = document.getElementById('registerMessage');
        if (registerMessage) {
            registerMessage.innerHTML = '<p style="color: red;">❌ Registration failed. Please try again.</p>';
        }
    });
}

// Update authentication UI
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userToolbar = document.getElementById('userToolbar');
    const welcomeText = document.getElementById('welcomeText');
    
    if (currentUser) {
        // User is logged in - hide login/register buttons, show user toolbar
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userToolbar) userToolbar.style.display = 'flex';
        if (welcomeText) welcomeText.textContent = `Welcome, ${currentUser.fullName}!`;
        
        // Show farmer dashboard button if user is a farmer
        const farmerDashboardBtn = document.getElementById('farmerDashboardBtn');
        if (farmerDashboardBtn && currentUser.userType === 'farmer') {
            farmerDashboardBtn.style.display = 'block';
        }
        
        // Update cart counter from database
        updateCartCounterDB();
    } else {
        // User is not logged in - show login/register buttons, hide user toolbar
        if (loginBtn) loginBtn.style.display = 'inline-flex';
        if (registerBtn) registerBtn.style.display = 'inline-flex';
        if (userToolbar) userToolbar.style.display = 'none';
        
        // Hide farmer dashboard button
        const farmerDashboardBtn = document.getElementById('farmerDashboardBtn');
        if (farmerDashboardBtn) farmerDashboardBtn.style.display = 'none';
    }
}

// Logout functionality
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showToast('You have been logged out successfully', 'info');
    loadContent('home');
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    } else {
        alert(message);
    }
}

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('farmMarketCart') || '[]');

// Product data
const products = {
    'organic-tomatoes': { name: '🍅 Organic Tomatoes', price: 40, unit: 'kg', farmer: 'Rajesh Kumar' },
    'organic-potatoes': { name: '🥔 Organic Potatoes', price: 25, unit: 'kg', farmer: 'Rajesh Kumar' },
    'vegetables-mix': { name: '🥬 Fresh Vegetables Mix', price: 80, unit: 'basket', farmer: 'Rajesh Kumar' },
    'organic-carrots': { name: '🥕 Organic Carrots', price: 35, unit: 'kg', farmer: 'Priya Sharma' },
    'fresh-onions': { name: '🧅 Fresh Onions', price: 30, unit: 'kg', farmer: 'Amit Patel' },
    'green-cabbage': { name: '🥬 Green Cabbage', price: 20, unit: 'piece', farmer: 'Sunita Devi' }
};

function addToCart(productId) {
    if (!currentUser) {
        alert('Please login first to add items to cart');
        showLoginModal();
        return;
    }
    
    const product = products[productId];
    if (!product) {
        alert('Product not found');
        return;
    }
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            unit: product.unit,
            farmer: product.farmer,
            quantity: 1
        });
    }
    
    localStorage.setItem('farmMarketCart', JSON.stringify(cart));
    
    // Show success toast
    showToast(`${product.name} added to cart!`, 'success');
    updateCartCounter();
    
    console.log('Added to cart:', product);
}

// Database-integrated cart functions
function addToCartDB(productId, productName, price, buttonElement) {
    console.log('addToCartDB called:', { productId, productName, price, currentUser });
    
    if (!currentUser) {
        alert('Please login first to add items to cart\n\nDemo credentials:\nUsername: testuser\nPassword: test123');
        showLoginModal();
        return;
    }
    
    // Show loading state - use passed button element or try to find the button
    let addButton = buttonElement;
    if (!addButton && window.event) {
        addButton = window.event.target;
    }
    
    let originalText = 'Add to Cart';
    if (addButton) {
        originalText = addButton.textContent;
        addButton.textContent = 'Adding...';
        addButton.disabled = true;
    }
    
    fetch('/gar/CartServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=add&product_id=${productId}&quantity=1`
    })
    .then(response => {
        console.log('Cart response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Cart response data:', data);
        
        // Restore button state
        if (addButton) {
            addButton.textContent = originalText;
            addButton.disabled = false;
        }
        
        if (data.success) {
            showToast(`${productName} added to cart successfully!`, 'success');
            updateCartCounterDB();
            
            // Show helpful message
            setTimeout(() => {
                showToast('Click the cart button (🛒) in the top right to view your cart!', 'info');
            }, 2000);
        } else {
            alert('Error adding to cart: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Cart error:', error);
        
        // Restore button state
        if (addButton) {
            addButton.textContent = originalText;
            addButton.disabled = false;
        }
        
        alert('Failed to add to cart. Please check if you are logged in and try again.');
    });
}

function updateCartCounterDB() {
    fetch('/gar/CartServlet')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const cartCount = data.item_count || 0;
            const cartCountElement = document.getElementById('cartCount');
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            }
        }
    })
    .catch(error => {
        console.error('Error updating cart counter:', error);
    });
}

function updateCartCounter() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    // Update cart counter in UI if it exists
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Enhanced showCart function with complete error handling
function showCart() {
    console.log('🛒 showCart called - Version 2.0');
    
    // Step 1: Check user authentication
    if (!currentUser) {
        console.log('❌ User not authenticated');
        alert('Please login first!\n\nClick Login button and use:\nUsername: testuser\nPassword: test123');
        showLoginModal();
        return;
    }
    
    console.log('✅ User authenticated:', currentUser.fullName);
    
    // Step 2: Find or create cart modal
    let modal = document.getElementById('cartModal');
    if (!modal) {
        console.log('⚠️ Creating cart modal...');
        createCartModal();
        modal = document.getElementById('cartModal');
    }
    
    if (!modal) {
        console.error('❌ Failed to create cart modal');
        alert('Error: Could not create cart modal. Please refresh the page.');
        return;
    }
    
    console.log('✅ Cart modal ready');
    
    // Step 3: Show loading state
    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 24px; margin-bottom: 20px;">🛒</div>
                <div style="font-size: 18px; margin-bottom: 10px;">Loading your cart...</div>
                <div style="color: #666;">Please wait while we fetch your items</div>
            </div>
        `;
    }
    
    // Step 4: Show modal
    modal.style.display = 'block';
    modal.style.zIndex = '10000';
    console.log('✅ Cart modal displayed');
    
    // Step 5: Load cart data
    loadCartFromDB();
}

// Function to create cart modal if missing
function createCartModal() {
    const modalHTML = `
        <div class="modal" id="cartModal" style="
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        ">
            <div class="modal-content" style="
                background-color: #fefefe;
                margin: 5% auto;
                padding: 20px;
                border: none;
                border-radius: 10px;
                width: 90%;
                max-width: 600px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                position: relative;
                max-height: 80vh;
                overflow-y: auto;
            ">
                <span class="close" onclick="closeModal('cartModal')" style="
                    color: #aaa;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                    position: absolute;
                    right: 15px;
                    top: 10px;
                ">&times;</span>
                <h2 style="margin-top: 0; color: #4CAF50;">
                    <i class="fas fa-shopping-cart"></i> Shopping Cart
                </h2>
                <div id="cartItems"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    console.log('✅ Cart modal created successfully');
}

function loadCartFromDB() {
    console.log('loadCartFromDB called');
    
    fetch('/gar/CartServlet')
    .then(response => {
        console.log('Cart servlet response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Cart data received:', data);
        if (data.success) {
            displayCartItemsDB(data.cart_items || [], data.total_amount || 0);
        } else {
            const cartItemsContainer = document.getElementById('cartItems');
            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = '<p>Error loading cart: ' + data.message + '</p>';
            }
        }
    })
    .catch(error => {
        console.error('Error loading cart:', error);
        const cartItemsContainer = document.getElementById('cartItems');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '<p>Failed to load cart</p>';
        }
    });
}

function displayCartItemsDB(cartItems, totalAmount) {
    console.log('displayCartItemsDB called with:', { cartItems, totalAmount });
    
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) {
        console.error('❌ cartItems container not found');
        return;
    }
    
    console.log('cartItems container found, items count:', cartItems.length);
    
    if (cartItems.length === 0) {
        console.log('Cart is empty - showing empty cart message');
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>🛒 Your cart is empty</p>
                <p>Add some fresh produce to get started!</p>
                <button class="btn-primary" onclick="closeModal('cartModal'); loadContent('products')">
                    Start Shopping
                </button>
            </div>
        `;
        return;
    }
    
    console.log('Cart has items - building cart HTML...');
    
    let cartHTML = `
        <div class="shopping-cart-header">
            <h3>🛒 Your Shopping Cart (${cartItems.length} items)</h3>
        </div>
    `;
    
    cartItems.forEach(item => {
        cartHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p class="item-price">₹${item.price}/kg</p>
                    <p class="item-farmer">Fresh from farm</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantityDB(${item.product_id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                    <span class="quantity">Qty: ${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantityDB(${item.product_id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="item-total">
                    <p class="item-total-price">₹${item.total}</p>
                    <button class="remove-btn" onclick="removeFromCartDB(${item.product_id})">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartHTML += `
        <div class="cart-summary">
            <div class="cart-total">
                <div class="total-line">
                    <span>Subtotal:</span>
                    <span>₹${totalAmount}</span>
                </div>
                <div class="total-line">
                    <span>Delivery:</span>
                    <span>Free</span>
                </div>
                <div class="total-line final-total">
                    <span><strong>Total: ₹${totalAmount}</strong></span>
                </div>
            </div>
            <div class="cart-actions">
                <button class="btn-secondary" onclick="clearCartDB()">Clear Cart</button>
                <button class="btn-primary checkout-btn" onclick="proceedToCheckoutDB()">
                    <i class="fas fa-shopping-cart"></i> Proceed to Checkout
                </button>
            </div>
        </div>
    `;
    
    console.log('Setting cart HTML content...');
    cartItemsContainer.innerHTML = cartHTML;
    console.log('✅ Cart HTML content set successfully with Proceed to Checkout button');
}

function updateQuantityDB(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCartDB(productId);
        return;
    }
    
    fetch('/gar/CartServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=update&product_id=${productId}&quantity=${newQuantity}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadCartFromDB();
            updateCartCounterDB();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to update cart');
    });
}

function removeFromCartDB(productId) {
    fetch('/gar/CartServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=remove&product_id=${productId}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadCartFromDB();
            updateCartCounterDB();
            showToast('Item removed from cart', 'success');
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to remove from cart');
    });
}

function clearCartDB() {
    if (confirm('Are you sure you want to clear the cart?')) {
        fetch('/gar/CartServlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'action=clear'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadCartFromDB();
                updateCartCounterDB();
                showToast('Cart cleared', 'success');
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to clear cart');
        });
    }
}

// Database-integrated checkout - Enhanced with order page creation
function proceedToCheckoutDB() {
    console.log('🛒 Proceeding to checkout...');
    closeModal('cartModal');
    
    // Create a dedicated order page instead of just a modal
    createOrderPage();
}

// Create dedicated order page - Better UX than modal
function createOrderPage() {
    console.log('🛒 Creating dedicated order page...');
    
    // Load cart data first
    fetch('/gar/CartServlet')
    .then(response => response.json())
    .then(data => {
        if (data.success && data.cart_items.length > 0) {
            // Create full-page order experience
            const orderPageHTML = `
                <div class="order-page-container">
                    <div class="order-header">
                        <div class="breadcrumb">
                            <button class="back-btn" onclick="loadContent('products')">
                                ← Back to Shopping
                            </button>
                            <span class="breadcrumb-text">Cart → <strong>Place Order</strong></span>
                        </div>
                        <h1>🛒 Complete Your Order</h1>
                        <p class="order-subtitle">Fresh produce delivered directly from local farmers</p>
                    </div>

                    <div class="order-content-grid">
                        <!-- Order Form Section -->
                        <div class="order-form-section">
                            <div class="form-card">
                                <h2>📝 Delivery Information</h2>
                                <form id="orderForm" class="order-form">
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="fullName">
                                                <i class="fas fa-user"></i> Full Name *
                                            </label>
                                            <input type="text" id="fullName" name="fullName" required 
                                                   placeholder="Enter your full name" 
                                                   value="${currentUser ? currentUser.fullName : ''}">
                                        </div>
                                        <div class="form-group">
                                            <label for="phone">
                                                <i class="fas fa-phone"></i> Phone Number *
                                            </label>
                                            <input type="tel" id="phone" name="phone" required 
                                                   placeholder="Enter your phone number">
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="shippingAddress">
                                            <i class="fas fa-map-marker-alt"></i> Delivery Address *
                                        </label>
                                        <textarea id="shippingAddress" name="shippingAddress" required rows="3" 
                                                  placeholder="Enter your complete delivery address with landmarks"></textarea>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="city">
                                                <i class="fas fa-city"></i> City *
                                            </label>
                                            <input type="text" id="city" name="city" required 
                                                   placeholder="Your city">
                                        </div>
                                        <div class="form-group">
                                            <label for="pincode">
                                                <i class="fas fa-mail-bulk"></i> PIN Code *
                                            </label>
                                            <input type="text" id="pincode" name="pincode" required 
                                                   placeholder="6-digit PIN code">
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="deliveryTime">
                                            <i class="fas fa-clock"></i> Preferred Delivery Time
                                        </label>
                                        <select id="deliveryTime" name="deliveryTime">
                                            <option value="Morning (9 AM - 12 PM)">🌅 Morning (9 AM - 12 PM)</option>
                                            <option value="Afternoon (12 PM - 4 PM)">☀️ Afternoon (12 PM - 4 PM)</option>
                                            <option value="Evening (4 PM - 8 PM)">🌆 Evening (4 PM - 8 PM)</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="specialInstructions">
                                            <i class="fas fa-comment"></i> Special Instructions
                                        </label>
                                        <textarea id="specialInstructions" name="specialInstructions" rows="2" 
                                                  placeholder="Any special delivery instructions (optional)"></textarea>
                                    </div>
                                </form>
                            </div>

                            <div class="payment-card">
                                <h2>💳 Payment Method</h2>
                                <div class="payment-options">
                                    <label class="payment-option">
                                        <input type="radio" name="paymentMethod" value="Cash on Delivery" checked>
                                        <div class="payment-content">
                                            <span class="payment-icon">💵</span>
                                            <div class="payment-text">
                                                <strong>Cash on Delivery</strong>
                                                <small>Pay when your order arrives</small>
                                            </div>
                                        </div>
                                    </label>
                                    
                                    <label class="payment-option">
                                        <input type="radio" name="paymentMethod" value="UPI Payment">
                                        <div class="payment-content">
                                            <span class="payment-icon">📱</span>
                                            <div class="payment-text">
                                                <strong>UPI Payment</strong>
                                                <small>Pay instantly with UPI</small>
                                            </div>
                                        </div>
                                    </label>
                                    
                                    <label class="payment-option">
                                        <input type="radio" name="paymentMethod" value="Online Payment">
                                        <div class="payment-content">
                                            <span class="payment-icon">🌐</span>
                                            <div class="payment-text">
                                                <strong>Online Payment</strong>
                                                <small>Card, Net Banking, Wallet</small>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Order Summary Section -->
                        <div class="order-summary-section">
                            <div class="summary-card">
                                <h2>📋 Order Summary</h2>
                                <div class="order-items-list">
            `;
            
            // Add cart items
            data.cart_items.forEach(item => {
                orderPageHTML += `
                    <div class="order-item">
                        <div class="item-image">
                            <img src="${item.image || 'images/default-product.jpg'}" alt="${item.name}" 
                                 onerror="this.src='images/default-product.jpg'">
                        </div>
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p class="item-price">₹${item.price}/kg</p>
                            <p class="item-quantity">Quantity: ${item.quantity} kg</p>
                        </div>
                        <div class="item-total">
                            <span class="total-price">₹${item.total}</span>
                        </div>
                    </div>
                `;
            });
            
            // Add order totals and action buttons
            orderPageHTML += `
                                </div>
                                
                                <div class="order-totals">
                                    <div class="total-row">
                                        <span>Subtotal (${data.cart_items.length} items):</span>
                                        <span>₹${data.total_amount}</span>
                                    </div>
                                    <div class="total-row">
                                        <span>Delivery Fee:</span>
                                        <span class="free-delivery">Free</span>
                                    </div>
                                    <div class="total-row tax-row">
                                        <span>Taxes & Fees:</span>
                                        <span>Included</span>
                                    </div>
                                    <div class="total-row final-total">
                                        <span><strong>Total Amount:</strong></span>
                                        <span class="final-amount"><strong>₹${data.total_amount}</strong></span>
                                    </div>
                                </div>

                                <div class="order-benefits">
                                    <h3>✨ Why Choose Fresh Farm Market?</h3>
                                    <ul>
                                        <li>🚛 Free delivery on all orders</li>
                                        <li>🌱 Direct from farmers - 100% fresh</li>
                                        <li>💯 Quality guarantee or money back</li>
                                        <li>📱 Real-time order tracking</li>
                                    </ul>
                                </div>

                                <div class="order-actions">
                                    <button type="button" class="btn-secondary back-to-cart" onclick="showCart()">
                                        ← Back to Cart
                                    </button>
                                    <button type="button" class="btn-primary place-order-final" onclick="placeOrderFromPage()">
                                        <i class="fas fa-check-circle"></i> Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Replace main content with order page
            document.getElementById('mainContent').innerHTML = orderPageHTML;
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            console.log('✅ Order page created successfully');
            
        } else {
            // Handle empty cart
            showEmptyCartMessage();
        }
    })
    .catch(error => {
        console.error('Error creating order page:', error);
        alert('Error loading order page. Please try again.');
    });
}

function showEmptyCartMessage() {
    document.getElementById('mainContent').innerHTML = `
        <div class="empty-cart-page">
            <div class="empty-cart-content">
                <div class="empty-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any fresh produce to your cart yet.</p>
                <button class="btn-primary" onclick="loadContent('products')">
                    <i class="fas fa-shopping-basket"></i> Start Shopping
                </button>
            </div>
        </div>
    `;
}

function placeOrderFromPage() {
    console.log('🛒 Placing order from dedicated page...');
    
    // Get form data
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const shippingAddress = document.getElementById('shippingAddress').value.trim();
    const city = document.getElementById('city').value.trim();
    const pincode = document.getElementById('pincode').value.trim();
    const deliveryTime = document.getElementById('deliveryTime').value;
    const specialInstructions = document.getElementById('specialInstructions').value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Validation
    if (!fullName) {
        alert('Please enter your full name');
        document.getElementById('fullName').focus();
        return;
    }
    
    if (!phone) {
        alert('Please enter your phone number');
        document.getElementById('phone').focus();
        return;
    }
    
    if (!shippingAddress) {
        alert('Please enter your delivery address');
        document.getElementById('shippingAddress').focus();
        return;
    }
    
    if (!city) {
        alert('Please enter your city');
        document.getElementById('city').focus();
        return;
    }
    
    if (!pincode || !/^\d{6}$/.test(pincode)) {
        alert('Please enter a valid 6-digit PIN code');
        document.getElementById('pincode').focus();
        return;
    }
    
    // Show loading state
    const placeOrderBtn = document.querySelector('.place-order-final');
    const originalText = placeOrderBtn.innerHTML;
    placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Placing Order...';
    placeOrderBtn.disabled = true;
    
    // Prepare complete address
    const completeAddress = `${fullName}\n${shippingAddress}\n${city} - ${pincode}\nPhone: ${phone}`;
    
    // Place order
    fetch('/gar/OrderServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=create_order&shipping_address=${encodeURIComponent(completeAddress)}&payment_method=${encodeURIComponent(paymentMethod)}&delivery_time=${encodeURIComponent(deliveryTime)}&special_instructions=${encodeURIComponent(specialInstructions)}`
    })
    .then(response => response.json())
    .then(data => {
        placeOrderBtn.innerHTML = originalText;
        placeOrderBtn.disabled = false;
        
        if (data.success) {
            // Show order confirmation page
            showOrderConfirmationPage(data);
            updateCartCounterDB(); // Update cart counter after successful order
        } else {
            alert('Error placing order: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error placing order:', error);
        placeOrderBtn.innerHTML = originalText;
        placeOrderBtn.disabled = false;
        alert('Failed to place order. Please try again.');
    });
}

function showOrderConfirmationPage(orderData) {
    const confirmationHTML = `
        <div class="order-confirmation-page">
            <div class="confirmation-content">
                <div class="success-animation">
                    <div class="success-checkmark">
                        <svg class="checkmark" viewBox="0 0 52 52">
                            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                            <path class="checkmark-check" fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                    <h1>🎉 Order Placed Successfully!</h1>
                    <p class="success-message">Thank you for choosing Fresh Farm Market. Your order is confirmed!</p>
                </div>
                
                <div class="order-details-card">
                    <h2>📋 Order Details</h2>
                    <div class="order-info-grid">
                        <div class="info-row">
                            <span class="label">Order Number:</span>
                            <span class="value order-number">#${orderData.order_number}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Total Amount:</span>
                            <span class="value amount">₹${orderData.total_amount}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Payment Method:</span>
                            <span class="value">${orderData.payment_method}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Expected Delivery:</span>
                            <span class="value delivery-date">${orderData.expected_delivery || 'Within 24 hours'}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Order Status:</span>
                            <span class="value status confirmed">Confirmed & Processing</span>
                        </div>
                    </div>
                </div>
                
                <div class="delivery-timeline">
                    <h2>🚚 Delivery Timeline</h2>
                    <div class="timeline">
                        <div class="timeline-item active">
                            <div class="timeline-icon">✅</div>
                            <div class="timeline-content">
                                <h4>Order Confirmed</h4>
                                <p>Your order has been received and confirmed</p>
                                <span class="timestamp">Just now</span>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-icon">📦</div>
                            <div class="timeline-content">
                                <h4>Order Packed</h4>
                                <p>Fresh produce being carefully packed</p>
                                <span class="timestamp">Within 2 hours</span>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-icon">🚛</div>
                            <div class="timeline-content">
                                <h4>Out for Delivery</h4>
                                <p>Your order is on the way</p>
                                <span class="timestamp">Within 24 hours</span>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-icon">🏠</div>
                            <div class="timeline-content">
                                <h4>Delivered</h4>
                                <p>Fresh produce delivered to your door</p>
                                <span class="timestamp">Today/Tomorrow</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="next-steps-card">
                    <h2>📱 What's Next?</h2>
                    <div class="steps-grid">
                        <div class="step">
                            <div class="step-icon">📧</div>
                            <h4>Email Confirmation</h4>
                            <p>Order confirmation sent to your email</p>
                        </div>
                        <div class="step">
                            <div class="step-icon">📱</div>
                            <h4>SMS Updates</h4>
                            <p>Receive real-time updates on your phone</p>
                        </div>
                        <div class="step">
                            <div class="step-icon">🚛</div>
                            <h4>Delivery Call</h4>
                            <p>Our delivery partner will call before arrival</p>
                        </div>
                        <div class="step">
                            <div class="step-icon">⭐</div>
                            <h4>Rate & Review</h4>
                            <p>Share your experience after delivery</p>
                        </div>
                    </div>
                </div>
                
                <div class="confirmation-actions">
                    <button class="btn-secondary" onclick="loadContent('home')">
                        🏠 Back to Home
                    </button>
                    <button class="btn-primary" onclick="loadContent('products')">
                        🛒 Continue Shopping
                    </button>
                    <button class="btn-outline" onclick="window.print()">
                        🖨️ Print Order
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Replace content with confirmation page
    document.getElementById('mainContent').innerHTML = confirmationHTML;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Add CSS animation class
    setTimeout(() => {
        document.querySelector('.success-checkmark').classList.add('animate');
    }, 100);
    
    console.log('✅ Order confirmation page displayed');
}

function displayCheckoutFormDB() {
    const checkoutContainer = document.getElementById('checkoutContent');
    if (!checkoutContainer) return;
    
    // Load current cart to show in checkout
    fetch('/gar/CartServlet')
    .then(response => response.json())
    .then(data => {
        if (data.success && data.cart_items.length > 0) {
            let checkoutHTML = `
                <div class="checkout-container">
                    <div class="checkout-header">
                        <h2>🛒 Checkout</h2>
                        <p>Complete your order for fresh farm produce</p>
                    </div>
                    
                    <div class="checkout-form-section">
                        <form id="checkoutForm">
                            <div class="form-group">
                                <label for="fullName">Full Name *</label>
                                <input type="text" id="fullName" name="fullName" required 
                                       placeholder="Enter your full name" 
                                       value="${currentUser ? currentUser.fullName : ''}">
                            </div>
                            
                            <div class="form-group">
                                <label for="shippingAddress">Shipping Address *</label>
                                <textarea id="shippingAddress" name="shippingAddress" required rows="3" 
                                          placeholder="Enter your complete delivery address"></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="paymentMethod">Select Payment Method *</label>
                                <select id="paymentMethod" name="paymentMethod" required>
                                    <option value="">Choose payment method</option>
                                    <option value="Cash on Delivery">💵 Cash on Delivery</option>
                                    <option value="Credit Card">💳 Credit Card</option>
                                    <option value="Online Payment">🌐 Online Payment</option>
                                    <option value="UPI">📱 UPI Payment</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="deliveryTime">Preferred Delivery Time</label>
                                <select id="deliveryTime" name="deliveryTime">
                                    <option value="Morning (9 AM - 12 PM)">🌅 Morning (9 AM - 12 PM)</option>
                                    <option value="Afternoon (12 PM - 4 PM)">☀️ Afternoon (12 PM - 4 PM)</option>
                                    <option value="Evening (4 PM - 8 PM)">🌆 Evening (4 PM - 8 PM)</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="specialInstructions">Special Instructions</label>
                                <textarea id="specialInstructions" name="specialInstructions" rows="2" 
                                          placeholder="Any special delivery instructions (optional)"></textarea>
                            </div>
                        </form>
                    </div>
                    
                    <div class="order-summary-section">
                        <h3>📋 Order Summary</h3>
                        <div class="order-items">
            `;
            
            data.cart_items.forEach(item => {
                checkoutHTML += `
                    <div class="checkout-item">
                        <span class="item-name">${item.name}</span>
                        <span class="item-details">₹${item.price} × ${item.quantity}</span>
                        <span class="item-price">₹${item.total}</span>
                    </div>
                `;
            });
            
            checkoutHTML += `
                        </div>
                        <div class="order-totals">
                            <div class="total-line">
                                <span>Subtotal:</span>
                                <span>₹${data.total_amount}</span>
                            </div>
                            <div class="total-line">
                                <span>Delivery Fee:</span>
                                <span class="free-delivery">Free</span>
                            </div>
                            <div class="total-line final-total">
                                <span><strong>Total: ₹${data.total_amount}</strong></span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="checkout-actions">
                        <button type="button" class="btn-secondary" onclick="closeModal('checkoutModal')">
                            ← Back to Cart
                        </button>
                        <button type="button" class="btn-primary place-order-btn" onclick="placeOrderDB()">
                            ✅ Place Order
                        </button>
                    </div>
                </div>
            `;
            
            checkoutContainer.innerHTML = checkoutHTML;
        } else {
            checkoutContainer.innerHTML = `
                <div class="empty-checkout">
                    <h3>Your cart is empty</h3>
                    <p>Please add items before checkout.</p>
                    <button class="btn-primary" onclick="closeModal('checkoutModal'); loadContent('products')">
                        Continue Shopping
                    </button>
                </div>
            `;
        }
    })
    .catch(error => {
        console.error('Error loading checkout:', error);
        checkoutContainer.innerHTML = `
            <div class="checkout-error">
                <h3>Error loading checkout</h3>
                <p>Please try again or contact support.</p>
                <button class="btn-secondary" onclick="closeModal('checkoutModal')">Close</button>
            </div>
        `;
    });
}

function placeOrderDB() {
    const fullName = document.getElementById('fullName').value.trim();
    const shippingAddress = document.getElementById('shippingAddress').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;
    const deliveryTime = document.getElementById('deliveryTime').value;
    const specialInstructions = document.getElementById('specialInstructions').value.trim();
    
    if (!fullName) {
        alert('Please enter your full name');
        return;
    }
    
    if (!shippingAddress) {
        alert('Please enter your delivery address');
        return;
    }
    
    if (!paymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    // Show loading state
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const originalText = placeOrderBtn.textContent;
    placeOrderBtn.textContent = '⏳ Placing Order...';
    placeOrderBtn.disabled = true;
    
    // Prepare complete shipping address with name
    const completeAddress = `${fullName}\n${shippingAddress}`;
    
    fetch('/gar/OrderServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=create_order&shipping_address=${encodeURIComponent(completeAddress)}&payment_method=${encodeURIComponent(paymentMethod)}&delivery_time=${encodeURIComponent(deliveryTime)}&special_instructions=${encodeURIComponent(specialInstructions)}`
    })
    .then(response => response.json())
    .then(data => {
        placeOrderBtn.textContent = originalText;
        placeOrderBtn.disabled = false;
        
        if (data.success) {
            closeModal('checkoutModal');
            showOrderConfirmation(data);
            updateCartCounterDB(); // Update cart counter after successful order
        } else {
            alert('Error placing order: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        placeOrderBtn.textContent = originalText;
        placeOrderBtn.disabled = false;
        alert('Failed to place order. Please try again.');
    });
}

function showOrderConfirmation(orderData) {
    const confirmationHTML = `
        <div class="order-confirmation">
            <div class="success-animation">
                <div class="success-icon">✅</div>
                <h2>Order Placed Successfully!</h2>
            </div>
            
            <div class="order-details-card">
                <h3>📋 Order Details</h3>
                <div class="order-info-grid">
                    <div class="info-item">
                        <label>Order Number:</label>
                        <span class="order-number">${orderData.order_number}</span>
                    </div>
                    <div class="info-item">
                        <label>Total Amount:</label>
                        <span class="order-amount">₹${orderData.total_amount}</span>
                    </div>
                    <div class="info-item">
                        <label>Expected Delivery:</label>
                        <span class="delivery-date">${orderData.expected_delivery}</span>
                    </div>
                    <div class="info-item">
                        <label>Status:</label>
                        <span class="order-status">Confirmed & Processing</span>
                    </div>
                </div>
            </div>
            
            <div class="next-steps">
                <h3>🚚 What's Next?</h3>
                <ul>
                    <li>✅ Your order is confirmed and being prepared</li>
                    <li>📱 You'll receive SMS updates on your order status</li>
                    <li>🚛 Our delivery partner will contact you before delivery</li>
                    <li>📧 Order confirmation email sent to your registered email</li>
                </ul>
            </div>
            
            <div class="confirmation-actions">
                <button class="btn-secondary" onclick="loadContent('home')">
                    🏠 Back to Home
                </button>
                <button class="btn-primary" onclick="loadContent('products')">
                    🛒 Continue Shopping
                </button>
            </div>
        </div>
    `;
    
    showToast('🎉 Order placed successfully!', 'success');
    
    // Show in main content
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.innerHTML = confirmationHTML;
        window.scrollTo(0, 0);
    }
}

// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>🛒 Your cart is empty</p>
                <button class="btn-primary" onclick="closeModal('cartModal'); loadContent('products')">
                    Start Shopping
                </button>
            </div>
        `;
        return;
    }
    
    let total = 0;
    let cartHTML = `
        <div class="cart-items">
    `;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="farmer-name">By ${item.farmer}</p>
                    <p class="item-price">₹${item.price} per ${item.unit}</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">🗑️</button>
                </div>
                <div class="cart-item-total">
                    ₹${itemTotal}
                </div>
            </div>
        `;
    });
    
    cartHTML += `
        </div>
        <div class="cart-summary">
            <div class="cart-total">
                <h3>Total: ₹${total}</h3>
            </div>
            <div class="cart-actions">
                <button class="btn-secondary" onclick="clearCart()">Clear Cart</button>
                <button class="btn-primary" onclick="proceedToCheckout()">Proceed to Checkout</button>
            </div>
        </div>
    `;
    
    cartItemsContainer.innerHTML = cartHTML;
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('farmMarketCart', JSON.stringify(cart));
        displayCartItems();
        updateCartCounter();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('farmMarketCart', JSON.stringify(cart));
    displayCartItems();
    updateCartCounter();
    showToast('Item removed from cart', 'info');
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        localStorage.setItem('farmMarketCart', JSON.stringify(cart));
        displayCartItems();
        updateCartCounter();
        showToast('Cart cleared', 'info');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    closeModal('cartModal');
    showCheckoutModal();
}

// Show checkout modal
function showCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        displayCheckoutForm();
        modal.style.display = 'block';
    }
}

// Display checkout form
function displayCheckoutForm() {
    const checkoutContainer = document.getElementById('checkoutContent');
    if (!checkoutContainer) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let checkoutHTML = `
        <div class="checkout-section">
            <h3>📋 Order Summary</h3>
            <div class="order-items">
    `;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        checkoutHTML += `
            <div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${itemTotal}</span>
            </div>
        `;
    });
    
    checkoutHTML += `
            </div>
            <div class="order-total">
                <strong>Total: ₹${total}</strong>
            </div>
        </div>
        
        <div class="checkout-section">
            <h3>🚚 Delivery Information</h3>
            <form id="checkoutForm" onsubmit="completeOrder(event)">
                <div class="form-group">
                    <label for="deliveryAddress">Delivery Address:</label>
                    <textarea id="deliveryAddress" name="address" required placeholder="Enter your full delivery address"></textarea>
                </div>
                <div class="form-group">
                    <label for="deliveryPhone">Phone Number:</label>
                    <input type="tel" id="deliveryPhone" name="phone" required placeholder="Enter your phone number">
                </div>
                <div class="form-group">
                    <label for="deliveryTime">Preferred Delivery Time:</label>
                    <select id="deliveryTime" name="deliveryTime" required>
                        <option value="">Select delivery time</option>
                        <option value="morning">Morning (8AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 5PM)</option>
                        <option value="evening">Evening (5PM - 8PM)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="paymentMethod">Payment Method:</label>
                    <select id="paymentMethod" name="paymentMethod" required>
                        <option value="">Select payment method</option>
                        <option value="cod">Cash on Delivery</option>
                        <option value="upi">UPI Payment</option>
                        <option value="card">Credit/Debit Card</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="specialInstructions">Special Instructions (Optional):</label>
                    <textarea id="specialInstructions" name="instructions" placeholder="Any special delivery instructions"></textarea>
                </div>
                <div class="checkout-actions">
                    <button type="button" class="btn-secondary" onclick="closeModal('checkoutModal')">Cancel</button>
                    <button type="submit" class="btn-primary">Place Order (₹${total})</button>
                </div>
            </form>
        </div>
    `;
    
    checkoutContainer.innerHTML = checkoutHTML;
}

// Complete order
function completeOrder(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const orderData = {
        id: 'ORD' + Date.now(),
        customer: currentUser.fullName,
        customerEmail: currentUser.email,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        deliveryAddress: formData.get('address'),
        phone: formData.get('phone'),
        deliveryTime: formData.get('deliveryTime'),
        paymentMethod: formData.get('paymentMethod'),
        specialInstructions: formData.get('instructions'),
        status: 'confirmed',
        orderDate: new Date().toISOString(),
        estimatedDelivery: getEstimatedDelivery()
    };
    
    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('farmMarketOrders') || '[]');
    orders.push(orderData);
    localStorage.setItem('farmMarketOrders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    localStorage.setItem('farmMarketCart', JSON.stringify(cart));
    updateCartCounter();
    
    // Close checkout modal
    closeModal('checkoutModal');
    
    // Show success message
    showOrderConfirmation(orderData);
}

// Get estimated delivery date
function getEstimatedDelivery() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toDateString();
}

// Show order confirmation
function showOrderConfirmation(orderData) {
    const confirmationHTML = `
        <div class="order-confirmation">
            <h2>🎉 Order Confirmed!</h2>
            <div class="order-details">
                <p><strong>Order ID:</strong> ${orderData.id}</p>
                <p><strong>Total Amount:</strong> ₹${orderData.total}</p>
                <p><strong>Estimated Delivery:</strong> ${orderData.estimatedDelivery}</p>
                <p><strong>Payment Method:</strong> ${orderData.paymentMethod.toUpperCase()}</p>
            </div>
            <div class="confirmation-actions">
                <button class="btn-primary" onclick="closeOrderConfirmation(); loadContent('home')">Continue Shopping</button>
            </div>
        </div>
    `;
    
    // Create and show confirmation modal
    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'modal';
    confirmationModal.id = 'orderConfirmationModal';
    confirmationModal.style.display = 'block';
    confirmationModal.innerHTML = `
        <div class="modal-content">
            ${confirmationHTML}
        </div>
    `;
    
    document.body.appendChild(confirmationModal);
    
    // Auto-remove after showing
    setTimeout(() => {
        showToast(`Order ${orderData.id} confirmed! Delivery: ${orderData.estimatedDelivery}`, 'success');
    }, 1000);
}

// Close order confirmation
function closeOrderConfirmation() {
    const modal = document.getElementById('orderConfirmationModal');
    if (modal) {
        modal.remove();
    }
}

// Show profile modal
function showProfile() {
    console.log('showProfile called');
    const modal = document.getElementById('profileModal');
    if (modal) {
        displayProfileContent();
        modal.style.display = 'block';
    } else {
        alert('Profile Modal - Coming Soon!');
    }
}

// Display profile content
function displayProfileContent() {
    const profileContainer = document.getElementById('profileContent');
    if (!profileContainer || !currentUser) return;
    
    profileContainer.innerHTML = `
        <div class="profile-info">
            <h3>👤 Personal Information</h3>
            <p><strong>Name:</strong> ${currentUser.fullName}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <p><strong>Username:</strong> ${currentUser.username}</p>
            <p><strong>Account Type:</strong> ${currentUser.userType}</p>
            ${currentUser.phone ? `<p><strong>Phone:</strong> ${currentUser.phone}</p>` : ''}
        </div>
        <div class="profile-actions">
            <button class="btn-primary" onclick="closeModal('profileModal')">Close</button>
        </div>
    `;
}

// Show farmer dashboard
function showFarmerDashboard() {
    console.log('showFarmerDashboard called');
    if (currentUser && currentUser.userType === 'farmer') {
        alert('🚜 Farmer Dashboard - Coming Soon!\n\nFeatures will include:\n• View your products\n• Manage inventory\n• Track orders\n• Analytics');
    } else {
        alert('Access denied: Farmer account required');
    }
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Test function
function testButton() {
    console.log('testButton called');
    alert('✅ JavaScript is working perfectly!\nAll buttons should now be functional.');
    showLoginModal();
}

// Make functions globally available
window.loadContent = loadContent;
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
window.showFarmerOnboarding = showFarmerOnboarding;
window.closeModal = closeModal;
window.testButton = testButton;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.logout = logout;
window.addToCart = addToCart;
window.showCart = showCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.proceedToCheckout = proceedToCheckout;
window.completeOrder = completeOrder;
window.closeOrderConfirmation = closeOrderConfirmation;
window.showProfile = showProfile;
window.showFarmerDashboard = showFarmerDashboard;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Simple app initialized successfully');
    
    // Check if user was previously logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
        console.log('User auto-logged in:', currentUser);
    }
    
    // Initialize cart counter
    updateCartCounter();
    
    // Load the home page by default
    loadContent('home');
    
    console.log('Available functions:', ['loadContent', 'showLoginModal', 'showRegisterModal', 'handleLogin', 'handleRegister', 'logout', 'showCart', 'addToCart']);
});

console.log('✅ Simple JavaScript file loaded completely');

// Debug function to test cart
function debugCart() {
    console.log('=== CART DEBUG ===');
    console.log('Current user:', currentUser);
    console.log('Cart contents:', cart);
    console.log('Cart count:', cart.length);
    console.log('showCart function:', typeof window.showCart);
    
    // Test adding item to cart
    if (currentUser) {
        console.log('Adding test item to cart...');
        addToCart('organic-tomatoes');
    } else {
        console.log('No user logged in');
    }
}

// Initialize page on load
function initializePage() {
    console.log('Initializing page...');
    
    // Check for logged in user
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            updateAuthUI();
            updateCartCounterDB(); // Load cart counter from database
            console.log('User restored from localStorage:', currentUser);
        } catch (e) {
            console.error('Error parsing saved user:', e);
            localStorage.removeItem('currentUser');
        }
    }
    
    // Ensure cart modal exists - create if missing
    ensureCartModalExists();
    
    // Load default content
    loadContent('home');
}

// Function to ensure cart modal exists
function ensureCartModalExists() {
    let cartModal = document.getElementById('cartModal');
    if (!cartModal) {
        console.log('⚠️ Cart modal missing - creating dynamically...');
        
        const modalHTML = `
            <div class="modal" id="cartModal" style="display: none;">
                <div class="modal-content">
                    <span class="close" onclick="closeModal('cartModal')">&times;</span>
                    <h2><i class="fas fa-shopping-cart"></i> Shopping Cart</h2>
                    <div id="cartItems"></div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        console.log('✅ Cart modal created dynamically');
    } else {
        console.log('✅ Cart modal exists');
    }
    
    // Also ensure cartItems container exists
    setTimeout(() => {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) {
            console.log('⚠️ cartItems container missing');
            const modal = document.getElementById('cartModal');
            if (modal) {
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.insertAdjacentHTML('beforeend', '<div id="cartItems"></div>');
                    console.log('✅ cartItems container created');
                }
            }
        }
    }, 100);
}

// Make debug function available
window.debugCart = function() {
    console.log('=== CART DEBUG INFO ===');
    console.log('Current User:', currentUser);
    console.log('Cart Modal Element:', document.getElementById('cartModal'));
    console.log('Cart Count Element:', document.getElementById('cartCount'));
    
    if (currentUser) {
        console.log('Testing cart servlet connection...');
        fetch('/gar/CartServlet')
        .then(response => response.json())
        .then(data => {
            console.log('Cart Servlet Response:', data);
            if (data.success) {
                console.log('✅ Cart servlet working');
                console.log('Cart items:', data.cart_items?.length || 0);
                console.log('Total amount:', data.total_amount || 0);
            } else {
                console.log('❌ Cart servlet error:', data.message);
            }
        })
        .catch(error => {
            console.error('Cart Servlet Error:', error);
        });
    } else {
        console.log('❌ No user logged in. Please login first.');
        console.log('Demo credentials: testuser/test123 or demo/demo123');
    }
    
    // Test servlet availability
    console.log('Testing all servlets...');
    ['CartServlet', 'OrderServlet', 'LoginServlet'].forEach(servlet => {
        fetch('/gar/' + servlet)
        .then(response => {
            console.log(`${servlet}: ${response.ok ? '✅' : '❌'} Status ${response.status}`);
        })
        .catch(error => {
            console.log(`${servlet}: ❌ Error - ${error}`);
        });
    });
};

// Add comprehensive cart diagnostic
window.runCartDiagnostic = function() {
    console.log('🔧 RUNNING COMPREHENSIVE CART DIAGNOSTIC...');
    
    const results = [];
    
    // Check 1: DOM elements
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartBtn = document.querySelector('.cart-btn');
    
    results.push(`Cart Modal: ${cartModal ? '✅ Found' : '❌ Missing'}`);
    results.push(`Cart Items Container: ${cartItems ? '✅ Found' : '❌ Missing'}`);
    results.push(`Cart Counter: ${cartCount ? '✅ Found' : '❌ Missing'}`);
    results.push(`Cart Button: ${cartBtn ? '✅ Found' : '❌ Missing'}`);
    
    // Check 2: User authentication
    results.push(`User Logged In: ${currentUser ? '✅ Yes (' + currentUser.fullName + ')' : '❌ No'}`);
    
    // Check 3: Functions available
    const functions = ['showCart', 'addToCartDB', 'loadCartFromDB', 'displayCartItemsDB'];
    functions.forEach(func => {
        results.push(`Function ${func}: ${typeof window[func] === 'function' ? '✅ Available' : '❌ Missing'}`);
    });
    
    console.log('DIAGNOSTIC RESULTS:');
    results.forEach(result => console.log(result));
    
    if (!currentUser) {
        console.log('🔧 TIP: Run quickLogin() to login automatically');
    }
    
    console.log('🔧 TIP: Run testCartQuick() to test full cart workflow');
    console.log('🔧 TIP: Run forceShowCart() to force open cart modal');
    
    return results;
};

// EMERGENCY CART FIX - Call this function from browser console
window.fixCartNow = function() {
    console.log('� EMERGENCY CART FIX STARTING...');
    
    // Step 1: Login if needed
    if (!currentUser) {
        console.log('Step 1: Logging in...');
        fetch('/gar/LoginServlet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'username=testuser&password=test123'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                currentUser = {
                    id: data.user_id,
                    username: data.username,
                    fullName: data.full_name,
                    email: data.email,
                    userType: data.user_type || 'customer'
                };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                updateAuthUI();
                updateCartCounterDB();
                console.log('✅ Login successful:', currentUser.fullName);
                
                // Step 2: Add test item
                setTimeout(() => addTestItemAndShowCart(), 1000);
            } else {
                console.log('❌ Login failed:', data.message);
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            alert('Login error: ' + error);
        });
    } else {
        console.log('✅ User already logged in:', currentUser.fullName);
        addTestItemAndShowCart();
    }
};

function addTestItemAndShowCart() {
    console.log('Step 2: Adding test item to cart...');
    
    fetch('/gar/CartServlet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=add&product_id=1&quantity=1'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('✅ Item added to cart successfully');
            updateCartCounterDB();
            
            // Step 3: Show cart
            setTimeout(() => {
                console.log('Step 3: Showing cart...');
                showCart();
                console.log('🎉 CART FIX COMPLETE! Cart should now be visible.');
            }, 500);
        } else {
            console.log('❌ Failed to add item:', data.message);
            // Try to show cart anyway
            setTimeout(() => showCart(), 500);
        }
    })
    .catch(error => {
        console.error('Add item error:', error);
        // Try to show cart anyway
        setTimeout(() => showCart(), 500);
    });
}

// Add immediate cart button test
window.testCartButton = function() {
    console.log('🔧 TESTING CART BUTTON CLICK...');
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        console.log('Cart button found, triggering click...');
        cartBtn.click();
        console.log('Cart button clicked');
    } else {
        console.log('❌ Cart button not found');
    }
};

// Add a quick login function for testing
window.quickLogin = function() {
    fetch('/gar/LoginServlet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'username=testuser&password=test123'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = {
                id: data.user_id,
                username: data.username,
                fullName: data.full_name,
                email: data.email,
                userType: data.user_type || 'customer'
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateAuthUI();
            updateCartCounterDB();
            console.log('✅ Quick login successful!', currentUser);
            alert('✅ Quick login successful as ' + currentUser.fullName);
        } else {
            console.log('❌ Quick login failed:', data.message);
            alert('❌ Quick login failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('❌ Quick login error:', error);
        alert('❌ Quick login error: ' + error);
    });
};

// Add embedded cart test function
window.testCartQuick = function() {
    const testResults = [];
    
    // Test 1: Check if user is logged in
    if (!currentUser) {
        if (confirm('No user logged in. Would you like to login quickly as testuser?')) {
            quickLogin();
            setTimeout(() => testCartQuick(), 2000); // Retry after login
            return;
        }
        alert('Please login first to test cart functionality');
        return;
    }
    
    testResults.push('✅ User logged in: ' + currentUser.fullName);
    
    // Test 2: Add item to cart
    fetch('/gar/CartServlet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'action=add&product_id=1&quantity=1'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            testResults.push('✅ Successfully added item to cart');
            
            // Test 3: View cart
            return fetch('/gar/CartServlet');
        } else {
            testResults.push('❌ Failed to add item to cart: ' + data.message);
            throw new Error('Add to cart failed');
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && data.cart_items && data.cart_items.length > 0) {
            testResults.push('✅ Cart contains ' + data.cart_items.length + ' items');
            testResults.push('✅ Total amount: ₹' + data.total_amount);
            
            // Test 4: Show cart modal
            showCart();
            testResults.push('✅ Cart modal opened - check for "Proceed to Checkout" button');
            
            setTimeout(() => {
                alert('🛒 CART TEST RESULTS:\n\n' + testResults.join('\n') + '\n\n📝 The cart modal should now be open with items and a "Proceed to Checkout" button.');
            }, 500);
        } else {
            testResults.push('❌ Cart appears empty even after adding items');
            alert('🛒 CART TEST RESULTS:\n\n' + testResults.join('\n') + '\n\n❌ ISSUE: Cart is empty after adding items. Check server logs.');
        }
    })
    .catch(error => {
        testResults.push('❌ Error during cart test: ' + error);
        alert('🛒 CART TEST RESULTS:\n\n' + testResults.join('\n'));
        console.error('Cart test error:', error);
    });
};

window.debugCart = debugCart;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializePage);

// Also initialize on window load as fallback
window.addEventListener('load', function() {
    if (!currentUser) {
        initializePage();
    }
});
