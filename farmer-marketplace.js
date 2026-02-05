// FarmerMandi - Agricultural Trading Platform JavaScript

class FarmerMarketplace {
    constructor() {
        this.currentUser = null;
        this.userType = null; // 'buyer' or 'seller'
        this.cart = [];
        this.products = [];
        this.currentLanguage = 'en';
        this.init();
    }

    init() {
        this.loadStoredData();
        this.setupEventListeners();
        this.loadProducts();
        this.setupMobileMenu();
        this.loadTranslations();
    }

    setupEventListeners() {
        // Modal close functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') || e.target.classList.contains('close')) {
                this.closeModal();
            }
        });

        // Search functionality
        document.getElementById('searchInput')?.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.searchProducts();
            }
        });

        // Category filter
        document.getElementById('categoryFilter')?.addEventListener('change', () => {
            this.filterProducts();
        });

        // Language selector
        document.getElementById('languageSelect')?.addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'loginForm') {
                e.preventDefault();
                this.handleLogin(e.target);
            } else if (e.target.id === 'registerForm') {
                e.preventDefault();
                this.handleRegistration(e.target);
            }
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Mobile menu items functionality
        const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.querySelector('span').textContent.toLowerCase();
                this.loadPage(action);
            });
        });
    }

    loadStoredData() {
        // Load user data from localStorage
        const storedUser = localStorage.getItem('farmerMandiUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.updateUIForLoggedInUser();
        }

        // Load cart data
        const storedCart = localStorage.getItem('farmerMandiCart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }

        // Load language preference
        const storedLanguage = localStorage.getItem('farmerMandiLanguage');
        if (storedLanguage) {
            this.currentLanguage = storedLanguage;
            document.getElementById('languageSelect').value = storedLanguage;
        }
    }

    async loadProducts() {
        // Sample products data - in real app, this would come from backend
        this.products = [
            {
                id: 1,
                name: "Premium Basmati Rice",
                price: 120,
                unit: "per kg",
                category: "grains",
                location: "Punjab",
                seller: "Rajesh Farmer",
                image: "rice.jpg",
                description: "High quality basmati rice direct from Punjab farms",
                stock: 500
            },
            {
                id: 2,
                name: "Organic Wheat",
                price: 25,
                unit: "per kg",
                category: "grains",
                location: "Haryana",
                seller: "Suresh Kumar",
                image: "wheat.jpg",
                description: "Certified organic wheat, pesticide-free",
                stock: 1000
            },
            {
                id: 3,
                name: "Fresh Tomatoes",
                price: 40,
                unit: "per kg",
                category: "produce",
                location: "Karnataka",
                seller: "Lakshmi Farm",
                image: "tomatoes.jpg",
                description: "Fresh red tomatoes, harvested today",
                stock: 200
            },
            {
                id: 4,
                name: "Onions",
                price: 30,
                unit: "per kg",
                category: "produce",
                location: "Maharashtra",
                seller: "Ganesh Agro",
                image: "onions.jpg",
                description: "Quality onions, perfect for wholesale",
                stock: 800
            },
            {
                id: 5,
                name: "Organic Fertilizer",
                price: 450,
                unit: "per 50kg bag",
                category: "fertilizers",
                location: "Tamil Nadu",
                seller: "GreenGrow Supplies",
                image: "fertilizer.jpg",
                description: "100% organic fertilizer for better crop yield",
                stock: 100
            },
            {
                id: 6,
                name: "Garden Tools Set",
                price: 1200,
                unit: "per set",
                category: "tools",
                location: "Gujarat",
                seller: "AgroTools Ltd",
                image: "tools.jpg",
                description: "Complete farming tools set for small farmers",
                stock: 50
            }
        ];
    }

    // Page Loading System
    loadPage(page) {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;

        let content = '';
        switch (page.toLowerCase()) {
            case 'home':
                content = this.getHomeContent();
                break;
            case 'sell':
                content = this.getSellContent();
                break;
            case 'buy':
                content = this.getBuyContent();
                break;
            case 'transport':
                content = this.getTransportContent();
                break;
            case 'inspection':
                content = this.getInspectionContent();
                break;
            case 'insurance':
                content = this.getInsuranceContent();
                break;
            case 'warehouse':
                content = this.getWarehouseContent();
                break;
            case 'deals':
                content = this.getDealsContent();
                break;
            case 'about':
                content = this.getAboutContent();
                break;
            case 'terms':
                content = this.getTermsContent();
                break;
            default:
                content = this.getHomeContent();
        }

        mainContent.innerHTML = content;
        this.attachPageEventListeners(page);
    }

    getBuyContent() {
        const productCards = this.products.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='placeholder.jpg'">
                    <div class="product-badge">${product.location}</div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-seller">
                        <i class="fas fa-user"></i> ${product.seller}
                    </div>
                    <div class="product-pricing">
                        <span class="price">₹${product.price} ${product.unit}</span>
                        <span class="stock">Stock: ${product.stock} kg</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn-cart" onclick="farmerApp.addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="btn-contact" onclick="farmerApp.contactSeller(${product.id})">
                            <i class="fas fa-phone"></i> Contact
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="page-container">
                <div class="page-header">
                    <h1><i class="fas fa-shopping-cart"></i> Buy Agricultural Products</h1>
                    <p>Browse and purchase quality products directly from farmers</p>
                </div>
                
                <div class="filters-section">
                    <div class="filter-group">
                        <label>Sort by Price:</label>
                        <select id="priceSort">
                            <option value="">Default</option>
                            <option value="low-high">Low to High</option>
                            <option value="high-low">High to Low</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Location:</label>
                        <select id="locationFilter">
                            <option value="">All Locations</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Maharashtra">Maharashtra</option>
                        </select>
                    </div>
                    <div class="cart-summary">
                        <span>Cart: ${this.cart.length} items</span>
                        <button class="btn-view-cart" onclick="farmerApp.viewCart()">
                            <i class="fas fa-eye"></i> View Cart
                        </button>
                    </div>
                </div>

                <div class="products-grid" id="productsGrid">
                    ${productCards}
                </div>
            </div>

            <style>
                .page-container { padding: 40px 20px; max-width: 1200px; margin: 0 auto; }
                .page-header { text-align: center; margin-bottom: 40px; }
                .page-header h1 { color: var(--primary-green); font-size: 2.5rem; margin-bottom: 10px; }
                .filters-section { display: flex; gap: 20px; margin-bottom: 30px; flex-wrap: wrap; justify-content: space-between; align-items: center; }
                .filter-group { display: flex; align-items: center; gap: 10px; }
                .filter-group select { padding: 8px 12px; border: 2px solid #e0e0e0; border-radius: 5px; }
                .cart-summary { display: flex; align-items: center; gap: 15px; }
                .btn-view-cart { background: var(--orange); color: white; padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer; }
                .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 25px; }
                .product-card { background: white; border-radius: 10px; box-shadow: var(--shadow); overflow: hidden; transition: transform 0.3s; }
                .product-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
                .product-image { position: relative; height: 200px; overflow: hidden; }
                .product-image img { width: 100%; height: 100%; object-fit: cover; }
                .product-badge { position: absolute; top: 10px; right: 10px; background: var(--orange); color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; }
                .product-info { padding: 20px; }
                .product-info h3 { color: var(--primary-green); margin-bottom: 8px; }
                .product-description { color: var(--gray); margin-bottom: 10px; font-size: 14px; }
                .product-seller { color: var(--gray); margin-bottom: 15px; font-size: 14px; }
                .product-pricing { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
                .price { font-size: 1.2rem; font-weight: bold; color: var(--primary-green); }
                .stock { font-size: 12px; color: var(--gray); }
                .product-actions { display: flex; gap: 10px; }
                .btn-cart, .btn-contact { flex: 1; padding: 10px; border: none; border-radius: 5px; cursor: pointer; font-weight: 500; transition: all 0.3s; }
                .btn-cart { background: var(--primary-green); color: white; }
                .btn-cart:hover { background: var(--dark-green); }
                .btn-contact { background: var(--orange); color: white; }
                .btn-contact:hover { background: #E65100; }
            </style>
        `;
    }

    getSellContent() {
        if (!this.currentUser) {
            return `
                <div class="page-container">
                    <div class="auth-required">
                        <h2>Login Required</h2>
                        <p>Please login as a seller to access this section.</p>
                        <button class="cta-btn primary" onclick="farmerApp.showLoginModal('seller')">
                            Login as Seller
                        </button>
                    </div>
                </div>
                <style>
                    .auth-required { text-align: center; padding: 60px 20px; }
                    .auth-required h2 { color: var(--primary-green); margin-bottom: 20px; }
                </style>
            `;
        }

        return `
            <div class="page-container">
                <div class="page-header">
                    <h1><i class="fas fa-seedling"></i> Sell Your Products</h1>
                    <p>List your agricultural products and reach buyers directly</p>
                </div>

                <div class="sell-dashboard">
                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <i class="fas fa-boxes"></i>
                            <h3>12</h3>
                            <p>Active Listings</p>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-rupee-sign"></i>
                            <h3>₹45,000</h3>
                            <p>Total Earnings</p>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-shopping-cart"></i>
                            <h3>8</h3>
                            <p>Pending Orders</p>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-star"></i>
                            <h3>4.8</h3>
                            <p>Rating</p>
                        </div>
                    </div>

                    <div class="action-buttons">
                        <button class="action-btn primary" onclick="farmerApp.showAddProductForm()">
                            <i class="fas fa-plus"></i> Add New Product
                        </button>
                        <button class="action-btn secondary" onclick="farmerApp.viewMyProducts()">
                            <i class="fas fa-list"></i> My Products
                        </button>
                        <button class="action-btn tertiary" onclick="farmerApp.viewOrders()">
                            <i class="fas fa-clipboard-list"></i> View Orders
                        </button>
                    </div>

                    <div class="quick-add-form" id="quickAddForm" style="display: none;">
                        <h3>Add New Product</h3>
                        <form id="addProductForm">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Product Name:</label>
                                    <input type="text" name="productName" required>
                                </div>
                                <div class="form-group">
                                    <label>Category:</label>
                                    <select name="category" required>
                                        <option value="">Select Category</option>
                                        <option value="grains">Grains</option>
                                        <option value="produce">Fresh Produce</option>
                                        <option value="fertilizers">Fertilizers</option>
                                        <option value="tools">Tools</option>
                                        <option value="seeds">Seeds</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Price (₹):</label>
                                    <input type="number" name="price" required>
                                </div>
                                <div class="form-group">
                                    <label>Unit:</label>
                                    <select name="unit" required>
                                        <option value="per kg">per kg</option>
                                        <option value="per quintal">per quintal</option>
                                        <option value="per piece">per piece</option>
                                        <option value="per bag">per bag</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Description:</label>
                                <textarea name="description" rows="4" required></textarea>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Available Quantity:</label>
                                    <input type="number" name="quantity" required>
                                </div>
                                <div class="form-group">
                                    <label>Location:</label>
                                    <input type="text" name="location" required>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn-submit">Add Product</button>
                                <button type="button" class="btn-cancel" onclick="farmerApp.hideAddProductForm()">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style>
                .sell-dashboard { padding: 20px; }
                .dashboard-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
                .stat-card { background: white; padding: 30px; border-radius: 10px; box-shadow: var(--shadow); text-align: center; }
                .stat-card i { font-size: 2.5rem; color: var(--secondary-green); margin-bottom: 15px; }
                .stat-card h3 { font-size: 2rem; color: var(--primary-green); margin-bottom: 5px; }
                .action-buttons { display: flex; gap: 15px; margin-bottom: 30px; flex-wrap: wrap; }
                .action-btn { padding: 15px 25px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s; }
                .action-btn.primary { background: var(--primary-green); color: white; }
                .action-btn.secondary { background: var(--orange); color: white; }
                .action-btn.tertiary { background: var(--secondary-green); color: white; }
                .action-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
                .quick-add-form { background: white; padding: 30px; border-radius: 10px; box-shadow: var(--shadow); }
                .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; margin-bottom: 8px; font-weight: 500; color: var(--dark-gray); }
                .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 5px; }
                .form-actions { display: flex; gap: 15px; justify-content: flex-end; }
                .btn-submit { background: var(--primary-green); color: white; padding: 12px 30px; border: none; border-radius: 5px; cursor: pointer; }
                .btn-cancel { background: var(--gray); color: white; padding: 12px 30px; border: none; border-radius: 5px; cursor: pointer; }
            </style>
        `;
    }

    getTransportContent() {
        return `
            <div class="page-container">
                <div class="page-header">
                    <h1><i class="fas fa-truck"></i> Transport Services</h1>
                    <p>Reliable transportation solutions for your agricultural products</p>
                </div>

                <div class="services-grid">
                    <div class="service-card">
                        <i class="fas fa-truck-loading"></i>
                        <h3>Farm to Market</h3>
                        <p>Direct transportation from farm to wholesale markets</p>
                        <ul>
                            <li>Temperature controlled vehicles</li>
                            <li>Real-time tracking</li>
                            <li>Insurance coverage</li>
                            <li>24/7 support</li>
                        </ul>
                        <button class="service-btn">Book Now</button>
                    </div>

                    <div class="service-card">
                        <i class="fas fa-warehouse"></i>
                        <h3>Warehouse to Retailer</h3>
                        <p>Efficient delivery from storage to retail outlets</p>
                        <ul>
                            <li>Flexible scheduling</li>
                            <li>Bulk transportation</li>
                            <li>Quality maintenance</li>
                            <li>Documentation support</li>
                        </ul>
                        <button class="service-btn">Book Now</button>
                    </div>

                    <div class="service-card">
                        <i class="fas fa-shipping-fast"></i>
                        <h3>Express Delivery</h3>
                        <p>Fast delivery for urgent and perishable items</p>
                        <ul>
                            <li>Same day delivery</li>
                            <li>Priority handling</li>
                            <li>Special packaging</li>
                            <li>Premium service</li>
                        </ul>
                        <button class="service-btn">Book Now</button>
                    </div>
                </div>

                <div class="transport-calculator">
                    <h3>Calculate Transport Cost</h3>
                    <form class="calculator-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label>From (Source):</label>
                                <input type="text" placeholder="Enter pickup location">
                            </div>
                            <div class="form-group">
                                <label>To (Destination):</label>
                                <input type="text" placeholder="Enter delivery location">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Weight (kg):</label>
                                <input type="number" placeholder="Enter total weight">
                            </div>
                            <div class="form-group">
                                <label>Service Type:</label>
                                <select>
                                    <option>Standard</option>
                                    <option>Express</option>
                                    <option>Premium</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" class="calculate-btn">Calculate Cost</button>
                    </form>
                    <div class="cost-result" id="costResult" style="display: none;">
                        <h4>Estimated Cost: ₹<span id="estimatedCost">0</span></h4>
                        <p>Delivery Time: <span id="deliveryTime">1-2 days</span></p>
                    </div>
                </div>
            </div>

            <style>
                .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-bottom: 40px; }
                .service-card { background: white; padding: 30px; border-radius: 10px; box-shadow: var(--shadow); text-align: center; }
                .service-card i { font-size: 3rem; color: var(--orange); margin-bottom: 20px; }
                .service-card h3 { color: var(--primary-green); margin-bottom: 15px; }
                .service-card ul { text-align: left; margin: 20px 0; }
                .service-card li { margin-bottom: 8px; color: var(--gray); }
                .service-btn { background: var(--primary-green); color: white; padding: 12px 30px; border: none; border-radius: 5px; cursor: pointer; }
                .transport-calculator { background: white; padding: 30px; border-radius: 10px; box-shadow: var(--shadow); }
                .calculator-form { margin-bottom: 20px; }
                .calculate-btn { background: var(--orange); color: white; padding: 15px 30px; border: none; border-radius: 5px; cursor: pointer; font-weight: 600; }
                .cost-result { background: var(--light-green); padding: 20px; border-radius: 5px; text-align: center; }
                .cost-result h4 { color: var(--primary-green); margin-bottom: 10px; }
            </style>
        `;
    }

    // Modal Functions
    showLoginModal(userType = 'buyer') {
        this.userType = userType;
        const modal = document.getElementById('loginModal');
        const modalTitle = document.getElementById('modalTitle');
        
        modalTitle.textContent = `Login as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`;
        modal.style.display = 'block';
    }

    showRegisterModal() {
        // Implementation for registration modal
        alert('Registration form would be implemented here');
    }

    closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

    // Login/Authentication
    async handleLogin(form) {
        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');

        // Simulate API call
        try {
            // In real implementation, this would be an API call
            const response = await this.simulateLogin(username, password);
            
            if (response.success) {
                this.currentUser = {
                    username: username,
                    userType: this.userType,
                    id: response.userId
                };
                
                localStorage.setItem('farmerMandiUser', JSON.stringify(this.currentUser));
                this.updateUIForLoggedInUser();
                this.closeModal();
                this.showNotification('Login successful!', 'success');
                
                // Redirect based on user type
                if (this.userType === 'seller') {
                    this.loadPage('sell');
                } else {
                    this.loadPage('buy');
                }
            } else {
                this.showNotification('Invalid credentials', 'error');
            }
        } catch (error) {
            this.showNotification('Login failed. Please try again.', 'error');
        }
    }

    async simulateLogin(username, password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simple validation for demo
        if (username && password) {
            return {
                success: true,
                userId: Math.floor(Math.random() * 1000)
            };
        }
        return { success: false };
    }

    updateUIForLoggedInUser() {
        // Update UI to show logged in state
        const authSection = document.querySelector('.auth-section');
        if (authSection && this.currentUser) {
            authSection.innerHTML = `
                <div class="user-menu">
                    <span>Welcome, ${this.currentUser.username}</span>
                    <button class="auth-btn" onclick="farmerApp.logout()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            `;
        }
    }

    logout() {
        this.currentUser = null;
        this.userType = null;
        localStorage.removeItem('farmerMandiUser');
        location.reload();
    }

    // Shopping Cart Functions
    addToCart(productId) {
        if (!this.currentUser) {
            this.showNotification('Please login to add items to cart', 'error');
            this.showLoginModal('buyer');
            return;
        }

        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                unit: product.unit,
                seller: product.seller,
                quantity: 1
            });
        }
        
        localStorage.setItem('farmerMandiCart', JSON.stringify(this.cart));
        this.showNotification(`${product.name} added to cart!`, 'success');
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const cartSummary = document.querySelector('.cart-summary span');
        if (cartSummary) {
            cartSummary.textContent = `Cart: ${this.cart.length} items`;
        }
    }

    viewCart() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty', 'info');
            return;
        }

        let cartItems = this.cart.map(item => `
            <div class="cart-item">
                <span class="item-name">${item.name}</span>
                <span class="item-price">₹${item.price} ${item.unit}</span>
                <span class="item-quantity">Qty: ${item.quantity}</span>
                <span class="item-total">₹${item.price * item.quantity}</span>
                <button class="remove-btn" onclick="farmerApp.removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const cartModal = `
            <div class="modal" style="display: block;">
                <div class="modal-content cart-modal">
                    <div class="modal-header">
                        <h2>Shopping Cart</h2>
                        <span class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="cart-items">
                            ${cartItems}
                        </div>
                        <div class="cart-total">
                            <h3>Total: ₹${total}</h3>
                        </div>
                        <div class="cart-actions">
                            <button class="checkout-btn" onclick="farmerApp.checkout()">
                                <i class="fas fa-credit-card"></i> Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .cart-modal { max-width: 600px; }
                .cart-item { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 15px; padding: 15px; border-bottom: 1px solid #eee; align-items: center; }
                .cart-total { text-align: right; margin: 20px 0; }
                .checkout-btn { background: var(--primary-green); color: white; padding: 15px 30px; border: none; border-radius: 5px; cursor: pointer; width: 100%; }
                .remove-btn { background: #f44336; color: white; padding: 5px 10px; border: none; border-radius: 3px; cursor: pointer; }
            </style>
        `;

        document.body.insertAdjacentHTML('beforeend', cartModal);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        localStorage.setItem('farmerMandiCart', JSON.stringify(this.cart));
        this.updateCartDisplay();
        
        // Refresh cart view if open
        const cartModal = document.querySelector('.cart-modal');
        if (cartModal) {
            cartModal.closest('.modal').remove();
            this.viewCart();
        }
    }

    checkout() {
        if (!this.currentUser) {
            this.showNotification('Please login to checkout', 'error');
            return;
        }

        // Simulate checkout process
        this.showNotification('Order placed successfully! You will be contacted by sellers.', 'success');
        this.cart = [];
        localStorage.setItem('farmerMandiCart', JSON.stringify(this.cart));
        this.updateCartDisplay();
        this.closeModal();
    }

    // Seller Functions
    showAddProductForm() {
        const form = document.getElementById('quickAddForm');
        if (form) {
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        }
    }

    hideAddProductForm() {
        const form = document.getElementById('quickAddForm');
        if (form) {
            form.style.display = 'none';
        }
    }

    // Contact/Communication
    contactSeller(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        if (!this.currentUser) {
            this.showNotification('Please login to contact sellers', 'error');
            this.showLoginModal('buyer');
            return;
        }

        // Simulate contacting seller
        this.showNotification(`Contact request sent to ${product.seller}`, 'success');
    }

    // Search and Filter
    searchProducts() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterProducts() {
        const categoryFilter = document.getElementById('categoryFilter').value;
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productCategory = card.dataset.category;
            
            if (!categoryFilter || productCategory === categoryFilter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Language Support
    changeLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('farmerMandiLanguage', language);
        
        // In a real app, this would update all text content
        this.showNotification(`Language changed to ${language}`, 'info');
    }

    loadTranslations() {
        // Placeholder for translation loading
        // In a real app, this would load translation files
    }

    // Utility Functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    attachPageEventListeners(page) {
        // Attach page-specific event listeners
        if (page === 'buy') {
            // Add sorting functionality
            const priceSort = document.getElementById('priceSort');
            const locationFilter = document.getElementById('locationFilter');
            
            if (priceSort) {
                priceSort.addEventListener('change', () => this.sortProducts());
            }
            
            if (locationFilter) {
                locationFilter.addEventListener('change', () => this.filterByLocation());
            }
        }
    }

    sortProducts() {
        // Implementation for product sorting
        const sortBy = document.getElementById('priceSort').value;
        // Sorting logic would go here
        this.showNotification('Products sorted', 'info');
    }

    filterByLocation() {
        // Implementation for location filtering
        const location = document.getElementById('locationFilter').value;
        // Filtering logic would go here
        this.showNotification('Products filtered by location', 'info');
    }

    // Additional content methods would go here...
    getHomeContent() {
        // Return the existing hero content
        return document.querySelector('.hero').outerHTML + document.querySelector('.features').outerHTML;
    }

    getInspectionContent() {
        return `<div class="page-container"><h1>Quality Inspection Services</h1><p>Coming soon...</p></div>`;
    }

    getInsuranceContent() {
        return `<div class="page-container"><h1>Agricultural Insurance</h1><p>Coming soon...</p></div>`;
    }

    getWarehouseContent() {
        return `<div class="page-container"><h1>Warehouse Services</h1><p>Coming soon...</p></div>`;
    }

    getDealsContent() {
        return `<div class="page-container"><h1>Special Deals</h1><p>Coming soon...</p></div>`;
    }

    getAboutContent() {
        return `<div class="page-container"><h1>About FarmerMandi</h1><p>Coming soon...</p></div>`;
    }

    getTermsContent() {
        return `<div class="page-container"><h1>Terms & Conditions</h1><p>Coming soon...</p></div>`;
    }
}

// Initialize the application
const farmerApp = new FarmerMarketplace();

// Add notification animations
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
`;
document.head.appendChild(style);
