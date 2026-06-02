// MAIN UTILITIRES & PREMIUM USER EXPERIENCE INTERACTION ORCHESTRATOR
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Control for Premium Loading Screen
    const loaderScreen = document.getElementById('loaderScreen');
    
    // Gunakan event 'load' global window agar loader menutup tepat saat gambar/asset selesai dirender
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loaderScreen) {
                loaderScreen.style.opacity = '0';
                loaderScreen.style.visibility = 'hidden';
                
                // Triger trigger awal untuk section Hero agar langsung teranimasi tanpa menunggu scroll
                const heroReveal = document.querySelector('#hero .reveal-fade-up');
                if (heroReveal) heroReveal.classList.add('active');
            }
        }, 400); // Penundaan visual singkat 400ms untuk transisi yang elegan
    });

    // 2. Cursor Glow Effect Layout (Desktop Tracker)
    const cursorGlow = document.getElementById('cursorGlow');
    
    if (cursorGlow && window.innerWidth >= 1024) {
        window.addEventListener('mousemove', (e) => {
            // Menggunakan requestAnimationFrame internal browser untuk tracking posisi kursor super smooth
            requestAnimationFrame(() => {
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
            });
        });
    }

    // 3. Back to Top Button Control Logic
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Toast Notification Trigger Ready (For Future conversion leaks)
    window.showToast = (message) => {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '32px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = 'rgba(11, 11, 15, 0.9)';
        toast.style.border = '1px solid var(--primary)';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.color = '#fff';
        toast.style.fontSize = '0.9rem';
        toast.style.zIndex = '9999';
        toast.style.backdropFilter = 'blur(8px)';
        toast.style.boxShadow = 'var(--shadow-md)';
        toast.innerText = message;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };
});

// Registrasi Service Worker PWA Faadhil Digital
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Faadhil Digital SW registered successfully with scope: ', registration.scope);
            })
            .catch((error) => {
                console.log('Faadhil Digital SW registration failed: ', error);
            });
    });
}