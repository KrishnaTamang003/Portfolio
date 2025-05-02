// --- Scroll Behavior (Place this OUTSIDE DOMContentLoaded) ---
// Prevent browser from restoring scroll position on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Scroll to top on full load (with small delay to avoid layout shift)
window.addEventListener('load', () => {
    setTimeout(() => window.scrollTo(0, 0), 10);
});

document.addEventListener('DOMContentLoaded', () => {

    // --- AOS Initialization ---
    AOS.init({ duration: 800, easing: 'ease-in-out' });

    // --- Smooth Scroll for Anchor Links (including scroll-down icon) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Modern and cleaner scroll using scroll-margin-top (set in CSS)
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // Optional: update the URL hash without jump
                // history.pushState(null, null, targetId);
            } else {
                console.warn(`Smooth scroll target not found for href: ${targetId}`);
            }
        });
    });

    // --- Highlight Navigation on Scroll using IntersectionObserver ---
    const navLinks = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        rootMargin: "-30% 0px -50% 0px", // Adjust margins for smoother triggering
        threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
        let activeEntry = null;

        entries.forEach(entry => {
            if (entry.isIntersecting && entry.boundingClientRect.top <= window.innerHeight * 0.5) {
                activeEntry = entry;
            }
        });

        // Deactivate all links first
        navLinks.forEach(link => link.classList.remove('active'));

        if (activeEntry) {
            const activeLink = document.querySelector(`header nav ul li a[href="#${activeEntry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        } else {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop < 100) {
                const homeLink = document.querySelector('header nav ul li a[href="#hero"]');
                if (homeLink) homeLink.classList.add('active');
            }
        }
    }, observerOptions);

    sections.forEach(section => {
        if (section.id) observer.observe(section);
    });

    // --- Dynamic Copyright ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End of DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // --- Make Scroll Down Arrow Visible after 1.5 seconds ---
    setTimeout(() => {
        const scrollArrow = document.querySelector('.scroll-down-arrow');
        if (scrollArrow) {
            scrollArrow.style.opacity = '1'; // Make it visible
        }
    }, 1500); // 1500ms = 1.5 seconds
});
