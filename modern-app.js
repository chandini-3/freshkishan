// Modern JavaScript for Garden Website
class GardenApp {
    constructor() {
        this.currentUser = null;
        this.cart = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStoredData();
        this.setupMobileMenu();
        this.setupDemoData(); // Setup demo data
    }

    setupEventListeners() {
        // Load content when page loads
        document.addEventListener('DOMContentLoaded', () => {
            this.loadContent('home');
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'loginForm') {
                e.preventDefault();
                this.handleLogin(e.target);
            } else if (e.target.id === 'registrationForm') {
                e.preventDefault();
                this.handleRegistration(e.target);
            } else if (e.target.id === 'profileForm') {
                e.preventDefault();
                this.updateProfile(e.target);
            } else if (e.target.id === 'checkoutForm') {
                e.preventDefault();
                this.processOrder(e.target);
            }
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const sidebar = document.querySelector('.sidebar');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                sidebar.classList.toggle('active');
            });
        }
    }

    loadStoredData() {
        // Load user data from localStorage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            // Delay UI update until DOM is ready
            setTimeout(() => this.updateUIForLoggedInUser(), 100);
        } else {
            // Ensure logged out UI is shown
            setTimeout(() => this.updateUIForLoggedOutUser(), 100);
        }

        // Load cart data
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
            setTimeout(() => this.updateCartUI(), 100);
        }
    }

    // Content Loading System
    async loadContent(section) {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;

        // Show loading
        mainContent.innerHTML = '<div class="loading-container"><div class="loading"></div><p>Loading...</p></div>';

        try {
            let content = '';
            switch (section) {
                case 'home':
                    content = this.getHomeContent();
                    break;
                case 'products':
                    content = await this.getShopContent();
                    break;
                case 'farmers':
                    content = this.getFarmersContent();
                    break;
                case 'sell':
                    content = this.getSellContent();
                    break;
                case 'login':
                    content = this.getLoginContent();
                    break;
                case 'register':
                    content = this.getRegistrationContent();
                    break;
                case 'checkout':
                    content = this.getCheckoutContent();
                    break;
                case 'profile':
                    content = this.getProfileContent();
                    break;
                case 'vegetables':
                    content = this.getCategoryContent('vegetables');
                    break;
                case 'fruits':
                    content = this.getCategoryContent('fruits');
                    break;
                case 'grains':
                    content = this.getCategoryContent('grains');
                    break;
                case 'dairy':
                    content = this.getCategoryContent('dairy');
                    break;
                case 'herbs':
                    content = this.getCategoryContent('herbs');
                    break;
                case 'farmer-registration':
                    content = this.getFarmerRegistrationContent();
                    break;
                default:
                    content = this.getHomeContent();
            }

            // Simulate loading delay for better UX
            setTimeout(() => {
                mainContent.innerHTML = content;
                mainContent.classList.add('fade-in');
                this.attachContentEventListeners(section);
            }, 500);

        } catch (error) {
            console.error('Error loading content:', error);
            mainContent.innerHTML = '<div class="error-message">Error loading content. Please try again.</div>';
        }
    }

    getHomeContent() {
        return `
            <div class="hero-section">
                <h1>🚜 Welcome to Fresh Farm Market</h1>
                <p>Connect directly with local farmers and get the freshest produce delivered to your door!</p>
                <button class="cta-button" onclick="gardenApp.loadContent('products')">Start Shopping Fresh Produce</button>
            </div>
            
            <div class="content-section">
                <h2>Featured Fresh Produce</h2>
                <div class="card-grid">
                    <div class="card">
                        <img src="tomatoes.jpg" alt="Fresh Tomatoes">
                        <div class="card-content">
                            <h3>Vine-Ripened Tomatoes</h3>
                            <p>Fresh from Johnson's Farm - picked this morning</p>
                            <button class="btn" onclick="gardenApp.loadContent('products')">Buy Fresh</button>
                        </div>
                    </div>
                    <div class="card">
                        <img src="carrots.jpg" alt="Fresh Carrots">
                        <div class="card-content">
                            <h3>Organic Carrots</h3>
                            <p>Sweet, crunchy carrots from Green Valley Farm</p>
                            <button class="btn" onclick="gardenApp.loadContent('products')">Order Now</button>
                        </div>
                    </div>
                    <div class="card">
                        <img src="cabbage.jpg" alt="Fresh Cabbage">
                        <div class="card-content">
                            <h3>Garden Fresh Cabbage</h3>
                            <p>Crisp cabbage harvested from Sunny Acres Farm</p>
                            <button class="btn" onclick="gardenApp.loadContent('products')">Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-section">
                <h2>Farm-to-Table Benefits</h2>
                <div class="tips-grid">
                    <div class="tip-card">
                        <h4>🌱 Maximum Freshness</h4>
                        <p>Produce picked at peak ripeness and delivered within hours</p>
                    </div>
                    <div class="tip-card">
                        <h4>� Support Local Farmers</h4>
                        <p>Your purchases directly support local farmers and communities</p>
                    </div>
                    <div class="tip-card">
                        <h4>� Reduce Carbon Footprint</h4>
                        <p>Less transportation means fresher food and better environment</p>
                    </div>
                </div>
            </div>
        `;
    }

    async getShopContent() {
        // Fresh produce from local farmers
        const products = [
            { id: 1, name: "Fresh Tomatoes", price: 4.99, image: "tomatoes.jpg", category: "vegetables", farmer: "Johnson's Farm" },
            { id: 2, name: "Organic Carrots", price: 3.49, image: "carrots.jpg", category: "vegetables", farmer: "Green Valley Farm" },
            { id: 3, name: "Fresh Cabbage", price: 2.99, image: "cabbage.jpg", category: "vegetables", farmer: "Sunny Acres Farm" },
            { id: 4, name: "Garden Potatoes", price: 5.99, image: "potatoes.jpg", category: "vegetables", farmer: "Hillside Farm" },
            { id: 5, name: "Sweet Onions", price: 3.99, image: "onions.jpg", category: "vegetables", farmer: "Valley View Farm" },
            { id: 6, name: "Fresh Lettuce", price: 2.49, image: "veg1.jpg", category: "vegetables", farmer: "Fresh Greens Farm" }
        ];

        let productCards = products.map(product => `
            <div class="card">
                <img src="${product.image}" alt="${product.name}">
                <div class="card-content">
                    <h3>${product.name}</h3>
                    <p class="farmer-info">From: ${product.farmer}</p>
                    <p class="price">$${product.price}/lb</p>
                    <button class="btn add-to-cart-btn" onclick="gardenApp.addToCart(${product.id}, '${product.name}', ${product.price})">
                        🛒 Add to Cart
                    </button>
                </div>
            </div>
        `).join('');

        return `
            <div class="content-section">
                <h2>🥬 Fresh Produce Market</h2>
                <div class="shop-filters">
                    <button class="filter-btn active" onclick="gardenApp.filterProducts('all')">All Fresh Produce</button>
                    <button class="filter-btn" onclick="gardenApp.filterProducts('vegetables')">Vegetables</button>
                    <button class="filter-btn" onclick="gardenApp.filterProducts('fruits')">Fruits</button>
                    <button class="filter-btn" onclick="gardenApp.filterProducts('herbs')">Herbs</button>
                </div>
                <div class="cart-summary">
                    <span id="cartCount">Cart (${this.cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    <button class="btn" onclick="gardenApp.showCart()">View Cart</button>
                </div>
                <div class="card-grid" id="productGrid">
                    ${productCards}
                </div>
                <div class="marketplace-info">
                    <h3>🚜 Direct from Local Farms</h3>
                    <p>All produce is harvested fresh daily from verified local farmers. Support your community while getting the freshest ingredients!</p>
                </div>
            </div>
        `;
    }

    getCommunityContent() {
        return `
            <div class="content-section">
                <h2>🌍 Garden Community</h2>
                <div class="community-features">
                    <div class="feature-card">
                        <h3>Share Your Garden</h3>
                        <p>Upload photos and share your gardening journey</p>
                        <button class="btn">Upload Photo</button>
                    </div>
                    <div class="feature-card">
                        <h3>Ask Questions</h3>
                        <p>Get help from experienced gardeners</p>
                        <button class="btn">Ask Question</button>
                    </div>
                    <div class="feature-card">
                        <h3>Local Groups</h3>
                        <p>Connect with gardeners in your area</p>
                        <button class="btn">Find Groups</button>
                    </div>
                </div>
                
                <div class="recent-posts">
                    <h3>Recent Community Posts</h3>
                    <div class="post">
                        <h4>🌱 First Time Gardener Success!</h4>
                        <p>Just harvested my first tomatoes! Thank you for all the advice.</p>
                        <small>Posted by Sarah • 2 hours ago</small>
                    </div>
                    <div class="post">
                        <h4>🐛 Dealing with Aphids</h4>
                        <p>What's the best natural way to handle aphid infestations?</p>
                        <small>Posted by Mike • 5 hours ago</small>
                    </div>
                </div>
            </div>
        `;
    }

    getDIYContent() {
        return `
            <div class="content-section">
                <h2>🔨 DIY Garden Projects</h2>
                <div class="diy-grid">
                    <div class="diy-project">
                        <img src="diy.png" alt="DIY Project">
                        <h3>Build a Raised Garden Bed</h3>
                        <p>Step-by-step guide to creating your own raised bed</p>
                        <button class="btn">View Tutorial</button>
                    </div>
                    <div class="diy-project">
                        <h3>Composting 101</h3>
                        <p>Learn how to create nutrient-rich compost at home</p>
                        <button class="btn">Start Composting</button>
                    </div>
                    <div class="diy-project">
                        <h3>Herb Spiral Garden</h3>
                        <p>Maximize space with this efficient herb garden design</p>
                        <button class="btn">Learn More</button>
                    </div>
                </div>
            </div>
        `;
    }

    getLoginContent() {
        return `
            <div class="form-container">
                <h2>🔑 Login to Fresh Farm Market</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" class="btn">Login</button>
                </form>
                <p>Don't have an account? <a href="#" onclick="gardenApp.loadContent('register')">Sign up here</a></p>
                <div id="loginMessage"></div>
            </div>
        `;
    }

    getRegistrationContent() {
        return `
            <div class="form-container">
                <h2>🚜 Join Fresh Farm Market</h2>
                <form id="registrationForm">
                    <div class="form-group">
                        <label for="regFullName">Full Name:</label>
                        <input type="text" id="regFullName" name="fullName" required>
                    </div>
                    <div class="form-group">
                        <label for="regUsername">Username:</label>
                        <input type="text" id="regUsername" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="regEmail">Email:</label>
                        <input type="email" id="regEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="regPassword">Password:</label>
                        <input type="password" id="regPassword" name="password" required minlength="6">
                        <small>Minimum 6 characters</small>
                    </div>
                    <div class="form-group">
                        <label for="regConfirmPassword">Confirm Password:</label>
                        <input type="password" id="regConfirmPassword" name="confirmPassword" required>
                    </div>
                    <div class="form-group">
                        <label for="regPhone">Phone:</label>
                        <input type="tel" id="regPhone" name="phone">
                    </div>
                    <div class="form-group">
                        <label for="regAddress">Address:</label>
                        <textarea id="regAddress" name="address" rows="3" placeholder="Your delivery address"></textarea>
                    </div>
                    <button type="submit" class="btn">Register</button>
                </form>
                <p>Already have an account? <a href="#" onclick="gardenApp.loadContent('login')">Login here</a></p>
                <div id="registerMessage"></div>
            </div>
        `;
    }

    // User Management
    async handleLogin(form) {
        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');

        // Validate input
        if (!username || !password) {
            this.showMessage('loginMessage', 'Please fill in all fields', 'error');
            return;
        }

        try {
            // Check with registered users in localStorage (for demo purposes)
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                const userData = { 
                    username: user.username, 
                    email: user.email,
                    fullName: user.fullName,
                    phone: user.phone,
                    address: user.address
                };
                this.currentUser = userData;
                localStorage.setItem('currentUser', JSON.stringify(userData));
                this.updateUIForLoggedInUser();
                this.showMessage('loginMessage', 'Login successful!', 'success');
                setTimeout(() => this.loadContent('home'), 1000);
            } else {
                this.showMessage('loginMessage', 'Invalid username or password', 'error');
            }
        } catch (error) {
            // Fallback for development
            console.log('Using fallback login for development');
            this.currentUser = { username };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.updateUIForLoggedInUser();
            this.showMessage('loginMessage', 'Login successful! (Development Mode)', 'success');
            setTimeout(() => this.loadContent('home'), 1000);
        }
    }

    async handleRegistration(form) {
        const formData = new FormData(form);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const fullName = formData.get('fullName');
        const phone = formData.get('phone');
        const address = formData.get('address');

        // Validate input
        if (!username || !email || !password || !confirmPassword || !fullName) {
            this.showMessage('registerMessage', 'Please fill in all required fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showMessage('registerMessage', 'Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            this.showMessage('registerMessage', 'Password must be at least 6 characters long', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showMessage('registerMessage', 'Please enter a valid email address', 'error');
            return;
        }

        try {
            // Get existing users
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            
            // Check if username or email already exists
            if (existingUsers.find(u => u.username === username)) {
                this.showMessage('registerMessage', 'Username already exists', 'error');
                return;
            }
            
            if (existingUsers.find(u => u.email === email)) {
                this.showMessage('registerMessage', 'Email already registered', 'error');
                return;
            }

            // Add new user
            const newUser = {
                username,
                email,
                password, // In real app, this would be hashed
                fullName,
                phone,
                address,
                registeredDate: new Date().toISOString()
            };

            existingUsers.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

            this.showMessage('registerMessage', 'Registration successful! Please login.', 'success');
            setTimeout(() => this.loadContent('login'), 2000);
        } catch (error) {
            console.error('Registration error:', error);
            this.showMessage('registerMessage', 'Registration failed. Please try again.', 'error');
        }
    }

    updateUIForLoggedInUser() {
        // Show/hide authentication buttons
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const userToolbar = document.getElementById('userToolbar');
        const welcomeText = document.getElementById('welcomeText');

        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userToolbar) userToolbar.style.display = 'flex';
        if (welcomeText) welcomeText.textContent = `Welcome, ${this.currentUser.fullName || this.currentUser.username}!`;

        this.updateCartUI();
    }

    updateUIForLoggedOutUser() {
        // Show/hide authentication buttons
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const userToolbar = document.getElementById('userToolbar');

        if (loginBtn) loginBtn.style.display = 'inline-flex';
        if (registerBtn) registerBtn.style.display = 'inline-flex';
        if (userToolbar) userToolbar.style.display = 'none';
    }

    logout() {
        this.currentUser = null;
        this.cart = [];
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cart');
        this.updateUIForLoggedOutUser();
        this.loadContent('home');
        this.showNotification('Logged out successfully');
    }

    // Shopping Cart Functions
    addToCart(id, name, price) {
        if (!this.currentUser) {
            this.showNotification('Please login to add items to cart');
            this.loadContent('login');
            return;
        }

        const existingItem = this.cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ id, name, price, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartUI();
        this.showNotification(`${name} added to cart!`);
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    showCart() {
        let cartHTML = '<div class="cart-modal"><h3>Shopping Cart</h3>';
        
        if (this.cart.length === 0) {
            cartHTML += '<p>Your cart is empty</p>';
        } else {
            let total = 0;
            cartHTML += '<div class="cart-items">';
            
            this.cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                cartHTML += `
                    <div class="cart-item">
                        <span>${item.name}</span>
                        <span>$${item.price} x ${item.quantity}</span>
                        <span>$${itemTotal.toFixed(2)}</span>
                        <button onclick="gardenApp.removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
            });
            
            cartHTML += `</div><div class="cart-total">Total: $${total.toFixed(2)}</div>`;
            cartHTML += '<button class="btn" onclick="gardenApp.checkout()">Checkout</button>';
        }
        
        cartHTML += '<button class="btn" onclick="gardenApp.closeModal()">Close</button></div>';
        
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = cartHTML;
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.showCart(); // Refresh cart display
    }

    checkout() {
        if (!this.currentUser) {
            this.showNotification('Please login to checkout');
            this.loadContent('login');
            return;
        }

        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty');
            return;
        }
        
        this.loadContent('checkout');
    }

    getCheckoutContent() {
        if (!this.currentUser) {
            return '<div class="message error">Please login to access checkout</div>';
        }

        let total = 0;
        const cartItems = this.cart.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            return `
                <div class="checkout-item">
                    <span class="item-name">${item.name}</span>
                    <span class="item-quantity">x${item.quantity}</span>
                    <span class="item-price">$${itemTotal.toFixed(2)}</span>
                </div>
            `;
        }).join('');

        const tax = total * 0.08; // 8% tax
        const shipping = total > 50 ? 0 : 5.99; // Free shipping over $50
        const finalTotal = total + tax + shipping;

        return `
            <div class="checkout-container">
                <h2>🛒 Checkout</h2>
                
                <div class="checkout-sections">
                    <div class="checkout-section">
                        <h3>Order Summary</h3>
                        <div class="order-items">
                            ${cartItems}
                        </div>
                        <div class="order-totals">
                            <div class="total-line">Subtotal: $${total.toFixed(2)}</div>
                            <div class="total-line">Tax: $${tax.toFixed(2)}</div>
                            <div class="total-line">Shipping: $${shipping.toFixed(2)}</div>
                            <div class="total-line final-total">Total: $${finalTotal.toFixed(2)}</div>
                        </div>
                    </div>
                    
                    <div class="checkout-section">
                        <h3>Delivery Information</h3>
                        <div class="delivery-info">
                            <p><strong>Name:</strong> ${this.currentUser.fullName}</p>
                            <p><strong>Email:</strong> ${this.currentUser.email}</p>
                            <p><strong>Phone:</strong> ${this.currentUser.phone || 'Not provided'}</p>
                            <p><strong>Address:</strong> ${this.currentUser.address || 'Please update your profile with delivery address'}</p>
                        </div>
                        <button class="btn-secondary" onclick="gardenApp.loadContent('profile')">Update Info</button>
                    </div>
                    
                    <div class="checkout-section">
                        <h3>Payment Method</h3>
                        <form id="checkoutForm">
                            <div class="form-group">
                                <label>
                                    <input type="radio" name="paymentMethod" value="cod" checked>
                                    Cash on Delivery
                                </label>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="radio" name="paymentMethod" value="card">
                                    Credit/Debit Card (Demo)
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="specialInstructions">Special Delivery Instructions:</label>
                                <textarea id="specialInstructions" name="specialInstructions" rows="3" 
                                          placeholder="Any special instructions for delivery..."></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Place Order</button>
                            <button type="button" class="btn btn-secondary" onclick="gardenApp.showCart()">Back to Cart</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
    }

    async processOrder(form) {
        const formData = new FormData(form);
        const paymentMethod = formData.get('paymentMethod');
        const specialInstructions = formData.get('specialInstructions');

        if (!this.currentUser.address) {
            this.showNotification('Please update your profile with a delivery address');
            this.loadContent('profile');
            return;
        }

        // Calculate order details
        let subtotal = 0;
        const orderItems = this.cart.map(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            return {
                ...item,
                itemTotal
            };
        });

        const tax = subtotal * 0.08;
        const shipping = subtotal > 50 ? 0 : 5.99;
        const total = subtotal + tax + shipping;

        const order = {
            id: 'ORD' + Date.now(),
            date: new Date().toISOString(),
            customer: this.currentUser,
            items: orderItems,
            subtotal,
            tax,
            shipping,
            total,
            paymentMethod,
            specialInstructions,
            status: 'pending'
        };

        // Save order to localStorage (in real app, this would be sent to server)
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        this.cart = [];
        localStorage.setItem('cart', JSON.stringify(this.cart));

        // Show order confirmation
        this.showOrderConfirmation(order);
    }

    showOrderConfirmation(order) {
        const content = `
            <div class="order-confirmation">
                <div class="success-icon">✅</div>
                <h2>Order Confirmed!</h2>
                <p>Thank you for your order. We'll prepare your fresh organic produce with care.</p>
                
                <div class="order-details">
                    <h3>Order Details</h3>
                    <p><strong>Order ID:</strong> ${order.id}</p>
                    <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                    <p><strong>Payment Method:</strong> ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'}</p>
                    <p><strong>Estimated Delivery:</strong> 2-3 business days</p>
                </div>
                
                <div class="next-steps">
                    <h3>What's Next?</h3>
                    <ul>
                        <li>You'll receive an email confirmation shortly</li>
                        <li>We'll start preparing your order immediately</li>
                        <li>You can track your order in your profile</li>
                        <li>Our delivery team will contact you before delivery</li>
                    </ul>
                </div>
                
                <div class="order-actions">
                    <button class="btn" onclick="gardenApp.loadContent('home')">Continue Shopping</button>
                    <button class="btn btn-secondary" onclick="gardenApp.loadContent('profile')">View Orders</button>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = content;
    }

    getProfileContent() {
        if (!this.currentUser) {
            return '<div class="message error">Please login to view profile</div>';
        }

        const orders = JSON.parse(localStorage.getItem('orders') || '[]')
            .filter(order => order.customer.username === this.currentUser.username)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        const orderHistory = orders.length > 0 ? orders.map(order => `
            <div class="order-item">
                <div class="order-header">
                    <span class="order-id">${order.id}</span>
                    <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
                    <span class="order-total">$${order.total.toFixed(2)}</span>
                    <span class="order-status ${order.status}">${order.status.toUpperCase()}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `<span>${item.name} (x${item.quantity})</span>`).join(', ')}
                </div>
            </div>
        `).join('') : '<p>No orders yet. Start shopping!</p>';

        return `
            <div class="profile-container">
                <h2>👤 My Profile</h2>
                
                <div class="profile-sections">
                    <div class="profile-section">
                        <h3>Personal Information</h3>
                        <form id="profileForm">
                            <div class="form-group">
                                <label for="profileFullName">Full Name:</label>
                                <input type="text" id="profileFullName" name="fullName" 
                                       value="${this.currentUser.fullName || ''}" required>
                            </div>
                            <div class="form-group">
                                <label for="profileEmail">Email:</label>
                                <input type="email" id="profileEmail" name="email" 
                                       value="${this.currentUser.email}" required>
                            </div>
                            <div class="form-group">
                                <label for="profilePhone">Phone:</label>
                                <input type="tel" id="profilePhone" name="phone" 
                                       value="${this.currentUser.phone || ''}">
                            </div>
                            <div class="form-group">
                                <label for="profileAddress">Delivery Address:</label>
                                <textarea id="profileAddress" name="address" rows="3" 
                                          placeholder="Enter your complete delivery address">${this.currentUser.address || ''}</textarea>
                            </div>
                            <button type="submit" class="btn">Update Profile</button>
                        </form>
                    </div>
                    
                    <div class="profile-section">
                        <h3>Order History</h3>
                        <div class="order-history">
                            ${orderHistory}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async updateProfile(form) {
        const formData = new FormData(form);
        const updatedData = {
            ...this.currentUser,
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address')
        };

        // Update current user
        this.currentUser = updatedData;
        localStorage.setItem('currentUser', JSON.stringify(updatedData));

        // Update in registered users list
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const userIndex = users.findIndex(u => u.username === this.currentUser.username);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updatedData };
            localStorage.setItem('registeredUsers', JSON.stringify(users));
        }

        this.showNotification('Profile updated successfully!');
    }

    // Demo setup for testing
    setupDemoData() {
        // Create a demo user if no users exist
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        if (existingUsers.length === 0) {
            const demoUser = {
                username: 'demo',
                email: 'demo@garden.com',
                password: 'demo123',
                fullName: 'Demo User',
                phone: '(555) 123-4567',
                address: '123 Garden Street, Green Valley, CA 90210',
                registeredDate: new Date().toISOString()
            };
            existingUsers.push(demoUser);
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
            console.log('Demo customer account created: username="demo", password="demo123"');
        }
    }

    // Utility Functions
    showMessage(elementId, message, type) {
        const messageElement = document.getElementById(elementId);
        if (messageElement) {
            messageElement.innerHTML = `<div class="message ${type}">${message}</div>`;
        }
    }

    showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-green);
            color: white;
            padding: 1rem;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    attachContentEventListeners(section) {
        // Attach any section-specific event listeners here
        if (section === 'shop') {
            this.setupShopFilters();
        }
    }

    setupShopFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    filterProducts(category) {
        // Product filtering logic would go here
        console.log('Filtering products by:', category);
    }

    closeModal() {
        this.loadContent('shop');
    }
}

// Initialize the app
const gardenApp = new GardenApp();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .message {
        padding: 1rem;
        border-radius: 5px;
        margin: 1rem 0;
    }
    
    .message.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .message.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .loading-container {
        text-align: center;
        padding: 4rem;
    }
    
    .loading-container p {
        margin-top: 1rem;
        color: #666;
    }
`;

document.head.appendChild(style);
