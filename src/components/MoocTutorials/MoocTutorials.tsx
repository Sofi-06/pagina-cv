import './MoocTutorials.css';
import moocImg from '../../assets/Home_estu1.png';
import tutorialesImg from '../../assets/Home_estu2.png';

const MoocTutorials = () => {
    return (
        <section className="mooc-tutorials-section">
            {/* Blue semicircle arc from previous section */}
            <div className="mooc-tutorials-blue-arc">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0 L1440,0 L1440,40 Q720,140 0,40 Z" fill="#1a1548" />
                </svg>
            </div>

            {/* MOOC Block */}
            <div className="mooc-block">
                <div className="mooc-text">
                    <h2>MOOC:</h2>
                    <p>
                        Accede a la plataforma que tenemos disponible e impulsa tu carrera laboral con nuestros cursos masivos en línea y gratuitos. Puedes realizar los Mooc a tu ritmo y desde cualquier dispositivo y cualquier momento.
                    </p>
                    <a href="https://campusvirtual.santototunja.edu.co/moodle/login/index.php" target="_blank" rel="noopener noreferrer" className="mooc-tutorials-btn">Comienza ahora</a>
                </div>
                <div className="mooc-image-wrapper">
                    <div className="deco-pink-circle" />
                    <div className="deco-cyan-splash top-right" />
                    <div className="deco-yellow-blob" />
                    <div className="deco-pink-small" />
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
            <div className="tutoriales-block">
                <div className="tutoriales-image-wrapper">
                    <div className="deco-yellow-blob-tut" />
                    <div className="deco-cyan-splash-tut" />
                    <div className="deco-orange-circle" />
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
    );
};

export default MoocTutorials;
