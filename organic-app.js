// Organic Farm Marketplace JavaScript
class OrganicFarmApp {
    constructor() {
        this.currentUser = null;
        this.cart = [];
        this.products = [];
        this.farmers = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStoredData();
        this.setupMobileMenu();
        this.loadSampleData();
        // Commented out to prevent interference with static buttons
        // this.updateUserInterface(); // Update UI after loading stored data
    }

    setupEventListeners() {
        // Load content when page loads
        document.addEventListener('DOMContentLoaded', () => {
            this.loadContent('home');
            // Commented out to keep static buttons visible
            // setTimeout(() => {
            //     this.updateUserInterface();
            // }, 100);
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'loginForm') {
                e.preventDefault();
                this.handleLogin(e.target);
            } else if (e.target.id === 'registrationForm') {
                e.preventDefault();
                this.handleRegistration(e.target);
            } else if (e.target.id === 'farmerRegistrationForm') {
                e.preventDefault();
                this.handleFarmerRegistration(e.target);
            }
        });

        // Ensure UI updates when page is fully loaded
        window.addEventListener('load', () => {
            // Commented out to keep static buttons visible
            // this.updateUserInterface();
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
            // this.updateUserInterface(); // Disabled to keep static buttons
        }

        // Load cart data
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }
    }

    loadSampleData() {
        // Sample farmers data
        this.farmers = [
            {
                id: 1,
                name: "Rajesh Kumar",
                location: "Punjab, India",
                speciality: "Organic Vegetables",
                rating: 4.8,
                experience: "15 years",
                image: "farmer1.jpg",
                description: "Certified organic farmer specializing in seasonal vegetables"
            },
            {
                id: 2,
                name: "Priya Sharma",
                location: "Karnataka, India",
                speciality: "Fruits & Dairy",
                rating: 4.9,
                experience: "12 years",
                image: "farmer2.jpg",
                description: "Organic fruit cultivation and dairy farming expert"
            },
            {
                id: 3,
                name: "Suresh Patel",
                location: "Gujarat, India",
                speciality: "Grains & Pulses",
                rating: 4.7,
                experience: "20 years",
                image: "farmer3.jpg",
                description: "Traditional grain and pulse farming with modern techniques"
            }
        ];

        // Sample products data with real images
        this.products = [
            {
                id: 1,
                name: "Organic Tomatoes",
                price: 40,
                unit: "per kg",
                category: "vegetables",
                farmerId: 1,
                image: "tomatoes.jpg",
                description: "Fresh, red organic tomatoes harvested this morning. Rich in vitamins and perfect for salads, cooking, or eating fresh.",
                inStock: true,
                rating: 4.8,
                benefits: ["Rich in Vitamin C", "Natural Antioxidants", "Heart Healthy", "Low Calories"]
            },
            {
                id: 3,
                name: "Organic Potatoes",
                price: 25,
                unit: "per kg",
                category: "vegetables",
                farmerId: 1,
                image: "potatoes.jpg",
                description: "Fresh organic potatoes grown without chemicals. Great source of energy and perfect for various cooking methods.",
                inStock: true,
                rating: 4.6,
                benefits: ["High in Potassium", "Vitamin C", "Fiber Rich", "Energy Source"]
            },
            {
                id: 4,
                name: "Garden Seeds",
                price: 50,
                unit: "per packet",
                category: "grains",
                farmerId: 1,
                image: "seeds.jpg",
                description: "Premium quality vegetable and flower seeds for your garden. Perfect for starting your own organic farm.",
                inStock: true,
                rating: 4.5,
                benefits: ["High Quality", "Organic Certified", "High Germination", "Non-GMO"]
            },
            {
                id: 5,
                name: "Fresh Vegetables Mix",
                price: 80,
                unit: "per basket",
                category: "vegetables",
                farmerId: 1,
                image: "veg1.jpg",
                description: "Mixed basket of fresh seasonal vegetables directly from our organic farm.",
                inStock: true,
                rating: 4.7,
                benefits: ["Seasonal Fresh", "Variety Pack", "Organic Grown", "Farm Fresh"]
            },
            {
                id: 6,
                name: "Gardening Tools",
                price: 150,
                unit: "per set",
                category: "herbs",
                farmerId: 1,
                image: "tools.jpg",
                description: "Essential gardening tools set for maintaining your organic garden and herb cultivation.",
                inStock: true,
                rating: 4.4,
                benefits: ["Durable Quality", "Ergonomic Design", "Rust Resistant", "Complete Set"]
            },
            {
                id: 7,
                name: "Organic Carrots",
                price: 30,
                unit: "per kg",
                category: "vegetables",
                farmerId: 1,
                image: "carrots.jpg",
                description: "Fresh orange carrots grown organically. Rich in beta-carotene and perfect for cooking or eating raw.",
                inStock: true,
                rating: 4.5,
                benefits: ["High in Beta-Carotene", "Vitamin A", "Good for Eyes", "Crunchy Fresh"]
            },
            {
                id: 8,
                name: "Fresh Onions",
                price: 20,
                unit: "per kg",
                category: "vegetables",
                farmerId: 1,
                image: "onions.jpg",
                description: "Fresh organic onions essential for cooking. Grown without pesticides and harvested at perfect ripeness.",
                inStock: true,
                rating: 4.3,
                benefits: ["Cooking Essential", "Natural Flavor", "Antioxidants", "Long Storage"]
            },
            {
                id: 9,
                name: "Organic Cabbage",
                price: 28,
                unit: "per kg",
                category: "vegetables",
                farmerId: 1,
                image: "cabbage.jpg",
                description: "Fresh green cabbage perfect for salads, soups, and cooking. Rich in vitamins and minerals.",
                inStock: true,
                rating: 4.4,
                benefits: ["High in Vitamin C", "Fiber Rich", "Low Calories", "Versatile Use"]
            }
        ];
    }

    // Content Loading System
    async loadContent(section) {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;

        // Update active navigation
        this.updateActiveNav(section);

        // Show loading
        mainContent.innerHTML = '<div class="loading-container"><div class="loading"></div><p>Loading...</p></div>';

        try {
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
                case 'sell':
                    content = this.getSellContent();
                    break;
                case 'login':
                    content = this.getLoginContent();
                    break;
                case 'register':
                    content = this.getRegistrationContent();
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

    updateActiveNav(page) {
        // Remove active class from all nav links
        const navLinks = document.querySelectorAll('.nav-menu a, .sidebar a');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page
        const activeLink = document.querySelector(`a[href="#${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    getHomeContent() {
        return `
            <div class="hero-section">
                <h1>Fresh Organic Produce Direct From Farmers</h1>
                <p>Connect with local farmers and buy fresh, organic produce directly from the source. Support sustainable farming while enjoying the best quality food.</p>
                <button class="cta-button" onclick="organicApp.loadContent('products')">Shop Fresh Produce</button>
            </div>
            
            <div class="content-section">
                <h2>Featured Products</h2>
                <div class="card-grid">
                    <div class="card">
                        <img src="tomatoes.jpg" alt="Fresh Tomatoes">
                        <div class="card-content">
                            <h3>Organic Tomatoes</h3>
                            <p>Fresh, red organic tomatoes harvested daily from local farms</p>
                            <button class="btn" onclick="organicApp.loadContent('products')">View Product</button>
                        </div>
                    </div>
                    <div class="card">
                        <img src="carrots.jpg" alt="Organic Carrots">
                        <div class="card-content">
                            <h3>Organic Carrots</h3>
                            <p>Fresh orange carrots grown organically, rich in beta-carotene</p>
                            <button class="btn" onclick="organicApp.loadContent('products')">View Product</button>
                        </div>
                    </div>
                    <div class="card">
                        <img src="potatoes.jpg" alt="Organic Potatoes">
                        <div class="card-content">
                            <h3>Organic Potatoes</h3>
                            <p>Fresh organic potatoes grown without harmful chemicals</p>
                            <button class="btn" onclick="organicApp.loadContent('products')">View Product</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-section">
                <h2>Why Choose Fresh From Farm?</h2>
                <div class="feature-grid">
                    <div class="feature-item">
                        <div class="feature-icon">🌱</div>
                        <h3>100% Organic</h3>
                        <p>All our produce is certified organic, grown without harmful pesticides</p>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">🚚</div>
                        <h3>Farm to Door</h3>
                        <p>Fresh delivery from farm to your doorstep within 24 hours</p>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">👨‍🌾</div>
                        <h3>Support Local Farmers</h3>
                        <p>Directly support local farmers and their families with fair pricing</p>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">💰</div>
                        <h3>Best Prices</h3>
                        <p>No middleman means better prices for both farmers and customers</p>
                    </div>
                </div>
            </div>
        `;
    }

    getProductsContent() {
        let productsHTML = this.products.map(product => {
            const farmer = this.farmers.find(f => f.id === product.farmerId);
            const benefitsHTML = product.benefits ? 
                `<div class="benefits">
                    <strong>Benefits:</strong> ${product.benefits.slice(0, 2).join(', ')}
                </div>` : '';
            
            // Check if user is logged in for cart button
            const cartButton = this.currentUser ? 
                `<button class="btn-primary" onclick="organicApp.addToCart(${product.id})">🛒 Add to Cart</button>` :
                `<button class="btn-secondary" onclick="organicApp.showNotification('Please login to add products to cart!', 'error'); organicApp.loadContent('login')">🔒 Login to Buy</button>`;
            
            return `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='veg1.jpg'; this.onerror=null;">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">₹${product.price} ${product.unit}</p>
                        <p class="farmer">🌾 By ${farmer ? farmer.name : 'Local Farmer'}</p>
                        <div class="rating">⭐ ${product.rating}/5</div>
                        <p class="description">${product.description}</p>
                        ${benefitsHTML}
                        <div class="product-actions">
                            ${cartButton}
                            <button class="btn-secondary" onclick="organicApp.viewProduct(${product.id})">👁️ View Details</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="content-section">
                <h1>🌱 Organic Products</h1>
                <p>Fresh, organic produce directly from certified farmers across India</p>
                ${!this.currentUser ? '<div class="auth-notice"><p>⚠️ Please <a href="#" onclick="organicApp.loadContent(\'login\')">login</a> to purchase products</p></div>' : ''}
                
                <div class="filter-section">
                    <button class="filter-btn active" onclick="organicApp.filterProducts('all')">All Products</button>
                    <button class="filter-btn" onclick="organicApp.filterProducts('vegetables')">🥕 Vegetables</button>
                    <button class="filter-btn" onclick="organicApp.filterProducts('fruits')">🍎 Fruits</button>
                    <button class="filter-btn" onclick="organicApp.filterProducts('dairy')">🥛 Dairy</button>
                    <button class="filter-btn" onclick="organicApp.filterProducts('grains')">🌾 Grains</button>
                    <button class="filter-btn" onclick="organicApp.filterProducts('herbs')">🌿 Herbs</button>
                </div>

                <div class="products-grid">
                    ${productsHTML}
                </div>
                
                <div class="product-stats">
                    <div class="stat-item">
                        <h3>8</h3>
                        <p>Premium Products</p>
                    </div>
                    <div class="stat-item">
                        <h3>${this.farmers.length}</h3>
                        <p>Verified Farmers</p>
                    </div>
                    <div class="stat-item">
                        <h3>100%</h3>
                        <p>Organic Certified</p>
                    </div>
                </div>
            </div>
        `;
    }

    getFarmersContent() {
        let farmersHTML = this.farmers.map(farmer => `
            <div class="farmer-card">
                <img src="${farmer.image}" alt="${farmer.name}">
                <div class="farmer-info">
                    <h3>${farmer.name}</h3>
                    <p class="location">📍 ${farmer.location}</p>
                    <p class="speciality">🌾 ${farmer.speciality}</p>
                    <p class="experience">📅 ${farmer.experience} experience</p>
                    <div class="rating">⭐ ${farmer.rating}/5</div>
                    <p class="description">${farmer.description}</p>
                    <button class="btn-primary" onclick="organicApp.viewFarmerProducts(${farmer.id})">View Products</button>
                </div>
            </div>
        `).join('');

        return `
            <div class="content-section">
                <h1>Our Farmers</h1>
                <p>Meet the dedicated farmers who grow your food with love and care</p>
                
                <div class="farmers-grid">
                    ${farmersHTML}
                </div>
                
                <div class="join-section">
                    <h2>Want to join our farmer community?</h2>
                    <p>Start selling your organic produce and reach customers directly</p>
                    <button class="cta-button" onclick="organicApp.loadContent('farmer-registration')">Become a Farmer Partner</button>
                </div>
            </div>
        `;
    }

    getSellContent() {
        return `
            <div class="content-section">
                <h1>Sell Your Organic Produce</h1>
                <p>Join our marketplace and sell directly to customers</p>
                
                <div class="sell-benefits">
                    <div class="benefit-item">
                        <div class="benefit-icon">💰</div>
                        <h3>Better Prices</h3>
                        <p>Get fair prices without middlemen taking cuts</p>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon">🌍</div>
                        <h3>Reach More Customers</h3>
                        <p>Sell to customers across the country</p>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon">📱</div>
                        <h3>Easy to Use</h3>
                        <p>Simple platform to list and manage your products</p>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon">🚚</div>
                        <h3>Logistics Support</h3>
                        <p>We handle delivery and customer support</p>
                    </div>
                </div>

                <div class="selling-steps">
                    <h2>How to Start Selling</h2>
                    <div class="steps-grid">
                        <div class="step">
                            <div class="step-number">1</div>
                            <h3>Register as Farmer</h3>
                            <p>Create your farmer profile with certification details</p>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <h3>List Your Products</h3>
                            <p>Add photos and descriptions of your organic produce</p>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <h3>Receive Orders</h3>
                            <p>Get notifications when customers place orders</p>
                        </div>
                        <div class="step">
                            <div class="step-number">4</div>
                            <h3>Ship & Get Paid</h3>
                            <p>Pack your produce and receive payment directly</p>
                        </div>
                    </div>
                </div>

                <div class="cta-section">
                    <button class="cta-button" onclick="organicApp.loadContent('farmer-registration')">Start Selling Today</button>
                </div>
            </div>
        `;
    }

    getCategoryContent(category) {
        const categoryProducts = this.products.filter(product => product.category === category);
        const categoryNames = {
            vegetables: 'Fresh Vegetables',
            fruits: 'Organic Fruits', 
            dairy: 'Farm Fresh Dairy',
            grains: 'Grains & Cereals',
            herbs: 'Herbs & Spices'
        };

        let productsHTML = categoryProducts.map(product => {
            const farmer = this.farmers.find(f => f.id === product.farmerId);
            return `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">₹${product.price} ${product.unit}</p>
                        <p class="farmer">By ${farmer ? farmer.name : 'Unknown Farmer'}</p>
                        <p class="description">${product.description}</p>
                        <div class="product-actions">
                            <button class="btn-primary" onclick="organicApp.addToCart(${product.id})">Add to Cart</button>
                            <button class="btn-secondary" onclick="organicApp.viewProduct(${product.id})">View Details</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="content-section">
                <h1>${categoryNames[category]}</h1>
                <p>Fresh, organic ${category} directly from certified farmers</p>
                
                <div class="products-grid">
                    ${productsHTML || '<p>No products available in this category yet.</p>'}
                </div>
                
                <div class="back-section">
                    <button class="btn-secondary" onclick="organicApp.loadContent('products')">← Back to All Products</button>
                </div>
            </div>
        `;
    }

    getLoginContent() {
        return `
            <div class="auth-container">
                <div class="auth-form">
                    <h2>Login to Your Account</h2>
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="remember"> Remember me
                            </label>
                        </div>
                        <button type="submit" class="btn-primary">Login</button>
                    </form>
                    <p>Don't have an account? <a href="#" onclick="organicApp.loadContent('register')">Sign up here</a></p>
                </div>
            </div>
        `;
    }

    getRegistrationContent() {
        return `
            <div class="auth-container">
                <div class="auth-form">
                    <h2>Create Your Account</h2>
                    <form id="registrationForm">
                        <div class="form-group">
                            <label for="fullName">Full Name:</label>
                            <input type="text" id="fullName" name="fullName" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number:</label>
                            <input type="tel" id="phone" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <div class="form-group">
                            <label for="userType">Account Type:</label>
                            <select id="userType" name="userType" required>
                                <option value="customer">Customer</option>
                                <option value="farmer">Farmer</option>
                            </select>
                        </div>
                        <button type="submit" class="btn-primary">Create Account</button>
                    </form>
                    <p>Already have an account? <a href="#" onclick="organicApp.loadContent('login')">Login here</a></p>
                </div>
            </div>
        `;
    }

    getFarmerRegistrationContent() {
        return `
            <div class="auth-container">
                <div class="auth-form farmer-registration">
                    <h2>Join as a Farmer Partner</h2>
                    <form id="farmerRegistrationForm">
                        <div class="form-group">
                            <label for="farmerName">Full Name:</label>
                            <input type="text" id="farmerName" name="farmerName" required>
                        </div>
                        <div class="form-group">
                            <label for="farmName">Farm Name:</label>
                            <input type="text" id="farmName" name="farmName" required>
                        </div>
                        <div class="form-group">
                            <label for="location">Location:</label>
                            <input type="text" id="location" name="location" placeholder="City, State" required>
                        </div>
                        <div class="form-group">
                            <label for="farmSize">Farm Size (in acres):</label>
                            <input type="number" id="farmSize" name="farmSize" required>
                        </div>
                        <div class="form-group">
                            <label for="speciality">Speciality:</label>
                            <select id="speciality" name="speciality" required>
                                <option value="">Select your speciality</option>
                                <option value="vegetables">Vegetables</option>
                                <option value="fruits">Fruits</option>
                                <option value="grains">Grains & Cereals</option>
                                <option value="dairy">Dairy Products</option>
                                <option value="herbs">Herbs & Spices</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="experience">Experience (in years):</label>
                            <input type="number" id="experience" name="experience" required>
                        </div>
                        <div class="form-group">
                            <label for="organic">
                                <input type="checkbox" id="organic" name="organic"> I practice organic farming
                            </label>
                        </div>
                        <div class="form-group">
                            <label for="certification">Organic Certification Number (if any):</label>
                            <input type="text" id="certification" name="certification">
                        </div>
                        <button type="submit" class="btn-primary">Submit Application</button>
                    </form>
                </div>
            </div>
        `;
    }

    // Utility functions
    addToCart(productId) {
        // Check if user is logged in
        if (!this.currentUser) {
            this.showNotification('Please login to add products to cart!', 'error');
            setTimeout(() => this.loadContent('login'), 1000);
            return;
        }

        const product = this.products.find(p => p.id === productId);
        if (product) {
            const existingItem = this.cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({...product, quantity: 1});
            }
            this.saveCartData();
            // Commented out to keep static buttons visible
            // this.updateUserInterface(); // Update cart count
            this.showNotification(`${product.name} added to cart!`, 'success');
        }
    }

    showCart() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!', 'info');
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const cartItemsHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</p>
                    <div class="quantity-controls">
                        <button onclick="organicApp.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="organicApp.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button onclick="organicApp.removeFromCart(${item.id})" class="remove-btn">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Create cart modal
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h2>🛒 Your Cart</h2>
                <div class="cart-items">
                    ${cartItemsHTML}
                </div>
                <div class="cart-total">
                    <h3>Total: ₹${total}</h3>
                    <div class="cart-actions">
                        <button class="btn-primary" onclick="organicApp.proceedToCheckout()">Proceed to Checkout</button>
                        <button class="btn-secondary" onclick="organicApp.clearCart(); this.parentElement.parentElement.parentElement.parentElement.remove();">Clear Cart</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    updateCartQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCartData();
            // Commented out to keep static buttons visible
            // this.updateUserInterface();
            this.showCart(); // Refresh cart display
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCartData();
        // Commented out to keep static buttons visible
        // this.updateUserInterface();
        this.showNotification('Item removed from cart!', 'success');
        
        // Refresh cart display if modal is open
        const cartModal = document.querySelector('.cart-modal');
        if (cartModal) {
            cartModal.remove();
            if (this.cart.length > 0) {
                this.showCart();
            }
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCartData();
        // Commented out to keep static buttons visible
        // this.updateUserInterface();
        this.showNotification('Cart cleared!', 'success');
    }

    proceedToCheckout() {
        this.showNotification('Checkout functionality coming soon!', 'info');
        // In a real app, this would redirect to checkout page
    }

    viewProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            const farmer = this.farmers.find(f => f.id === product.farmerId);
            const benefitsHTML = product.benefits ? 
                product.benefits.map(benefit => `<li>✓ ${benefit}</li>`).join('') : '';
            
            // Check if user is logged in for purchase button
            const purchaseButton = this.currentUser ? 
                `<button class="btn-primary large" onclick="organicApp.addToCart(${product.id}); this.parentElement.parentElement.parentElement.parentElement.remove();">
                    🛒 Add to Cart - ₹${product.price}
                </button>` :
                `<button class="btn-secondary large" onclick="organicApp.showNotification('Please login to purchase products!', 'error'); organicApp.loadContent('login'); this.parentElement.parentElement.parentElement.parentElement.remove();">
                    🔒 Login to Purchase
                </button>`;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'product-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                    <div class="product-detail">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div class="product-details">
                            <h2>${product.name}</h2>
                            <p class="price">₹${product.price} ${product.unit}</p>
                            <div class="rating">⭐ ${product.rating}/5</div>
                            <p class="farmer">🌾 Grown by ${farmer ? farmer.name : 'Local Farmer'}</p>
                            <p class="location">📍 ${farmer ? farmer.location : 'India'}</p>
                            <p class="description">${product.description}</p>
                            ${benefitsHTML ? `<div class="benefits-list">
                                <h4>Health Benefits:</h4>
                                <ul>${benefitsHTML}</ul>
                            </div>` : ''}
                            <div class="product-actions">
                                ${purchaseButton}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
    }

    viewFarmerProducts(farmerId) {
        const farmerProducts = this.products.filter(p => p.farmerId === farmerId);
        this.loadContent('products');
        // In a real app, this would filter the products view
    }

    filterProducts(category) {
        // Update filter button states
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // In a real app, this would filter the products display
        console.log(`Filtering products by category: ${category}`);
    }

    saveCartData() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add icon based on type
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        notification.innerHTML = `<span class="notification-icon">${icon}</span> ${message}`;
        
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    handleLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        // Simulate login validation
        if (email && password) {
            this.currentUser = {
                id: 1,
                name: email.split('@')[0], // Use part before @ as name
                email: email,
                type: 'customer'
            };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showNotification('Login successful! You can now purchase products.', 'success');
            // Commented out to keep static buttons visible
            // this.updateUserInterface();
            setTimeout(() => this.loadContent('home'), 1500);
        } else {
            this.showNotification('Please enter valid email and password!', 'error');
        }
    }

    handleRegistration(form) {
        const formData = new FormData(form);
        const name = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const password = formData.get('password');

        // Simulate registration
        if (name && email && phone && password) {
            // Auto-login after registration
            this.currentUser = {
                id: 1,
                name: name,
                email: email,
                type: formData.get('userType') || 'customer'
            };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showNotification('Registration successful! Welcome to Fresh From Farm!', 'success');
            // Commented out to keep static buttons visible
            // this.updateUserInterface();
            setTimeout(() => this.loadContent('home'), 1500);
        } else {
            this.showNotification('Please fill in all required fields!', 'error');
        }
    }

    handleFarmerRegistration(form) {
        const formData = new FormData(form);
        const farmerName = formData.get('farmerName');
        const farmName = formData.get('farmName');

        // Simulate farmer registration
        if (farmerName && farmName) {
            this.showNotification('Farmer application submitted! We will contact you soon.');
            setTimeout(() => this.loadContent('home'), 1000);
        }
    }

    attachContentEventListeners(section) {
        // Add any section-specific event listeners here
    }

    updateUserInterface() {
        // Update UI based on current user
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const userToolbar = document.getElementById('userToolbar');
        const welcomeText = document.getElementById('welcomeText');
        
        if (this.currentUser) {
            // User is logged in - hide login/register, show user toolbar
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
            if (userToolbar) {
                userToolbar.style.display = 'flex';
                const cartCount = this.cart.length > 0 ? this.cart.reduce((total, item) => total + item.quantity, 0) : 0;
                const cartBtn = userToolbar.querySelector('.cart-btn');
                if (cartBtn) {
                    cartBtn.innerHTML = `🛒 Cart ${cartCount > 0 ? `(${cartCount})` : ''}`;
                }
                if (welcomeText) {
                    welcomeText.textContent = `Welcome, ${this.currentUser.name}!`;
                }
            }
        } else {
            // User is not logged in - show login/register, hide user toolbar
            if (loginBtn) loginBtn.style.display = 'inline-flex';
            if (registerBtn) registerBtn.style.display = 'inline-flex';
            if (userToolbar) userToolbar.style.display = 'none';
        }
    }

    logout() {
        this.currentUser = null;
        this.cart = [];
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cart');
        this.showNotification('Logged out successfully!', 'success');
        // Commented out to keep static buttons visible
        // this.updateUserInterface();
        this.loadContent('home');
    }
}

// Initialize the app
const organicApp = new OrganicFarmApp();
organicApp.init(); // Make sure to call init method

// Make it globally accessible for onclick handlers
window.loadContent = (page) => organicApp.loadContent(page);
