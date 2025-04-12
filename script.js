// Navigation scroll effect
const nav = document.querySelector('nav');
const navHeight = nav.offsetHeight;
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for nav background
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Hide/show nav on scroll
    if (currentScroll > navHeight) {
        if (currentScroll > lastScroll) {
            nav.style.transform = `translateY(-${navHeight}px)`;
        } else {
            nav.style.transform = 'translateY(0)';
        }
    }
    lastScroll = currentScroll;
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Handle "Get in Touch" button
document.querySelector('.cta-button[href="#contact"]').addEventListener('click', function(e) {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Handle "Download Resume" button
document.querySelector('.cta-button[href="resume.pdf"]').addEventListener('click', function(e) {
    // Allow the default download behavior
    // The file exists in the portfolio directory
    return true;
});

// Handle social media links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.href.startsWith('mailto:') || this.href.startsWith('tel:')) {
            // Allow default behavior for mailto and tel links
            return;
        }
        // For other links, ensure they open in new tab
        if (!this.target || this.target !== '_blank') {
            this.target = '_blank';
        }
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animate sections on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.classList.add('in-view');
        }
    });
};

// Add animation classes to elements
document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-on-scroll');
});

// Initial animation check and scroll listener
animateOnScroll();
window.addEventListener('scroll', animateOnScroll);

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    showNotification('Thank you for your message! I will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification.success {
        background: linear-gradient(135deg, #28a745, #20c997);
    }
    
    .notification.error {
        background: linear-gradient(135deg, #dc3545, #f72585);
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-on-scroll.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes floatAnimation {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
    
    .float {
        animation: floatAnimation 3s ease-in-out infinite;
    }
`;

document.head.appendChild(style);

// Initialize floating animation for profile image
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.classList.add('float');
}

// Initialize hero title animation
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    window.addEventListener('load', () => {
        setTimeout(() => typeWriter(heroTitle, originalText), 500);
    });
}

// Add particle background to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);
    }
}

// Add particle styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
    }
    
    .particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        animation: particleFloat 5s infinite linear;
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
        }
    }
`;

document.head.appendChild(particleStyles);
createParticles();

// Read More Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const description = this.parentElement;
            const shortDesc = description.querySelector('.short-description');
            const fullDesc = description.querySelector('.full-description');
            
            if (fullDesc.style.display === 'none' || fullDesc.style.display === '') {
                fullDesc.style.display = 'block';
                shortDesc.style.display = 'none';
                this.textContent = 'Read Less';
            } else {
                fullDesc.style.display = 'none';
                shortDesc.style.display = 'block';
                this.textContent = 'Read More';
            }
        });
    });
});

// Project title animations
document.querySelectorAll('.project-content h3').forEach(title => {
    title.addEventListener('mouseenter', function() {
        this.style.animation = 'float 3s ease-in-out infinite';
    });
    
    title.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
});

// Project Carousel
const projectsGrid = document.querySelector('.projects-grid');
const prevButton = document.querySelector('.nav-button.prev');
const nextButton = document.querySelector('.nav-button.next');
const projectCards = document.querySelectorAll('.project-card');
const cardWidth = projectCards[0].offsetWidth + 32; // width + gap

let currentIndex = 0;
const maxIndex = projectCards.length - 3;

function updateButtons() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= maxIndex;
}

function scrollProjects(direction) {
    if (direction === 'next' && currentIndex < maxIndex) {
        currentIndex++;
    } else if (direction === 'prev' && currentIndex > 0) {
        currentIndex--;
    }
    
    projectsGrid.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateButtons();
}

prevButton.addEventListener('click', () => scrollProjects('prev'));
nextButton.addEventListener('click', () => scrollProjects('next'));

// Initialize buttons
updateButtons();

// Handle touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

projectsGrid.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

projectsGrid.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
        if (swipeDistance > 0) {
            scrollProjects('prev');
        } else {
            scrollProjects('next');
        }
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    const newCardWidth = projectCards[0].offsetWidth + 32;
    if (newCardWidth !== cardWidth) {
        projectsGrid.style.transform = `translateX(-${currentIndex * newCardWidth}px)`;
    }
}); 