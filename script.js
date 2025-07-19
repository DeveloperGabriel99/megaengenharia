document.addEventListener('DOMContentLoaded', function() {

    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 1000, // values from 0 to 3000, with step 50ms
        once: true, // whether animation should happen only once - while scrolling down
        offset: 100, // offset (in px) from the original trigger point
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Smooth Scrolling for Anchor Links (on the main page) ---
    // This part ensures that links with '#' scroll smoothly only on the index.html page
    if (document.querySelector('.hero-section')) {
        document.querySelectorAll('a[href^="index.html#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').split('#')[1];
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerOffset = document.querySelector('.main-header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }


    // --- Custom Cursor Effect (Desktop Only) ---
    const customCursor = document.querySelector('.custom-cursor');
    const hoverableElements = document.querySelectorAll('a, button, .service-card, .gallery-item');

    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice()) {
        if (customCursor) {
            customCursor.style.display = 'block';

            document.addEventListener('mousemove', (e) => {
                customCursor.style.left = `${e.clientX}px`;
                customCursor.style.top = `${e.clientY}px`;
            });

            hoverableElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    customCursor.classList.add('hovered');
                });
                el.addEventListener('mouseleave', () => {
                    customCursor.classList.remove('hovered');
                });
            });
        }
    }

    // --- Contact Form Submission ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            // Cida's phone number
            const phoneNumber = "5511993029454";

            // Create the WhatsApp message
            const whatsappMessage = `Olá! Meu nome é ${name} (${email}).\n\nMensagem: ${message}`;

            // Encode the message for the URL
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // Create the WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank').focus();

            contactForm.reset();
        });
    }

    // --- Gallery Lightbox Functionality ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const closeModal = document.querySelector(".close-modal");

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            if (modal && modalImg) {
                modal.style.display = "block";
                modalImg.src = this.src;
            }
        });
    });

    if (closeModal) {
        closeModal.onclick = function() {
            if (modal) {
                modal.style.display = "none";
            }
        }
    }

    // Close modal when clicking outside the image
    if (modal) {
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
});
