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
    "images/20F37BD7-E91F-42C6-86EC-2CF1AC8B25C9_1_105_c.webp",
    "images/21277724-043D-48B6-B71A-DF0FC7E6A371_1_105_c.webp",
    "images/30183067-FDDE-4763-A0D6-D325CAA47C8D_4_5005_c.webp",
    "images/37E70D0A-CBB4-4897-8EC5-959E9C4C08C8_1_105_c.webp",
    "images/4366304F-9E7E-4E1C-90E5-A07F23792F9D_4_5005_c.webp",
    "images/55375FCB-1E70-4906-80AB-6C7E15D38D2C_1_105_c.webp",
    "images/6308EFF5-4BF5-4F2F-AA7F-252AADE1F4C2_1_105_c.webp",
    "images/64A769EC-E9EC-4270-9E3A-338555C339F6_1_105_c.webp",
    "images/6829F48B-847A-4990-AEE6-098F5C00F2C2_4_5005_c.webp",
    "images/90182751-E96D-4E51-B576-4AEB20DAB9D2_1_105_c.webp",
    "images/938265AB-E66A-46B9-A88B-321B70690D4E_1_105_c.webp",
    "images/942D829D-8752-494B-BD09-A52E2FA2A113_4_5005_c.webp",
    "images/9B7D2B41-C00F-4DD9-8528-82CF09ACFE7B_4_5005_c.webp",
    "images/AF7641AC-B047-41AE-B5F6-F64795ECF069_1_105_c.webp",
    "images/BDAE9F59-4565-458B-8BF6-1758201C72C5_1_105_c.webp",
    "images/BEC7CA06-B080-4732-8461-A213BCCCA1BB_1_105_c.webp",
    "images/C808459F-729F-4FE9-8AE0-4D08761BAE5F_1_105_c.webp",
    "images/CE617BAB-9A76-494B-9340-DDB90C0BEB83_1_105_c.webp",
    "images/DDB93ECB-4E5C-43FD-AB98-A7767C984095_4_5005_c.webp",
    "images/F53E8E52-56EE-4001-9DAE-EF78B14EF43C_4_5005_c.webp"
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

// === Dark Mode Logic ===
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// 1. Check local storage or system preference
const storedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
    html.setAttribute('data-theme', 'dark');
}

// 2. Toggle function
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});
