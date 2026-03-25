import { useEffect, useState, useRef } from "react";
import imagenInicial from "../../assets/Quienes somos_fondo-tex.png";
import "./QuienesSomos.css";

const titulo = "\u00bfQUI\u00c9NES SOMOS?";

function QuienesSomos() {
    const [isTouchLayout, setIsTouchLayout] = useState(false);
    const [mobileReveal, setMobileReveal] = useState(false);
    const [circleScale, setCircleScale] = useState(1.0);
    const [titleLift, setTitleLift] = useState(0);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            let scale = 1.0;
            let lift = 0;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const percentScrolled = 1 - Math.max(0, Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)) / Math.min(windowHeight, rect.height);
                scale = 1.0 + percentScrolled * 60.0;

                if (!isTouchLayout) {
                    lift = percentScrolled * 1000;
                }
            }

            setCircleScale(scale);
            setTitleLift(lift);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isTouchLayout]);

    useEffect(() => {
        const compactLayoutMedia = window.matchMedia("(max-width: 1024px)");
        let timeoutId: number | undefined;

        const updateTouchLayout = () => {
            const nextIsTouchLayout = compactLayoutMedia.matches;

            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }

            setIsTouchLayout(nextIsTouchLayout);
            setMobileReveal(false);

            if (nextIsTouchLayout) {
                timeoutId = window.setTimeout(() => {
                    setMobileReveal(true);
                }, 500);
            }
        };

        updateTouchLayout();
        compactLayoutMedia.addEventListener("change", updateTouchLayout);
        window.addEventListener("resize", updateTouchLayout);

        return () => {
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }

            compactLayoutMedia.removeEventListener("change", updateTouchLayout);
            window.removeEventListener("resize", updateTouchLayout);
        };
    }, []);

    return (
        <section className="quienes-somos-section" aria-labelledby="quienes-somos-title">
            <div
                ref={sectionRef}
                className={`quienes-somos-card${isTouchLayout ? " is-touch-layout" : ""}${mobileReveal ? " is-mobile-reveal" : ""}`}
                tabIndex={0}
                aria-label="Seccion interactiva Quienes Somos"
            >
                <img
                    src={imagenInicial}
                    alt="Fondo de la seccion Quienes Somos"
                    className="quienes-somos-card__image"
                />

                <div className="quienes-somos-card__overlay" aria-hidden="true" />

                <div className="quienes-somos-card__decor" aria-hidden="true">
                    <span className="shape shape--striped-circle" />
                    <span className="shape shape--line-vertical shape--line-vertical-left" />
                    <span className="shape shape--line-vertical shape--line-vertical-right" />
                    <span className="shape shape--line-horizontal shape--line-horizontal-top" />
                    <span className="shape shape--line-horizontal shape--line-horizontal-bottom" />
                    <span className="shape shape--circle-outline shape--circle-outline-top" />
                    <span className="shape shape--circle-outline shape--circle-outline-top-right" />
                    <span className="shape shape--circle-outline shape--circle-outline-center" />
                    <span className="shape shape--circle-outline shape--circle-outline-large" />
                    <span className="shape shape--circle-fill shape--circle-fill-right" />
                    {/* Círculo inferior central animado */}
                    <span
                        className="shape shape--circle-fill shape--circle-fill-bottom"
                        style={{
                            transform: `scale(${circleScale})`,
                            transition: 'transform 0.8s cubic-bezier(0.2,1,0.2,1)',
                        }}
                    />
                    <span className="shape shape--triangle shape--triangle-far-left" />
                    <span className="shape shape--triangle shape--triangle-left" />
                    <span className="shape shape--triangle shape--triangle-top" />
                    <span className="shape shape--triangle shape--triangle-bottom" />
                    <span className="shape shape--triangle shape--triangle-right" />
                    <span className="shape shape--triangle-fill shape--triangle-fill-left" />
                    <span className="shape shape--triangle-fill shape--triangle-fill-right" />
                </div>

                <div
                    className="quienes-somos-card__content"
                    style={{ transform: `translateY(-${titleLift}px)` }}
                >
                    <h1
                        id="quienes-somos-title"
                        className="quienes-somos-card__title"
                        aria-label={titulo}
                    >
                        {Array.from(titulo).map((character, index) => (
                            <span
                                key={`${character}-${index}`}
                                className={`quienes-somos-card__letter${character === " " ? " is-space" : ""}`}
                                style={{ "--index": index } as React.CSSProperties}
                                aria-hidden="true"
                            >
                                {character === " " ? "\u00A0" : character}
                            </span>
                        ))}
                    </h1>
                </div>
            </div>
        </section>
    );
}

export default QuienesSomos;
