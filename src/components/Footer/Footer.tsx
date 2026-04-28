import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import logo from '../../assets/Logo_Blanco2 (1).png';
import './Footer.css';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateReveal = () => {
      if (!footerRef.current) {
        return;
      }

      const rect = footerRef.current.getBoundingClientRect();
      const nextProgress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / window.innerHeight));

      setRevealProgress((current) => {
        if (Math.abs(current - nextProgress) < 0.01) {
          return current;
        }

        return nextProgress;
      });
    };

    const handleViewportChange = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateReveal);
    };

    updateReveal();
    window.addEventListener('scroll', handleViewportChange, { passive: true });
    window.addEventListener('resize', handleViewportChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, []);

  return (
    <footer
      className="footer"
      ref={footerRef}
      style={{ '--footer-progress': revealProgress } as CSSProperties}
    >
      <div className="footer-stage">
        <div className="footer-container">
          <div className="footer-logo">
            <img src={logo} alt="Logo USTA Campus Virtual" />
          </div>

          <div className="footer-addresses">
            <div className="address-item">
              <strong>Campus Centro Histórico:</strong>
              <p>Cll. 19 N 11 - 64 - Ofi. Campus Virtual, Segundo piso - Tunja, Colombia.</p>
            </div>
            <div className="address-item">
              <strong>Campus Avenida Universitaria:</strong>
              <p>Av. Univ. #No. 45 - 202 - Ofi. Campus Virtual, Edif. Santo Domingo de Guzmán, Tercer Piso, frente a Tic.</p>
            </div>
          </div>

          <div className="footer-socials">
            <a href="https://www.facebook.com/campusvirtualustatunja/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook Campus Virtual USTA Tunja">
              <Facebook size={32} strokeWidth={1.5} />
            </a>
            <a href="https://www.instagram.com/campusvirtual_santototunja?igsh=MTZndGx1b2NnOHVqaA%3D%3D" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram Campus Virtual USTA Tunja">
              <Instagram size={32} strokeWidth={1.5} />
            </a>
            <a href="https://www.youtube.com/channel/UCuVKb1o4IXyh2fItLZFxUUw" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube Campus Virtual USTA Tunja">
              <Youtube size={32} strokeWidth={1.5} />
            </a>
          </div>

          <div className="footer-legal">
            <p>Institución de Educación Superior, reconocida mediante Resolución 3645 del 06 de agosto de 1965 expedida por el Ministerio de Justicia.</p>
            <p>Institución sujeta a inspección y vigilancia por el Ministerio de Educación Nacional - SNIES 1732.</p>
            <p>Todos los derechos reservados.</p>
            <p><a href="#" className="legal-link">Políticas y condiciones de uso.</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
