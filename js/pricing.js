// PRICING INTERACTION CONTROL
document.addEventListener('DOMContentLoaded', () => {
    const billingToggle = document.getElementById('billingToggle');
    const labelFixed = document.getElementById('labelFixed');
    const labelMonthly = document.getElementById('labelMonthly');

    if (billingToggle) {
        billingToggle.addEventListener('click', () => {
            billingToggle.classList.toggle('active-state');
            
            const isMonthlyActive = billingToggle.classList.contains('active-state');
            
            if (isMonthlyActive) {
                labelFixed.classList.remove('active');
                labelMonthly.classList.add('active');
                
                // Integrasi fungsi leaks notifikasi bawaan global script
                if (typeof window.showToast === 'function') {
                    window.showToast("Rencana Bulanan mencakup Maintenance & Cloud VIP.");
                }
            } else {
                labelFixed.classList.add('active');
                labelMonthly.classList.remove('active');
            }
        });
    }
});

document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const item = trigger.parentElement;
        
        // Gabungin ini kalau mau gaya lumer (tutup item lain pas ada 1 item dibuka)
        document.querySelectorAll('.faq-accordion-item').forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });
        
        item.classList.toggle('active');
    });
});