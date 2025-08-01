// Main JavaScript file for Grace After 50 website

document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeScrollToTop();
    initializeFadeInAnimations();
    initializeVideoLightbox();
    initializeForms();
    initializeBlogFilters();
    initializeNewsFilters();
    initializeCharacterCounter();
});

// Header functionality
function initializeHeader() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Get nav list and toggle active class
            const navList = nav.querySelector('.nav-list');
            if (navList) {
                navList.classList.toggle('active');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            const navList = nav.querySelector('.nav-list');
            if (navList) {
                navList.classList.remove('active');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to top button
function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fade in animations on scroll
function initializeFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Video lightbox functionality
function initializeVideoLightbox() {
    const videoLightbox = document.getElementById('videoLightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const videoFrame = document.getElementById('videoFrame');
    const videoTriggers = document.querySelectorAll('[data-video]');
    
    if (!videoLightbox) return;
    
    // Open lightbox when clicking on video thumbnails
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            
            videoFrame.src = videoSrc;
            videoLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    function closeLightbox() {
        videoLightbox.classList.remove('active');
        videoFrame.src = '';
        document.body.style.overflow = 'auto';
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Close lightbox when clicking outside
    videoLightbox.addEventListener('click', function(e) {
        if (e.target === videoLightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoLightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Form handling
function initializeForms() {
    // Newsletter forms
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmission(this);
        });
    });
    
    // Ask Grace form
    const askGraceForm = document.getElementById('askGraceForm');
    if (askGraceForm) {
        askGraceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAskGraceSubmission(this);
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission(this);
        });
    }
}

// Newsletter form submission
function handleNewsletterSubmission(form) {
    const email = form.querySelector('input[type="email"]').value;
    
    if (!email || !isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate API call
    showLoadingState(form);
    
    setTimeout(() => {
        hideLoadingState(form);
        showMessage('Thank you for subscribing! Welcome to our community.', 'success');
        form.reset();
    }, 1500);
}

// Ask Grace form submission
function handleAskGraceSubmission(form) {
    const question = form.querySelector('#question').value;
    const category = form.querySelector('#category').value;
    
    if (!question.trim()) {
        showMessage('Please enter your question.', 'error');
        return;
    }
    
    if (!category) {
        showMessage('Please select a category.', 'error');
        return;
    }
    
    // Simulate API call
    showLoadingState(form);
    
    setTimeout(() => {
        hideLoadingState(form);
        showSuccessMessage();
        form.reset();
        updateCharacterCount();
    }, 2000);
}

// Contact form submission
function handleContactSubmission(form) {
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const subject = form.querySelector('#subject').value;
    const message = form.querySelector('#message').value;
    
    if (!name.trim()) {
        showMessage('Please enter your name.', 'error');
        return;
    }
    
    if (!email || !isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    if (!subject) {
        showMessage('Please select a subject.', 'error');
        return;
    }
    
    if (!message.trim()) {
        showMessage('Please enter your message.', 'error');
        return;
    }
    
    // Simulate API call
    showLoadingState(form);
    
    setTimeout(() => {
        hideLoadingState(form);
        showContactSuccess();
        form.reset();
    }, 2000);
}

// Blog category filtering
function initializeBlogFilters() {
    const categoryBtns = document.querySelectorAll('.blog-categories .category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (!categoryBtns.length || !blogCards.length) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// News category filtering
function initializeNewsFilters() {
    const categoryBtns = document.querySelectorAll('.news-categories .category-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    if (!categoryBtns.length || !newsCards.length) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter news cards
            newsCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Character counter for textarea
function initializeCharacterCounter() {
    const textarea = document.getElementById('question');
    const charCount = document.getElementById('charCount');
    
    if (!textarea || !charCount) return;
    
    textarea.addEventListener('input', updateCharacterCount);
    
    function updateCharacterCount() {
        const currentLength = textarea.value.length;
        const maxLength = 2000;
        
        charCount.textContent = currentLength;
        
        if (currentLength > maxLength * 0.9) {
            charCount.style.color = '#f4c2a1'; // Warning color
        } else if (currentLength > maxLength) {
            charCount.style.color = '#e74c3c'; // Error color
        } else {
            charCount.style.color = '#666';
        }
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
    }
}

function hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        
        // Reset button text based on form type
        if (form.classList.contains('newsletter-form')) {
            submitBtn.textContent = 'Subscribe';
        } else if (form.id === 'askGraceForm') {
            submitBtn.textContent = 'Submit Your Question';
        } else if (form.id === 'contactForm') {
            submitBtn.textContent = 'Send Message';
        } else {
            submitBtn.textContent = 'Submit';
        }
    }
}

function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message-toast ${type}`;
    messageEl.textContent = message;
    
    // Style the message
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#a8d5a8' : type === 'error' ? '#f4c2a1' : '#d4a574'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 1001;
        font-family: 'Lato', sans-serif;
        font-weight: 600;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    // Animate in
    setTimeout(() => {
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 4000);
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function showContactSuccess() {
    const successMessage = document.getElementById('contactSuccessMessage');
    if (successMessage) {
        successMessage.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactSuccess() {
    const successMessage = document.getElementById('contactSuccessMessage');
    if (successMessage) {
        successMessage.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Make functions available globally for inline event handlers
window.closeSuccessMessage = closeSuccessMessage;
window.closeContactSuccess = closeContactSuccess;

// Audio read button functionality (placeholder)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('audio-read-btn')) {
        e.preventDefault();
        showMessage('Audio feature coming soon! 🎧', 'info');
    }
});

// Quiz option interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('quiz-option')) {
        // Remove active class from siblings
        const siblings = e.target.parentNode.querySelectorAll('.quiz-option');
        siblings.forEach(sibling => {
            sibling.classList.remove('selected');
        });
        
        // Add active class to clicked option
        e.target.classList.add('selected');
        
        // Visual feedback
        e.target.style.background = 'var(--primary-color)';
        e.target.style.color = 'white';
        e.target.style.borderColor = 'var(--primary-color)';
        
        setTimeout(() => {
            e.target.style.background = '';
            e.target.style.color = '';
            e.target.style.borderColor = '';
        }, 2000);
    }
});

// Enhanced scroll animations with stagger effect
function initializeStaggeredAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add stagger delay for grid items
                const parent = entry.target.parentNode;
                if (parent.classList.contains('values-grid') || 
                    parent.classList.contains('blog-grid') || 
                    parent.classList.contains('video-grid')) {
                    
                    const index = Array.from(parent.children).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                } else {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);
    
    // Observe grid items for staggered animation
    document.querySelectorAll('.values-grid .fade-in, .blog-grid .fade-in, .video-grid .fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    initializeStaggeredAnimations();
});

// Parallax scroll effect for hero images (subtle)
function initializeParallax() {
    const heroImages = document.querySelectorAll('.hero-image, .page-hero');
    
    if (!heroImages.length) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroImages.forEach(image => {
            if (image.getBoundingClientRect().top < window.innerHeight && 
                image.getBoundingClientRect().bottom > 0) {
                image.style.transform = `translateY(${rate}px)`;
            }
        });
    });
}

// Initialize parallax on load
window.addEventListener('load', function() {
    initializeParallax();
});

// Intersection Observer for counters/stats (if needed in future)
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    if (!counters.length) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Initialize counters
document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
});