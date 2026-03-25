// Currency Conversion Data
const currencyData = {
    EUR: { symbol: '€', name: 'Euro', rates: { GHS: 1, EUR: 0.13, USD: 0.14, GBP: 0.11 } },
    GHS: { symbol: '₵', name: 'Ghana Cedi', rates: { GHS: 1, EUR: 0.13, USD: 0.14, GBP: 0.11 } },
    USD: { symbol: '$', name: 'US Dollar', rates: { GHS: 7.14, EUR: 0.92, USD: 1, GBP: 0.79 } },
    GBP: { symbol: '£', name: 'British Pound', rates: { GHS: 9.05, EUR: 1.17, USD: 1.27, GBP: 1 } }
};

// Base prices in GHS (Ghana Cedi)
const basePrices = {
    residential1bed: 80,
    residential2bed: 120,
    residential3bed: 160,
    deepClean: 150,
    moveInOut: 200,
    postConstruction: 250,
    carpetCleaning: 70, // Average of 60-80
    windowCleaning: 50 // Average of 40-60
};

// Currency-specific prices
const currencyPrices = {
    EUR: {
        residential1bed: 10,
        residential2bed: 16,
        residential3bed: 21,
        deepClean: 20,
        moveInOut: 27,
        postConstruction: 33,
        carpetCleaning: 9,
        windowCleaning: 7
    },
    USD: {
        residential1bed: 11,
        residential2bed: 17,
        residential3bed: 23,
        deepClean: 21,
        moveInOut: 28,
        postConstruction: 35,
        carpetCleaning: 10,
        windowCleaning: 7
    },
    GBP: {
        residential1bed: 9,
        residential2bed: 13,
        residential3bed: 18,
        deepClean: 16,
        moveInOut: 22,
        postConstruction: 27,
        carpetCleaning: 8,
        windowCleaning: 5
    },
    GHS: basePrices
};

// Initialize Currency
function initCurrency() {
    const savedCurrency = localStorage.getItem('currency') || 'EUR';
    updateCurrencyDisplay(savedCurrency);
    initLogoClickHandler();
}

function updateCurrencyDisplay(currencyCode) {
    localStorage.setItem('currency', currencyCode);
    const prices = document.querySelectorAll('.price[data-price-key]');
    prices.forEach(priceElement => {
        const priceKey = priceElement.getAttribute('data-price-key');
        if (priceKey && currencyPrices[currencyCode][priceKey]) {
            const price = currencyPrices[currencyCode][priceKey];
            const symbol = currencyData[currencyCode].symbol;
            // Check if original text had a "+" suffix (for ranges)
            const hasSuffix = priceElement.getAttribute('data-price-key').includes('3bed');
            priceElement.textContent = symbol + price + (hasSuffix ? '+' : '');
        }
    });
    updateCurrencyButtons(currencyCode);
}

function updateCurrencyButtons(currencyCode) {
    const buttons = document.querySelectorAll('.currency-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.currency === currencyCode) {
            btn.classList.add('active');
        }
    });
}

function initLogoClickHandler() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.setItem('currency', 'EUR');
            window.location.href = 'index.html';
        });
    }
}

// Theme Toggle Functionality
function initTheming() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme);
    console.log('Theme initialized:', currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const theme = html.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
        console.log('Theme switched to:', newTheme);
    });
}

function updateThemeButton(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        if (theme === 'dark') {
            themeToggle.textContent = '☀️';
            themeToggle.title = 'Switch to Light Mode';
            themeToggle.classList.add('dark-mode');
        } else {
            themeToggle.textContent = '🌙';
            themeToggle.title = 'Switch to Dark Mode';
            themeToggle.classList.remove('dark-mode');
        }
    }
}

// Simple JavaScript for interactivity

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theming first
    initTheming();
    
    // Initialize currency
    initCurrency();
    
    // Setup currency buttons if they exist
    const currencyButtons = document.querySelectorAll('.currency-btn');
    currencyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const currency = this.dataset.currency;
            updateCurrencyDisplay(currency);
        });
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
    
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Demo submission - in a real app, this would send to a server
            alert(`Thank you, ${data.name}! Your quote request has been submitted. We'll contact you at ${data.email} soon.`);
            
            // Reset form
            quoteForm.reset();
        });
    }

    // Booking form handler with currency
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.service || !data.currency) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Save preferred currency
            localStorage.setItem('currency', data.currency);
            
            // Get currency symbol
            const currencySymbol = currencyData[data.currency].symbol;
            
            // Demo submission - in a real app, this would send to a server
            alert(`Thank you, ${data.name}! Your booking request has been submitted in ${currencyData[data.currency].name}. We'll contact you at ${data.email} soon.`);
            
            // Reset form
            bookingForm.reset();
        });
    }

    // Quote calculator currency handler
    const quoteformCurrency = document.getElementById('quoteformCurrency');
    const quoteService = document.getElementById('quoteService');
    const quotePrice = document.getElementById('quotePrice');
    
    if (quoteformCurrency && quoteService && quotePrice) {
        const updateQuotePrice = function() {
            const selectedCurrency = quoteformCurrency.value;
            const selectedService = quoteService.value;
            const currencySymbol = currencyData[selectedCurrency].symbol;
            
            let minPrice, maxPrice;
            
            // Get prices for selected currency
            if (selectedService === 'residential') {
                minPrice = currencyPrices[selectedCurrency].residential1bed;
                maxPrice = currencyPrices[selectedCurrency].residential3bed;
            } else if (selectedService === 'deep') {
                minPrice = currencyPrices[selectedCurrency].deepClean;
                maxPrice = currencyPrices[selectedCurrency].deepClean;
            } else if (selectedService === 'carpet') {
                minPrice = currencyPrices[selectedCurrency].carpetCleaning;
                maxPrice = currencyPrices[selectedCurrency].carpetCleaning;
            } else if (selectedService === 'windows') {
                minPrice = currencyPrices[selectedCurrency].windowCleaning;
                maxPrice = currencyPrices[selectedCurrency].windowCleaning;
            } else if (selectedService === 'office') {
                quotePrice.textContent = 'Custom Quote';
                return;
            }
            
            quotePrice.textContent = currencySymbol + minPrice + ' - ' + currencySymbol + maxPrice;
        };
        
        quoteformCurrency.addEventListener('change', updateQuotePrice);
        quoteService.addEventListener('change', updateQuotePrice);
    }
    
    // Add some animation to service cards on hover
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Smooth scrolling for navigation links
    const navAnchors = document.querySelectorAll('.nav-links a');
    navAnchors.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});