import { useEffect, useState } from "react";
import imagenInicial from "../../assets/Captura de pantalla 2026-03-19 161159.png";
import "./QuienesSomos.css";

const titulo = "\u00bfQUI\u00c9NES SOMOS?";

function QuienesSomos() {
    const [isTouchLayout, setIsTouchLayout] = useState(false);
    const [mobileReveal, setMobileReveal] = useState(false);

    useEffect(() => {
        const touchMedia = window.matchMedia("(pointer: coarse), (max-width: 1024px)");
        let timeoutId: number | undefined;

        const updateTouchLayout = () => {
            const nextIsTouchLayout = touchMedia.matches || "ontouchstart" in window;

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
        touchMedia.addEventListener("change", updateTouchLayout);
        window.addEventListener("resize", updateTouchLayout);

        return () => {
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }

            touchMedia.removeEventListener("change", updateTouchLayout);
            window.removeEventListener("resize", updateTouchLayout);
        };
    }, []);

    return (
        <section className="quienes-somos-section" aria-labelledby="quienes-somos-title">
            <div
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
                    <span className="shape shape--circle-fill shape--circle-fill-bottom" />
                    <span className="shape shape--triangle shape--triangle-far-left" />
                    <span className="shape shape--triangle shape--triangle-left" />
                    <span className="shape shape--triangle shape--triangle-top" />
                    <span className="shape shape--triangle shape--triangle-bottom" />
                    <span className="shape shape--triangle shape--triangle-right" />
                    <span className="shape shape--triangle-fill shape--triangle-fill-left" />
                    <span className="shape shape--triangle-fill shape--triangle-fill-right" />
                </div>

                <div className="quienes-somos-card__content">
                    <h1 id="quienes-somos-title" className="quienes-somos-card__title" aria-label={titulo}>
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
