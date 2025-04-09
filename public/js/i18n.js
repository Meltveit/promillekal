/**
 * Bacometer - i18n.js
 * Handles internationalization using i18next
 */

// Available languages
const AVAILABLE_LANGUAGES = ['en', 'no', 'es', 'dk', 'se', 'fi', 'nl', 'de'];

// Default language
const DEFAULT_LANGUAGE = 'en';

// Initialize i18next
function initializeI18n() {
    return i18next
        .use(i18nextHttpBackend)
        .use(i18nextBrowserLanguageDetector)
        .init({
            fallbackLng: DEFAULT_LANGUAGE,
            supportedLngs: AVAILABLE_LANGUAGES,
            backend: {
                loadPath: '/i18n/{{lng}}.json'
            },
            detection: {
                order: ['path', 'localStorage', 'navigator'],
                lookupFromPathIndex: 0
            },
            interpolation: {
                escapeValue: false
            }
        });
}

// Get the current language from URL
function getCurrentLanguage() {
    const pathSegments = window.location.pathname.split('/');
    
    // Check if the first path segment is a supported language code
    const potentialLanguage = pathSegments[1] ? pathSegments[1].toLowerCase() : '';
    
    if (AVAILABLE_LANGUAGES.includes(potentialLanguage)) {
        return potentialLanguage;
    }
    
    return DEFAULT_LANGUAGE;
}

// Change language and redirect
function changeLanguage(lang) {
    const currentLang = getCurrentLanguage();
    
    if (lang === currentLang) {
        return; // No need to change
    }
    
    // Save to localStorage
    localStorage.setItem('i18nextLng', lang);
    
    // Redirect to the appropriate URL
    if (lang === DEFAULT_LANGUAGE) {
        window.location.href = '/';
    } else {
        window.location.href = '/' + lang;
    }
}

// Apply translations to the page
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = i18next.t(key);
        
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'button') {
                element.value = translation;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update page title and meta description
    document.title = i18next.t('meta.title');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', i18next.t('meta.description'));
    }
    
    // Update language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = i18next.language;
    }
    
    // Update legal limit text based on current language
    updateLegalLimit(i18next.language);
}

// Update legal limit text based on country/language
function updateLegalLimit(language) {
    const legalLimitInfo = document.getElementById('legal-limit-info');
    if (!legalLimitInfo) return;
    
    // Set country-specific legal limits
    if (language === 'se' || language === 'no') {
        // Sweden and Norway have 0.2‰ limit
        legalLimitInfo.textContent = i18next.t('results.legalLimit');
        window.legalLimit = 0.2;
    } else if (language === 'us' || language === 'uk') {
        // US and UK have 0.8‰ limit
        window.legalLimit = 0.8;
    } else {
        // Most European countries have 0.5‰ limit
        window.legalLimit = 0.5;
    }
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Make sure i18next and plugins are loaded
    if (typeof i18next === 'undefined' || 
        typeof i18nextHttpBackend === 'undefined' || 
        typeof i18nextBrowserLanguageDetector === 'undefined') {
        
        console.error('i18next or its plugins are not loaded');
        return;
    }
    
    // Initialize i18next
    initializeI18n().then(() => {
        // Apply translations
        applyTranslations();
        
        // Set up language change event
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                changeLanguage(e.target.value);
            });
        }
    });
});

// Export for use in other files
window.changeLanguage = changeLanguage;
window.getCurrentLanguage = getCurrentLanguage;