/* =====================================================
   UNIQUE COUNTS - JAVASCRIPT FUNCTIONALITY
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== HEADER SCROLL EFFECT ==========
    const header = document.querySelector('header');
    
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Check on load
    
    // ========== MOBILE NAVIGATION ==========
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Check if this is a dropdown toggle
                const parentLi = this.parentElement;
                if (parentLi.classList.contains('dropdown') && window.innerWidth <= 768) {
                    // Toggle dropdown on mobile
                    e.preventDefault();
                    parentLi.classList.toggle('active');
                } else {
                    // Close menu for regular links
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
    
    // ========== SMOOTH SCROLLING ==========
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========== ACTIVE NAVIGATION ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('nav ul li a');
    
    navItems.forEach(item => {
        const itemPage = item.getAttribute('href').split('/').pop().split('#')[0];
        
        if (itemPage === currentPage || 
            (currentPage === '' && itemPage === 'index.html') ||
            (currentPage === 'index.html' && itemPage === 'index.html')) {
            item.classList.add('active');
        }
    });
    
    // ========== SCROLL ANIMATIONS ==========
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== GALLERY SLIDER ==========
    const gallerySlider = document.getElementById('gallerySlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (gallerySlider && prevBtn && nextBtn) {
        const slides = gallerySlider.querySelectorAll('.gallery-slide');
        let currentSlide = 0;
        
        function showSlide(index) {
            if (slides.length === 0) return;
            
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }
            
            gallerySlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        prevBtn.addEventListener('click', function() {
            showSlide(currentSlide - 1);
        });
        
        nextBtn.addEventListener('click', function() {
            showSlide(currentSlide + 1);
        });
        
        // Auto-play slider
        let autoPlayInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
        
        // Pause on hover
        gallerySlider.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        gallerySlider.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
        
        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;
        
        gallerySlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        gallerySlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (diff > swipeThreshold) {
                showSlide(currentSlide + 1);
            } else if (diff < -swipeThreshold) {
                showSlide(currentSlide - 1);
            }
        }
    }
    
    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
    
    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Prepare form data for submission
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('service', service);
            formData.append('message', message);
            formData.append('_subject', 'New Contact Form Submission - Unique Counts');
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send form data to Formspree (configured to send to Uniquecounts1@gmail.com)
            fetch('https://formspree.io/f/xdkopzqw', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showNotification('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                showNotification('Sorry, there was an error sending your message. Please try again or contact us directly at Uniquecounts1@gmail.com', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 10px;
        `;
        closeBtn.addEventListener('click', () => notification.remove());
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ========== NUMBER COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-item .number');
    
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
                    const suffix = finalValue.replace(/[0-9]/g, '');
                    
                    animateCounter(target, numericValue, suffix);
                    counterObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(num => counterObserver.observe(num));
    }
    
    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const step = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, step);
    }
    
    // ========== SERVICE CARDS ANIMATION ==========
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length > 0) {
        serviceCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // ========== STAGGER ANIMATION FOR GRIDS ==========
    const staggerContainers = document.querySelectorAll('.services-grid, .why-grid, .process-grid, .gallery-grid');
    
    staggerContainers.forEach(container => {
        const items = container.children;
        
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(items).forEach((item, index) => {
                        item.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                        item.style.opacity = '0';
                    });
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        staggerObserver.observe(container);
    });
    
    // ========== IMAGE LAZY LOADING ==========
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========== SCROLL REVEAL FOR SECTIONS ==========
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(section);
    });
    
    // ========== PHONE NUMBER LINK ==========
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Analytics or tracking could go here
        });
    });
    
    // ========== EMAIL LINK ==========
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Analytics or tracking could go here
        });
    });
    
    // ========== WHATSAPP BUTTON ==========
    const whatsappLinks = document.querySelectorAll('.whatsapp-cta, .btn-whatsapp');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track WhatsApp clicks if needed
        });
    });
    
    // ========== ADDITIONAL CSS FOR ANIMATIONS ==========
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .section-visible {
            animation: fadeIn 0.5s ease forwards;
        }
    `;
    document.head.appendChild(style);
    
});

// ========== GALLERY FILTER & LOAD MORE ==========
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let visibleCount = 6;
    const increment = 6;

    // Initialize gallery - show only first 6 items
    function initializeGallery() {
        galleryItems.forEach((item, index) => {
            if (index < visibleCount) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        updateLoadMoreButton();
    }

    // Update load more button visibility
    function updateLoadMoreButton() {
        if (loadMoreBtn) {
            const totalItems = galleryItems.length;
            loadMoreBtn.style.display = visibleCount >= totalItems ? 'none' : 'inline-block';
        }
    }

    // Initialize on page load
    initializeGallery();

    // Gallery Filter
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            let count = 0;

            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    count++;
                    if (count <= visibleCount) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                } else {
                    item.style.display = 'none';
                }
            });

            // Reset visible count when filter changes
            visibleCount = 6;
            
            // Update button visibility
            if (loadMoreBtn) {
                const visibleItems = Array.from(galleryItems).filter(item => {
                    return item.style.display !== 'none';
                });
                loadMoreBtn.style.display = visibleItems.length > visibleCount ? 'inline-block' : 'none';
            }
        });
    });

    // Load More Button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visibleCount += increment;
            
            const activeFilter = document.querySelector('.gallery-filter.active');
            const filter = activeFilter ? activeFilter.dataset.filter : 'all';
            let visibleItems = 0;

            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    visibleItems++;
                    if (visibleItems <= visibleCount) {
                        item.style.display = 'block';
                    }
                }
            });

            // Update button visibility
            updateLoadMoreButton();
        });
    }
});

// ========== UTILITY FUNCTIONS ==========

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format phone number
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
