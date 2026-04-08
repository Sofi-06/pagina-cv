import { useEffect, useRef, useState } from "react";
import "./Team.css";
import portrait01 from "../../assets/team-01.png";
import portrait02 from "../../assets/team-02.png";
import portrait03 from "../../assets/team-03.png";
import portrait04 from "../../assets/team-04.png";
import portrait05 from "../../assets/team-05.png";
import portrait06 from "../../assets/team-06.png";
import portrait07 from "../../assets/team-07.png";
import portrait08 from "../../assets/team-08.png";
import portrait09 from "../../assets/team-09.png";
import portrait10 from "../../assets/team-10.png";
import portrait11 from "../../assets/team-11.jpg";
import portrait12 from "../../assets/team-12.jpg";
import background01 from "../../assets/Team_fondo_1.jpg";
import background02 from "../../assets/Team_fondo_2.jpg";
import background03 from "../../assets/Team_fondo_3.jpg";
import background04 from "../../assets/Team_fondo_4.jpg";
import background05 from "../../assets/Team_fondo_5.jpg";
import background06 from "../../assets/Team_fondo_6.jpg";
import background07 from "../../assets/Team_fondo_7.jpg";
import background08 from "../../assets/Team_fondo_8.jpg";
import background09 from "../../assets/Team_fondo_9.jpg";
import background10 from "../../assets/Team_fondo_10.jpg";
import background11 from "../../assets/Team_fondo_11.jpg";
import background12 from "../../assets/Team_fondo_12.jpg";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  portrait: string;
  background: string;
  panel: string;
  preview: string;
  overlayStrong: string;
  overlaySoft: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-01",
    name: "Liliana Mendivelso",
    role: "Directora",
    portrait: portrait01,
    background: background01,
    panel: "#15345a",
    preview: "#056f63",
    overlayStrong: "rgba(9, 28, 55, 0.54)",
    overlaySoft: "rgba(23, 68, 122, 0.26)",
  },
  {
    id: "team-02",
    name: "Juan Malaver",
    role: "Prof. Tecnología",
    portrait: portrait02,
    background: background02,
    panel: "#005344",
    preview: "#206f69",
    overlayStrong: "rgba(4, 42, 34, 0.5)",
    overlaySoft: "rgba(10, 110, 88, 0.24)",
  },
  {
    id: "team-03",
    name: "Sofía Gómez",
    role: "Prof. Tecnopedagogía",
    portrait: portrait03,
    background: background03,
    panel: "#1f6e68",
    preview: "#6a2030",
    overlayStrong: "rgba(8, 48, 44, 0.48)",
    overlaySoft: "rgba(31, 110, 104, 0.22)",
  },
  {
    id: "team-04",
    name: "Melisa Niño",
    role: "Prof. Diseño Instruccional",
    portrait: portrait04,
    background: background04,
    panel: "#6a1b2c",
    preview: "#5a4188",
    overlayStrong: "rgba(61, 18, 29, 0.5)",
    overlaySoft: "rgba(119, 41, 67, 0.22)",
  },
  {
    id: "team-05",
    name: "Vanessa Larrota",
    role: "Prof. Diseño Instruccional",
    portrait: portrait05,
    background: background05,
    panel: "#5a4387",
    preview: "#5b6a84",
    overlayStrong: "rgba(44, 30, 79, 0.48)",
    overlaySoft: "rgba(88, 67, 135, 0.2)",
  },
  {
    id: "team-06",
    name: "Oscar Barahona",
    role: "Prof. Pedagogía",
    portrait: portrait06,
    background: background06,
    panel: "#5c6983",
    preview: "#3e79a8",
    overlayStrong: "rgba(32, 41, 59, 0.48)",
    overlaySoft: "rgba(92, 105, 131, 0.22)",
  },
  {
    id: "team-07",
    name: "Alejandra Cuadros",
    role: "Prof. Pedagogía",
    portrait: portrait09,
    background: background07,
    panel: "#3f7aa8",
    preview: "#4d9f83",
    overlayStrong: "rgba(16, 47, 75, 0.48)",
    overlaySoft: "rgba(63, 122, 168, 0.22)",
  },
  {
    id: "team-08",
    name: "Laura Romero",
    role: "Prof. Diseño Gráfico",
    portrait: portrait08,
    background: background08,
    panel: "#4d9f83",
    preview: "#3a6b98",
    overlayStrong: "rgba(14, 54, 40, 0.48)",
    overlaySoft: "rgba(77, 159, 131, 0.22)",
  },
  {
    id: "team-09",
    name: "Daniel Roberto",
    role: "Prof. Desarrollo Multimedia",
    portrait: portrait07,
    background: background09,
    panel: "#356d92",
    preview: "#56637d",
    overlayStrong: "rgba(13, 38, 61, 0.48)",
    overlaySoft: "rgba(53, 109, 146, 0.22)",
  },
  {
    id: "team-10",
    name: "Leonidas Carvajal",
    role: "Técnico Multimedia",
    portrait: portrait10,
    background: background10,
    panel: "#56637d",
    preview: "#4d9f83",
    overlayStrong: "rgba(24, 34, 47, 0.48)",
    overlaySoft: "rgba(86, 99, 125, 0.22)",
  },
  {
    id: "team-11",
    name: "Ferney Malaver",
    role: "Auxiliar Administrativo",
    portrait: portrait11,
    background: background11,
    panel: "#5aa16a",
    preview: "#2f6872",
    overlayStrong: "rgba(22, 61, 28, 0.48)",
    overlaySoft: "rgba(90, 161, 106, 0.2)",
  },
  {
    id: "team-12",
    name: "Brandon Pulido",
    role: "Auxiliar Administrativo",
    portrait: portrait12,
    background: background12,
    panel: "#2f6872",
    preview: "#15345a",
    overlayStrong: "rgba(11, 45, 51, 0.5)",
    overlaySoft: "rgba(47, 104, 114, 0.22)",
  },
    {
    id: "team-14",
    name: "Nuevo",
    role: "Auxiliar",
    portrait: portrait12,
    background: background12,
    panel: "#2f6872",
    preview: "#15345a",
    overlayStrong: "rgba(11, 45, 51, 0.5)",
    overlaySoft: "rgba(47, 104, 114, 0.22)",
  },
      {
    id: "team-13",
    name: "Nuevo1",
    role: "Auxiliar2",
    portrait: portrait12,
    background: background12,
    panel: "#2f6872",
    preview: "#15345a",
    overlayStrong: "rgba(11, 45, 51, 0.5)",
    overlaySoft: "rgba(47, 104, 114, 0.22)",
  }
];

const TEAM_TRANSITION_MS = 520;

const wrapIndex = (index: number, length: number) => (index + length) % length;

function Team() {
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
      { threshold: 0.18 }
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

  useEffect(() => {
    const preloadIndexes = [
      activeIndex,
      wrapIndex(activeIndex + 1, TEAM_MEMBERS.length),
      wrapIndex(activeIndex + 2, TEAM_MEMBERS.length),
    ];

    const uniqueBackgrounds = Array.from(
      new Set(preloadIndexes.map((index) => TEAM_MEMBERS[index].background))
    );

    const preloadImages = uniqueBackgrounds.map((source) => {
      const image = new Image();
      image.src = source;
      return image;
    });

    return () => {
      preloadImages.forEach((image) => {
        image.src = "";
      });
    };
  }, [activeIndex]);

  const swapMember = (nextIndex: number) => {
    if (nextIndex === activeIndex) {
      return;
    }

    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    setPreviousIndex(activeIndex);
    setActiveIndex(nextIndex);

    transitionTimeoutRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
      transitionTimeoutRef.current = null;
    }, TEAM_TRANSITION_MS);
  };

  const showNext = () => {
    swapMember(wrapIndex(activeIndex + 1, TEAM_MEMBERS.length));
  };

  const activeMember = TEAM_MEMBERS[activeIndex];
  const previousMember = previousIndex !== null ? TEAM_MEMBERS[previousIndex] : null;
  const nextMember = activeIndex < TEAM_MEMBERS.length - 1 ? TEAM_MEMBERS[activeIndex + 1] : null;

  return (
    <section
      ref={sectionRef}
      className={`team-section${isVisible ? " team-section--visible" : ""}`}
      aria-labelledby="team-title"
    >
      <div className="team-section__backgrounds" aria-hidden="true">
        {previousMember && previousMember.background !== activeMember.background && (
          <div
            className="team-section__background team-section__background--previous team-layer--exit-bg"
            style={{ backgroundImage: `url(${previousMember.background})` }}
          />
        )}
        <div
          className={`team-section__background team-section__background--current${
            previousMember ? " team-layer--enter-bg" : ""
          }`}
          style={{ backgroundImage: `url(${activeMember.background})` }}
        />
      </div>

      <span className="team-section__corner" aria-hidden="true">
        <span className="team-section__corner-grid" />
        <span className="team-section__corner-ring" />
        <span className="team-section__corner-fill" />
      </span>
      <span className="team-section__marker" aria-hidden="true">
        <span className="team-section__marker-outer" />
        <span className="team-section__marker-inner" />
      </span>

      <div className="team-shell">
        <div className="team-copy">
          {previousMember && (
            <div className="team-copy__layer team-layer--exit-up" aria-hidden="true">
              <p className="team-copy__kicker">NUESTRO EQUIPO</p>
              <h2>{previousMember.name}</h2>
              <p className="team-copy__role">{previousMember.role}</p>
            </div>
          )}

          <div className={`team-copy__layer${previousMember ? " team-layer--enter-up" : ""}`}>
            <p className="team-copy__kicker">NUESTRO EQUIPO</p>
            <h2 id="team-title">{activeMember.name}</h2>
            <p className="team-copy__role">{activeMember.role}</p>
          </div>
        </div>

        <div className="team-stage">
          <div className="team-stage__cards">
            <div className="team-card-stack team-card-stack--active">
              {previousMember && (
                <div
                  className="team-card team-card--active team-layer--exit-card"
                  aria-hidden="true"
                >
                  <img src={previousMember.portrait} alt="" className="team-card__image" />
                </div>
              )}

              <div
                className={`team-card team-card--active${previousMember ? " team-layer--enter-card" : ""}`}
              >
                <img
                  src={activeMember.portrait}
                  alt={`${activeMember.name}, ${activeMember.role}`}
                  className="team-card__image"
                />
              </div>
            </div>

            {nextMember && (
              <button
                type="button"
                className="team-card team-card--preview"
                onClick={showNext}
                aria-label={`Mostrar a ${nextMember.name}`}
              >
                <img src={nextMember.portrait} alt="" className="team-card__image" />
              </button>
            )}
          </div>
        </div>

        <div className="team-navigation">
          <div className="team-navigation__dots" aria-label="Seleccion de integrantes">
            {TEAM_MEMBERS.map((member, index) => (
              <button
                key={member.id}
                type="button"
                className={`team-navigation__dot${index === activeIndex ? " is-active" : ""}`}
                aria-label={`Ver ${member.name}`}
                aria-pressed={index === activeIndex}
                onClick={() => swapMember(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
