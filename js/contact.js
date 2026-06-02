// contact.js - Integrasi Formspree untuk Faadhil Digital
document.addEventListener('DOMContentLoaded', () => {
    // Mengambil element form berdasarkan ID di contact.html Anda
    const contactForm = document.getElementById('projectForm') || document.querySelector('.contact-form-wrapper form');
    const submitBtn = document.getElementById('btnSubmitForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Mencegah reload halaman bawaan HTML

            // Endpoint Formspree unik milik Anda
            const formspreeEndpoint = "https://formspree.io/f/mjgzqlkq";

            // Mengambil semua data input (nama, email, tipe layanan, pesan) secara otomatis
            const formData = new FormData(contactForm);
            
            // Mengubah status tombol menjadi loading biar UX terasa premium
            const originalBtnText = submitBtn ? submitBtn.innerHTML : "Kirim Penawaran Ide";
            if (submitBtn) {
                submitBtn.disabled = true;
                // Menyesuaikan bahasa aktif saat ini untuk teks loading
                const currentLang = document.getElementById('langToggle')?.innerText;
                submitBtn.innerText = currentLang === 'ID' ? "Sending..." : "Mengirim...";
            }

            try {
                // Mengirim data ke Formspree via AJAX Fetch API
                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Memicu Toast Notifikasi bawaan premium dari script.js Anda
                    if (typeof window.showToast === 'function') {
                        const currentLang = document.getElementById('langToggle')?.innerText;
                        if (currentLang === 'ID') {
                            window.showToast("Message sent successfully! We will contact you soon.");
                        } else {
                            window.showToast("Pesan berhasil terkirim! Kami akan segera menghubungi Anda.");
                        }
                    } else {
                        alert("Pesan Anda berhasil terkirim!");
                    }
                    
                    contactForm.reset(); // Mengosongkan form kembali setelah sukses
                } else {
                    throw new Error("Formspree server error");
                }
            } catch (error) {
                // Notifikasi jika terjadi gangguan koneksi atau teknis
                if (typeof window.showToast === 'function') {
                    window.showToast("Gagal mengirim pesan, silakan coba beberapa saat lagi.");
                } else {
                    alert("Terjadi kesalahan. Silakan coba lagi.");
                }
            } finally {
                // Mengembalikan tombol ke keadaan semula
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }
        });
    }
});