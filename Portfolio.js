// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000, // Duration of animation
    easing: 'ease-in-out', // Easing type
    // once: true // Uncomment if animation should happen only once
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevent default only for internal links, allow external links
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Aligns the top of the target element to the top of the scroll container
                });
            }
        }
    });
});

// Navigation link highlighting on scroll
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section'); // Select all section elements
    const navLinks = document.querySelectorAll('header nav ul li a');
    const homeLink = document.querySelector('header nav ul li a[href="#hero"]');

    // Ensure sections and navLinks exist before proceeding
    if (!sections.length || !navLinks.length || !homeLink) {
        console.warn("Could not find sections, navigation links, or home link for highlighting.");
        return;
    }

    function highlightNavLink() {
        let scrollY = window.scrollY;
        let currentSectionId = null;

        // Offset to trigger highlight slightly before section top hits the very top
        const highlightOffset = window.innerHeight * 0.4; // Adjust as needed (40% from top)

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Check if the current scroll position is within the section boundaries (with offset)
            if (scrollY >= sectionTop - highlightOffset && scrollY < sectionTop + sectionHeight - highlightOffset) {
                currentSectionId = sectionId;
            }
        });

        // Remove active class from all links first
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to the matching link or default to Home if near the top or no match
        if (currentSectionId) {
            const matchingLink = document.querySelector(`header nav ul li a[href="#${currentSectionId}"]`);
            if (matchingLink) {
                matchingLink.classList.add('active');
            } else {
                // Fallback to home if matching link isn't found for some reason
                 homeLink.classList.add('active');
            }
        } else if (scrollY < window.innerHeight * 0.5) {
            // If scrolled near the top (less than half viewport height), activate Home
            homeLink.classList.add('active');
        }
         // If scrolled to the very bottom, make sure the last link (#contact) is active
         else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) { // 50px buffer
            const contactLink = document.querySelector('header nav ul li a[href="#contact"]');
             if(contactLink) contactLink.classList.add('active');
         }

    }

    // Initial call and event listeners
    highlightNavLink(); // Call on load
    window.addEventListener('scroll', highlightNavLink);
    window.addEventListener('resize', highlightNavLink); // Recalculate on resize
});


