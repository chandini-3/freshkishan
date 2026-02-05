// Simple Enhanced Garden E-Commerce Application
console.log('Simple JavaScript file loading...');

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
        case 'farmers':
        case 'about':
        case 'contact':
        case 'home':
            content = `
                <div class="content-section">
                    <h2>📍 ${section.charAt(0).toUpperCase() + section.slice(1)} Section</h2>
                    <p>This is the ${section} section content. JavaScript is working!</p>
                    <div class="sample-content">
                        <p>✅ Navigation is functional</p>
                        <p>✅ Content loading works</p>
                        <p>✅ JavaScript execution successful</p>
                        <button onclick="alert('Button in ${section} works!')">Test Button</button>
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

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Simple app initialized successfully');
    console.log('Available functions:', ['loadContent', 'showLoginModal', 'showRegisterModal', 'showFarmerOnboarding']);
});

console.log('✅ Simple JavaScript file loaded completely');
