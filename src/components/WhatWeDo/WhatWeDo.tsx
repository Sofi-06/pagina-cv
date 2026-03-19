import React, { useEffect, useState, useRef } from 'react';
import './WhatWeDo.css';

const COLORS = ['#63eee0', '#ffd610', '#f5ccce', '#ffffff'];
const CELL_SIZE = 60;

const WhatWeDo: React.FC = () => {
    const [circleSize, setCircleSize] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cellsRef = useRef<Map<string, { color: string; opacity: number }>>(new Map());
    const animFrameRef = useRef<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const maxScroll = viewportHeight * 2.05;
            const progress = Math.min(scrollY / maxScroll, 1);
            const maxRadius = Math.sqrt(Math.pow(viewportWidth, 2) + Math.pow(viewportHeight, 2));
            const isLargeDesktop = viewportWidth >= 1920;
            const fadeStart = isLargeDesktop ? 0.32 : 0.45;
            const fadeSpan = isLargeDesktop ? 0.22 : 0.3;
            const expandThreshold = isLargeDesktop ? 0.82 : 0.9;
            setCircleSize(progress * maxRadius);
            if (progress > fadeStart) {
                setOpacity(Math.min((progress - fadeStart) / fadeSpan, 1));
            } else {
                setOpacity(0);
            }
            setIsExpanded(progress > expandThreshold);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cellsRef.current.forEach((cell, key) => {
                const [cx, cy] = key.split(',').map(Number);
                ctx.globalAlpha = cell.opacity;
                ctx.fillStyle = cell.color;
                ctx.fillRect(cx * CELL_SIZE, cy * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2);
                cell.opacity -= 0.02;
                if (cell.opacity <= 0) cellsRef.current.delete(key);
            });
            ctx.globalAlpha = 1;
            animFrameRef.current = requestAnimationFrame(draw);
        };
        draw();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const cx = Math.floor((e.clientX - rect.left) / CELL_SIZE);
            const cy = Math.floor((e.clientY - rect.top) / CELL_SIZE);
            const key = `${cx},${cy}`;
            if (!cellsRef.current.has(key)) {
                cellsRef.current.set(key, { color: COLORS[Math.floor(Math.random() * COLORS.length)], opacity: 1 });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    return (
        <section className="what-we-do-container">
            <div
                className={`what-we-do-circle-wrapper ${isExpanded ? 'expanded' : ''}`}
                style={{
                    clipPath: `circle(${circleSize}px at 50% 50%)`,
                    WebkitClipPath: `circle(${circleSize}px at 50% 50%)`
                }}
            >
                {/* Canvas de cuadraditos */}
                <canvas ref={canvasRef} style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none'
                }} />

                <div className="what-we-do-content" style={{ opacity, position: 'relative', zIndex: 1 }}>
                    <h2>¿Qué Hacemos?</h2>
                    <p>
                        Trabajamos en el fortalecimiento de los procesos de enseñanza y aprendizaje de modalidad virtual con la incorporación de estrategias didácticas y evaluativas, y recursos educativos creativos e innovadores que permitan el desarrollo y el crecimiento del estudiante en todo su proceso de formación integral.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhatWeDo;
