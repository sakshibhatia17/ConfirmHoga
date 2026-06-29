import React, { useEffect, useRef } from 'react';

export default function ThreeTrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', resize);
    resize();

    let angle = 0;
    const particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    // Initialize stars/particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing background grid lines
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      
      // Vertical grid
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal grid
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw active flow particles
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x -= p.speed;
        if (p.x < 0) {
          p.x = width;
          p.y = Math.random() * height;
        }
      });

      // 3. Render the Kinetic 3D Train silhouette rotating/floating in perspective
      angle += 0.015;
      const floatOffset = Math.sin(angle * 2) * 10;
      const centerX = width / 2;
      const centerY = height / 2 + floatOffset;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle * 0.15); // slow rotate

      // Draw train shadows & glows
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(99, 102, 241, 0.4)';

      // Train Body (Futuristic Bullet Train isometric styling)
      ctx.fillStyle = '#6d28d9'; // Primary violet
      ctx.beginPath();
      ctx.moveTo(-120, -25);
      ctx.lineTo(80, -25);
      ctx.lineTo(120, 5); // Aerodynamic slant
      ctx.lineTo(80, 25);
      ctx.lineTo(-120, 25);
      ctx.closePath();
      ctx.fill();

      // Top shield
      ctx.fillStyle = '#4c1d95';
      ctx.beginPath();
      ctx.moveTo(-110, -20);
      ctx.lineTo(60, -20);
      ctx.lineTo(90, 0);
      ctx.lineTo(60, 20);
      ctx.lineTo(-110, 20);
      ctx.closePath();
      ctx.fill();

      // Glowing Cyan Windows (Kinetic effect)
      ctx.shadowColor = 'rgba(0, 240, 255, 0.8)';
      ctx.fillStyle = '#00F0FF'; // Cyan windows
      for (let offset = -90; offset <= 30; offset += 30) {
        ctx.fillRect(offset, -12, 18, 5);
        ctx.fillRect(offset, 7, 18, 5);
      }

      // Cabin Front Glass
      ctx.fillStyle = '#00F0FF';
      ctx.beginPath();
      ctx.moveTo(65, -8);
      ctx.lineTo(95, 0);
      ctx.lineTo(65, 8);
      ctx.closePath();
      ctx.fill();

      // Back glowing engine trail
      ctx.shadowColor = 'rgba(211, 187, 255, 0.9)';
      ctx.fillStyle = '#e2b6ff'; // Light lavender engine
      ctx.fillRect(-135, -15, 15, 30);

      // Speed vector lines (behind the train)
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-140, -10);
      ctx.lineTo(-180, -10);
      ctx.moveTo(-140, 10);
      ctx.lineTo(-200, 10);
      ctx.moveTo(-140, 0);
      ctx.lineTo(-170, 0);
      ctx.stroke();

      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full rounded-2xl block" />
      {/* Decorative high-precision elements overlay */}
      <div className="absolute top-4 left-6 font-mono text-[10px] text-indigo-400 tracking-wider">
        SYS_3D_MODEL // TRAIN_SILHOUETTE_v2.4
      </div>
      <div className="absolute bottom-4 right-6 font-mono text-[10px] text-cyan-400 tracking-wider">
        ROTATION: ACTIVE // FLOAT_BIAS: SINE
      </div>
    </div>
  );
}
