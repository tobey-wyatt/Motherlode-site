/**
 * MOTHERLODE CONSULTING - MAIN JAVASCRIPT
 * Navigation, smooth scrolling, and interactions
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');
    const body = document.body;
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent scroll when menu open
        });
    }
    
    if (mobileClose) {
        mobileClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            body.style.overflow = ''; // Restore scroll
        });
    }
    
    // Close mobile menu when clicking a nav link
    const mobileNavLinks = document.querySelectorAll('.mobile-menu nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
    
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add 'scrolled' class when scrolled down
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed header (80px height)
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    
    // ===== SCROLL TO ANCHOR ON PAGE LOAD (for direct links) =====
    if (window.location.hash) {
        // Wait a bit for page to fully load
        setTimeout(function() {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 300);
    }
    
    
    // ===== FORM VALIDATION (if using fallback forms) =====
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Skip GHL forms (they handle their own validation)
        if (form.classList.contains('ghl-form') || form.querySelector('[data-ghl]')) {
            return;
        }
        
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                // Remove previous error styling
                field.style.borderColor = '';
                
                // Check if field is empty
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#F20358'; // Hot pink for errors
                    
                    // Show error message if span exists
                    const errorSpan = field.parentElement.querySelector('.error-message');
                    if (errorSpan) {
                        errorSpan.textContent = 'This field is required';
                        errorSpan.style.color = '#F20358';
                    }
                }
                
                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.style.borderColor = '#F20358';
                        
                        const errorSpan = field.parentElement.querySelector('.error-message');
                        if (errorSpan) {
                            errorSpan.textContent = 'Please enter a valid email address';
                            errorSpan.style.color = '#F20358';
                        }
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = form.querySelector('[style*="border-color: rgb(242, 3, 88)"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
        
        // Clear error styling on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
                const errorSpan = this.parentElement.querySelector('.error-message');
                if (errorSpan) {
                    errorSpan.textContent = '';
                }
            });
        });
    });
    
    
    // ===== CARD HOVER EFFECTS =====
    const cards = document.querySelectorAll('.card, .service-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    
    // ===== DROPDOWN MENU BEHAVIOR (Desktop) =====
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropdownContent) {
            dropdown.addEventListener('mouseenter', function() {
                dropdownContent.style.display = 'block';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                dropdownContent.style.display = 'none';
            });
        }
    });
    
    
    // ===== MOBILE DROPDOWN TOGGLE =====
    const mobileDropdowns = document.querySelectorAll('.mobile-menu .dropdown');
    
    mobileDropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a:first-child');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropdownToggle && dropdownContent) {
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle dropdown content
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                } else {
                    dropdownContent.style.display = 'block';
                }
            });
        }
    });
    
    
    // ===== BUTTON RIPPLE EFFECT (Optional Enhancement) =====
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            // Position ripple at click location
            const rect = button.getBoundingClientRect();
            ripple.style.left = e.clientX - rect.left - 10 + 'px';
            ripple.style.top = e.clientY - rect.top - 10 + 'px';
            
            // Ensure button has position relative
            if (getComputedStyle(button).position === 'static') {
                button.style.position = 'relative';
            }
            button.style.overflow = 'hidden';
            
            // Add ripple to button
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    
    // ===== LAZY LOADING IMAGES (if any) =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    
    // ===== CONSOLE MESSAGE (Easter Egg) =====
    console.log('%c↑↑↓↓←→←→BA', 'font-size: 24px; color: #0299B3; font-weight: bold;');
    console.log('%cYou found the Konami code! 🎮', 'font-size: 16px; color: #5E18E8;');
    console.log('%cMotherlode Consulting - Operations expertise unlocked.', 'font-size: 12px; color: #2B2B2B;');
    
});

// ===== UTILITY FUNCTIONS =====

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Debounce function for performance
 */
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

// Add CSS for ripple animation
if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        @keyframes ripple {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
