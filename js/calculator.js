/**
 * Bacometer - Blood Alcohol Content Calculator
 * calculator.js - Simplified calculator logic
 */

// Constants for BAC calculation
const ALCOHOL_DENSITY = 0.789; // g/ml
const MALE_WATER_CONSTANT = 0.68;
const FEMALE_WATER_CONSTANT = 0.55;
const ALCOHOL_METABOLISM_RATE = 0.015; // Standard elimination rate per hour (in percentage points)
const METABOLISM_FACTORS = {
    slow: 0.8,     // 20% slower metabolism
    normal: 1.0,   // baseline
    fast: 1.2      // 20% faster metabolism
};

// Standard drink sizes in ml for default values
const STANDARD_DRINK_SIZES = {
    beer: 330,     // Standard beer bottle/can
    wine: 150,     // Standard wine glass
    spirits: 40    // Standard shot
};

// Alcohol percentages for standard drinks
const ALCOHOL_PERCENTAGES = {
    beer: 5,       // 5% ABV for regular beer
    wine: 12,      // 12% ABV for wine
    spirits: 40    // 40% ABV for spirits
};

// BAC level classifications
const BAC_LEVELS = [
    { max: 0.2, class: 'safe', status: 'sober' },
    { max: 0.5, class: 'safe', status: 'mild' },
    { max: 0.8, class: 'warning', status: 'impaired' },
    { max: 1.5, class: 'danger', status: 'significant' },
    { max: 3.0, class: 'danger', status: 'severe' },
    { max: Infinity, class: 'danger', status: 'lifeThreatening' }
];

/**
 * Initialize the BAC Calculator
 */
function initBacCalculator() {
    // Set up event listeners
    document.addEventListener('DOMContentLoaded', function() {
        // Set current time in the current-time input
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('current-time').value = `${hours}:${minutes}`;
        
        // Add drink button
        document.getElementById('add-drink').addEventListener('click', addDrinkInput);
        
        // Form submission
        document.getElementById('bac-calculator').addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBAC();
        });
        
        // Set up drink type change listeners for the first drink
        setupDrinkTypeListener('drink-type-1', 'custom-percent-1', 'drink-size-1');
        
        // Set default sizes based on drink type for the first drink
        document.getElementById('drink-type-1').addEventListener('change', function() {
            const drinkType = this.value;
            const sizeInput = document.getElementById('drink-size-1');
            
            if (drinkType && drinkType !== 'custom' && STANDARD_DRINK_SIZES[drinkType]) {
                sizeInput.value = STANDARD_DRINK_SIZES[drinkType];
            } else {
                sizeInput.value = '';
            }
        });
        
        // Set time for the first drink as current time
        document.getElementById('drink-time-1').value = `${hours}:${minutes}`;
    });
}

/**
 * Sets up listeners for drink type changes
 */
function setupDrinkTypeListener(typeId, customPercentId, sizeId) {
    const typeSelect = document.getElementById(typeId);
    const customPercentDiv = document.getElementById(customPercentId).parentElement;
    
    typeSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customPercentDiv.style.display = 'block';
        } else {
            customPercentDiv.style.display = 'none';
        }
        
        // Set default size based on drink type
        const sizeInput = document.getElementById(sizeId);
        if (this.value && this.value !== 'custom' && STANDARD_DRINK_SIZES[this.value]) {
            sizeInput.value = STANDARD_DRINK_SIZES[this.value];
        }
    });
}

/**
 * Adds another drink input to the form
 */
function addDrinkInput() {
    const drinksContainer = document.getElementById('drinks-list');
    const drinkCount = drinksContainer.children.length + 1;
    
    // Create a new drink item
    const drinkItem = document.createElement('div');
    drinkItem.className = 'drink-item';
    
    // HTML for the new drink item with i18next data attributes
    drinkItem.innerHTML = `
        <div class="form-group">
            <label for="drink-type-${drinkCount}" data-i18n="calculator.drinkType">Type:</label>
            <select id="drink-type-${drinkCount}" class="drink-type" required>
                <option value="" data-i18n="calculator.selectType">Select</option>
                <option value="beer" data-i18n="calculator.beer">Beer (5%)</option>
                <option value="wine" data-i18n="calculator.wine">Wine (12%)</option>
                <option value="spirits" data-i18n="calculator.spirits">Spirits (40%)</option>
                <option value="custom" data-i18n="calculator.custom">Custom</option>
            </select>
        </div>
        
        <div class="form-group custom-alcohol-content" style="display: none;">
            <label for="custom-percent-${drinkCount}" data-i18n="calculator.alcoholPercent">Alcohol %:</label>
            <input type="number" id="custom-percent-${drinkCount}" min="0" max="100" step="0.1">
        </div>
        
        <div class="form-group">
            <label for="drink-size-${drinkCount}" data-i18n="calculator.size">Size (ml):</label>
            <input type="number" id="drink-size-${drinkCount}" class="drink-size" min="0" required>
        </div>
        
        <div class="form-group">
            <label for="drink-time-${drinkCount}" data-i18n="calculator.time">Time consumed:</label>
            <input type="time" id="drink-time-${drinkCount}" class="drink-time" required>
        </div>
        
        <button type="button" class="remove-drink btn-secondary" data-i18n="calculator.removeDrink">Remove</button>
    `;
    
    // Add to container
    drinksContainer.appendChild(drinkItem);
    
    // Set up listeners for the new drink
    setupDrinkTypeListener(`drink-type-${drinkCount}`, `custom-percent-${drinkCount}`, `drink-size-${drinkCount}`);
    
    // Add remove button functionality
    drinkItem.querySelector('.remove-drink').addEventListener('click', function() {
        drinksContainer.removeChild(drinkItem);
    });
    
    // Set default time to current time
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById(`drink-time-${drinkCount}`).value = `${hours}:${minutes}`;
    
    // Apply translations to new element
    if (typeof i18next !== 'undefined' && i18next.isInitialized) {
        drinkItem.querySelectorAll('[data-i18n]').forEach(element => {
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
    }
}

/**
 * Calculates the Blood Alcohol Content based on form inputs
 */
function calculateBAC() {
    // Get form values
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value); // in kg
    const height = parseFloat(document.getElementById('height').value) || 170; // in cm
    const metabolism = document.getElementById('metabolism').value;
    const currentTime = document.getElementById('current-time').value;
    
    // Validate inputs
    if (!gender || !age || !weight || !currentTime) {
        alert(i18next.t('Please fill out all required fields') || 'Please fill out all required fields');
        return;
    }
    
    // Calculate the amount of alcohol consumed
    const drinks = collectDrinkData();
    
    if (drinks.length === 0) {
        alert(i18next.t('Please add at least one drink') || 'Please add at least one drink');
        return;
    }
    
    // Sort drinks by time
    drinks.sort((a, b) => a.timeInMinutes - b.timeInMinutes);
    
    // Calculate total alcohol consumed in grams
    let totalAlcoholGrams = 0;
    drinks.forEach(drink => {
        // Calculate alcohol volume in ml
        const alcoholVolume = drink.size * (drink.alcoholPercent / 100);
        // Convert to grams using density
        const alcoholGrams = alcoholVolume * ALCOHOL_DENSITY;
        totalAlcoholGrams += alcoholGrams;
    });
    
    // Calculate body water constant based on gender
    const waterConstant = gender === 'male' ? MALE_WATER_CONSTANT : FEMALE_WATER_CONSTANT;
    
    // Calculate BAC at the final drink time
    let finalBAC = totalAlcoholGrams / (weight * waterConstant * 10); // in permille
    
    // Calculate elapsed time since last drink in hours
    const currentTimeMinutes = convertTimeToMinutes(currentTime);
    const lastDrinkTimeMinutes = drinks[drinks.length - 1].timeInMinutes;
    const hoursSinceLastDrink = (currentTimeMinutes - lastDrinkTimeMinutes) / 60;
    
    // Adjust for metabolism (alcohol elimination)
    const metabolismRate = ALCOHOL_METABOLISM_RATE * METABOLISM_FACTORS[metabolism];
    
    // Calculate current BAC
    let currentBAC = Math.max(0, finalBAC - (hoursSinceLastDrink * metabolismRate));
    
    // Round to 2 decimal places
    currentBAC = Math.round(currentBAC * 100) / 100;
    
    // Calculate time until sober
    const hoursToSober = currentBAC / metabolismRate;
    const hoursToSoberWhole = Math.floor(hoursToSober);
    const minutesToSober = Math.round((hoursToSober - hoursToSoberWhole) * 60);
    
    // Calculate safe to drive time (when BAC will be below legal limit)
    let hoursToLegalLimit = 0;
    // Get legal limit based on language/country
    const currentLang = getCurrentLanguage();
    const legalLimit = window.legalLimit || 0.5; // Default to 0.5‰ if not set
    
    if (currentBAC > legalLimit) {
        hoursToLegalLimit = (currentBAC - legalLimit) / metabolismRate;
    }
    
    // Calculate the safe time
    const safeTimeDate = new Date();
    safeTimeDate.setHours(safeTimeDate.getHours() + Math.floor(hoursToLegalLimit));
    safeTimeDate.setMinutes(safeTimeDate.getMinutes() + Math.round((hoursToLegalLimit - Math.floor(hoursToLegalLimit)) * 60));
    
    const safeTimeHours = String(safeTimeDate.getHours()).padStart(2, '0');
    const safeTimeMinutes = String(safeTimeDate.getMinutes()).padStart(2, '0');
    const safeTime = `${safeTimeHours}:${safeTimeMinutes}`;
    
    // Display results
    displayResults(currentBAC, hoursToSoberWhole, minutesToSober, safeTime);
    
    // Generate and display chart
    generateBACChart(drinks, currentTimeMinutes, currentBAC, metabolismRate, legalLimit);
}

/**
 * Collects all drink data from the form
 * @returns {Array} Array of drink objects with size, alcoholPercent, and timeInMinutes
 */
function collectDrinkData() {
    const drinks = [];
    const drinkItems = document.querySelectorAll('.drink-item');
    
    drinkItems.forEach((item, index) => {
        const drinkNumber = index + 1;
        const typeSelect = document.getElementById(`drink-type-${drinkNumber}`);
        
        if (!typeSelect) return; // Skip if element doesn't exist
        
        const type = typeSelect.value;
        const size = parseFloat(document.getElementById(`drink-size-${drinkNumber}`).value);
        const timeStr = document.getElementById(`drink-time-${drinkNumber}`).value;
        
        let alcoholPercent;
        if (type === 'custom') {
            alcoholPercent = parseFloat(document.getElementById(`custom-percent-${drinkNumber}`).value);
        } else {
            alcoholPercent = ALCOHOL_PERCENTAGES[type];
        }
        
        if (type && size && timeStr && alcoholPercent) {
            drinks.push({
                type: type,
                size: size, // in ml
                alcoholPercent: alcoholPercent, // percentage (e.g., 5 for 5%)
                timeStr: timeStr,
                timeInMinutes: convertTimeToMinutes(timeStr)
            });
        }
    });
    
    return drinks;
}

/**
 * Converts time string (HH:MM) to minutes since midnight
 */
function convertTimeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * 60) + minutes;
}

/**
 * Displays the BAC calculation results
 */
function displayResults(bac, hoursToSober, minutesToSober, safeTime) {
    // Show results container
    const resultsContainer = document.getElementById('results');
    resultsContainer.style.display = 'block';
    
    // Set BAC value
    document.getElementById('bac-result').textContent = bac.toFixed(2);
    document.getElementById('bac-text').textContent = bac.toFixed(2);
    
    // Set time to sober
    document.getElementById('hours-to-sober').textContent = hoursToSober;
    document.getElementById('minutes-to-sober').textContent = minutesToSober;
    
    // Set safe driving time
    document.getElementById('safe-time').textContent = safeTime;
    
    // Set BAC status with translations
    const bacStatus = document.getElementById('bac-status');
    let statusText = '';
    let statusClass = '';
    
    // Find the appropriate level
    for (const level of BAC_LEVELS) {
        if (bac <= level.max) {
            // Use i18next for translation if available
            statusText = i18next ? i18next.t(`status.${level.status}`) : level.status;
            statusClass = level.class;
            break;
        }
    }
    
    bacStatus.textContent = statusText;
    bacStatus.className = 'bac-status ' + statusClass;
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Generates a chart showing BAC over time
 */
function generateBACChart(drinks, currentTimeMinutes, currentBAC, metabolismRate, legalLimit) {
    // Calculate start time (first drink time)
    const firstDrinkTime = drinks[0].timeInMinutes;
    
    // Calculate end time (when BAC will be 0)
    const hoursToSober = currentBAC / metabolismRate;
    const endTimeMinutes = currentTimeMinutes + (hoursToSober * 60);
    
    // Generate data points
    const dataPoints = [];
    const chartLabels = [];
    
    // Start with the first drink time
    let currentTime = firstDrinkTime;
    
    // Time step for the chart (15 minutes)
    const timeStep = 15;
    
    // Generate points until sober
    while (currentTime <= endTimeMinutes) {
        // Calculate BAC at this time
        let bacAtTime = 0;
        
        // Add alcohol from each drink consumed before this time
        drinks.forEach(drink => {
            if (drink.timeInMinutes <= currentTime) {
                // Calculate time since this drink in hours
                const hoursSinceDrink = (currentTime - drink.timeInMinutes) / 60;
                
                // Calculate alcohol volume and grams for this drink
                const alcoholVolume = drink.size * (drink.alcoholPercent / 100);
                const alcoholGrams = alcoholVolume * ALCOHOL_DENSITY;
                
                // Get weight and water constant from the form
                const weight = parseFloat(document.getElementById('weight').value);
                const gender = document.getElementById('gender').value;
                const waterConstant = gender === 'male' ? MALE_WATER_CONSTANT : FEMALE_WATER_CONSTANT;
                
                // Calculate drink's contribution to BAC
                const drinkBAC = alcoholGrams / (weight * waterConstant * 10);
                
                // Subtract metabolism
                const metabolized = Math.min(drinkBAC, hoursSinceDrink * metabolismRate);
                
                // Add remaining BAC to total
                bacAtTime += Math.max(0, drinkBAC - metabolized);
            }
        });
        
        // Format time label
        const hours = Math.floor(currentTime / 60);
        const minutes = currentTime % 60;
        const timeLabel = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        
        // Add data point
        dataPoints.push(bacAtTime);
        chartLabels.push(timeLabel);
        
        // Move to next time step
        currentTime += timeStep;
    }
    
    // Check if Chart.js is available
    if (typeof Chart !== 'undefined') {
        // Create chart context
        const ctx = document.getElementById('bac-chart').getContext('2d');
        
        // If chart already exists, destroy it
        if (window.bacChart) {
            window.bacChart.destroy();
        }
        
        // Create new chart
        window.bacChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: i18next ? i18next.t('Blood Alcohol Content (‰)') : 'Blood Alcohol Content (‰)',
                    data: dataPoints,
                    borderColor: '#4a6eb5',
                    backgroundColor: 'rgba(74, 110, 181, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHitRadius: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: i18next ? i18next.t('Time') : 'Time'
                        },
                        ticks: {
                            maxTicksLimit: 8
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: i18next ? i18next.t('BAC (‰)') : 'BAC (‰)'
                        },
                        min: 0,
                        suggestedMax: Math.max(...dataPoints) * 1.1
                    }
                },
                plugins: {
                    annotation: {
                        annotations: {
                            legalLimit: {
                                type: 'line',
                                yMin: legalLimit,
                                yMax: legalLimit,
                                borderColor: '#dc3545',
                                borderWidth: 2,
                                borderDash: [5, 5],
                                label: {
                                    content: i18next ? i18next.t('Legal Limit') : 'Legal Limit',
                                    enabled: true,
                                    position: 'right'
                                }
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `BAC: ${context.parsed.y.toFixed(2)}‰`;
                            }
                        }
                    }
                }
            }
        });
    } else {
        // If Chart.js is not available, display a simple text result
        const chartContainer = document.getElementById('bac-chart').parentElement;
        chartContainer.innerHTML = `<p>${i18next ? i18next.t('Chart visualization not available. Your current BAC is') : 'Chart visualization not available. Your current BAC is'} ${currentBAC.toFixed(2)}‰.</p>`;
    }
}

// Initialize the calculator
initBacCalculator();