import React, { useEffect, useState } from 'react';
import './WhatWeDo.css';

const WhatWeDo: React.FC = () => {
    const [circleSize, setCircleSize] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            // Grow the circle as soon as scroll starts
            // We adjust the speed so it covers the 70vh carousel quickly
            const maxScroll = viewportHeight * 1.5;
            const progress = Math.min(scrollY / maxScroll, 1);

            // Radius needed to cover the entire screen from the center
            const maxRadius = Math.sqrt(Math.pow(viewportWidth, 2) + Math.pow(viewportHeight, 2));

            setCircleSize(progress * maxRadius);

            // Content starts appearing when circle is large
            if (progress > 0.6) {
                setOpacity(Math.min((progress - 0.6) / 0.3, 1));
            } else {
                setOpacity(0);
            }

            setIsExpanded(progress > 0.9);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
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
                <div className="what-we-do-content" style={{ opacity }}>
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
