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
