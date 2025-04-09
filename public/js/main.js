/**
 * Bacometer - Blood Alcohol Content Calculator
 * main.js - Main functionality and initialization
 */

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set current language based on URL
    const currentLang = getCurrentLanguage();
    document.getElementById('language-select').value = currentLang;
    
    // Set up language change event
    document.getElementById('language-select').addEventListener('change', function() {
        changeLanguage(this.value);
    });
    
    // Set up remove drink buttons for any existing drinks
    document.querySelectorAll('.remove-drink').forEach(button => {
        button.addEventListener('click', function() {
            const drinkItem = this.closest('.drink-item');
            if (drinkItem) {
                drinkItem.parentNode.removeChild(drinkItem);
            }
        });
    });
    
    // Set current time
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('current-time').value = `${hours}:${minutes}`;
    
    // Enable Google AdSense if available
    try {
        (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
        console.log('AdSense not loaded');
    }
    
    // Handle legal drinking limit based on country
    setLegalLimitByCountry();
    
    // Set up chart.js annotation plugin if available
    setupChartAnnotations();
});

/**
 * Setup Chart.js annotations plugin
 */
function setupChartAnnotations() {
    if (typeof Chart !== 'undefined') {
        try {
            // Register the annotation plugin if it exists
            if (Chart.annotationPlugin) {
                Chart.register(Chart.annotationPlugin);
            }
        } catch (e) {
            console.log('Chart.js annotation plugin not available');
        }
    }
}

/**
 * Sets the legal limit text based on user's country (via IP geolocation)
 */
function setLegalLimitByCountry() {
    // Try to get country from browser language as a fallback
    let country = navigator.language.split('-')[1]?.toLowerCase() || '';
    
    // If country is detected, set the appropriate legal limit
    if (country) {
        let legalLimit = 0.5; // Default (most European countries)
        let legalLimitText = '';
        
        // Set limit based on country
        switch (country) {
            case 'us':
                legalLimit = 0.8;
                legalLimitText = 'The legal driving limit in the United States is 0.8‰ (0.08%).';
                break;
            case 'uk':
                legalLimit = 0.8;
                legalLimitText = 'The legal driving limit in the United Kingdom is 0.8‰ (0.08%).';
                break;
            case 'se':
                legalLimit = 0.2;
                legalLimitText = 'The legal driving limit in Sweden is 0.2‰ (0.02%).';
                break;
            case 'no':
                legalLimit = 0.2;
                legalLimitText = 'The legal driving limit in Norway is 0.2‰ (0.02%).';
                break;
            case 'dk':
                legalLimit = 0.5;
                legalLimitText = 'The legal driving limit in Denmark is 0.5‰ (0.05%).';
                break;
            case 'fi':
                legalLimit = 0.5;
                legalLimitText = 'The legal driving limit in Finland is 0.5‰ (0.05%).';
                break;
            case 'de':
                legalLimit = 0.5;
                legalLimitText = 'The legal driving limit in Germany is 0.5‰ (0.05%).';
                break;
            case 'nl':
                legalLimit = 0.5;
                legalLimitText = 'The legal driving limit in the Netherlands is 0.5‰ (0.05%).';
                break;
            case 'es':
                legalLimit = 0.5;
                legalLimitText = 'The legal driving limit in Spain is 0.5‰ (0.05%).';
                break;
            default:
                legalLimit = 0.5;
                legalLimitText = 'The legal driving limit in most countries is 0.5‰ (0.05%).';
        }
        
        // Update the legal limit text if element exists
        const legalLimitInfo = document.getElementById('legal-limit-info');
        if (legalLimitInfo) {
            legalLimitInfo.textContent = legalLimitText;
        }
        
        // Store legal limit for calculator use
        window.legalLimit = legalLimit;
    }
}

/**
 * Gets the current language from URL
 * @returns {string} Language code (e.g., 'en', 'no', 'es')
 */
function getCurrentLanguage() {
    // Default language is English
    let lang = 'en';
    
    // Check if URL has language path
    const pathSegments = window.location.pathname.split('/');
    for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i].toLowerCase();
        if (segment === 'no' || segment === 'es' || segment === 'dk' || 
            segment === 'se' || segment === 'fi' || segment === 'nl' || 
            segment === 'de') {
            lang = segment;
            break;
        }
    }
    
    return lang;
}

/**
 * Changes the website language
 * @param {string} lang - Language code
 */
function changeLanguage(lang) {
    if (lang === getCurrentLanguage()) {
        return; // No need to change
    }
    
    // Redirect to the appropriate URL
    if (lang === 'en') {
        window.location.href = '/';
    } else {
        window.location.href = '/' + lang;
    }
}