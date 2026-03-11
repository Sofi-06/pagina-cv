import { useState } from 'react';
import './Innovation.css';
import card1Img from '../../assets/carrusel_1_Carrusel.png';
import card2Img from '../../assets/carrusel_2_Carrusel.png';
import card3Img from '../../assets/carrusel_3_Carrusel.png';
import arrowImg from '../../assets/flechaCampus-2-01.png';

interface CardData {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    link: string;
}

const cards: CardData[] = [
    {
        id: 1,
        image: card1Img,
        title: 'ORGANÍZATE MEJOR',
        subtitle: 'Herramientas para la Administración de Tareas',
        link: '#',
    },
    {
        id: 2,
        image: card2Img,
        title: 'CLASE INVERTIDA',
        subtitle: 'Flipped Classroom',
        link: '#',
    },
    {
        id: 3,
        image: card3Img,
        title: 'INTELIGENCIA ARTIFICIAL',
        subtitle: 'Inteligencia Artificial',
        link: '#',
    },
];

const Innovation = () => {
    const [order, setOrder] = useState([0, 1, 2]);
    const [rotating, setRotating] = useState<'left' | 'right' | null>(null);

    const rotate = (direction: 'left' | 'right') => {
        if (rotating) return;
        setRotating(direction);
        setTimeout(() => {
            setOrder(prev => {
                if (direction === 'right') {
                    return [prev[2], prev[0], prev[1]];
                }
                return [prev[1], prev[2], prev[0]];
            });
            setRotating(null);
        }, 500);
    };

    return (
        <section className="innovation-section">
            <h2 className="innovation-title">Innovación</h2>

            <div className={`innovation-cards ${rotating === 'right' ? 'rotate-right' : ''} ${rotating === 'left' ? 'rotate-left' : ''}`}>
                {order.map((cardIndex, position) => {
                    const card = cards[cardIndex];
                    let posClass = 'pos-right';
                    if (position === 0) posClass = 'pos-left';
                    else if (position === 1) posClass = 'pos-center';
                    return (
                        <div key={card.id} className={`innovation-card ${posClass}`}>
                            <div className="innovation-card-img-wrapper">
                                <img src={card.image} alt={card.title} />
                            </div>
                            <h3>{card.title}</h3>
                            <span className="innovation-card-divider" />
                            <p>{card.subtitle}</p>
                            <a href={card.link} className="innovation-card-btn">Ver más</a>
                        </div>
                    );
                })}
            </div>

            <div className="innovation-arrows">
                <button
                    type="button"
                    className="innovation-arrow innovation-arrow-left"
                    onClick={() => rotate('left')}
                    aria-label="Anterior"
                >
                    <img src={arrowImg} alt="Anterior" />
                </button>
                <button
                    type="button"
                    className="innovation-arrow innovation-arrow-right"
                    onClick={() => rotate('right')}
                    aria-label="Siguiente"
                >
                    <img src={arrowImg} alt="Siguiente" />
                </button>
            </div>
        </section>
    );
};

export default Innovation;
