import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, MapPin, Menu, X } from "lucide-react";
import logo from "../../assets/Copia-de-FInal-Logo-campusprueba2-2-1-scaled.png";
import "./Navbar.css";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const loginMenuRef = useRef<HTMLDivElement | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isExternalOpen, setIsExternalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // For mobile: toggle on click instead of hover
    const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
    const [mobileExternalOpen, setMobileExternalOpen] = useState(false);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setMobileProgramsOpen(false);
        setMobileExternalOpen(false);
    };

    const toggleLoginMenu = () => {
        setIsLoginOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!loginMenuRef.current?.contains(event.target as Node)) {
                setIsLoginOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsLoginOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const goToHomeTop = () => {
        closeMobileMenu();

        if (location.pathname !== "/") {
            navigate("/");
        }

        window.requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <div className="navbar-logo">
                    <Link to="/" onClick={(event) => {
                        event.preventDefault();
                        goToHomeTop();
                    }}>
                        <img src={logo} alt="Campus Virtual Logo" className="logo-img" />
                    </Link>
                </div>

                {/* Desktop nav links / Mobile sidebar */}
                <ul className={`navbar-links ${isMobileMenuOpen ? "mobile-active" : ""}`}>
                    {/* Header inside the sidebar with Close Button */}
                    <div className="sidebar-header">
                        <button className="sidebar-close-btn" onClick={closeMobileMenu}>
                            <X size={28} />
                        </button>
                    </div>

                    <li><Link to="/" onClick={closeMobileMenu}>Inicio</Link></li>
                    <li><Link to="/campus" onClick={closeMobileMenu}>Nuestro Campus</Link></li>

                    {/* Programas Virtuales - desktop hover, mobile click */}
                    <li
                        className="dropdown-trigger"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => { setIsDropdownOpen(false); setMobileProgramsOpen(false); }}
                    >
                        <span
                            className="nav-link-with-icon"
                            onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                        >
                            Programas Virtuales{" "}
                            <ChevronDown size={15} className={(isDropdownOpen || mobileProgramsOpen) ? "rotate" : ""} />
                        </span>

                        {(isDropdownOpen || mobileProgramsOpen) && (
                            <div className="mega-menu">
                                <div className="mega-menu-grid">
                                    <div className="mega-menu-column">
                                        <h4 className="column-title">Especializaciones</h4>
                                        <ul className="column-links">
                                            <li><a href="https://santotovirtual.edu.co/especializacion-en-estructuras/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Estructuras</a></li>
                                            <li><a href="https://santotovirtual.edu.co/especializacion-en-gerencia-de-la-cadena-de-valor-y-productividad/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Gerencia de la Cadena de Valor y Productividad</a></li>
                                            <li><a href="https://santotovirtual.edu.co/especializacion-en-gerencia-de-mantenimiento-y-gestion-de-activos/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Gerencia de Mantenimiento y Gestión de Activos</a></li>
                                            <li><a href="https://santotovirtual.edu.co/especializacion-en-gerencia-estrategica-de-costos/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Gerencia Estratégica de Costos</a></li>
                                            <li><a href="https://santotovirtual.edu.co/especializacion-en-gestion-de-las-nuevas-tecnologias-de-las-telecomunicaciones/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Gestión de Nuevas Tecnologías de Telecomunicaciones</a></li>
                                            <li><a href="https://santotovirtual.edu.co/especializacion-en-liderazgo-e-innovacion-educativa/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Liderazgo e Innovación Educativa</a></li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-column">
                                        <h4 className="column-title">Maestrías</h4>
                                        <ul className="column-links">
                                            <li><a href="https://santotovirtual.edu.co/maestria-en-geotecnia-vial-y-pavimentos/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Geotecnia Vial y Pavimentos</a></li>
                                            <li><a href="https://santotovirtual.edu.co/maestria-en-inclusion-educacion-y-diversidad/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Inclusión, Educación y Diversidad</a></li>
                                            <li><a href="https://santotovirtual.edu.co/maestria-en-marketing-internacional-y-negocios/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Marketing Internacional y Negocios</a></li>
                                        </ul>
                                    </div>
                                    <div className="mega-menu-column">
                                        <h4 className="column-title">Doctorados</h4>
                                        <ul className="column-links">
                                            <li><a href="https://santotovirtual.edu.co/doctorado-en-derecho-publico/" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Derecho Público</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>

                    <li><Link to="/tutoriales" onClick={closeMobileMenu}>Tutoriales</Link></li>
                    <li><Link to="/contacto" onClick={closeMobileMenu}>Contacto</Link></li>
                    <li>
                        <a
                            href="https://campusvirtual.santototunja.edu.co/app/metaverso/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMobileMenu}
                        >
                            Metaverso
                        </a>
                    </li>

                    {/* Enlaces Externos - desktop hover, mobile click */}
                    <li
                        className="dropdown-trigger"
                        onMouseEnter={() => setIsExternalOpen(true)}
                        onMouseLeave={() => { setIsExternalOpen(false); setMobileExternalOpen(false); }}
                    >
                        <span
                            className="nav-link-with-icon"
                            onClick={() => setMobileExternalOpen(!mobileExternalOpen)}
                        >
                            Enlaces Externos{" "}
                            <ChevronDown size={15} className={(isExternalOpen || mobileExternalOpen) ? "rotate" : ""} />
                        </span>

                        {(isExternalOpen || mobileExternalOpen) && (
                            <div className="external-dropdown">
                                <ul className="external-links">
                                    <li><a href="https://www.santototunja.edu.co/" target="_blank" rel="noopener noreferrer">santototunja.edu.co</a></li>
                                    <li><a href="https://santotoservices.com/" target="_blank" rel="noopener noreferrer">santoto-service</a></li>
                                    <li><a href="https://santototunja.co/" target="_blank" rel="noopener noreferrer">santotoNews</a></li>
                                    <li><a href="https://campusvirtual.santototunja.edu.co/virtual-challenge/" target="_blank" rel="noopener noreferrer">Virtual Challenge</a></li>
                                    <li><a href="https://bienestarintegral.santototunja.co/" target="_blank" rel="noopener noreferrer">Bienestar integral virtual</a></li>
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>

                {/* Hamburger button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>

                {/* Desktop auth button */}
                <div className="navbar-auth">
                    <div className="login-dropdown-container" ref={loginMenuRef}>
                        <button className="login-btn" type="button" onClick={toggleLoginMenu}>
                            Iniciar Sesión
                        </button>

                        {isLoginOpen && (
                            <div className="login-menu">
                                <ul className="login-options">
                                    <li>
                                        <a href="https://plataformalms.ustatunja.edu.co/login/index.php" target="_blank" rel="noopener noreferrer" onClick={() => setIsLoginOpen(false)}>
                                            <div className="location-icon"><MapPin size={15} /></div>
                                            Tunja
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://aulavirtual.usantotomas.edu.co/login/index.php" target="_blank" rel="noopener noreferrer" onClick={() => setIsLoginOpen(false)}>
                                            <div className="location-icon"><MapPin size={15} /></div>
                                            Bogotá
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://campusvirtual.ustabuca.edu.co/login/index.php" target="_blank" rel="noopener noreferrer" onClick={() => setIsLoginOpen(false)}>
                                            <div className="location-icon"><MapPin size={15} /></div>
                                            Bucaramanga
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://campusvirtual.ustavillavicencio.edu.co/login/index.php" target="_blank" rel="noopener noreferrer" onClick={() => setIsLoginOpen(false)}>
                                            <div className="location-icon"><MapPin size={15} /></div>
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
