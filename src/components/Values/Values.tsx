import React, { useEffect, useRef, useState } from "react";
import "./Values.css";

type ValueId = "responsabilidad" | "equipo" | "cumplimiento";

interface ValueItem {
  id: ValueId;
  title: string;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    id: "responsabilidad",
    title: "Responsabilidad",
    description:
      "Porque siempre cumplimos y desarrollamos nuestro trabajo de la mejor manera",
  },
  {
    id: "equipo",
    title: "Trabajo en equipo",
    description:
      "Todos aportamos un granito de arena para obtener siempre los mejores resultados",
  },
  {
    id: "cumplimiento",
    title: "Cumplimiento",
    description:
      "Damos soluciones a las necesidades de toda la comunidad educativa",
  },
];

const wrapIndex = (index: number, length: number) => {
  return (index + length) % length;
};

const ORBIT_POSITION_CLASS: Record<ValueId, string> = {
  responsabilidad: "values-orbit__label--left",
  equipo: "values-orbit__label--top",
  cumplimiento: "values-orbit__label--right",
};

const Values: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const showPrevious = () => {
    setActiveIndex((current) => wrapIndex(current - 1, VALUES.length));
  };

  const showNext = () => {
    setActiveIndex((current) => wrapIndex(current + 1, VALUES.length));
  };

  const activeValue = VALUES[activeIndex];
  const orbitItems = VALUES.map((item) => ({
    label: item.title,
    className: `values-orbit__label ${ORBIT_POSITION_CLASS[item.id]}${
      item.id === activeValue.id ? " values-orbit__label--active" : ""
    }`,
  }));

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

      <div className="values-shell">
        <header className="values-header">
          <div className="values-kicker" aria-hidden="true">
            <span />
            <p>NUESTROS VALORES</p>
            <span />
          </div>

          <h2 id="values-title">{activeValue.title}</h2>
          <p className="values-description">{activeValue.description}</p>
        </header>

        <div className="values-floating-card values-floating-card--left" aria-hidden="true">
          <div className="values-floating-card__target">
            <div className="values-image-slot values-image-slot--small" data-slot="left-image" />
          </div>
        </div>

        <div className="values-floating-card values-floating-card--right" aria-hidden="true">
          <div className="values-floating-card__target">
            <div className="values-image-slot values-image-slot--medium" data-slot="right-image" />
          </div>
        </div>

        <div className="values-stage">
          <button
            type="button"
            className="values-arrow values-arrow--left"
            aria-label="Valor anterior"
            onClick={showPrevious}
          >
            <span aria-hidden="true">&#10094;</span>
          </button>

          <div className="values-orbit" aria-hidden="true">
            <span className="values-orbit__outline" />
            {orbitItems.map((item) => (
              <span key={`${activeValue.title}-${item.label}-${item.className}`} className={item.className}>
                {item.label}
              </span>
            ))}
          </div>

          <div className="values-hero" aria-hidden="true">
            <div className="values-hero__core">
              <div className="values-image-slot values-image-slot--hero" data-slot="main-image" />
            </div>
          </div>

          <button
            type="button"
            className="values-arrow values-arrow--right"
            aria-label="Valor siguiente"
            onClick={showNext}
          >
            <span aria-hidden="true">&#10095;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Values;
