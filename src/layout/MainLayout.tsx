import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import robotImage from "../assets/robot.png";
import "./MainLayout.css";

interface Props {
    children: React.ReactNode;
    showChatbot?: boolean;
}

const MainLayout = ({ children, showChatbot = false }: Props) => {
    const [showDesktopChatbot, setShowDesktopChatbot] = useState(false);

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

    return (
        <div className="layout-container">
            <Navbar />
            {showChatbot && (
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
        </div>
    );
};

export default MainLayout;
