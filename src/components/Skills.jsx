import React, { useEffect, useRef } from 'react';
import './Skills.css';
import { FaArrowUp } from 'react-icons/fa';
const Skills = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // 1. Core skills list
        const baseSkills = [
            'React', 'JavaScript', 'CSS3', 'HTML5', 'Node.js',
            'Git', 'VS Code', 'Python', 'UI/UX', 'Tailwind', 'Express.js','MongoDB','GitHub','Render','AI','Vercel','API',
            'RazorPay','WordPress','Gemini API'
        ];

        // DUPLICATE RULE: Automatically duplicate each skill to make exactly 2 balls per skill
        const skillsList = baseSkills.flatMap(skill => [skill, skill]);

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = 500;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse position tracking state
        const mouse = { x: undefined, y: undefined, radius: 120, isMoving: false };
        let mouseTimeout;

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.isMoving = true;

            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                mouse.isMoving = false;
            }, 150);
        };

        const handleMouseLeave = () => {
            mouse.x = undefined;
            mouse.y = undefined;
            mouse.isMoving = false;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // Ball Blueprint Class
        class Ball {
            constructor(text) {
                this.text = text;

                // 3D DEPTH PROPERTY: Assign a random depth multiplier between 0.6 and 1.2
                this.zDepth = Math.random() * 0.6 + 0.6;

                // Base radius scaled down slightly so 20 items don't choke the layout
                const baseRadius = text.length * 5 + 20;
                // 3D SCALE EFFECT: Deeper balls appear physically smaller on screen
                this.radius = baseRadius * this.zDepth;

                // Spawn closer to center to instantly show a tight cluster effect
                this.x = (canvas.width / 2) + (Math.random() - 0.5) * 200;
                this.y = (canvas.height / 2) + (Math.random() - 0.5) * 200;

                // 3D SPEED PERSPECTIVE: Background/smaller elements float slower
                this.vx = (Math.random() - 0.5) * 2.5 * this.zDepth;
                this.vy = (Math.random() - 0.5) * 2.5 * this.zDepth;
                this.baseSpeedX = this.vx;
                this.baseSpeedY = this.vy;
            }

            draw() {
                ctx.save();

                // 3D SHADOW EFFECT
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 12 * this.zDepth;
                ctx.shadowOffsetX = 8 * this.zDepth;
                ctx.shadowOffsetY = 10 * this.zDepth;

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

                // 3D GRADIENT ILLUSION
                const highlightX = this.x - this.radius * 0.25;
                const highlightY = this.y - this.radius * 0.25;
                const gradient = ctx.createRadialGradient(
                    highlightX, highlightY, this.radius * 0.05,
                    this.x, this.y, this.radius
                );

                gradient.addColorStop(0, '#6f60fa');
                gradient.addColorStop(0.3, '#4e3bf6');
                gradient.addColorStop(1, '#2e1e8a');

                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.restore();

                // Sleek semi-translucent edge glare ring
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * this.zDepth})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.closePath();

                // 3D TEXT SCALING
                ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + (this.zDepth - 0.6)})`;
                const fontSize = Math.floor(11 * this.zDepth);
                ctx.font = `bold ${fontSize}px Inter, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.text, this.x, this.y);
            }

            update() {
                // 1. FIXED BOUNDARIES: Prevents balls from getting trapped out-of-bounds
                if (this.x - this.radius < 0) { this.x = this.radius; this.vx = -this.vx; }
                if (this.x + this.radius > canvas.width) { this.x = canvas.width - this.radius; this.vx = -this.vx; }
                if (this.y - this.radius < 0) { this.y = this.radius; this.vy = -this.vy; }
                if (this.y + this.radius > canvas.height) { this.y = canvas.height - this.radius; this.vy = -this.vy; }

                // 2. UPDATED CENTRAL GRAVITY PULL: Constantly draws them inward to stay grouped up
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const gravityStrength = 0.02; // Keeps them floating cleanly in a tight mesh

                const toCenterX = centerX - this.x;
                const toCenterY = centerY - this.y;

                this.vx += Math.sign(toCenterX) * gravityStrength;
                this.vy += Math.sign(toCenterY) * gravityStrength;

                // 3. Mouse Proximity Logic
                if (mouse.x !== undefined && mouse.y !== undefined) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.hypot(dx, dy);

                    if (distance < mouse.radius + this.radius) {
                        if (mouse.isMoving) {
                            // Scatter Force
                            const force = (mouse.radius + this.radius - distance) / mouse.radius;
                            const angle = Math.atan2(dy, dx);
                            this.vx += Math.cos(angle) * force * 1.8 * this.zDepth;
                            this.vy += Math.sin(angle) * force * 1.8 * this.zDepth;
                        } else {
                            // Mouse holds still: Freeze elements completely
                            this.vx *= 0.80;
                            this.vy *= 0.80;
                        }
                    }
                }

                // Return to natural cruising speeds gently
                if (!mouse.isMoving) {
                    this.vx += (this.baseSpeedX - this.vx) * 0.05;
                    this.vy += (this.baseSpeedY - this.vy) * 0.05;
                }

                // Velocity ceiling governor
                const currentSpeed = Math.hypot(this.vx, this.vy);
                if (currentSpeed > 5) {
                    this.vx = (this.vx / currentSpeed) * 5;
                    this.vy = (this.vy / currentSpeed) * 5;
                }

                this.x += this.vx;
                this.y += this.vy;
            }
        }

        // Initialize instances
        const ballsArray = skillsList.map(skill => new Ball(skill));

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 3D LAYER SORT: Re-sorting every frame matches depth perfectly during dynamic updates
            ballsArray.sort((a, b) => a.zDepth - b.zDepth);

            ballsArray.forEach(ball => {
                ball.update();
                ball.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(mouseTimeout);
        };
    }, []);

    return (
        <section id='skills'>
            <h1 className="skills-heading">My Technical Area</h1>
        <div className="skills-container-wrapper">
            <h2 className="skills-title">The Tools</h2>
            <canvas ref={canvasRef} className="skills-canvas"></canvas>
        </div>
        <a href="#works" className='return-arrow'><FaArrowUp /></a>
        </section>
    );
};

export default Skills;
