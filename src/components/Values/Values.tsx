import React, { useEffect, useRef, useState } from "react";
import "./Values.css";

interface ValueItem {
  title: string;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    title: "Responsabilidad",
    description:
      "Porque siempre cumplimos y desarrollamos nuestro trabajo de la mejor manera",
  },
  {
    title: "Trabajo en equipo",
    description:
      "Construimos resultados solidos cuando colaboramos, compartimos ideas y avanzamos juntos.",
  },
  {
    title: "Cumplimiento",
    description:
      "Honramos cada compromiso con orden, constancia y atencion a cada detalle.",
  },
];

const wrapIndex = (index: number, length: number) => {
  return (index + length) % length;
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
  const orbitItems = [
    {
      label: activeValue.title,
      className: "values-orbit__label values-orbit__label--left values-orbit__label--active",
    },
    {
      label: VALUES[wrapIndex(activeIndex + 1, VALUES.length)].title,
      className: "values-orbit__label values-orbit__label--top",
    },
    {
      label: VALUES[wrapIndex(activeIndex + 2, VALUES.length)].title,
      className: "values-orbit__label values-orbit__label--right",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`values-section${isVisible ? " values-section--visible" : ""}`}
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
            <div className="values-image-slot values-image-slot--small">
              <span>Imagen</span>
            </div>
          </div>
        </div>

        <div className="values-floating-card values-floating-card--right" aria-hidden="true">
          <div className="values-floating-card__target">
            <div className="values-image-slot values-image-slot--medium">
              <span>Imagen</span>
            </div>
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
              <div className="values-image-slot values-image-slot--hero">
                <span>Imagen principal</span>
              </div>
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
