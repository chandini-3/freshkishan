// Enhanced Garden E-Commerce Application
console.log('JavaScript file is loading...');
console.log('Script timestamp:', new Date().toISOString());

class EnhancedFarmMarket {
    constructor() {
        this.currentUser = null;
        this.cart = [];
        this.products = [];
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.loadStoredData();
        this.setupDemoData();
        await this.loadProducts();
        this.loadContent('home');
        console.log('Enhanced Farm Market initialized');
    }

    setupEventListeners() {
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    setupDemoData() {
        // Create demo user if none exists
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        if (existingUsers.length === 0) {
            const demoCustomer = {
                username: 'demo',
                email: 'demo@farmmarket.com',
                password: 'demo123',
                fullName: 'Demo Customer',
                phone: '(555) 123-4567',
                address: '123 Farm Street, Green Valley, CA 90210',
                userType: 'customer',
                registeredDate: new Date().toISOString()
            };
            
            const demoFarmer = {
                username: 'farmer1',
                email: 'farmer@farmmarket.com',
                password: 'farmer123',
                fullName: 'John Farmer',
                phone: '(555) 987-6543',
                address: '456 Farm Road, Country Valley, CA 90211',
                userType: 'farmer',
                registeredDate: new Date().toISOString()
            };
            
            existingUsers.push(demoCustomer, demoFarmer);
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
            console.log('Demo accounts created:');
            console.log('Customer: username="demo", password="demo123"');
            console.log('Farmer: username="farmer1", password="farmer123"');
        }

        // Demo products removed from here, will be loaded from API
    }

    async loadProducts() {
        console.log('Loading products from API...');
        try {
            // The path should be relative to the root of the web application
            const response = await fetch('api/products');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            this.products = products.map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.imageUrl, // Map imageUrl to image
                category: "vegetables", // Add default category
                farmer: "Local Farmer", // Add default farmer
                description: `Fresh ${p.name} from a local farm.` // Add default description
            }));
            console.log('Products loaded from API:', this.products);
        } catch (error) {
            console.error('Failed to load products from API, using fallback data.', error);
            this.useFallbackProducts();
        }
    }

    useFallbackProducts() {
        // Setup demo products as a fallback
        this.products = [
            { id: 1, name: "Fresh Tomatoes", price: 4.99, image: "images/tomatoes.jpg", category: "vegetables", farmer: "Johnson's Farm", description: "Vine-ripened tomatoes picked fresh this morning" },
            { id: 2, name: "Organic Carrots", price: 3.49, image: "images/carrots.jpg", category: "vegetables", farmer: "Green Valley Farm", description: "Sweet, crunchy carrots grown without pesticides" },
            { id: 3, name: "Fresh Cabbage", price: 2.99, image: "images/cabbage.jpg", category: "vegetables", farmer: "Sunny Acres Farm", description: "Crisp cabbage perfect for salads and cooking" },
            { id: 4, name: "Garden Potatoes", price: 5.99, image: "images/potatoes.jpg", category: "vegetables", farmer: "Hillside Farm", description: "Fresh potatoes ideal for any recipe" },
            { id: 5, name: "Sweet Onions", price: 3.99, image: "images/onions.jpg", category: "vegetables", farmer: "Valley View Farm", description: "Sweet yellow onions with mild flavor" },
            { id: 6, name: "Fresh Lettuce", price: 2.49, image: "images/veg1.jpg", category: "vegetables", farmer: "Fresh Greens Farm", description: "Crispy lettuce leaves for fresh salads" }
        ];
        console.log('Using fallback products:', this.products);
    }

    loadStoredData() {
        // Load user data
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            setTimeout(() => this.updateUIForLoggedInUser(), 100);
        } else {
            setTimeout(() => this.updateUIForLoggedOutUser(), 100);
        }

        // Load cart data
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
            setTimeout(() => this.updateCartUI(), 100);
        }
    }

    // Content Loading
    loadContent(section) {
        this.showLoading();
        
        setTimeout(() => {
            const mainContent = document.getElementById('mainContent');
            let content = '';

            switch (section) {
                case 'home':
                    content = this.getHomeContent();
                    break;
                case 'products':
                    content = this.getProductsContent();
                    break;
                case 'farmers':
                    content = this.getFarmersContent();
                    break;
                case 'about':
                    content = this.getAboutContent();
                    break;
                case 'contact':
                    content = this.getContactContent();
                    break;
                default:
                    content = this.getHomeContent();
            }

            mainContent.innerHTML = content;
            this.hideLoading();
        }, 500);
    }

    getHomeContent() {
        return `
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
                <button class="cta-button" onclick="farmMarket.loadContent('products')">
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
            
            <div class="content-section">
                <h2>Featured Fresh Produce</h2>
                <div class="card-grid">
                    ${this.products.slice(0, 3).map(product => `
                        <div class="card">
                            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Fresh+Produce'">
                            <div class="card-content">
                                <h3>${product.name}</h3>
                                <p class="farmer-info">From: ${product.farmer}</p>
                                <p>${product.description}</p>
                                <p class="price">$${product.price}/lb</p>
                                <button class="btn" onclick="farmMarket.loadContent('products')">Shop Now</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getProductsContent() {
        const productCards = this.products.map(product => `
            <div class="card">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Fresh+Produce'">
                <div class="card-content">
                    <h3>${product.name}</h3>
                    <p class="farmer-info">From: ${product.farmer}</p>
                    <p>${product.description}</p>
                    <p class="price">$${product.price}/lb</p>
                    <button class="add-to-cart-btn" onclick="farmMarket.addToCart(${product.id}, '${product.name}', ${product.price})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `).join('');

        return `
            <div class="content-section">
                <h2><i class="fas fa-store"></i> Fresh Produce Market</h2>
                <div class="marketplace-info">
                    <h3>🚜 Direct from Local Farms</h3>
                    <p>All produce is harvested fresh daily from verified local farmers. Support your community while getting the freshest ingredients!</p>
                </div>
                <div class="card-grid">
                    ${productCards}
                </div>
            </div>
        `;
    }

    getFarmersContent() {
        return `
            <div class="content-section">
                <h2><i class="fas fa-users"></i> Our Partner Farmers</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">🚜</div>
                        <h3>Johnson's Farm</h3>
                        <p>Specializing in vine-ripened tomatoes and fresh herbs. Family-owned for 3 generations.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🥕</div>
                        <h3>Green Valley Farm</h3>
                        <p>Organic vegetables grown with sustainable farming practices. Certified organic since 2010.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🌾</div>
                        <h3>Sunny Acres Farm</h3>
                        <p>Fresh leafy greens and seasonal vegetables. Known for their crispy lettuce and cabbage.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🥔</div>
                        <h3>Hillside Farm</h3>
                        <p>Root vegetables and potatoes. Traditional farming methods passed down through generations.</p>
                    </div>
                </div>
            </div>
        `;
    }

    getAboutContent() {
        return `
            <div class="content-section">
                <h2><i class="fas fa-info-circle"></i> About Fresh Farm Market</h2>
                <p>Fresh Farm Market is dedicated to connecting local farmers directly with customers, ensuring the freshest produce while supporting local agriculture.</p>
                
                <h3>Our Mission</h3>
                <p>To create a sustainable marketplace where farmers can sell their fresh produce directly to customers, eliminating middlemen and ensuring fair prices for both parties.</p>
                
                <h3>Why Farm-to-Customer?</h3>
                <ul>
                    <li>Maximum freshness - produce picked within 24 hours</li>
                    <li>Support local farmers and economy</li>
                    <li>Reduce carbon footprint</li>
                    <li>Know where your food comes from</li>
                    <li>Fair prices for quality produce</li>
                </ul>
            </div>
        `;
    }

    getContactContent() {
        return `
            <div class="content-section">
                <h2><i class="fas fa-envelope"></i> Contact Us</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">📧</div>
                        <h3>Email</h3>
                        <p>info@freshfarmmarket.com</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📞</div>
                        <h3>Phone</h3>
                        <p>(555) 123-FARM</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📍</div>
                        <h3>Address</h3>
                        <p>123 Market Street<br>Green Valley, CA 90210</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">⏰</div>
                        <h3>Hours</h3>
                        <p>Mon-Fri: 8AM-6PM<br>Sat-Sun: 9AM-5PM</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Authentication Methods
    handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');

        if (!username || !password) {
            this.showMessage('loginMessage', 'Please fill in all fields', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.updateUIForLoggedInUser();
            this.showMessage('loginMessage', 'Login successful!', 'success');
            setTimeout(() => {
                this.closeModal('loginModal');
                this.showToast('Welcome back, ' + user.fullName + '!');
            }, 1000);
        } else {
            this.showMessage('loginMessage', 'Invalid username or password', 'error');
        }
    }

    handleRegister(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const fullName = formData.get('fullName');
        const phone = formData.get('phone');
        const address = formData.get('address');
        const userType = formData.get('userType');

        // Validation
        if (!username || !email || !password || !confirmPassword || !fullName || !userType) {
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

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showMessage('registerMessage', 'Please enter a valid email address', 'error');
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        if (existingUsers.find(u => u.username === username)) {
            this.showMessage('registerMessage', 'Username already exists', 'error');
            return;
        }
        
        if (existingUsers.find(u => u.email === email)) {
            this.showMessage('registerMessage', 'Email already registered', 'error');
            return;
        }

        const newUser = {
            username, email, password, fullName, phone, address, userType,
            registeredDate: new Date().toISOString()
        };

        existingUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

        this.showMessage('registerMessage', `Registration successful! Welcome ${userType}! Please login.`, 'success');
        setTimeout(() => {
            this.closeModal('registerModal');
            this.showLoginModal();
        }, 2000);
    }

    // Shopping Cart Methods
    addToCart(id, name, price) {
        if (!this.currentUser) {
            this.showToast('Please login to add items to cart');
            this.showLoginModal();
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
        this.showToast(`${name} added to cart!`);
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartUI();
        this.showCart(); // Refresh cart display
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    showCart() {
        let cartHTML = '<h3><i class="fas fa-shopping-cart"></i> Shopping Cart</h3>';
        
        if (this.cart.length === 0) {
            cartHTML += '<p>Your cart is empty</p>';
            cartHTML += '<button class="btn" onclick="farmMarket.closeModal(\'cartModal\')">Continue Shopping</button>';
        } else {
            let total = 0;
            cartHTML += '<div class="cart-items">';
            
            this.cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                cartHTML += `
                    <div class="cart-item">
                        <div>
                            <strong>${item.name}</strong><br>
                            $${item.price}/lb x ${item.quantity}
                        </div>
                        <div>
                            <strong>$${itemTotal.toFixed(2)}</strong><br>
                            <button class="btn btn-secondary" onclick="farmMarket.removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                `;
            });
            
            cartHTML += '</div>';
            cartHTML += `<div class="cart-total">Total: $${total.toFixed(2)}</div>`;
            cartHTML += '<div class="order-actions">';
            cartHTML += '<button class="btn btn-primary" onclick="farmMarket.showCheckout()">Proceed to Checkout</button>';
            cartHTML += '<button class="btn btn-secondary" onclick="farmMarket.closeModal(\'cartModal\')">Continue Shopping</button>';
            cartHTML += '</div>';
        }
        
        document.getElementById('cartItems').innerHTML = cartHTML;
        this.showModal('cartModal');
    }

    showCheckout() {
        if (!this.currentUser) {
            this.showToast('Please login to checkout');
            this.showLoginModal();
            return;
        }

        if (this.cart.length === 0) {
            this.showToast('Your cart is empty');
            return;
        }

        let subtotal = 0;
        const orderItems = this.cart.map(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            return `
                <div class="order-item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </div>
            `;
        }).join('');

        const tax = subtotal * 0.08;
        const shipping = subtotal > 50 ? 0 : 5.99;
        const total = subtotal + tax + shipping;

        const checkoutHTML = `
            <div class="checkout-section">
                <h3>Order Summary</h3>
                ${orderItems}
                <div class="order-totals">
                    <div class="total-line">Subtotal: $${subtotal.toFixed(2)}</div>
                    <div class="total-line">Tax (8%): $${tax.toFixed(2)}</div>
                    <div class="total-line">Shipping: $${shipping.toFixed(2)}</div>
                    <div class="final-total">Total: $${total.toFixed(2)}</div>
                </div>
            </div>
            
            <div class="checkout-section">
                <h3>Delivery Information</h3>
                <p><strong>Name:</strong> ${this.currentUser.fullName}</p>
                <p><strong>Email:</strong> ${this.currentUser.email}</p>
                <p><strong>Phone:</strong> ${this.currentUser.phone || 'Not provided'}</p>
                <p><strong>Address:</strong> ${this.currentUser.address || 'Please update your profile'}</p>
            </div>
            
            <div class="checkout-section">
                <h3>Payment Method</h3>
                <form id="checkoutForm" onsubmit="farmMarket.processOrder(event)">
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
                    <div class="order-actions">
                        <button type="submit" class="btn btn-primary">Place Order</button>
                        <button type="button" class="btn btn-secondary" onclick="farmMarket.showCart()">Back to Cart</button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('checkoutContent').innerHTML = checkoutHTML;
        this.closeModal('cartModal');
        this.showModal('checkoutModal');
    }

    processOrder(event) {
        event.preventDefault();
        
        if (!this.currentUser.address) {
            this.showToast('Please update your profile with a delivery address');
            return;
        }

        const formData = new FormData(event.target);
        const paymentMethod = formData.get('paymentMethod');
        const specialInstructions = formData.get('specialInstructions');

        // Calculate order details
        let subtotal = 0;
        const orderItems = this.cart.map(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            return { ...item, itemTotal };
        });

        const tax = subtotal * 0.08;
        const shipping = subtotal > 50 ? 0 : 5.99;
        const total = subtotal + tax + shipping;

        const order = {
            id: 'ORD' + Date.now(),
            date: new Date().toISOString(),
            customer: this.currentUser,
            items: orderItems,
            subtotal, tax, shipping, total,
            paymentMethod, specialInstructions,
            status: 'pending'
        };

        // Save order
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        this.cart = [];
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartUI();

        this.showOrderConfirmation(order);
    }

    showOrderConfirmation(order) {
        const confirmHTML = `
            <div class="order-confirmation">
                <div class="success-icon">✅</div>
                <h2>Order Confirmed!</h2>
                <p>Thank you for your order. We'll prepare your fresh produce with care.</p>
                
                <div class="order-details">
                    <h3>Order Details</h3>
                    <p><strong>Order ID:</strong> ${order.id}</p>
                    <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                    <p><strong>Payment:</strong> ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'}</p>
                    <p><strong>Estimated Delivery:</strong> 2-3 business days</p>
                </div>
                
                <div class="next-steps">
                    <h3>What's Next?</h3>
                    <ul>
                        <li>You'll receive an email confirmation shortly</li>
                        <li>We'll start preparing your order immediately</li>
                        <li>Our delivery team will contact you before delivery</li>
                    </ul>
                </div>
                
                <div class="order-actions">
                    <button class="btn btn-primary" onclick="farmMarket.closeAllModals(); farmMarket.loadContent('home')">Continue Shopping</button>
                    <button class="btn btn-secondary" onclick="farmMarket.showProfile()">View Orders</button>
                </div>
            </div>
        `;

        document.getElementById('orderConfirmContent').innerHTML = confirmHTML;
        this.closeModal('checkoutModal');
        this.showModal('orderConfirmModal');
    }

    // Profile Management
    showProfile() {
        if (!this.currentUser) {
            this.showToast('Please login to view profile');
            this.showLoginModal();
            return;
        }

        const orders = JSON.parse(localStorage.getItem('orders') || '[]')
            .filter(order => order.customer.username === this.currentUser.username)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        const orderHistory = orders.length > 0 ? orders.map(order => `
            <div class="order-item">
                <div>
                    <strong>${order.id}</strong><br>
                    ${new Date(order.date).toLocaleDateString()}<br>
                    ${order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
                </div>
                <div>
                    <strong>$${order.total.toFixed(2)}</strong><br>
                    <span class="order-status ${order.status}">${order.status.toUpperCase()}</span>
                </div>
            </div>
        `).join('') : '<p>No orders yet. Start shopping!</p>';

        const profileHTML = `
            <div class="checkout-section">
                <h3>Personal Information</h3>
                <form id="profileForm" onsubmit="farmMarket.updateProfile(event)">
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
                        <textarea id="profileAddress" name="address" rows="3">${this.currentUser.address || ''}</textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Update Profile</button>
                </form>
            </div>
            
            <div class="checkout-section">
                <h3>Order History</h3>
                <div class="order-history">
                    ${orderHistory}
                </div>
            </div>
        `;

        document.getElementById('profileContent').innerHTML = profileHTML;
        this.showModal('profileModal');
    }

    updateProfile(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        this.currentUser = {
            ...this.currentUser,
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address')
        };

        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        // Update in registered users list
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const userIndex = users.findIndex(u => u.username === this.currentUser.username);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...this.currentUser };
            localStorage.setItem('registeredUsers', JSON.stringify(users));
        }

        this.showToast('Profile updated successfully!');
        this.updateUIForLoggedInUser();
    }

    // UI Management
    updateUIForLoggedInUser() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const userToolbar = document.getElementById('userToolbar');
        const welcomeText = document.getElementById('welcomeText');
        const farmerDashboardBtn = document.getElementById('farmerDashboardBtn');

        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userToolbar) userToolbar.style.display = 'flex';
        if (welcomeText) welcomeText.textContent = `Welcome, ${this.currentUser.fullName || this.currentUser.username}!`;

        // Show farmer dashboard button only for farmers
        if (farmerDashboardBtn) {
            farmerDashboardBtn.style.display = 
                this.currentUser.userType === 'farmer' ? 'flex' : 'none';
        }

        this.updateCartUI();
    }

    updateUIForLoggedOutUser() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const userToolbar = document.getElementById('userToolbar');

        if (loginBtn) loginBtn.style.display = 'flex';
        if (registerBtn) registerBtn.style.display = 'flex';
        if (userToolbar) userToolbar.style.display = 'none';
    }

    logout() {
        this.currentUser = null;
        this.cart = [];
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cart');
        this.updateUIForLoggedOutUser();
        this.updateCartUI();
        this.loadContent('home');
        this.showToast('Logged out successfully');
    }

    // Modal Management
    showModal(modalId) {
        document.getElementById(modalId).classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => modal.classList.remove('show'));
        document.body.style.overflow = 'auto';
    }

    showLoginModal() {
        this.showModal('loginModal');
    }

    showRegisterModal() {
        this.showModal('registerModal');
    }

    // Farmer Onboarding Methods
    showFarmerOnboarding() {
        this.showModal('farmerOnboardingModal');
    }

    handleFarmerOnboarding(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        // Get form data
        const farmerData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            username: formData.get('username'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            farmName: formData.get('farmName'),
            farmSize: formData.get('farmSize'),
            farmLocation: formData.get('farmLocation'),
            farmSpecialty: formData.get('farmSpecialty'),
            farmExperience: formData.get('farmExperience'),
            farmDescription: formData.get('farmDescription'),
            deliveryRadius: formData.get('deliveryRadius'),
            minOrder: formData.get('minOrder'),
            certifications: formData.getAll('certifications'),
            deliveryDays: formData.getAll('deliveryDays')
        };

        // Validation
        if (!this.validateFarmerOnboarding(farmerData)) {
            return;
        }

        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        if (existingUsers.find(u => u.username === farmerData.username)) {
            this.showToast('Username already exists. Please choose a different username.');
            return;
        }
        
        if (existingUsers.find(u => u.email === farmerData.email)) {
            this.showToast('Email already registered. Please use a different email.');
            return;
        }

        // Create farmer account
        const newFarmer = {
            username: farmerData.username,
            email: farmerData.email,
            password: farmerData.password,
            fullName: farmerData.fullName,
            phone: farmerData.phone,
            address: farmerData.farmLocation,
            userType: 'farmer',
            farmProfile: {
                farmName: farmerData.farmName,
                farmSize: farmerData.farmSize,
                farmLocation: farmerData.farmLocation,
                farmSpecialty: farmerData.farmSpecialty,
                farmExperience: farmerData.farmExperience,
                farmDescription: farmerData.farmDescription,
                deliveryRadius: farmerData.deliveryRadius,
                minOrder: farmerData.minOrder,
                certifications: farmerData.certifications,
                deliveryDays: farmerData.deliveryDays,
                joinedDate: new Date().toISOString(),
                verified: false,
                rating: 0,
                totalSales: 0
            },
            registeredDate: new Date().toISOString()
        };

        existingUsers.push(newFarmer);
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

        // Show success message
        this.showFarmerOnboardingSuccess(farmerData.farmName);
        
        // Reset form
        event.target.reset();
    }

    validateFarmerOnboarding(data) {
        // Check required fields
        const requiredFields = ['fullName', 'email', 'phone', 'username', 'password', 'confirmPassword', 
                               'farmName', 'farmSize', 'farmLocation', 'farmSpecialty', 'farmExperience', 'deliveryRadius'];
        
        for (let field of requiredFields) {
            if (!data[field] || data[field].toString().trim() === '') {
                this.showToast(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                return false;
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showToast('Please enter a valid email address.');
            return false;
        }

        // Validate password
        if (data.password.length < 6) {
            this.showToast('Password must be at least 6 characters long.');
            return false;
        }

        if (data.password !== data.confirmPassword) {
            this.showToast('Passwords do not match.');
            return false;
        }

        // Validate farm size
        if (parseFloat(data.farmSize) <= 0) {
            this.showToast('Farm size must be greater than 0.');
            return false;
        }

        // Validate experience
        if (parseInt(data.farmExperience) < 0) {
            this.showToast('Experience cannot be negative.');
            return false;
        }

        // Validate delivery radius
        if (parseInt(data.deliveryRadius) <= 0) {
            this.showToast('Delivery radius must be greater than 0.');
            return false;
        }

        // Check if at least one delivery day is selected
        if (data.deliveryDays.length === 0) {
            this.showToast('Please select at least one delivery day.');
            return false;
        }

        return true;
    }

    showFarmerOnboardingSuccess(farmName) {
        const modal = document.getElementById('farmerOnboardingModal');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.innerHTML = `
            <span class="close" onclick="closeModal('farmerOnboardingModal')">&times;</span>
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h2>🎉 Welcome to Fresh Farm Market!</h2>
                <h3>Your farm "${farmName}" has been successfully registered!</h3>
                <p>Thank you for joining our marketplace! Here's what happens next:</p>
                <div class="next-steps">
                    <div class="step-item">
                        <i class="fas fa-user-check"></i>
                        <h4>Account Verification</h4>
                        <p>We'll review your information within 24-48 hours</p>
                    </div>
                    <div class="step-item">
                        <i class="fas fa-seedling"></i>
                        <h4>Add Your Products</h4>
                        <p>Once verified, you can start adding your produce</p>
                    </div>
                    <div class="step-item">
                        <i class="fas fa-shopping-cart"></i>
                        <h4>Start Selling</h4>
                        <p>Customers can then discover and buy your products</p>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="closeModal('farmerOnboardingModal'); showLoginModal();">
                        <i class="fas fa-sign-in-alt"></i> Login to Your Account
                    </button>
                    <button class="btn btn-secondary" onclick="closeModal('farmerOnboardingModal');">
                        <i class="fas fa-home"></i> Back to Homepage
                    </button>
                </div>
                <p class="contact-info">
                    <strong>Questions?</strong> Contact us at <a href="mailto:farmers@freshfarmmarket.com">farmers@freshfarmmarket.com</a>
                </p>
            </div>
        `;
    }
}

// Global functions for HTML onclick events
function loadContent(section) { 
    console.log('loadContent called with section:', section);
    if (window.farmMarket) {
        window.farmMarket.loadContent(section); 
    } else {
        console.error('farmMarket is not defined or null');
    }
}
function showLoginModal() { window.farmMarket.showLoginModal(); }
function showRegisterModal() { window.farmMarket.showRegisterModal(); }
function showFarmerOnboarding() { window.farmMarket.showFarmerOnboarding(); }
function handleLogin(event) { window.farmMarket.handleLogin(event); }
function handleRegister(event) { window.farmMarket.handleRegister(event); }
function showCart() { window.farmMarket.showCart(); }
function showProfile() { window.farmMarket.showProfile(); }
function showFarmerDashboard() { window.farmMarket.showFarmerDashboard(); }
function logout() { window.farmMarket.logout(); }
function closeModal(modalId) { window.farmMarket.closeModal(modalId); }
function toggleMobileMenu() { window.farmMarket.toggleMobileMenu(); }
function filterProducts(category) { window.farmMarket.filterProducts(category); }
function testButton() { 
    console.log('Test button clicked!'); 
    alert('Button works!'); 
    if (window.farmMarket) {
        window.farmMarket.showLoginModal(); 
    }
}

// Initialize the application
console.log('Starting to initialize farmMarket...');
let farmMarket;
try {
    farmMarket = new EnhancedFarmMarket();
    console.log('farmMarket initialized successfully:', farmMarket);
    window.farmMarket = farmMarket; // Make it globally accessible
} catch (error) {
    console.error('Error initializing farmMarket:', error);
}

document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
});

function fetchProducts() {
    // Corrected API endpoint for the Tomcat server
    fetch('/enhanced-garden-ecommerce/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(products => {
            const productList = document.getElementById('product-list');
            if (!productList) {
                console.error('Product list element not found on this page.');
                return;
            }
            productList.innerHTML = ''; // Clear existing products

            if (products.length === 0) {
                productList.innerHTML = '<p>No products have been added yet. Check back soon!</p>';
                return;
            }

            products.forEach(product => {
                // Note: The image path is now whatever is stored in the database.
                // Ensure the image URLs are correct and accessible.
                const productCard = `
                    <div class="product-card">
                        <img src="${product.imageUrl}" alt="${product.name}" onerror="this.onerror=null;this.src='images/default.jpg';">
                        <div class="product-card-content">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <div class="price">₹${product.price.toFixed(2)}</div>
                            <button class="btn">Add to Cart</button>
                        </div>
                    </div>
                `;
                productList.innerHTML += productCard;
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            const productList = document.getElementById('product-list');
            if (productList) {
                productList.innerHTML = '<p>Could not load products at this time. Please try again later.</p>';
            }
        });
}
