document.addEventListener('DOMContentLoaded', () => {
    // --- Welcome Modal ---
    const welcomeModal = document.getElementById('welcomeModal');
    const closeModal = document.getElementById('closeModal');

    if (welcomeModal) {
        // Show modal on load with small delay
        setTimeout(() => {
            welcomeModal.classList.add('show');
        }, 500);

        // Close modal on 'X' click
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                welcomeModal.classList.remove('show');
            });
        }

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target === welcomeModal) {
                welcomeModal.classList.remove('show');
            }
        });
    }

    // --- Sticky Navbar ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.classList.add('mobile-active');
                // Mobile menu styling adjustments
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.flexDirection = 'column';
                navLinks.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.backdropFilter = 'blur(10px)';
                
                const links = navLinks.querySelectorAll('a');
                links.forEach(link => {
                    link.style.margin = '1rem 0';
                    link.style.width = '100%';
                    link.style.textAlign = 'center';
                });
            }
        });
    }

    // --- Reveal Animations on Scroll ---
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                
                // Close mobile menu if open
                if (window.innerWidth < 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // --- Hero Slider ---
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        const nextSlide = () => {
            goToSlide((currentSlide + 1) % slides.length);
        };

        const prevSlide = () => {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        };

        const goToSlide = (index) => {
            slides[currentSlide].classList.remove('active');
            if (dots.length > 0) dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            if (dots.length > 0) dots[currentSlide].classList.add('active');
        };

        if (rightArrow) rightArrow.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        if (leftArrow) leftArrow.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        if (dots.length > 0) {
            dots.forEach((dot, idx) => {
                dot.addEventListener('click', () => {
                    goToSlide(idx);
                    resetInterval();
                });
            });
        }

        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        startInterval();
    }
});
