import { useState, useEffect, useRef } from 'react';
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
    // Animación de barrido sticky
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);



    useEffect(() => {
        const obs = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    obs.disconnect(); // se desconecta: nunca más vuelve a false
                }
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
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

    return (
        <section className={`innovation-section sticky-sweep${isVisible ? ' visible' : ''}`} ref={sectionRef}>
            <div className="innovation-inner">
                <h2 className="innovation-title">Innovación</h2>

                <div className="innovation-cards">
                    {cards.map((card, i) => (
                        <div key={card.id} className={`innovation-card ${getPos(i)}`}>

                            {/* Imagen ocupa toda la parte superior */}
                            <div className="innovation-card-img-wrapper">
                                <img src={card.image} alt={card.title} />
                            </div>

                            {/* Contenido con padding */}
                            <div className="innovation-card-body">
                                <h3>{card.title}</h3>
                                <span className="innovation-card-divider" />
                                <p>{card.subtitle}</p>
                                <a href={card.link} className="innovation-card-btn">Ver más</a>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="innovation-arrows">
                    <button type="button" className="innovation-arrow innovation-arrow-left"
                        onClick={() => rotate('left')} aria-label="Anterior">
                        <img src={botonNextImg} alt="Anterior" style={{ transform: 'scaleX(-1)' }} />
                    </button>
                    <button type="button" className="innovation-arrow innovation-arrow-right"
                        onClick={() => rotate('right')} aria-label="Siguiente">
                        <img src={botonNextImg} alt="Siguiente" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Innovation;