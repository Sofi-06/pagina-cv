import { useEffect, useRef, useState } from 'react';
import './MoocTutorials.css';
import { useLayoutUi } from '../../context/LayoutUiContext';
import moocImg from '../../assets/Home_estu1.png';
import tutorialesImg from '../../assets/Home_estu2.png';
import formaAzul08 from '../../assets/Formas-azul-08.png';
import formaAzul11 from '../../assets/Formas-azul-11.png';
import punticosAzul from '../../assets/Formas-Azul1-10.png';
import lineaAzul05 from '../../assets/Formas-Azul1-05.png';
import lineaAzul06 from '../../assets/Formas-Azul1-06.png';
import lineaAzul03 from '../../assets/Formas-Azul1-03.png';
import lineaAzul04 from '../../assets/Formas-Azul1-04.png';
import rosado01 from '../../assets/Formas_rosado-01.png';
import rosado02 from '../../assets/Formas_rosado-02.png';

interface MoocTutorialsProps {
    onOpenTutorials?: () => void;
}

const MoocTutorials = ({ onOpenTutorials }: MoocTutorialsProps) => {
    const layoutUi = useLayoutUi();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const moocRef = useRef<HTMLDivElement>(null);
    const tutRef = useRef<HTMLDivElement>(null);
    const [moocScrolled, setMoocScrolled] = useState(false);
    const [tutScrolled, setTutScrolled] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.target === moocRef.current) setMoocScrolled(entry.isIntersecting);
                    if (entry.target === tutRef.current) setTutScrolled(entry.isIntersecting);
                });
            },
            { threshold: 0.28, rootMargin: '0px 0px -12% 0px' }
        );
        if (moocRef.current) obs.observe(moocRef.current);
        if (tutRef.current) obs.observe(tutRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div className={`mooc-tutorials-wrapper${moocScrolled ? ' mooc-scrolled' : ''}${tutScrolled ? ' tut-scrolled' : ''}`} ref={wrapperRef}>
            <section className="mooc-tutorials-section">
                <div className="mooc-tutorials-blue-arc">
                    <svg viewBox="0 0 1440 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,0 L1440,0 L1440,34 Q720,170 0,34 Z" fill="#1a1548" />
                    </svg>
                </div>

                <div className="mooc-block" ref={moocRef}>
                    <div className="mooc-text">
                        <h2>MOOC:</h2>
                        <p>
                            Accede a la plataforma que tenemos disponible e impulsa tu carrera laboral con nuestros cursos masivos en línea y gratuitos. Realiza los MOOCs sin presiones: elige tu dispositivo, define tu horario y avanza a tu ritmo.
                        </p>
                        <a href="https://campusvirtual.santototunja.edu.co/moodle/login/index.php" target="_blank" rel="noopener noreferrer" className="mooc-tutorials-btn">Comienza ahora</a>
                    </div>
                    <div className="mooc-image-wrapper">
                        <img src={formaAzul08} alt="" className="deco-blue-form mooc-blue-form" />
                        <img src={rosado01} alt="" className="deco-rosado mooc-rosado" />
                        <img src={rosado02} alt="" className="deco-rosado deco-rosado-mobile mooc-rosado-mobile" />
                        <img src={lineaAzul05} alt="" className="deco-linea mooc-linea-1" />
                        <img src={lineaAzul06} alt="" className="deco-linea mooc-linea-2" />
                        <img src={moocImg} alt="Estudiante MOOC" className="mooc-img" />
                    </div>
                </div>

                <div className="curved-separator">
                    <svg viewBox="0 0 1440 300" preserveAspectRatio="none">
                        <defs>
                            <filter id="shadow" x="-5%" y="-5%" width="110%" height="120%">
                                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#00000030" />
                            </filter>
                        </defs>
                        <path
                            d="M0,150 L900,150 Q1200,155 1440,350"
                            fill="none"
                            stroke="#bfbfbf"
                            strokeWidth="3.5"
                            filter="url(#shadow)"
                        />
                    </svg>
                </div>

                <div className="tutoriales-block" ref={tutRef}>
                    <div className="tutoriales-image-wrapper">
                        <div className="deco-yellow-blob-tut" />
                        <div className="deco-cyan-splash-tut" />
                        <img src={formaAzul11} alt="" className="deco-blue-form tut-blue-form" />
                        <img src={rosado02} alt="" className="deco-rosado tut-rosado" />
                        <img src={formaAzul08} alt="" className="deco-rosado deco-rosado-mobile tut-rosado-mobile" />
                        <img src={lineaAzul03} alt="" className="deco-linea tut-linea-1" />
                        <img src={lineaAzul04} alt="" className="deco-linea tut-linea-2" />
                        <img src={punticosAzul} alt="Punticos azules" className="deco-punticos-chico" />
                        <img src={tutorialesImg} alt="Estudiante Tutoriales" className="tutoriales-img" />
                    </div>
                    <div className="tutoriales-text">
                        <h2>Tutoriales:</h2>
                        <p>
                           ¿Quieres saber más sobre algunas herramientas digitales que pueden apoyar en tu práctica académica? En este espacio encontrarás material de apoyo que te ayudará en tu proceso formativo.
                        </p>
                        <button
                            type="button"
                            className="mooc-tutorials-btn"
                            onClick={onOpenTutorials ?? layoutUi?.openTutorials}
                        >
                            Ver más
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MoocTutorials;
