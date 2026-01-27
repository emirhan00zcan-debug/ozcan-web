document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Category Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Mobile Menu Toggle (Basic Placeholder)
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            alert('Mobil menü yakında hizmetinizde!');
        });
    }

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (n) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);

    // Make global for inline onclick if needed, but better to use event listeners
    window.moveSlide = (n) => {
        showSlide(currentSlide + n);
        resetInterval();
    };

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    const startInterval = () => {
        slideInterval = setInterval(nextSlide, 6000);
        resetProgressBar();
    };

    const resetProgressBar = () => {
        const progressBar = document.querySelector('.slider-progress-bar');
        if (progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.transition = 'width 6s linear';
                progressBar.style.width = '100%';
            }, 50);
        }
    };

    const resetInterval = () => {
        clearInterval(slideInterval);
        startInterval();
    };

    startInterval();

    // Mega Menu Category Links logic
    const megaLinks = document.querySelectorAll('.mega-column ul li a');
    megaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const filter = link.getAttribute('data-filter');
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
            if (filterBtn) {
                filterBtn.click();
            }
        });
    });

    // Reveal animations on scroll
    const revealOnScroll = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);

    // Color Swatch Logic - Moved to product-detail.html for more advanced layered implementation
    // Global implementation removed to prevent conflicts

    // Update Reveal Elements for new content
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
});
