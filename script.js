// Function to open or download the resume PDF
function viewResume() {
    // Assuming resume.pdf is in the same directory
    window.open('resume.pdf', '_blank');
}

// Simple form validation for contact form
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return false;
    }

    // Basic email format check
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    alert('Thank you for your message! I will get back to you soon.');
    // Here you can add code to actually send the form data if backend is available
    return false; // Prevent actual form submission for now
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navButtons.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            navButtons.classList.remove('active');
        }
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
            contactForm.appendChild(errorMessage);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        } finally {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.feature-card, .product-card').forEach(element => {
    observer.observe(element);
});

// Add CSS classes for mobile menu
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links.active,
            .nav-buttons.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                padding: 1rem;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                z-index: 1000;
            }

            .nav-links.active {
                gap: 1rem;
            }

            .nav-buttons.active {
                gap: 1rem;
                padding-top: 0;
            }

            .success-message,
            .error-message {
                padding: 1rem;
                border-radius: 0.5rem;
                margin-top: 1rem;
                text-align: center;
            }

            .success-message {
                background-color: var(--success-color);
                color: white;
            }

            .error-message {
                background-color: var(--error-color);
                color: white;
            }
        }
    `;
    document.head.appendChild(style);
});
