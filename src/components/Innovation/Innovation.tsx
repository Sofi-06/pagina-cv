import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import './Innovation.css';
import card1Img from '../../assets/carrusel_1_Carrusel.png';
import card2Img from '../../assets/carrusel_2_Carrusel.png';
import card3Img from '../../assets/carrusel_3_Carrusel.png';
import botonNextImg from '../../assets/boton_next-03.png';

interface CardData {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    link: string;
}

const cards: CardData[] = [
    { id: 2, image: card2Img, title: 'CLASE INVERTIDA', subtitle: 'Flipped Classroom', link: '#' },
    { id: 1, image: card1Img, title: 'ORGANÍZATE MEJOR', subtitle: 'Herramientas para la Administración de Tareas', link: '#' },
    { id: 3, image: card3Img, title: 'INTELIGENCIA ARTIFICIAL', subtitle: 'Inteligencia Artificial', link: '#' },
];

type Pos = 'pos-left' | 'pos-center' | 'pos-right';

const Innovation = () => {
    const [centerIndex, setCenterIndex] = useState(1);
    const [locked, setLocked] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const largeDesktop = window.innerWidth >= 2560;
        const desktop1920 = window.innerWidth >= 1920;
        const obs = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    obs.disconnect();
                }
            },
            {
                threshold: largeDesktop ? 0.03 : desktop1920 ? 0.06 : 0.15,
                rootMargin: largeDesktop ? '0px 0px -2% 0px' : desktop1920 ? '0px 0px -4% 0px' : '0px',
            }
        );

        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const updateScrollProgress = () => {
            const section = sectionRef.current;
            if (!section) return;

            if (window.innerWidth <= 1024) {
                setScrollProgress(1);
                return;
            }

            const rect = section.getBoundingClientRect();
            const baseTravel = Math.max(section.offsetHeight - window.innerHeight, 1);
            const travelFactor = window.innerWidth >= 2560 ? 0.34 : window.innerWidth >= 1920 ? 0.44 : 1;
            const totalTravel = Math.max(baseTravel * travelFactor, 1);
            const progress = Math.min(Math.max(-rect.top / totalTravel, 0), 1);
            setScrollProgress(progress);
        };

        updateScrollProgress();
        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        window.addEventListener('resize', updateScrollProgress);

        return () => {
            window.removeEventListener('scroll', updateScrollProgress);
            window.removeEventListener('resize', updateScrollProgress);
        };
    }, []);

    const rotate = (dir: 'left' | 'right') => {
        if (locked) return;
        setLocked(true);
        setCenterIndex(prev => {
            const total = cards.length;
            return dir === 'right'
                ? (prev + 1) % total
                : (prev - 1 + total) % total;
        });
        setTimeout(() => setLocked(false), 600);
    };

    const getPos = (cardIndex: number): Pos => {
        const total = cards.length;
        const leftIndex = (centerIndex - 1 + total) % total;
        if (cardIndex === centerIndex) return 'pos-center';
        if (cardIndex === leftIndex) return 'pos-left';
        return 'pos-right';
    };

    const entranceProgress = Math.min(scrollProgress / 0.3, 1);
    const easedEntrance = 1 - Math.pow(1 - entranceProgress, 3);
    const arrowOffset = (1 - easedEntrance) * 96;
    const arrowLift = (1 - easedEntrance) * 18;

    return (
        <section className={`innovation-section sticky-sweep${isVisible ? ' visible' : ''}`} ref={sectionRef}>
            <div className="innovation-inner">
                <h2 className="innovation-title">Innovación</h2>

                <div className="innovation-cards">
                    {cards.map((card, i) => (
                        <div key={card.id} className={`innovation-card ${getPos(i)}`}>
                            <div className="innovation-card-img-wrapper">
                                <img src={card.image} alt={card.title} />
                            </div>

                            <div className="innovation-card-body">
                                <h3>{card.title}</h3>
                                <span className="innovation-card-divider" />
                                <p>{card.subtitle}</p>
                                <a href={card.link} className="innovation-card-btn">Ver más</a>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="innovation-arrows"
                    style={
                        {
                            '--arrow-entrance': `${arrowOffset}px`,
                            '--arrow-lift': `${arrowLift}px`,
                        } as CSSProperties
                    }
                >
                    <button
                        type="button"
                        className="innovation-arrow innovation-arrow-left"
                        onClick={() => rotate('left')}
                        aria-label="Anterior"
                    >
                        <img src={botonNextImg} alt="Anterior" style={{ transform: 'scaleX(-1)' }} />
                    </button>
                    <button
                        type="button"
                        className="innovation-arrow innovation-arrow-right"
                        onClick={() => rotate('right')}
                        aria-label="Siguiente"
                    >
                        <img src={botonNextImg} alt="Siguiente" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Innovation;
