import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, MapPin, Menu, X } from "lucide-react";
import logo from "../../assets/Copia-de-FInal-Logo-campusprueba2-2-1-scaled.png";
import "./Navbar.css";

interface NavbarProps {
    readonly isTutorialsOpen: boolean;
    readonly isContactOpen: boolean;
    readonly onOpenTutorials: () => void;
    readonly onCloseTutorials: () => void;
    readonly onOpenContact: () => void;
    readonly onCloseContact: () => void;
}

function Navbar({
    isTutorialsOpen,
    isContactOpen,
    onOpenTutorials,
    onCloseTutorials,
    onOpenContact,
    onCloseContact,
}: Readonly<NavbarProps>) {
    const location = useLocation();
    const navigate = useNavigate();
    const loginMenuRef = useRef<HTMLDivElement | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isExternalOpen, setIsExternalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCompactNav, setIsCompactNav] = useState(false);

    // For mobile: toggle on click instead of hover
    const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
    const [mobileExternalOpen, setMobileExternalOpen] = useState(false);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setMobileProgramsOpen(false);
        setMobileExternalOpen(false);
        setIsDropdownOpen(false);
        setIsExternalOpen(false);
    };

    const toggleLoginMenu = () => {
        setIsLoginOpen((prev) => !prev);
    };

    const handleCloseTransientUi = () => {
        closeMobileMenu();
        onCloseTutorials();
        onCloseContact();
        setIsLoginOpen(false);
    };

    const handlePageLinkClick = (event: ReactMouseEvent<HTMLAnchorElement>, path: string) => {
        handleCloseTransientUi();

        if (location.pathname === path) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
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

    useEffect(() => {
        const mediaQuery = globalThis.matchMedia("(max-width: 1024px)");

        const updateCompactNav = () => {
            setIsCompactNav(mediaQuery.matches);
        };

        updateCompactNav();
        mediaQuery.addEventListener("change", updateCompactNav);

        return () => {
            mediaQuery.removeEventListener("change", updateCompactNav);
        };
    }, []);

    const goToHomeTop = () => {
        handleCloseTransientUi();

        if (location.pathname !== "/") {
            navigate("/");
        }

        globalThis.requestAnimationFrame(() => {
            globalThis.scrollTo({ top: 0, behavior: "smooth" });
        });
    };

    const handleOpenTutorials = () => {
        closeMobileMenu();
        onOpenTutorials();
    };

    const handleOpenContact = () => {
        closeMobileMenu();
        onOpenContact();
    };

    const isProgramsMenuOpen = isCompactNav ? mobileProgramsOpen : isDropdownOpen;
    const isExternalMenuOpen = isCompactNav ? mobileExternalOpen : isExternalOpen;

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

                    <li>
                        <Link to="/" onClick={(event) => handlePageLinkClick(event, "/")}>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/campus" onClick={(event) => handlePageLinkClick(event, "/campus")}>
                            Nuestro Campus
                        </Link>
                    </li>

                    {/* Programas Virtuales - desktop hover, mobile click */}
                    <li
                        className="dropdown-trigger"
                        onMouseEnter={() => {
                            if (!isCompactNav) {
                                setIsDropdownOpen(true);
                            }
                        }}
                        onMouseLeave={() => {
                            if (!isCompactNav) {
                                setIsDropdownOpen(false);
                            }
                        }}
                    >
                        <button
                            type="button"
                            className="nav-link-with-icon"
                            onClick={() => {
                                if (isCompactNav) {
                                    setMobileProgramsOpen((prev) => !prev);
                                }
                            }}
                        >
                            Programas Virtuales{" "}
                            <ChevronDown size={15} className={isProgramsMenuOpen ? "rotate" : ""} />
                        </button>

                        {isProgramsMenuOpen && (
                            <div className="mega-menu">
                                <a
                                    className="mega-menu-helpdesk-inline"
                                    href="https://programasvirtuales.santototunja.edu.co/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeMobileMenu}
                                >
                                    Mesa de Ayuda
                                </a>

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

                    <li>
                        <button
                            type="button"
                            className={`navbar-link-button${isTutorialsOpen ? " is-active" : ""}`}
                            onClick={handleOpenTutorials}
                        >
                            Tutoriales
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className={`navbar-link-button${isContactOpen ? " is-active" : ""}`}
                            onClick={handleOpenContact}
                        >
                            Contacto
                        </button>
                    </li>
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
                        onMouseEnter={() => {
                            if (!isCompactNav) {
                                setIsExternalOpen(true);
                            }
                        }}
                        onMouseLeave={() => {
                            if (!isCompactNav) {
                                setIsExternalOpen(false);
                            }
                        }}
                    >
                        <button
                            type="button"
                            className="nav-link-with-icon"
                            onClick={() => {
                                if (isCompactNav) {
                                    setMobileExternalOpen((prev) => !prev);
                                }
                            }}
                        >
                            Sitios de Interés{" "}
                            <ChevronDown size={15} className={isExternalMenuOpen ? "rotate" : ""} />
                        </button>

                        {isExternalMenuOpen && (
                            <div className="external-dropdown">
                                <ul className="external-links">
                                    <li><a href="https://www.santototunja.edu.co/" target="_blank" rel="noopener noreferrer">Santototunja</a></li>
                                    <li><a href="https://santotoservices.com/" target="_blank" rel="noopener noreferrer">Santoto-service</a></li>
                                    <li><a href="https://santotoup.edu.co/" target="_blank" rel="noopener noreferrer">SantotoUp</a></li>
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
