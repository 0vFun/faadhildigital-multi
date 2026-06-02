// NAVBAR & MOBILE MENU INTERACTIONS
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navbarMenu = document.getElementById('navbarMenu');
    const menuLinks = document.querySelectorAll('.menu-link');

    // 1. Sticky Effect on Scroll
    const handleScroll = () => {
        if (window.scrollY > 20) {
            if (!AppState.isScrolled) {
                navbar.classList.add('scrolled');
                AppState.isScrolled = true;
            }
        } else {
            if (AppState.isScrolled) {
                navbar.classList.remove('scrolled');
                AppState.isScrolled = false;
            }
        }
    };

    // 2. Toggle Mobile Menu Drawer
    const toggleMobileMenu = () => {
        AppState.isMenuOpen = !AppState.isMenuOpen;
        hamburgerBtn.classList.toggle('open', AppState.isMenuOpen);
        navbarMenu.classList.toggle('open', AppState.isMenuOpen);
        
        // Mencegah background di-scroll saat menu mobile terbuka (UX Premium)
        document.body.style.overflow = AppState.isMenuOpen ? 'hidden' : '';
    };

    // 3. Close Mobile Menu when Link Clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (AppState.isMenuOpen) toggleMobileMenu();
        });
    });

    // Event Listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    
    // Jalankan pengecekan posisi scroll di awal load halaman
    handleScroll();
});