// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle image loading errors
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // If GitHub stats images fail to load, show a message
            if (this.src.includes('github-readme-stats') || 
                this.src.includes('github-readme-activity-graph') ||
                this.src.includes('github-readme-streak-stats')) {
                const parent = this.parentElement;
                if (parent) {
                    const message = document.createElement('p');
                    message.textContent = 'GitHub stats currently unavailable. Please check back later.';
                    message.style.padding = '20px';
                    message.style.color = '#666';
                    parent.replaceChild(message, this);
                }
            }
        });
    });
}); 