import React, { useEffect, useRef, useState } from "react";
import "./Values.css";
import responsabilidadHero from "../../assets/Valores_ima-responsa.png";
import trabajoHero from "../../assets/Valores_ima-traba-equipo.png";
import cumplimientoHero from "../../assets/Valores_img-puntualidad.png";
import responsabilidadIconSmall from "../../assets/Valores_icono1-respon.png";
import responsabilidadIconLarge from "../../assets/Valores_icono2-respon.png";
import trabajoIconSmall from "../../assets/Valores_icono1-tabaj-equipo.png";
import trabajoIconLarge from "../../assets/Valores_icono2-tabaj-equipo.png";
import cumplimientoIconSmall from "../../assets/Valores_icono1-puntuali.png";
import cumplimientoIconLarge from "../../assets/Valores_icono2-puntuali.png";
import nextButtonIcon from "../../assets/boton_next-03.png";

type ValueId = "responsabilidad" | "equipo" | "cumplimiento";

interface ValueItem {
  id: ValueId;
  title: string;
  description: string;
  heroImage: string;
  smallIcon: string;
  largeIcon: string;
}

const VALUES: ValueItem[] = [
  {
    id: "responsabilidad",
    title: "Responsabilidad",
    description:
      "Porque siempre cumplimos y desarrollamos nuestro trabajo de la mejor manera",
    heroImage: responsabilidadHero,
    smallIcon: responsabilidadIconSmall,
    largeIcon: responsabilidadIconLarge,
  },
  {
    id: "equipo",
    title: "Trabajo en equipo",
    description:
      "Todos aportamos un granito de arena para obtener siempre los mejores resultados",
    heroImage: trabajoHero,
    smallIcon: trabajoIconSmall,
    largeIcon: trabajoIconLarge,
  },
  {
    id: "cumplimiento",
    title: "Cumplimiento",
    description:
      "Damos soluciones a las necesidades de toda la comunidad educativa",
    heroImage: cumplimientoHero,
    smallIcon: cumplimientoIconSmall,
    largeIcon: cumplimientoIconLarge,
  },
];

const wrapIndex = (index: number, length: number) => {
  return (index + length) % length;
};

const VALUES_TRANSITION_MS = 560;

const ORBIT_POSITION_CLASS: Record<ValueId, string> = {
  responsabilidad: "values-orbit__label--left",
  equipo: "values-orbit__label--top",
  cumplimiento: "values-orbit__label--right",
};

const Values: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const swapValue = (nextIndex: number) => {
    if (nextIndex === activeIndex) {
      return;
    }

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    setPreviousIndex(activeIndex);
    setActiveIndex(nextIndex);

    transitionTimeoutRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
      transitionTimeoutRef.current = null;
    }, VALUES_TRANSITION_MS);
  };

  const showPrevious = () => {
    swapValue(wrapIndex(activeIndex - 1, VALUES.length));
  };

  const showNext = () => {
    swapValue(wrapIndex(activeIndex + 1, VALUES.length));
  };

  const activeValue = VALUES[activeIndex];
  const previousValue = previousIndex !== null ? VALUES[previousIndex] : null;

  const getOrbitItems = (value: ValueItem) =>
    VALUES.map((item) => ({
      label: item.title,
      className: `values-orbit__label ${ORBIT_POSITION_CLASS[item.id]} values-orbit__label--${item.id}${
        item.id === value.id ? " values-orbit__label--active" : ""
      }`,
    }));

  const renderHeaderContent = (value: ValueItem, isPrimary: boolean) => (
    <>
      <div className="values-kicker" aria-hidden="true">
        <span />
        <p>NUESTROS VALORES</p>
        <span />
      </div>

      <h2 id={isPrimary ? "values-title" : undefined}>{value.title}</h2>
      <p className="values-description">{value.description}</p>
    </>
  );

  const renderOrbitContent = (value: ValueItem) => {
    const orbitItems = getOrbitItems(value);

    return (
      <>
        <span className="values-orbit__outline" />
        {orbitItems.map((item) => (
          <span key={`${value.id}-${item.label}-${item.className}`} className={item.className}>
            {item.label}
          </span>
        ))}
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`values-section values-section--${activeValue.id}${
        isVisible ? " values-section--visible" : ""
      }`}
      aria-labelledby="values-title"
    >
      <span className="values-ring values-ring--top-left" aria-hidden="true" />
      <span className="values-ring values-ring--top-right" aria-hidden="true" />
      <span className="values-glow values-glow--left" aria-hidden="true" />
      <span className="values-glow values-glow--right" aria-hidden="true" />
      <span className="values-corner values-corner--left" aria-hidden="true" />
      <span className="values-corner values-corner--right" aria-hidden="true" />

      <div className="values-shell">
        <header className="values-header">
          {previousValue && (
            <div className="values-layer values-layer--exit-down" aria-hidden="true">
              {renderHeaderContent(previousValue, false)}
            </div>
          )}

          <div className={`values-layer${previousValue ? " values-layer--enter-down" : ""}`}>
            {renderHeaderContent(activeValue, true)}
          </div>
        </header>

        <div className="values-floating-card values-floating-card--left values-layer-stack" aria-hidden="true">
          {previousValue && (
            <div className="values-layer values-layer--exit-left">
              <img src={previousValue.smallIcon} alt="" className="values-floating-card__image" />
            </div>
          )}

          <div className={`values-layer${previousValue ? " values-layer--enter-left" : ""}`}>
            <img src={activeValue.smallIcon} alt="" className="values-floating-card__image" />
          </div>
        </div>

        <div className="values-floating-card values-floating-card--right values-layer-stack" aria-hidden="true">
          {previousValue && (
            <div className="values-layer values-layer--exit-right">
              <img src={previousValue.largeIcon} alt="" className="values-floating-card__image" />
            </div>
          )}

          <div className={`values-layer${previousValue ? " values-layer--enter-right" : ""}`}>
            <img src={activeValue.largeIcon} alt="" className="values-floating-card__image" />
          </div>
        </div>

        <div className="values-stage">
          <button
            type="button"
            className="values-arrow values-arrow--left"
            aria-label="Valor anterior"
            onClick={showPrevious}
          >
            <img src={nextButtonIcon} alt="" aria-hidden="true" className="values-arrow__icon values-arrow__icon--left" />
          </button>

          <div className="values-orbit" aria-hidden="true">
            {renderOrbitContent(activeValue)}
          </div>

          <div className="values-hero" aria-hidden="true">
            <img src={activeValue.heroImage} alt="" className="values-hero__image" />
          </div>

          <button
            type="button"
            className="values-arrow values-arrow--right"
            aria-label="Valor siguiente"
            onClick={showNext}
          >
            <img src={nextButtonIcon} alt="" aria-hidden="true" className="values-arrow__icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Values;
