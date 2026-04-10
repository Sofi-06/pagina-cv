import React, { useEffect, useRef, useState, type CSSProperties } from "react";
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
const ORBIT_ANIMATION_MS = 1200;
const ORBIT_RADIUS = 42;
const ORBIT_CENTER_X = 50;
const ORBIT_CENTER_Y = 48;
const ORBIT_PROGRESS_START = 0.12;
const ORBIT_PROGRESS_END = 0.88;
const ORBIT_STEP_MAP: Record<ValueId, number> = {
  responsabilidad: 0,
  equipo: 0.5,
  cumplimiento: 1,
};

const ORBIT_POSITION_CLASS: Record<ValueId, string> = {
  responsabilidad: "values-orbit__label--left",
  equipo: "values-orbit__label--top",
  cumplimiento: "values-orbit__label--right",
};

const VALUE_LABELS: Record<ValueId, string> = {
  responsabilidad: "Responsabilidad",
  equipo: "Trabajo en equipo",
  cumplimiento: "Cumplimiento",
};

const VALUE_LABEL_PATHS: Partial<Record<ValueId, string>> = {
  responsabilidad: "M 54 162 A 118 118 0 0 1 150 30",
  cumplimiento: "M 10 30 A 118 118 0 0 1 106 162",
};

const getOrbitPoint = (progress: number) => {
  const normalized = ORBIT_PROGRESS_START + ((ORBIT_PROGRESS_END - ORBIT_PROGRESS_START) * progress);
  const angle = Math.PI - (Math.PI * normalized);

  return {
    x: ORBIT_CENTER_X + (ORBIT_RADIUS * Math.cos(angle)),
    y: ORBIT_CENTER_Y - (ORBIT_RADIUS * Math.sin(angle)),
  };
};

const ORBIT_PROGRESS_START_POINT = getOrbitPoint(0);
const ORBIT_PROGRESS_END_POINT = getOrbitPoint(1);
const ORBIT_PROGRESS_PATH = `M ${ORBIT_PROGRESS_START_POINT.x.toFixed(2)} ${ORBIT_PROGRESS_START_POINT.y.toFixed(2)} A ${ORBIT_RADIUS} ${ORBIT_RADIUS} 0 0 1 ${ORBIT_PROGRESS_END_POINT.x.toFixed(2)} ${ORBIT_PROGRESS_END_POINT.y.toFixed(2)}`;
const ORBIT_TRACK_PATH = `M ${ORBIT_CENTER_X - ORBIT_RADIUS} ${ORBIT_CENTER_Y} A ${ORBIT_RADIUS} ${ORBIT_RADIUS} 0 0 1 ${ORBIT_CENTER_X + ORBIT_RADIUS} ${ORBIT_CENTER_Y}`;

const Values: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  const [revealProgress, setRevealProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [orbitLead, setOrbitLead] = useState(ORBIT_STEP_MAP[VALUES[0].id]);
  const [orbitTrail, setOrbitTrail] = useState(ORBIT_STEP_MAP[VALUES[0].id]);
  const orbitLeadRef = useRef(ORBIT_STEP_MAP[VALUES[0].id]);
  const orbitTrailRef = useRef(ORBIT_STEP_MAP[VALUES[0].id]);
  const orbitAnimationFrameRef = useRef<number | null>(null);
  const activeValue = VALUES[activeIndex];
  const previousValue = previousIndex === null ? null : VALUES[previousIndex];
  const isVisible = revealProgress > 0.02;
  const sectionStyle = {
    "--values-scroll-progress": revealProgress.toFixed(4),
  } as CSSProperties;

  useEffect(() => {
    const reducedMotionMedia = globalThis.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const updateRevealProgress = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      if (reducedMotionMedia.matches) {
        setRevealProgress(1);
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = globalThis.innerHeight;
      const start = viewportHeight * 1.22;
      const end = viewportHeight * 0.08;
      const rawProgress = (start - rect.top) / (start - end);
      const nextProgress = Math.min(1, Math.max(0, rawProgress));

      setRevealProgress((currentProgress) => {
        if (Math.abs(currentProgress - nextProgress) < 0.006) {
          return currentProgress;
        }
        return nextProgress;
      });
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = globalThis.requestAnimationFrame(updateRevealProgress);
    };

    requestUpdate();
    globalThis.addEventListener("scroll", requestUpdate, { passive: true });
    globalThis.addEventListener("resize", requestUpdate);
    reducedMotionMedia.addEventListener("change", requestUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      globalThis.removeEventListener("scroll", requestUpdate);
      globalThis.removeEventListener("resize", requestUpdate);
      reducedMotionMedia.removeEventListener("change", requestUpdate);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        globalThis.clearTimeout(transitionTimeoutRef.current);
      }

      if (orbitAnimationFrameRef.current) {
        globalThis.cancelAnimationFrame(orbitAnimationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const reducedMotionMedia = globalThis.matchMedia("(prefers-reduced-motion: reduce)");
    const nextTarget = ORBIT_STEP_MAP[activeValue.id];

    if (orbitAnimationFrameRef.current) {
      globalThis.cancelAnimationFrame(orbitAnimationFrameRef.current);
      orbitAnimationFrameRef.current = null;
    }

    if (reducedMotionMedia.matches) {
      orbitLeadRef.current = nextTarget;
      orbitTrailRef.current = nextTarget;
      setOrbitLead(nextTarget);
      setOrbitTrail(nextTarget);
      return;
    }

    const startLead = orbitLeadRef.current;
    const startTrail = orbitTrailRef.current;
    const startTime = performance.now();

    const animateOrbit = (time: number) => {
      const elapsed = (time - startTime) / ORBIT_ANIMATION_MS;
      const clamped = Math.min(elapsed, 1);
      const eased = 1 - Math.pow(1 - clamped, 3);
      const delayed = Math.max(0, eased - 0.16);
      const nextLead = startLead + (nextTarget - startLead) * eased;
      const nextTrail = startTrail + (nextTarget - startTrail) * delayed;

      orbitLeadRef.current = nextLead;
      orbitTrailRef.current = nextTrail;
      setOrbitLead(nextLead);
      setOrbitTrail(nextTrail);

      if (clamped < 1) {
        orbitAnimationFrameRef.current = globalThis.requestAnimationFrame(animateOrbit);
      } else {
        orbitLeadRef.current = nextTarget;
        orbitTrailRef.current = nextTarget;
        setOrbitLead(nextTarget);
        setOrbitTrail(nextTarget);
        orbitAnimationFrameRef.current = null;
      }
    };

    orbitAnimationFrameRef.current = globalThis.requestAnimationFrame(animateOrbit);
  }, [activeValue.id]);

  const swapValue = (nextIndex: number) => {
    if (nextIndex === activeIndex) {
      return;
    }

    if (transitionTimeoutRef.current) {
      globalThis.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }

    setPreviousIndex(activeIndex);
    setActiveIndex(nextIndex);

    transitionTimeoutRef.current = globalThis.setTimeout(() => {
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

  const getOrbitItems = (value: ValueItem) =>
    VALUES.map((item, index) => ({
      id: item.id,
      index,
      label: VALUE_LABELS[item.id],
      path: VALUE_LABEL_PATHS[item.id],
      isActive: item.id === value.id,
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
    const orbitDotPoint = getOrbitPoint(orbitLead);
    const orbitStyle = {
      "--values-orbit-progress": orbitTrail.toFixed(4),
    } as CSSProperties;

    return (
      <>
        <svg
          className="values-orbit__svg"
          viewBox="0 0 100 56"
          aria-hidden="true"
          style={orbitStyle}
        >
          <path className="values-orbit__track" d={ORBIT_TRACK_PATH} pathLength="100" />
          <path className="values-orbit__progress" d={ORBIT_PROGRESS_PATH} pathLength="100" />
          <circle className="values-orbit__dot" cx={orbitDotPoint.x} cy={orbitDotPoint.y} r="2.6" />
        </svg>
        {orbitItems.map((item) => (
          <button
            key={`${item.id}-${item.label}`}
            type="button"
            className={item.className}
            onClick={() => swapValue(item.index)}
            aria-label={`Ver valor ${item.label}`}
            aria-pressed={item.isActive}
          >
            {item.path ? (
              <svg
                className="values-orbit__label-svg"
                viewBox="0 0 160 180"
                aria-hidden="true"
              >
                <path id={`values-label-path-${item.id}`} d={item.path} fill="none" />
                <text className="values-orbit__label-text">
                  <textPath href={`#values-label-path-${item.id}`} startOffset="50%" textAnchor="middle">
                    {item.label}
                  </textPath>
                </text>
              </svg>
            ) : (
              item.label
            )}
          </button>
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
      style={sectionStyle}
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

          <div className="values-orbit" aria-label="Valores de Campus Virtual">
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
