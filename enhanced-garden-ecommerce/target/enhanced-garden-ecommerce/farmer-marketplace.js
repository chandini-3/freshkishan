const farmerApp = {
    // DOM Elements
    elements: {
        loginModal: null,
        modalTitle: null,
        closeButton: null,
        mainContent: null,
        mobileMenuButton: null,
        navMenu: null,
        cartDropdown: null,
        cartItemCount: null,
    },
    homePageContent: null, // To store initial content
    currentUser: null, // To store logged-in user info
    pendingAction: null, // To store action to perform after login
    cart: [], // To store cart items

    // Initialize the application
    init() {
        // Cache DOM elements
        this.elements.loginModal = document.getElementById('loginModal');
        this.elements.modalTitle = document.getElementById('modalTitle');
        this.elements.closeButton = document.querySelector('.modal .close');
        this.elements.mainContent = document.getElementById('mainContent');
        this.elements.mobileMenuButton = document.querySelector('.mobile-menu-btn');
        this.elements.navMenu = document.querySelector('.nav-menu');
        this.elements.cartDropdown = document.getElementById('cart-dropdown');
        this.elements.cartItemCount = document.getElementById('cart-item-count');

        // Check for logged in user in session storage
        this.checkSessionLogin();

        // Store the initial homepage content
        if (this.elements.mainContent) {
            this.homePageContent = this.elements.mainContent.innerHTML;
        }

        // Add event listeners
        this.addEventListeners();

        // Load initial page content and update UI
        this.loadPage('home');
        this.updateCartDisplay();
        this.updateAuthUI();
    },

    // Add all event listeners
    addEventListeners() {
        // Modal close button
        if (this.elements.closeButton) {
            this.elements.closeButton.onclick = () => this.closeLoginModal();
        }

        // Login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.handleLogin(new FormData(loginForm));
            });
        }

        // Close modal when clicking outside of it
        window.onclick = (event) => {
            if (event.target == this.elements.loginModal) {
                this.closeLoginModal();
            }
        };
        
        // Mobile menu toggle
        if (this.elements.mobileMenuButton) {
            this.elements.mobileMenuButton.onclick = () => this.toggleMobileMenu();
        }
    },

    // --- Modal Management ---

    // Show the login modal
    showLoginModal(userType) {
        if (this.elements.loginModal) {
            this.elements.modalTitle.textContent = `Login as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`;
            // Store the role for the login handler
            this.elements.loginModal.dataset.userType = userType;
            this.elements.loginModal.style.display = 'block';
        }
    },

    // Close the login modal
    closeLoginModal() {
        if (this.elements.loginModal) {
            this.elements.loginModal.style.display = 'none';
        }
    },

    // --- Page Loading ---

    // Load page content dynamically
    loadPage(pageName) {
        console.log(`Loading page: ${pageName}`);
        
        if (pageName === 'home') {
            if (this.homePageContent) {
                this.elements.mainContent.innerHTML = this.homePageContent;
            }
        } else if (pageName === 'buy') {
            if (this.currentUser) {
                this.displayProducts();
            } else {
                alert('You must be logged in to view and purchase products.');
                this.pendingAction = { page: 'buy' };
                this.showLoginModal('buyer');
            }
        } else if (pageName === 'sell') {
            // Protect this page
            if (this.currentUser && this.currentUser.role === 'seller') {
                this.displaySellForm();
            } else {
                alert('You must be logged in as a seller to access this page.');
                this.pendingAction = 'sell'; // Remember what the user wanted to do
                this.showLoginModal('seller');
            }
        } else if (pageName === 'register') {
            this.displayRegisterForm();
        } else if (pageName === 'checkout') {
            this.displayCheckoutPage();
        } else {
            // For other pages, we can show a placeholder
            this.elements.mainContent.innerHTML = `<div class="container" style="padding: 40px;"><h2 style="text-align: center;">${pageName.charAt(0).toUpperCase() + pageName.slice(1)} Page</h2><p style="text-align: center;">This page is under construction.</p></div>`;
        }
        
        // Close mobile menu after navigation
        if (this.elements.navMenu.classList.contains('active')) {
            this.toggleMobileMenu();
        }
    },

    // --- User Authentication ---
    checkSessionLogin() {
        const userJson = sessionStorage.getItem('currentUser');
        if (userJson) {
            this.currentUser = JSON.parse(userJson);
        }
    },

    handleLogin(formData) {
        const email = formData.get('email');
        const password = formData.get('password');
        const userType = this.elements.loginModal.dataset.userType;

        const users = JSON.parse(localStorage.getItem('farmerMandiUsers')) || [];
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            // Successful login
            this.currentUser = {
                name: foundUser.username, // Use username
                role: userType
            };

            // Save user to session storage to persist login for the session
            sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));

            this.closeLoginModal();
            this.updateAuthUI();
            alert(`Welcome, ${this.currentUser.name}!`);

            // If there was a pending action, execute it now
            if (this.pendingAction) {
                if (this.pendingAction.page === 'addToCart' && this.pendingAction.productId) {
                    this.addToCart(this.pendingAction.productId);
                } else if (this.pendingAction.page) {
                    this.loadPage(this.pendingAction.page);
                }
                this.pendingAction = null;
            }
        } else {
            // Failed login
            alert('Invalid email or password.');
        }
    },

    handleRegistration(formData) {
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        const users = JSON.parse(localStorage.getItem('farmerMandiUsers')) || [];
        const existingUser = users.find(user => user.email === email || user.username === username);

        if (existingUser) {
            if (existingUser.email === email) {
                alert('An account with this email already exists.');
            } else {
                alert('An account with this username already exists.');
            }
            return;
        }

        // Add new user
        users.push({ username, email, password });
        localStorage.setItem('farmerMandiUsers', JSON.stringify(users));

        alert('Registration successful! You can now log in.');
        this.showLoginModal('buyer'); // Show login modal after registration
    },

    logout() {
        alert(`Goodbye, ${this.currentUser.name}!`);
        this.currentUser = null;
        // Remove user from session storage
        sessionStorage.removeItem('currentUser');
        this.updateAuthUI();
        this.loadPage('home');
    },

    updateAuthUI() {
        const authSection = document.querySelector('.auth-section');
        if (this.currentUser) {
            authSection.innerHTML = `
                <div class="user-info">
                    <span>Welcome, ${this.currentUser.name}</span>
                    <button onclick="farmerApp.logout()" class="auth-btn logout-btn">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            `;
        } else {
            authSection.innerHTML = `
                <div class="dropdown">
                    <button class="auth-btn">
                        <i class="fas fa-user"></i> Login / Registration
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <a href="#" onclick="farmerApp.showLoginModal('buyer')">
                            <i class="fas fa-shopping-cart"></i> Login as Buyer
                        </a>
                        <a href="#" onclick="farmerApp.showLoginModal('seller')">
                            <i class="fas fa-store"></i> Login as Seller
                        </a>
                        <a href="#" onclick="farmerApp.loadPage('register')">
                            <i class="fas fa-user-plus"></i> Register New Account
                        </a>
                    </div>
                </div>
            `;
        }
    },

    // --- Cart Management ---
    addToCart(productId) {
        if (!this.currentUser) {
            alert('Please log in to add items to your cart.');
            this.pendingAction = { page: 'addToCart', productId: productId };
            this.showLoginModal('buyer');
            return;
        }

        const product = simulatedProducts.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        alert(`${product.name} has been added to your cart.`);
        this.updateCartDisplay();
    },

    updateCartDisplay() {
        if (!this.elements.cartDropdown) return;

        this.elements.cartItemCount.textContent = this.cart.reduce((sum, item) => sum + item.quantity, 0);

        if (this.cart.length === 0) {
            this.elements.cartDropdown.innerHTML = '<p style="text-align: center; color: #777;">Your cart is empty.</p>';
            return;
        }

        const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        this.elements.cartDropdown.innerHTML = `
            ${this.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>${item.quantity} x ₹${item.price.toFixed(2)}</p>
                    </div>
                    <span class="item-price">₹${(item.quantity * item.price).toFixed(2)}</span>
                </div>
            `).join('')}
            <div class="cart-summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>₹${subtotal.toFixed(2)}</span>
                </div>
                <div class="cart-actions">
                    <a href="#" onclick="farmerApp.loadPage('checkout')" class="cta-btn secondary">View Cart</a>
                    <a href="#" onclick="farmerApp.loadPage('checkout')" class="cta-btn primary">Checkout</a>
                </div>
            </div>
        `;
    },

    // --- Registration Page ---
    displayRegisterForm() {
        this.closeLoginModal(); // Close login modal if it's open
        this.elements.mainContent.innerHTML = `
            <div class="container" style="padding-top: 60px; padding-bottom: 60px;">
                <div class="register-container">
                    <h2>Register An Account</h2>
                    <p>Create an account to start buying and selling.</p>
                    <form id="registerForm">
                        <div class="form-group">
                            <label for="reg-username">Username</label>
                            <input type="text" id="reg-username" name="username" required>
                        </div>
                        <div class="form-group">
                            <label for="reg-email">Email address</label>
                            <input type="email" id="reg-email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="reg-password">Password</label>
                            <input type="password" id="reg-password" name="password" required>
                        </div>
                        <button type="submit" class="btn-submit">Register</button>
                    </form>
                    <div class="form-footer">
                        <a href="#" onclick="farmerApp.showLoginModal('buyer')">Already have an account? Login</a>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('registerForm').addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleRegistration(new FormData(event.target));
        });
    },

    showRegisterModal() {
        this.loadPage('register');
    },

    // --- Product Display ---
    displayProducts() {
        this.elements.mainContent.innerHTML = `
            <div class="container" style="padding-top: 40px; padding-bottom: 40px;">
                <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 40px; color: #27ae60;">Our Fresh Products</h2>
                <div id="productGrid" class="features-grid"></div>
            </div>
        `;

        const productGrid = document.getElementById('productGrid');
        
        if (simulatedProducts.length === 0) {
            productGrid.innerHTML = '<p>No products available at the moment. Please check back later.</p>';
            return;
        }

        productGrid.innerHTML = simulatedProducts.map(product => this.renderProductCard(product)).join('');
    },

    renderProductCard(product) {
        return `
            <div class="feature-card" style="text-align: left;">
                <img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px;">
                <h3 style="margin-bottom: 5px;">${product.name}</h3>
                <p style="font-size: 0.9em; color: #666; margin-bottom: 10px; min-height: 40px;">${product.description}</p>
                <div style="font-size: 0.9em; color: #555; margin-bottom: 15px;">
                    <i class="fas fa-user"></i> ${product.farmerName}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: #27ae60;">
                        ₹${product.price.toFixed(2)} <span style="font-size: 1rem; color: #777;">${product.unit}</span>
                    </div>
                    <div style="font-size: 0.9em; color: #777;">
                        Stock: ${product.stock}
                    </div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="cta-btn primary" style="width: 100%; padding: 10px; font-size: 14px;" onclick="farmerApp.addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="cta-btn secondary" style="width: 100%; padding: 10px; font-size: 14px;">
                        <i class="fas fa-envelope"></i> Contact
                    </button>
                </div>
            </div>
        `;
    },
    
    // --- Sell Page ---
    displaySellForm() {
        this.elements.mainContent.innerHTML = `
            <div class="container" style="padding-top: 40px; padding-bottom: 40px;">
                <div class="sell-form-container">
                    <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 30px; color: #2c3e50;">List a New Product</h2>
                    <p style="text-align: center; margin-bottom: 40px; color: #7f8c8d;">Fill out the details below to add your product to the marketplace.</p>
                    
                    <form id="sellProductForm">
                        <div class="form-group">
                            <label for="productName">Product Name</label>
                            <input type="text" id="productName" name="productName" required placeholder="e.g., Organic Red Tomatoes">
                        </div>
                        
                        <div class="form-group">
                            <label for="productDescription">Description</label>
                            <textarea id="productDescription" name="productDescription" rows="4" required placeholder="Describe your product, its quality, and origin."></textarea>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="productPrice">Price (per unit)</label>
                                <input type="number" id="productPrice" name="productPrice" required placeholder="e.g., 40.00">
                            </div>
                            <div class="form-group">
                                <label for="productUnit">Unit</label>
                                <input type="text" id="productUnit" name="productUnit" required placeholder="e.g., kg, dozen, bag">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="productStock">Available Stock</label>
                                <input type="number" id="productStock" name="productStock" required placeholder="e.g., 200">
                            </div>
                            <div class="form-group">
                                <label for="imageUrl">Image URL</label>
                                <input type="text" id="imageUrl" name="imageUrl" required placeholder="https://example.com/image.jpg">
                            </div>
                        </div>
                        
                        <div class="form-group" style="text-align: center;">
                            <button type="submit" class="cta-btn primary" style="width: 50%; padding: 15px; font-size: 1.1rem;">
                                <i class="fas fa-plus-circle"></i> Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        const sellForm = document.getElementById('sellProductForm');
        sellForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleProductSubmission(new FormData(sellForm));
        });
    },

    handleProductSubmission(formData) {
        const productData = Object.fromEntries(formData.entries());
        
        const newProduct = {
            id: simulatedProducts.length + 1,
            name: productData.productName,
            description: productData.productDescription,
            price: parseFloat(productData.productPrice),
            imageUrl: productData.imageUrl,
            stock: parseInt(productData.productStock),
            unit: productData.productUnit,
            farmerName: this.currentUser ? this.currentUser.name : 'Anonymous Seller'
        };

        // Add the new product to the start of the array
        simulatedProducts.unshift(newProduct);

        alert('Product added successfully!');
        
        // Go to the buy page to see the new product
        this.loadPage('buy');
    },

    // --- Checkout Page ---
    displayCheckoutPage() {
        const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const deliveryFee = 50.00;
        const total = subtotal + deliveryFee;

        this.elements.mainContent.innerHTML = `
            <div class="checkout-container">
                <div class="checkout-form">
                    <h3>Contact information</h3>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" id="email" placeholder="you@example.com">
                    </div>

                    <h3>Shipping address</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">First name</label>
                            <input type="text" id="firstName">
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last name</label>
                            <input type="text" id="lastName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input type="text" id="address">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="city">City</label>
                            <input type="text" id="city">
                        </div>
                        <div class="form-group">
                            <label for="state">State</label>
                            <select id="state">
                                <option>Tamil Nadu</option>
                                <option>Kerala</option>
                                <option>Karnataka</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="pincode">PIN Code</label>
                            <input type="text" id="pincode">
                        </div>
                    </div>
                    
                    <h3>Payment options</h3>
                    <div class="payment-options">
                        <div class="option">
                            <h4>Pay by Razorpay</h4>
                            <p>Pay securely by Credit or Debit card or Internet Banking through Razorpay.</p>
                        </div>
                    </div>
                    <button class="place-order-btn">Place Order</button>
                </div>

                <div class="order-summary">
                    <h3>Order summary</h3>
                    ${this.cart.map(item => `
                        <div class="summary-item">
                            <img src="${item.imageUrl}" alt="${item.name}">
                            <div class="item-info">
                                <h4>${item.name}</h4>
                                <p>Store: Iniya Organics</p>
                            </div>
                            <span class="item-total">₹${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                    <div class="summary-totals">
                        <div class="total-row">
                            <span>Subtotal</span>
                            <span>₹${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="total-row">
                            <span>Delivery</span>
                            <span>₹${deliveryFee.toFixed(2)}</span>
                        </div>
                        <div class="total-row grand-total">
                            <span>Total</span>
                            <span>₹${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listener for the place order button
        const placeOrderBtn = document.querySelector('.place-order-btn');
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', (event) => {
                event.preventDefault();
                alert('Successfully order placed');
                this.cart = []; // Clear the cart
                this.updateCartDisplay(); // Update the UI
                this.loadPage('home'); // Redirect to home
            });
        }
    },

    // --- Mobile Menu ---
    toggleMobileMenu() {
        this.elements.navMenu.classList.toggle('active');
    }
};

// Run the app once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    farmerApp.init();
});
