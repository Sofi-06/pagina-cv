import { type ReactNode, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import TutorialsPopUp from "../components/TutorialsPopUp/TutorialsPopUp";
import ContactPopUp from "../components/ContactPopUp/ContactPopUp";
import LayoutUiContext from "../context/LayoutUiContext";
import robotImage from "../assets/ekkant-robot-22566_512.gif";
import "./MainLayout.css";

interface Props {
    children: ReactNode;
    showChatbot?: boolean;
}

const MainLayout = ({ children, showChatbot = false }: Props) => {
    const tutorialsCloseAnimationTimeoutRef = useRef<number | null>(null);
    const contactCloseAnimationTimeoutRef = useRef<number | null>(null);
    const [showDesktopChatbot, setShowDesktopChatbot] = useState(false);
    const [isTutorialsOpen, setIsTutorialsOpen] = useState(false);
    const [isTutorialsClosing, setIsTutorialsClosing] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isContactClosing, setIsContactClosing] = useState(false);

    const clearPopupTimeouts = () => {
        if (tutorialsCloseAnimationTimeoutRef.current) {
            window.clearTimeout(tutorialsCloseAnimationTimeoutRef.current);
            tutorialsCloseAnimationTimeoutRef.current = null;
        }

        if (contactCloseAnimationTimeoutRef.current) {
            window.clearTimeout(contactCloseAnimationTimeoutRef.current);
            contactCloseAnimationTimeoutRef.current = null;
        }
    };

    const openTutorials = () => {
        clearPopupTimeouts();
        setIsTutorialsClosing(false);
        setIsTutorialsOpen(true);
        setIsContactOpen(false);
        setIsContactClosing(false);
    };

    const closeTutorials = () => {
        if (!isTutorialsOpen || isTutorialsClosing) {
            return;
        }

        setIsTutorialsClosing(true);
        tutorialsCloseAnimationTimeoutRef.current = window.setTimeout(() => {
            setIsTutorialsOpen(false);
            setIsTutorialsClosing(false);
            tutorialsCloseAnimationTimeoutRef.current = null;
        }, 500);
    };

    const openContact = () => {
        clearPopupTimeouts();
        setIsContactClosing(false);
        setIsContactOpen(true);
        setIsTutorialsOpen(false);
        setIsTutorialsClosing(false);
    };

    const closeContact = () => {
        if (!isContactOpen || isContactClosing) {
            return;
        }

        setIsContactClosing(true);
        contactCloseAnimationTimeoutRef.current = window.setTimeout(() => {
            setIsContactOpen(false);
            setIsContactClosing(false);
            contactCloseAnimationTimeoutRef.current = null;
        }, 500);
    };

    const layoutUiValue = {
        openTutorials,
        openContact,
    };

    useEffect(() => {
        if (!showChatbot) {
            return;
        }

        const updateChatbotVisibility = () => {
            if (window.innerWidth <= 1024) {
                setShowDesktopChatbot(true);
                return;
            }

            const carousel = document.querySelector(".home-carousel-wrapper");
            if (!carousel) {
                setShowDesktopChatbot(true);
                return;
            }

            const carouselHeight = carousel.getBoundingClientRect().height;
            setShowDesktopChatbot(window.scrollY > carouselHeight * 0.22);
        };

        updateChatbotVisibility();
        window.addEventListener("scroll", updateChatbotVisibility, { passive: true });
        window.addEventListener("resize", updateChatbotVisibility);

        return () => {
            window.removeEventListener("scroll", updateChatbotVisibility);
            window.removeEventListener("resize", updateChatbotVisibility);
        };
    }, [showChatbot]);

    useEffect(() => {
        return () => {
            clearPopupTimeouts();
        };
    }, []);

    return (
        <LayoutUiContext.Provider value={layoutUiValue}>
            <div className="layout-container">
                <Navbar
                    isTutorialsOpen={isTutorialsOpen}
                    isContactOpen={isContactOpen}
                    onOpenTutorials={openTutorials}
                    onCloseTutorials={closeTutorials}
                    onOpenContact={openContact}
                    onCloseContact={closeContact}
                />
                {showChatbot && !isTutorialsOpen && !isContactOpen && (
                    <a
                        href="https://campusvirtual.santototunja.edu.co/app/ChatIA/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`chatbot-fab${showDesktopChatbot ? " is-visible" : ""}`}
                        aria-label="Abrir chatbot Campus Virtual"
                    >
                        <img src={robotImage} alt="Chatbot Campus Virtual" className="chatbot-fab-image" />
                    </a>
                )}
                <main className="main-content">{children}</main>
                <Footer />
                {isTutorialsOpen && (
                    <TutorialsPopUp
                        onClose={closeTutorials}
                        isClosing={isTutorialsClosing}
                    />
                )}
                {isContactOpen && (
                    <ContactPopUp
                        onClose={closeContact}
                        isClosing={isContactClosing}
                    />
                )}
            </div>
        </LayoutUiContext.Provider>
    );
};

export default MainLayout;
