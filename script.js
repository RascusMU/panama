// Logika pro navigaci a animace odkrývání
window.onscroll = function() {
    const nav = document.getElementById('navbar');
    const heroBg = document.getElementById('hero-bg');
    const y = window.pageYOffset;

    if (y > 50) nav.classList.add('nav--scrolled');
    else nav.classList.remove('nav--scrolled');

    heroBg.style.transform = `scale(1.1) translateY(${y * 0.3}px)`;

    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) el.classList.add('reveal--active');
    });
};

// Funkce pro modální okna
function openModal(id) {
    const m = document.getElementById(id);
    m.style.display = 'flex';
    setTimeout(() => m.classList.add('modal--active'), 10);
    document.body.style.overflow = 'hidden';
}
function closeModal(id) {
    const m = document.getElementById(id);
    m.classList.remove('modal--active');
    setTimeout(() => m.style.display = 'none', 400);
    document.body.style.overflow = 'auto';
}

// Zavření okna kliknutím mimo obsah
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
}

// === Lightbox / Galerie ===
const galleryImages = [
    "images/1EF539AF-FB3B-4E4E-915C-359FC7AD0821_4_5005_c.webp",
    "images/30183067-FDDE-4763-A0D6-D325CAA47C8D_4_5005_c.webp",
    "images/4366304F-9E7E-4E1C-90E5-A07F23792F9D_4_5005_c.webp",
    "images/6829F48B-847A-4990-AEE6-098F5C00F2C2_4_5005_c.webp",
    "images/942D829D-8752-494B-BD09-A52E2FA2A113_4_5005_c.webp",
    "images/9B7D2B41-C00F-4DD9-8528-82CF09ACFE7B_4_5005_c.webp",
    "images/DDB93ECB-4E5C-43FD-AB98-A7767C984095_4_5005_c.webp",
    "images/F53E8E52-56EE-4001-9DAE-EF78B14EF43C_4_5005_c.webp",
    "images/AF7641AC-B047-41AE-B5F6-F64795ECF069_1_105_c.webp"
];

let currentImageIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox__close');
const prevBtn = document.querySelector('.lightbox__nav--prev');
const nextBtn = document.querySelector('.lightbox__nav--next');

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Accessibility: Trap focus
    lightbox.focus();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateLightboxImage() {
    // Přidání fade efektu při změně
    lightboxImg.style.opacity = '0.5';
    setTimeout(() => {
        lightboxImg.src = galleryImages[currentImageIndex];
        lightboxImg.style.opacity = '1';
    }, 150);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

// Event Listeners pro Lightbox
if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

// Kliknutí mimo obrázek zavře lightbox
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Klávesnice
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});
