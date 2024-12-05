// Get DOM elements
const slides = document.querySelectorAll('.slide');
const doorBtn = document.querySelector('.door-btn');
const backBtn = document.querySelector('.back-btn');
let currentSlide = 0;

// Particle System
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
            // Update
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life -= 0.01;
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(index, 1);
                return;
            }
            
            // Draw
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(227, 24, 55, ${particle.life})`; // Red color from logo
            this.ctx.fill();
            
            // Connect nearby particles
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
        
        // Add new particles if needed
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

// Navigation Functions
function goToVisionMission() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Go to Vision & Mission slide (index 1)
    currentSlide = 1;
    slides[currentSlide].classList.add('active');
}

function goToHome() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Go back to home slide (index 0)
    currentSlide = 0;
    slides[currentSlide].classList.add('active');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    new ParticleSystem();
    
    // Initialize first slide
    slides[0].classList.add('active');
    
    // Add click events
    doorBtn.addEventListener('click', goToVisionMission);
    backBtn.addEventListener('click', goToHome);
    
    // Initialize Chart.js
    const ctx = document.getElementById('marketChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2024', '2025', '2026', '2027'],
            datasets: [{
                label: 'Projected Growth',
                data: [10, 25, 45, 70],
                borderColor: '#E31837',
                backgroundColor: 'rgba(227, 24, 55, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#FFFFFF'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#FFFFFF'
                    }
                }
            }
        }
    });
});