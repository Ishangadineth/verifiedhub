document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for the hero card
    const heroCard = document.querySelector('.main-card');
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        if (heroCard) {
            heroCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // Reset card animation on mouse leave
    document.addEventListener('mouseleave', () => {
        if (heroCard) {
            heroCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
            heroCard.style.transition = 'all 0.5s ease';
        }
    });

    document.addEventListener('mouseenter', () => {
        if (heroCard) {
            heroCard.style.transition = 'none';
        }
    });

    // Feature card reveal on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    console.log("Verified Hub active. Developed by Ishangadineth.");
});
