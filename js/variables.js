// GLOBAL APPLICATION STATE SYSTEM
const AppState = {
    isMenuOpen: false,
    isScrolled: false,
    currentLanguage: localStorage.getItem('faadhil_digital_lang') || 'id'
};