import { useEffect, useRef, useState } from 'react';
import boyImg from '../../assets/imag-01.png';
import backgroundImg from '../../assets/Quienes somos_fondo-tex.png';
import './QueHacemos.css';

const EXIT_TRIGGER_VIEWPORT_RATIO = 0.14;

function QueHacemos() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [exit, setExit] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const valuesSection = document.querySelector('.values-section');
            if (!sectionRef.current || !valuesSection) return;
            const rect = valuesSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Si la sección Values entra en pantalla, activar salida
            const exitTriggerPoint = windowHeight * EXIT_TRIGGER_VIEWPORT_RATIO;
            if (rect.top <= exitTriggerPoint && rect.bottom > 0) {
                setExit(true);
            } else {
                setExit(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            className={`que-hacemos${exit ? ' que-hacemos--exit' : ''}`}
            aria-labelledby="que-hacemos-title"
            ref={sectionRef}
        >
            <div
                className="que-hacemos__bg"
                aria-hidden="true"
                style={{ backgroundImage: `url(${backgroundImg})` }}
            />
            <div className="que-hacemos__wash" aria-hidden="true" />
            <span className="que-hacemos__corner" aria-hidden="true" />
            <span className="que-hacemos__line que-hacemos__line--top-far-left" aria-hidden="true" />
            <span className="que-hacemos__line que-hacemos__line--top-left" aria-hidden="true" />
            <span className="que-hacemos__line que-hacemos__line--top-right" aria-hidden="true" />
            <span className="que-hacemos__line que-hacemos__line--bottom" aria-hidden="true" />
            <span className="que-hacemos__ring que-hacemos__ring--top-right" aria-hidden="true" />
            <span className="que-hacemos__ring que-hacemos__ring--pink" aria-hidden="true" />
            <span className="que-hacemos__ring que-hacemos__ring--bottom-right" aria-hidden="true" />
            <span className="que-hacemos__fill-circle" aria-hidden="true" />

            <div className="que-hacemos__inner">
                <div className="que-hacemos__copy">
                    <h2 id="que-hacemos-title">¿Qué hacemos?</h2>
                    <p>
                        Nuestro campo de acción está basado en el uso pedagógico de las TIC, los
                        recursos para el aprendizaje, los ambientes virtuales de aprendizaje
                        interactivos, la infraestructura tecnológica adecuada y suficiente,
                        partiendo de una gestión académica y administrativa que promueve la
                        Educación virtual con impacto social, humanizante, de desarrollo y de
                        crecimiento.
                    </p>
                </div>

                <div className="que-hacemos__visual" aria-hidden="true">
                    <span className="que-hacemos__triangle que-hacemos__triangle--left" />
                    <span className="que-hacemos__triangle que-hacemos__triangle--top" />
                    <span className="que-hacemos__triangle que-hacemos__triangle--center" />
                    <span className="que-hacemos__triangle que-hacemos__triangle--right" />
                    <span className="que-hacemos__triangle que-hacemos__triangle--outline" />
                    <img src={boyImg} alt="" className="que-hacemos__boy" />
                </div>
            </div>
        </section>
    );
}

export default QueHacemos;
