document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const doorBtn = document.querySelector('.door-btn');
    const backBtns = document.querySelectorAll('.back-btn');
    const timelineBtn = document.querySelector('.timeline-btn');
    const techStackBtns = document.querySelectorAll('.tech-stack-btn');
    const productBtns = document.querySelectorAll('.product-btn');

    // Navigation function
    function navigate(targetSlide) {
        if (targetSlide < 0 || targetSlide >= slides.length) return;
        
        slides[currentSlide].classList.remove('active');
        slides[targetSlide].classList.add('active');
        currentSlide = targetSlide;

        // Initialize animations based on slide
        if (targetSlide === 2) {
            initTimelineAnimations();
        } else if (targetSlide === 3) {
            initTechAnimations();
        }
    }

    // Content switching function
    function switchContent(contentId) {
        // Remove active class from all content sections
        document.querySelectorAll('.section-content').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelectorAll('.message-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelectorAll('.product-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to selected content
        const selectedProfile = document.querySelector(`.section-content[data-content="${contentId}"]`);
        const selectedContent = document.querySelector(`.message-content[data-content="${contentId}"]`);
        if (selectedProfile) selectedProfile.classList.add('active');
        if (selectedContent) selectedContent.classList.add('active');

        // Add active class to corresponding button if it exists
        const activeButton = document.querySelector(`.product-btn[data-content="${contentId}"]`);
        if (activeButton) activeButton.classList.add('active');
    }

    // Door button click handler
    doorBtn.addEventListener('click', () => {
        setTimeout(() => {
            navigate(1);
        }, 500);
    });

    // Back button click handlers
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navigate(currentSlide - 1);
            // Reset to CEO content when going back
            if (currentSlide === 1) {
                switchContent('ceo');
            }
        });
    });

    // Timeline button click handler
    timelineBtn.addEventListener('click', () => {
        navigate(2);
    });

    // Tech Stack buttons click handlers
    techStackBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navigate(3);
        });
    });

    // Product buttons click handlers
    productBtns.forEach((btn, index) => {
        // Set data-content attribute for each button
        const contents = ['analytics', 'automl', 'integration'];
        btn.setAttribute('data-content', contents[index]);

        btn.addEventListener('click', () => {
            const contentId = btn.getAttribute('data-content');
            switchContent(contentId);
        });
    });

    // Timeline animations
    function initTimelineAnimations() {
        const timelineEvents = document.querySelectorAll('.timeline-event');
        const pathLine = document.querySelector('.path-line');
        const eventCards = document.querySelectorAll('.event-card');
        const yearDetails = document.querySelectorAll('.year-details');
        let activeYear = null;
        
        // Reset animations
        timelineEvents.forEach(event => {
            event.classList.remove('visible');
        });

        // Animate timeline events sequentially
        timelineEvents.forEach((event, index) => {
            setTimeout(() => {
                event.classList.add('visible');
            }, 300 * (index + 1));
        });

        // Animate path line
        pathLine.style.height = '100%';

        // Show first year details by default
        setTimeout(() => {
            showYearDetails('2020');
        }, 1000);

        // Add click handlers to event cards
        eventCards.forEach(card => {
            card.addEventListener('click', () => {
                const year = card.getAttribute('data-year');
                showYearDetails(year);
            });
        });

        // Function to show year details
        function showYearDetails(year) {
            if (activeYear === year) return;

            // Remove active state from all cards
            eventCards.forEach(card => {
                card.classList.remove('active');
                if (card.getAttribute('data-year') === year) {
                    card.classList.add('active');
                }
            });

            // Hide all year details with fade out
            yearDetails.forEach(detail => {
                detail.classList.remove('active');
            });

            // Show selected year details with fade in
            const selectedDetail = document.querySelector(`.year-details[data-year="${year}"]`);
            if (selectedDetail) {
                setTimeout(() => {
                    selectedDetail.classList.add('active');
                }, 300);
            }

            activeYear = year;
        }
    }

    // Technology section animations
    function initTechAnimations() {
        // Animate progress bars
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 100);
        });

        // Animate tech cards
        const techCards = document.querySelectorAll('.tech-card');
        techCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 * (index + 1));
        });

        // Animate capability items
        const capabilityItems = document.querySelectorAll('.capability-item');
        capabilityItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200 * (index + 1));
        });

        // Animate integration flow
        const flowItems = document.querySelectorAll('.flow-item');
        flowItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 200 * (index + 1));
        });
    }

    // Initialize particle system
    class ParticleSystem {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.className = 'particle-canvas';
            document.querySelector('.slides-container').prepend(this.canvas);
            
            this.particles = [];
            this.mouseX = 0;
            this.mouseY = 0;
            this.particleCount = 100;
            
            this.init();
            this.animate();
            this.handleMouse();
        }
        
        init() {
            this.resize();
            this.createParticles();
            window.addEventListener('resize', () => this.resize());
        }
        
        resize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
        
        createParticles() {
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    size: Math.random() * 2 + 1,
                    speedX: Math.random() * 1 - 0.5,
                    speedY: Math.random() * 1 - 0.5,
                    life: Math.random() * 0.5 + 0.5
                });
            }
        }
        
        handleMouse() {
            document.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                
                // Create particles on mouse move
                for (let i = 0; i < 3; i++) {
                    this.particles.push({
                        x: this.mouseX,
                        y: this.mouseY,
                        size: Math.random() * 2 + 1,
                        speedX: Math.random() * 4 - 2,
                        speedY: Math.random() * 4 - 2,
                        life: 1
                    });
                }
            });
        }
        
        animate() {
            this.ctx.clearRect(0, 0, this.width, this.height);
            
            this.particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.life -= 0.01;
                
                if (particle.life <= 0) {
                    this.particles.splice(index, 1);
                    return;
                }
                
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(227, 24, 55, ${particle.life})`;
                this.ctx.fill();
                
                this.particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = `rgba(227, 24, 55, ${particle.life * 0.2})`;
                        this.ctx.stroke();
                    }
                });
            });

            while (this.particles.length < this.particleCount) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    size: Math.random() * 2 + 1,
                    speedX: Math.random() * 1 - 0.5,
                    speedY: Math.random() * 1 - 0.5,
                    life: Math.random() * 0.5 + 0.5
                });
            }
            
            requestAnimationFrame(() => this.animate());
        }
    }

    // Initialize particle system
    new ParticleSystem();
});