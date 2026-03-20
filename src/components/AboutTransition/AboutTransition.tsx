import { useEffect, useRef } from "react";
import "./AboutTransition.css";

function AboutTransition() {
    const transitionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const section = transitionRef.current;

        if (!section) {
            return;
        }

        let frameId = 0;

        const updateProgress = () => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight || 1;
            const distance = Math.max(0, viewportHeight - rect.top);
            const range = Math.max(rect.height - viewportHeight, 1);
            const progress = Math.min(distance / range, 1);

            section.style.setProperty("--transition-progress", progress.toFixed(3));
        };

        const scheduleUpdate = () => {
            cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(updateProgress);
        };

        updateProgress();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
        };
    }, []);

    return (
        <section ref={transitionRef} className="about-transition" aria-hidden="true">
            <div className="about-transition__sticky">
                <div className="about-transition__scene">
                    <span className="about-transition__wash" />
                    <div className="about-transition__dome about-transition__dome--glass">
                        <svg viewBox="0 0 1200 700" preserveAspectRatio="none">
                            <path d="M0 700C88 330 265 70 600 70C935 70 1112 330 1200 700H0Z" />
                        </svg>
                    </div>
                    <div className="about-transition__dome about-transition__dome--yellow">
                        <svg viewBox="0 0 1200 700" preserveAspectRatio="none">
                            <path d="M0 700C88 330 265 70 600 70C935 70 1112 330 1200 700H0Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="about-transition__yellow-section" />
        </section>
    );
}

export default AboutTransition;
