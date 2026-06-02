// HIGH-PERFORMANCE INTERSECTION OBSERVER ANIMATION ENGINE
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Logic for Scroll Reveal (Fade Up)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-fade-up');
    
    const revealOptions = {
        threshold: 0.15, // Elemen terpicu jika 15% bagian sudah masuk viewport
        rootMargin: "0px 0px -50px 0px" // Triger sedikit lebih awal sebelum menyentuh batas bawah
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Berhenti mengamati setelah animasi berjalan (Hemat Memory)
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));


    // ==========================================
    // 2. Logic for Animated Stats Counter
    // ==========================================
    const counterElements = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counterEl) => {
        const target = parseInt(counterEl.getAttribute('data-target'), 10);
        const duration = 2000; // Durasi animasi dalam milidetik (2 detik)
        const frameRate = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;

        const countUp = () => {
            currentFrame++;
            // Rumus easeOutCubic untuk akselerasi melambat di akhir (Premium Feel)
            const progress = currentFrame / totalFrames;
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeProgress * target);

            counterEl.innerText = currentValue;

            if (currentFrame < totalFrames) {
                requestAnimationFrame(countUp);
            } else {
                counterEl.innerText = target; // Pastikan angka akhir tepat di target
            }
        };

        requestAnimationFrame(countUp);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Picu saat 50% card statistik terlihat

    counterElements.forEach(el => counterObserver.observe(el));


    // ==========================================
    // 3. Logic for Blog Filtering (Berdiri Sendiri / Global)
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (filterButtons.length > 0 && blogCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 1. Ubah status aktif tombol filter
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const selectedCategory = button.getAttribute('data-category');

                // 2. Filter kartu artikel dengan animasi langsung
                blogCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-article-category');

                    if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                    }
                });
            });
        });
    }
});