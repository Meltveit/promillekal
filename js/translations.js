/**
 * Bacometer - Blood Alcohol Content Calculator
 * translations.js - Simplified multi-language support
 */

// Language data for main sections
const translations = {
    // English (Default)
    'en': {
        // Meta information
        'meta': {
            'title': 'Bacometer - Calculate Your Blood Alcohol Content (BAC)',
            'description': 'Calculate your blood alcohol content (BAC) accurately based on your gender, weight, drinks consumed, and time. Free and easy to use BAC calculator.'
        },
        // Navigation
        'nav': {
            'bac': 'BAC Calculator',
            'cannabis': 'Cannabis Calculator',
            'alcoholEffects': 'Alcohol Effects',
            'about': 'About'
        },
        // Hero section
        'hero': {
            'title': 'Calculate Your Blood Alcohol Content (BAC)',
            'subtitle': 'Find out how much alcohol is in your system and when it\'s safe to drive.'
        },
        // Calculator
        'calculator': {
            'title': 'Blood Alcohol Content Calculator',
            'gender': 'Gender',
            'selectGender': 'Select',
            'male': 'Male',
            'female': 'Female',
            'age': 'Age',
            'weight': 'Weight (kg)',
            'height': 'Height (cm)',
            'drinks': 'Drinks Consumed',
            'drinkType': 'Type',
            'selectType': 'Select',
            'beer': 'Beer (5%)',
            'wine': 'Wine (12%)',
            'spirits': 'Spirits (40%)',
            'custom': 'Custom',
            'alcoholPercent': 'Alcohol %',
            'size': 'Size (ml)',
            'time': 'Time consumed',
            'addDrink': 'Add Another Drink',
            'removeDrink': 'Remove',
            'currentTime': 'Current Time',
            'metabolism': 'Metabolism',
            'normalMetabolism': 'Normal',
            'slowMetabolism': 'Slow',
            'fastMetabolism': 'Fast',
            'calculate': 'Calculate BAC'
        },
        // Results
        'results': {
            'title': 'Your Results',
            'based': 'Based on your inputs, your current Blood Alcohol Content (BAC) is',
            'legalLimit': 'The legal driving limit in most countries is 0.5‰ (0.05%).',
            'soberTime': 'You will be sober in approximately',
            'hours': 'hours and',
            'minutes': 'minutes',
            'safeToDrive': 'It would be safe to drive at approximately',
            'disclaimer': 'Disclaimer: This calculator provides an estimate only and should not be used as a definitive measure of your blood alcohol content. Many factors can affect your BAC including medications, health conditions, and individual metabolism variations. Always err on the side of caution and never drive if you\'ve been drinking.'
        },
        // BAC status
        'status': {
            'sober': 'Sober',
            'mild': 'Mild Effects',
            'impaired': 'Impaired - Do Not Drive',
            'significant': 'Significantly Impaired',
            'severe': 'Severely Impaired',
            'lifeThreatening': 'Life-Threatening'
        },
        // Footer
        'footer': {
            'description': 'A free tool to estimate blood alcohol content and help promote responsible drinking decisions.',
            'quickLinks': 'Quick Links',
            'languages': 'Languages',
            'copyright': 'All Rights Reserved.',
            'privacy': 'Privacy Policy',
            'terms': 'Terms of Service'
        }
    },
    
    // Norwegian
    'no': {
        // Meta information
        'meta': {
            'title': 'Bacometer - Beregn Promillen Din',
            'description': 'Beregn blodalkoholkonsentrasjonen (promillen) din nøyaktig basert på kjønn, vekt, inntatte drikker og tid. Gratis og enkel promillekalkulator.'
        },
        // Navigation
        'nav': {
            'bac': 'Promillekalkulator',
            'cannabis': 'Cannabis-kalkulator',
            'alcoholEffects': 'Alkoholeffekter',
            'about': 'Om oss'
        },
        // Hero section
        'hero': {
            'title': 'Beregn Promillen Din',
            'subtitle': 'Finn ut hvor mye alkohol du har i kroppen og når det er trygt å kjøre.'
        },
        // Calculator
        'calculator': {
            'title': 'Promillekalkulator',
            'gender': 'Kjønn',
            'selectGender': 'Velg',
            'male': 'Mann',
            'female': 'Kvinne',
            'age': 'Alder',
            'weight': 'Vekt (kg)',
            'height': 'Høyde (cm)',
            'drinks': 'Konsumerte drikker',
            'drinkType': 'Type',
            'selectType': 'Velg',
            'beer': 'Øl (5%)',
            'wine': 'Vin (12%)',
            'spirits': 'Brennevin (40%)',
            'custom': 'Egendefinert',
            'alcoholPercent': 'Alkohol %',
            'size': 'Størrelse (ml)',
            'time': 'Tidspunkt konsumert',
            'addDrink': 'Legg til en drink',
            'removeDrink': 'Fjern',
            'currentTime': 'Nåværende tid',
            'metabolism': 'Stoffskifte',
            'normalMetabolism': 'Normal',
            'slowMetabolism': 'Langsom',
            'fastMetabolism': 'Rask',
            'calculate': 'Beregn promille'
        },
        // Results
        'results': {
            'title': 'Dine resultater',
            'based': 'Basert på inndataene dine er din nåværende promille',
            'legalLimit': 'Lovlig grense for kjøring i Norge er 0,2‰.',
            'soberTime': 'Du vil være edru om ca.',
            'hours': 'timer og',
            'minutes': 'minutter',
            'safeToDrive': 'Det vil være trygt å kjøre ca. klokken',
            'disclaimer': 'Ansvarsfraskrivelse: Denne kalkulatoren gir kun et estimat og bør ikke brukes som et definitivt mål på din promille. Mange faktorer kan påvirke promillen, inkludert medisiner, helsetilstand og individuelle variasjoner i stoffskiftet. Vær alltid på den sikre siden og kjør aldri hvis du har drukket.'
        },
        // BAC status
        'status': {
            'sober': 'Edru',
            'mild': 'Milde effekter',
            'impaired': 'Påvirket - Ikke kjør',
            'significant': 'Betydelig påvirket',
            'severe': 'Alvorlig påvirket',
            'lifeThreatening': 'Livstruende'
        },
        // Footer
        'footer': {
            'description': 'Et gratis verktøy for å estimere promille og fremme ansvarlige drikkebeslutninger.',
            'quickLinks': 'Hurtigkoblinger',
            'languages': 'Språk',
            'copyright': 'Alle rettigheter reservert.',
            'privacy': 'Personvern',
            'terms': 'Bruksvilkår'
        }
    }
};

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

/**
 * Translates the website content to the current language
 */
function translateContent() {
    const currentLang = getCurrentLanguage();
    const t = translations[currentLang] || translations['en']; // Fallback to English
    
    // Update page title and meta description
    document.title = t.meta.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', t.meta.description);
    }
    
    // Update navigation links
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const parts = key.split('.');
        
        if (parts.length === 2) {
            const section = parts[0];
            const item = parts[1];
            
            if (t[section] && t[section][item]) {
                if (element.tagName === 'INPUT' && element.type === 'button') {
                    element.value = t[section][item];
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = t[section][item];
                } else {
                    element.textContent = t[section][item];
                }
            }
        }
    });
    
    // Update language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLang;
    }
}

// Initialize translation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    translateContent();
});

// Export functions for use in other scripts
window.changeLanguage = changeLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.translateContent = translateContent;
window.translations = translations;