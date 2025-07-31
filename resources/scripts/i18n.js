/**
 * JO&SOFT i18n (Internationalization) System
 * 
 * Features:
 * - Multi-language control via header buttons
 * - Automatic language detection based on location
 * - Persistent language settings across pages
 * - Page-specific JSON loading
 * - History timeline rendering with year/month filtering
 * 
 * @author JO&SOFT Development Team
 * @version 1.0.0
 */

class I18nSystem {
    constructor() {
        this.currentLang = 'ko'; // Default language
        this.supportedLanguages = ['ko', 'en', 'ja', 'vi'];
        this.languageNames = {
            'ko': 'KOR',
            'en': 'ENG', 
            'ja': 'JPN',
            'vi': 'VIE'
        };
        this.pageData = {};
        this.historyData = null;
        
        this.init();
    }

    /**
     * Initialize the i18n system
     */
    async init() {
        this.loadLanguageSettings();
        this.setupLanguageButtons();
        await this.loadPageData();
        await this.renderPage();
        
        // Load history data if on about page (has history-timeline)
        // if (document.querySelector('.history-timeline')) {
        //     this.loadHistoryData();
        // }
    }

    /**
     * Load language settings from localStorage or detect from location
     */
    loadLanguageSettings() {
        const savedLang = localStorage.getItem('jo-soft-lang');
        
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            this.currentLang = savedLang;
        } else {
            // Auto-detect language based on location
            this.currentLang = this.detectLanguageFromLocation();
        }
        
        // Update document language attribute
        document.documentElement.lang = this.currentLang;
    }

    /**
     * Detect language based on user's location
     * Falls back to English if detection fails
     */
    detectLanguageFromLocation() {
        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const country = timezone.split('/')[1];
            
            // Map countries to languages
            const countryLanguageMap = {
                'Seoul': 'ko',
                'Tokyo': 'ja',
                'Ho_Chi_Minh': 'vi',
                'Hanoi': 'vi'
            };
            
            return countryLanguageMap[country] || 'en';
        } catch (error) {
            console.warn('Language detection failed, using English as fallback');
            return 'en';
        }
    }

    /**
     * Setup language control buttons in header
     */
    setupLanguageButtons() {
        const languageButtons = document.querySelectorAll('.i18n button[data-lang]');
        
        languageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                this.changeLanguage(lang);
            });
            
            // Update active state
            const isActive = button.getAttribute('data-lang') === this.currentLang;
            button.classList.toggle('active', isActive);
            
            // Update parent li active class
            const parentLi = button.closest('li');
            if (parentLi) {
                parentLi.classList.toggle('active', isActive);
            }
        });
    }

    /**
     * Change language and update all content
     */
    async changeLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.error(`Unsupported language: ${lang}`);
            return;
        }

        this.currentLang = lang;
        document.documentElement.lang = lang;
        
        // Save to localStorage
        localStorage.setItem('jo-soft-lang', lang);
        
        // Update button states and parent li active class
        document.querySelectorAll('.i18n button[data-lang]').forEach(btn => {
            const isActive = btn.getAttribute('data-lang') === lang;
            btn.classList.toggle('active', isActive);
            
            // Update parent li active class
            const parentLi = btn.closest('li');
            if (parentLi) {
                parentLi.classList.toggle('active', isActive);
            }
        });
        
        // Reload page data and re-render
        await this.loadPageData();
        await this.renderPage();
    }

    /**
     * Load page-specific JSON data
     */
    async loadPageData() {
        try {
            // window.pageData가 이미 로드되어 있으면 사용
            if (window.pageData && Object.keys(window.pageData).length > 0) {
                this.pageData = window.pageData;
            } else {
                const currentPage = this.getCurrentPage();
                const jsonPath = `./resources/i18n/${currentPage}.json`;
                
                const response = await fetch(jsonPath);
                if (!response.ok) {
                    throw new Error(`Failed to load ${jsonPath}`);
                }
                
                this.pageData = await response.json();
            }
        } catch (error) {
            console.error('Error loading page data:', error);
            this.pageData = {};
        }
    }

    /**
     * Load history data for timeline rendering
     */
    // async loadHistoryData() {
    //     try {
    //         const response = await fetch('./resources/i18n/history.json');
    //         if (!response.ok) {
    //             throw new Error('Failed to load history.json');
    //         }
            
    //         this.historyData = await response.json();
    //         this.renderHistoryTimeline();
    //     } catch (error) {
    //         console.error('Error loading history data:', error);
    //     }
    // }

    /**
     * Get current page name from URL
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (!filename || filename === 'index.html' || filename === '') {
            return 'index';
        }
        
        return filename.replace('.html', '');
    }

    /**
     * Render page content with current language
     */
    async renderPage() {
        if (!this.pageData) return;
        
        // Render all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const value = this.getNestedValue(this.pageData, key);
            
            if (value) {
                if (element.tagName === 'IMG') {
                    element.src = value.src || value;
                    if (value.alt) {
                        element.alt = value.alt;
                    }
                } else {
                    // Get the value for current language
                    const langValue = typeof value === 'object' ? value[this.currentLang] : value;
                    if (langValue) {
                        // Check if value is an array and element is ul/ol
                        if (Array.isArray(langValue) && (element.tagName === 'UL' || element.tagName === 'OL')) {
                            // Render array as li elements
                            element.innerHTML = langValue.map(item => `<li>${item}</li>`).join('');
                        } else if (Array.isArray(langValue) && element.tagName === 'DD') {
                            // For dd elements with array content, replace the dd with multiple dd elements
                            const parent = element.parentElement;
                            if (parent && parent.tagName === 'DL') {
                                // Remove the original dd
                                element.remove();
                                // Add new dd elements for each array item
                                langValue.forEach(item => {
                                    const newDd = document.createElement('dd');
                                    newDd.textContent = item;
                                    parent.appendChild(newDd);
                                });
                            }
                        } else if (typeof langValue === 'string' && element.tagName === 'DD') {
                            // For dd elements with string content (array index)
                            element.textContent = langValue;
                        } else {
                            element.innerHTML = langValue;
                        }
                    }
                }
            }
        });
        
        // Render i18n src elements
        document.querySelectorAll('[data-i18n-src]').forEach(element => {
            const key = element.getAttribute('data-i18n-src');
            const value = this.getNestedValue(this.pageData, key);
            
            if (value && element.tagName === 'IMG') {
                const langValue = typeof value === 'object' ? value[this.currentLang] : value;
                if (langValue) {
                    element.src = langValue.src || langValue;
                    if (langValue.alt) {
                        element.alt = langValue.alt;
                    }
                }
            }
        });
        
        // Render i18n alt elements
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            const value = this.getNestedValue(this.pageData, key);
            
            if (value && element.tagName === 'IMG') {
                const langValue = typeof value === 'object' ? value[this.currentLang] : value;
                if (langValue) {
                    element.alt = langValue;
                }
            }
        });
        
        // Render common elements
        await this.renderCommonElements();
    }

    /**
     * Render common elements from common.json
     */
    async renderCommonElements() {
        try {
            // window.commonData가 이미 로드되어 있으면 사용
            let commonData;
            if (window.commonData && Object.keys(window.commonData).length > 0) {
                commonData = window.commonData;
            } else {
                const response = await fetch('./resources/i18n/common.json');
                if (!response.ok) return;
                commonData = await response.json();
            }
            
            // Render common elements
                        document.querySelectorAll('[data-common]').forEach(element => {
                const key = element.getAttribute('data-common');
                const value = this.getNestedValue(commonData, key);
                

                
                if (value) {
                    if (element.tagName === 'IMG') {
                        element.src = value.src || value;
                        if (value.alt) {
                            element.alt = value.alt;
                        }
                    } else {
                        // Get the value for current language
                        const langValue = typeof value === 'object' ? value[this.currentLang] : value;
                        if (langValue) {
                                                    // Check if value is an array and element is ul/ol/dl
                        if (Array.isArray(langValue) && (element.tagName === 'UL' || element.tagName === 'OL' || element.tagName === 'DL')) {
                            // Render array as li/dd elements
                            if (element.tagName === 'DL') {
                                // For dl elements, render array as dd elements
                                const existingDt = element.querySelector('dt');
                                element.innerHTML = '';
                                if (existingDt) {
                                    element.appendChild(existingDt);
                                }
                                langValue.forEach(item => {
                                    const dd = document.createElement('dd');
                                    dd.textContent = item;
                                    element.appendChild(dd);
                                });
                            } else {
                                // For ul/ol elements, render array as li elements
                                element.innerHTML = langValue.map(item => `<li>${item}</li>`).join('');
                            }
                        } else if (typeof langValue === 'string' && element.tagName === 'DD') {
                            // For dd elements with string content (array index)
                            element.textContent = langValue;
                        } else {
                            element.innerHTML = langValue;
                        }
                        }
                    }
                }
            });
            
            // Render common src elements
            document.querySelectorAll('[data-common-src]').forEach(element => {
                const key = element.getAttribute('data-common-src');
                const value = this.getNestedValue(commonData, key);
                
                if (value && element.tagName === 'IMG') {
                    const langValue = typeof value === 'object' ? value[this.currentLang] : value;
                    if (langValue) {
                        element.src = langValue.src || langValue;
                        if (langValue.alt) {
                            element.alt = langValue.alt;
                        }
                    }
                }
            });
            
            // Render common alt elements
            document.querySelectorAll('[data-common-alt]').forEach(element => {
                const key = element.getAttribute('data-common-alt');
                const value = this.getNestedValue(commonData, key);
                
                if (value && element.tagName === 'IMG') {
                    const langValue = typeof value === 'object' ? value[this.currentLang] : value;
                    if (langValue) {
                        element.alt = langValue;
                    }
                }
            });
        } catch (error) {
            console.error('Error loading common data:', error);
        }
    }

    /**
     * Render history timeline with year/month filtering
     */
    renderHistoryTimeline() {
        if (!this.historyData || !this.historyData.history) return;
        
        const timelineContainer = document.querySelector('.history-timeline');
        if (!timelineContainer) return;
        
        const history = this.historyData.history;
        const years = Object.keys(history).sort((a, b) => b - a); // Descending order
        
        let html = '<ol>';
        
        // Generate year list
        years.forEach(year => {
            html += `<li>${year}</li>`;
        });
        
        html += '</ol><ul>';
        
        // Generate timeline content
        years.forEach(year => {
            const yearData = history[year];
            const months = Object.keys(yearData).sort((a, b) => b - a); // Descending order
            
            html += '<li><ul>';
            
            months.forEach(month => {
                const monthData = yearData[month];
                
                if (typeof monthData === 'object' && monthData.day) {
                    // Handle nested day structure
                    const days = Object.keys(monthData).sort((a, b) => b - a);
                    
                    days.forEach(day => {
                        const dayData = monthData[day];
                        const monthLabel = `${year}.${month.padStart(2, '0')}`;
                        
                        html += `<li class="month">
                            <span class="month-label">${monthLabel}</span>
                            <ul>
                                <li class="item">${dayData[this.currentLang]}</li>
                            </ul>
                        </li>`;
                    });
                } else {
                    // Handle simple month structure
                    const monthLabel = `${year}.${month.padStart(2, '0')}`;
                    
                    html += `<li class="month">
                        <span class="month-label">${monthLabel}</span>
                        <ul>
                            <li class="item">${monthData[this.currentLang]}</li>
                        </ul>
                    </li>`;
                }
            });
            
            html += '</ul></li>';
        });
        
        html += '</ul>';
        timelineContainer.innerHTML = html;
    }

    /**
     * Get nested value from object using dot notation
     */
    getNestedValue(obj, path) {
        const keys = path.split('.');
        let current = obj;
        
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            
            if (!current || typeof current !== 'object') {
                return null;
            }
            
            // Check if key is a number (array index)
            const numKey = parseInt(key);
            if (!isNaN(numKey) && Array.isArray(current)) {
                current = current[numKey];
            } else {
                current = current[key];
            }
            
            if (current === undefined || current === null) {
                return null;
            }
        }
        
        return current;
    }

    /**
     * Get current language
     */
    getCurrentLang() {
        return this.currentLang;
    }

    /**
     * Get supported languages
     */
    getSupportedLanguages() {
        return this.supportedLanguages;
    }

    /**
     * Get language display name
     */
    getLanguageName(lang) {
        return this.languageNames[lang] || lang.toUpperCase();
    }
}

// Initialize i18n system when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    window.i18n = new I18nSystem();
    await window.i18n.init();
});

// Export for global access
window.getCurrentLang = () => window.i18n ? window.i18n.getCurrentLang() : 'ko';
