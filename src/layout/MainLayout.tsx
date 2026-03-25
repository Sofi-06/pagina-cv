import { cloneElement, isValidElement, type ReactElement, type ReactNode, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import TutorialsPopUp from "../components/TutorialsPopUp/TutorialsPopUp";
import robotImage from "../assets/robot.png";
import "./MainLayout.css";

interface Props {
    children: ReactNode;
    showChatbot?: boolean;
}

const MainLayout = ({ children, showChatbot = false }: Props) => {
    const closeAnimationTimeoutRef = useRef<number | null>(null);
    const [showDesktopChatbot, setShowDesktopChatbot] = useState(false);
    const [isTutorialsOpen, setIsTutorialsOpen] = useState(false);
    const [isTutorialsClosing, setIsTutorialsClosing] = useState(false);

    const openTutorials = () => {
        if (closeAnimationTimeoutRef.current) {
            window.clearTimeout(closeAnimationTimeoutRef.current);
            closeAnimationTimeoutRef.current = null;
        }

        setIsTutorialsClosing(false);
        setIsTutorialsOpen(true);
    };

    const closeTutorials = () => {
        if (!isTutorialsOpen || isTutorialsClosing) {
            return;
        }

        setIsTutorialsClosing(true);
        closeAnimationTimeoutRef.current = window.setTimeout(() => {
            setIsTutorialsOpen(false);
            setIsTutorialsClosing(false);
            closeAnimationTimeoutRef.current = null;
        }, 500);
    };

    const pageContent = isValidElement(children)
        ? cloneElement(children as ReactElement<{ onOpenTutorials?: () => void }>, {
            onOpenTutorials: openTutorials,
        })
        : children;

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
            if (closeAnimationTimeoutRef.current) {
                window.clearTimeout(closeAnimationTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="layout-container">
            <Navbar
                isTutorialsOpen={isTutorialsOpen}
                onOpenTutorials={openTutorials}
                onCloseTutorials={closeTutorials}
            />
            {showChatbot && !isTutorialsOpen && (
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
            <main className="main-content">{pageContent}</main>
            <Footer />
            {isTutorialsOpen && (
                <TutorialsPopUp
                    onClose={closeTutorials}
                    isClosing={isTutorialsClosing}
                />
            )}
        </div>
    );
};

export default MainLayout;
