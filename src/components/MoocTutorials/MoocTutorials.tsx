import { useEffect, useRef, useState } from 'react';
import './MoocTutorials.css';
import moocImg from '../../assets/Home_estu1.png';
import tutorialesImg from '../../assets/Home_estu2.png';
import formaAzul08 from '../../assets/Formas-azul-08.png';
import formaAzul11 from '../../assets/Formas-azul-11.png';
import lineaAzul05 from '../../assets/Formas-Azul1-05.png';
import lineaAzul06 from '../../assets/Formas-Azul1-06.png';
import lineaAzul03 from '../../assets/Formas-Azul1-03.png';
import lineaAzul04 from '../../assets/Formas-Azul1-04.png';
import rosado01 from '../../assets/Formas_rosado-01.png';
import rosado02 from '../../assets/Formas_rosado-02.png';

const MoocTutorials = () => {
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
            { threshold: 0.1, rootMargin: '0px 0px 150px 0px' }
        );
        if (moocRef.current) obs.observe(moocRef.current);
        if (tutRef.current) obs.observe(tutRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div className={`mooc-tutorials-wrapper${moocScrolled ? ' mooc-scrolled' : ''}${tutScrolled ? ' tut-scrolled' : ''}`} ref={wrapperRef}>
        <section className="mooc-tutorials-section">
            {/* Blue semicircle arc from previous section */}
            <div className="mooc-tutorials-blue-arc">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0 L1440,0 L1440,40 Q720,140 0,40 Z" fill="#1a1548" />
                </svg>
            </div>

            {/* MOOC Block */}
            <div className="mooc-block" ref={moocRef}>
                <div className="mooc-text">
                    <h2>MOOC:</h2>
                    <p>
                        Accede a la plataforma que tenemos disponible e impulsa tu carrera laboral con nuestros cursos masivos en línea y gratuitos. Puedes realizar los Mooc a tu ritmo y desde cualquier dispositivo y cualquier momento.
                    </p>
                    <a href="https://campusvirtual.santototunja.edu.co/moodle/login/index.php" target="_blank" rel="noopener noreferrer" className="mooc-tutorials-btn">Comienza ahora</a>
                </div>
                <div className="mooc-image-wrapper">
                    <img src={formaAzul08} alt="" className="deco-blue-form mooc-blue-form" />
                    <img src={rosado01} alt="" className="deco-rosado mooc-rosado" />
                    <img src={lineaAzul05} alt="" className="deco-linea mooc-linea-1" />
                    <img src={lineaAzul06} alt="" className="deco-linea mooc-linea-2" />
                    <div className="deco-cyan-splash top-right" />
                    <div className="deco-yellow-blob" />
                    <img src={moocImg} alt="Estudiante MOOC" className="mooc-img" />
                </div>
            </div>

            {/* Curved separator */}
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

            {/* Tutoriales Block */}
            <div className="tutoriales-block" ref={tutRef}>
                <div className="tutoriales-image-wrapper">
                    <div className="deco-yellow-blob-tut" />
                    <div className="deco-cyan-splash-tut" />
                    <img src={formaAzul11} alt="" className="deco-blue-form tut-blue-form" />
                    <img src={rosado02} alt="" className="deco-rosado tut-rosado" />
                    <img src={lineaAzul03} alt="" className="deco-linea tut-linea-1" />
                    <img src={lineaAzul04} alt="" className="deco-linea tut-linea-2" />
                    <img src={tutorialesImg} alt="Estudiante Tutoriales" className="tutoriales-img" />
                </div>
                <div className="tutoriales-text">
                    <h2>Tutoriales:</h2>
                    <p>
                        ¿Quieres saber más sobre algunas herramientas digitales que pueden apoyar tu práctica académica? En este espacio encontrarás material de apoyo que te ayudará en tu proceso formativo.
                    </p>
                    <button type="button" className="mooc-tutorials-btn">Ver más</button>
                </div>
            </div>
        </section>
        {/* Scroll room – same bg, invisible to user */}
        <div className="mooc-tutorials-scroll-room" style={{ height: '60vh' }} />
        </div>
    );
};

export default MoocTutorials;
