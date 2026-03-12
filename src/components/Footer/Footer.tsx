import { Facebook, Instagram, Youtube } from 'lucide-react';
import logo from '../../assets/Logo_Blanco2 (1).png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LOGO */}
        <div className="footer-logo">
          <img src={logo} alt="Logo USTA Campus Virtual" />
        </div>

        {/* DIRECCIONES */}
        <div className="footer-addresses">
          <div className="address-item">
            <strong>Campus Centro Histórico:</strong>
            <p>Cll. 19 N° 11 - 64 - Ofi. Campus Virtual, Segundo piso - Tunja, Colombia.</p>
          </div>
          <div className="address-item">
            <strong>Campus Avenida Universitaria:</strong>
            <p>Av. Univ. #No. 45 - 202 - Ofi. Campus Virtual, Edif. Santo Domingo de Guzman, Tercer Piso, frente a Tic.</p>
          </div>
        </div>

        {/* REDES SOCIALES */}
        <div className="footer-socials">
          <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon">
            <Facebook size={32} strokeWidth={1.5} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon">
            <Instagram size={32} strokeWidth={1.5} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon">
            <Youtube size={32} strokeWidth={1.5} />
          </a>
        </div>

        {/* LEGAL Y COPYRIGHT */}
        <div className="footer-legal">
          <p>Institución de Educación Superior, reconocida mediante Resolución 3645 del 06 de agosto de 1965 expedida por el Ministerio de Justicia</p>
          <p>Institución sujeta a inspección y vigilancia por el Ministerio de Educación Nacional - SNIES 1732</p>
          <p>Todos los derechos reservados.</p>
          <p><a href="#" className="legal-link">Políticas y condiciones de uso.</a></p>
        </div>
      </div>
    </footer>
  );
}