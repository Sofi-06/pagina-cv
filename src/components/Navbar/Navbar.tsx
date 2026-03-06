import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MapPin } from "lucide-react";
import logo from "../../assets/Copia-de-FInal-Logo-campusprueba2-2-1-scaled.png";
import "./Navbar.css";

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={logo} alt="Campus Virtual Logo" className="logo-img" />
                    </Link>
                </div>

                <ul className="navbar-links">
                    <li><Link to="/" className="active">Home</Link></li>
                    <li><Link to="/campus">Nuestro Campus</Link></li>
                    <li
                        className="dropdown-trigger"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <span className="nav-link-with-icon">
                            Programas Virtuales <ChevronDown size={16} className={isDropdownOpen ? 'rotate' : ''} />
                        </span>

                        {isDropdownOpen && (
                            <div className="mega-menu">
                                <div className="mega-menu-grid">
                                    <div className="mega-menu-column">
                                        <ul className="column-links">
                                            <li><Link to="#">Doctorado en Derecho Público</Link></li>
                                            <li><Link to="#">Especialización en Estructuras</Link></li>
                                            <li><Link to="#">Gerencia de la Cadena de Valor y Productividad</Link></li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-column">
                                        <ul className="column-links">
                                            <li><Link to="#">Gerencia de Mantenimiento y Gestión de Activos</Link></li>
                                            <li><Link to="#">Gerencia Estratégica de Costos</Link></li>
                                            <li><Link to="#">Gestión de Nuevas Tecnologías de Telecomunicaciones</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mega-menu-footer">
                                    <Link to="#">Ver todos nuestros posgrados →</Link>
                                </div>
                            </div>
                        )}
                    </li>
                    <li><Link to="/tutoriales">Tutoriales</Link></li>
                    <li><Link to="/contacto">Contacto</Link></li>
                    <li><a href="https://campusvirtual.santototunja.edu.co/app/metaverso/" target="_blank" rel="noopener noreferrer">Metaverso</a></li>
                </ul>

                <div className="navbar-auth">
                    <div
                        className="login-dropdown-container"
                        onMouseEnter={() => setIsLoginOpen(true)}
                        onMouseLeave={() => setIsLoginOpen(false)}
                    >
                        <button className="login-btn">
                            Iniciar sesión <ChevronDown size={18} className={isLoginOpen ? 'rotate' : ''} />
                        </button>

                        {isLoginOpen && (
                            <div className="login-menu">
                                <ul className="login-options">
                                    <li>
                                        <a href="https://plataformalms.ustatunja.edu.co/login/index.php" target="_blank" rel="noopener noreferrer">
                                            <div className="location-icon">
                                                <MapPin size={16} />
                                            </div>
                                            Tunja
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://aulavirtual.usantotomas.edu.co/login/index.php" target="_blank" rel="noopener noreferrer">
                                            <div className="location-icon">
                                                <MapPin size={16} />
                                            </div>
                                            Bogotá
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://campusvirtual.ustabuca.edu.co/login/index.php" target="_blank" rel="noopener noreferrer">
                                            <div className="location-icon">
                                                <MapPin size={16} />
                                            </div>
                                            Bucaramanga
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://campusvirtual.ustavillavicencio.edu.co/login/index.php" target="_blank" rel="noopener noreferrer">
                                            <div className="location-icon">
                                                <MapPin size={16} />
                                            </div>
                                            Villavicencio
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

