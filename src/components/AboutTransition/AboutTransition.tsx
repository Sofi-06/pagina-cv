import { useEffect, useRef, useState, type CSSProperties } from "react";
import studentImg from "../../assets/Home_estu2.png";
import "./AboutTransition.css";

function AboutTransition() {
    const shellRef = useRef<HTMLElement>(null);
    const [entryRadius, setEntryRadius] = useState(0);
    const [exitRadius, setExitRadius] = useState(0);
    const [contentOpacity, setContentOpacity] = useState(0);
    const [entryProgress, setEntryProgress] = useState(0);
    const [exitProgress, setExitProgress] = useState(0);
    const [isStaticReveal, setIsStaticReveal] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const compactLayoutMedia = window.matchMedia("(max-width: 1024px)");
        const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frameId = 0;

        const updateReveal = () => {
            const shell = shellRef.current;
            const prefersStaticReveal = compactLayoutMedia.matches || reducedMotionMedia.matches;

            setIsStaticReveal(prefersStaticReveal);

            if (!shell || prefersStaticReveal) {
                setEntryProgress(1);
                setExitProgress(0);
                setEntryRadius(0);
                setExitRadius(0);
                setContentOpacity(1);
                setIsExpanded(true);
                return;
            }

            const { top, height } = shell.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const isUltraWideViewport = viewportWidth >= 2200;
            const scrollableDistance = Math.max(height - viewportHeight, 1);
            const travelled = Math.min(Math.max(-top, 0), scrollableDistance);
            const progress = travelled / scrollableDistance;
            const entryEnd = isUltraWideViewport ? 0.28 : 0.38;
            const exitStart = isUltraWideViewport ? 0.6 : 0.62;
            const exitDuration = 1 - exitStart;
            const nextEntryProgress = Math.min(progress / entryEnd, 1);
            const nextExitProgress = Math.min(Math.max((progress - exitStart) / exitDuration, 0), 1);
            const entryEase = 1 - Math.pow(1 - nextEntryProgress, 1.55);
            const exitEase = 1 - Math.pow(1 - nextExitProgress, 1.7);
            const initialRadius = isUltraWideViewport
                ? Math.max(viewportWidth * 0.1, viewportHeight * 0.16, 170)
                : Math.max(viewportWidth * 0.16, 150);
            const fullRadius = Math.hypot(viewportWidth, viewportHeight * 1.2);
            const collapsedRadius = isUltraWideViewport
                ? Math.max(viewportWidth * 0.17, viewportHeight * 0.22, 280)
                : Math.max(viewportWidth * 0.28, viewportHeight * 0.34, 240);
            const nextEntryRadius = initialRadius + (fullRadius - initialRadius) * entryEase;
            const nextExitRadius = fullRadius - (fullRadius - collapsedRadius) * exitEase;
            const fadeIn = Math.min(
                Math.max((progress - (isUltraWideViewport ? 0.04 : 0.12)) / (isUltraWideViewport ? 0.16 : 0.2), 0),
                1
            );
            const fadeOut = 1 - Math.min(
                Math.max((progress - (isUltraWideViewport ? 0.76 : 0.66)) / (isUltraWideViewport ? 0.16 : 0.16), 0),
                1
            );
            const nextOpacity = Math.min(fadeIn, fadeOut);

            setEntryProgress(nextEntryProgress);
            setExitProgress(nextExitProgress);
            setEntryRadius(nextEntryRadius);
            setExitRadius(nextExitRadius);
            setContentOpacity(nextOpacity);
            setIsExpanded(nextEntryProgress > 0.92 && nextExitProgress < 0.92);
        };

        const requestUpdate = () => {
            cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(updateReveal);
        };

        requestUpdate();
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        compactLayoutMedia.addEventListener("change", requestUpdate);
        reducedMotionMedia.addEventListener("change", requestUpdate);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
            compactLayoutMedia.removeEventListener("change", requestUpdate);
            reducedMotionMedia.removeEventListener("change", requestUpdate);
        };
    }, []);

    const stageStyle = {
        "--about-copy-opacity": contentOpacity,
        "--about-entry-progress": entryProgress,
        "--about-exit-progress": exitProgress,
    } as CSSProperties;
    const entryStyle = isStaticReveal
        ? undefined
        : ({
              clipPath: `circle(${entryRadius}px at 50% 112%)`,
              WebkitClipPath: `circle(${entryRadius}px at 50% 112%)`,
          } as CSSProperties);
    const panelStyle = isStaticReveal
        ? undefined
        : ({
              clipPath: `circle(${exitRadius}px at 50% -18%)`,
              WebkitClipPath: `circle(${exitRadius}px at 50% -18%)`,
          } as CSSProperties);

    return (
        <section ref={shellRef} className="about-transition-shell">
            <div
                className={`about-transition-stage${isStaticReveal ? " is-static" : ""}${isExpanded ? " is-expanded" : ""}`}
                style={stageStyle}
            >
                <div
                    className={`about-transition-entry${isStaticReveal ? " is-static" : ""}${isExpanded ? " is-expanded" : ""}`}
                    style={entryStyle}
                >
                    <div
                        className={`about-transition${isStaticReveal ? " is-static" : ""}${isExpanded ? " is-expanded" : ""}`}
                        style={panelStyle}
                        aria-labelledby="about-transition-title"
                    >
                        <div className="about-transition__pattern" aria-hidden="true" />
                        <span className="about-transition__corner about-transition__corner--top-left" aria-hidden="true" />
                        <span className="about-transition__line about-transition__line--top" aria-hidden="true" />
                        <span className="about-transition__line about-transition__line--bottom" aria-hidden="true" />
                        <span className="about-transition__ring about-transition__ring--top-right" aria-hidden="true" />
                        <span className="about-transition__ring about-transition__ring--pink" aria-hidden="true" />
                        <span className="about-transition__ring about-transition__ring--copy-large" aria-hidden="true" />
                        <span className="about-transition__ring about-transition__ring--copy-small" aria-hidden="true" />
                        <span className="about-transition__ring about-transition__ring--bottom-fill" aria-hidden="true" />
                        <span className="about-transition__triangle about-transition__triangle--left" aria-hidden="true" />
                        <span className="about-transition__triangle about-transition__triangle--top" aria-hidden="true" />
                        <span className="about-transition__triangle about-transition__triangle--bottom" aria-hidden="true" />
                        <span className="about-transition__triangle about-transition__triangle--right" aria-hidden="true" />
                        <span className="about-transition__triangle about-transition__triangle--right-fill" aria-hidden="true" />

                        <div className="about-transition__inner">
                            <div className="about-transition__visual">
                                <img
                                    src={studentImg}
                                    alt="Estudiante usando un computador portatil"
                                    className="about-transition__student"
                                />
                            </div>

                            <div className="about-transition__copy">
                                <h2 id="about-transition-title" className="about-transition__sr-only">
                                    Nuestra esencia
                                </h2>
                                <p className="about-transition__text">
                                    Somos la dependencia administrativa encargada de apoyar el desarrollo de
                                    los servicios academicos en el marco de los procesos educativos de
                                    Docencia, Investigacion y Proyeccion Social para programas en la
                                    modalidad virtual y presencial; enfocados en el marco comunicativo,
                                    tecnologico, pedagogico y digital.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutTransition;
