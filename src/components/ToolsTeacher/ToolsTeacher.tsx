import { type CSSProperties, useEffect, useRef, useState } from 'react';
import './ToolsTeacher.css';
import logoFlip from '../../assets/Logos-apps-08.png';
import logoGenially from '../../assets/Logos-apps-07.png';
import logoVyond from '../../assets/Logos-apps-06.png';
import logoPadlet from '../../assets/Logos-apps-05.png';

interface ToolData {
  name: string;
  img: string;
  desc: string;
  color: string;
  href: string;
}

const toolsData: ToolData[] = [
  {
    name: 'FLIPHTML5',
    img: logoFlip,
    desc: 'Convierte documentos estáticos (PDF, PPTX, Word, imágenes) en revistas, catálogos y folletos interactivos.',
    color: '#4db8ff',
    href: 'https://fliphtml5.com/?gad_source=1&gad_campaignid=22431807734&gbraid=0AAAAACQRMaeWf4MkQxj1pJ3upXDTi7ZRd&gclid=CjwKCAjw687NBhB4EiwAQ645dpuDdxn8LL68K9LUvoj1rnUwb9PGxu5GwP6h0HjAF-IKBqFxdqBpPRoCH0YQAvD_BwE'
  },
  {
    name: 'GENIALLY',
    img: logoGenially,
    desc: 'Crea contenidos interactivos y animados (presentaciones, infografías, imágenes, etc.)',
    color: '#8f81ff',
    href: 'https://genially.com/es/'
  },
  {
    name: 'VYOND',
    img: logoVyond,
    desc: 'Creación de videos animados en línea basada (IA)',
    color: '#FFB84D',
    href: 'https://www.vyond.com/'
  },
  {
    name: 'PADLET',
    img: logoPadlet,
    desc: 'Colaboración visual para labores creativas y fines educativos',
    color: '#F4D03F',
    href: 'https://padlet.com/'
  }
];

export default function ToolsTeacher() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      obs.observe(sectionRef.current);
    }

    return () => obs.disconnect();
  }, []);

  return (
    <section className={`tools-section${isVisible ? ' visible' : ''}`} ref={sectionRef}>
      <div className="tools-inner">
        <div className="tools-header">
          <h2 className="tools-title">Herramientas TIC para Docentes</h2>
          <p className="tools-subtitle">
            Conoce las herramientas que la Santoto Tunja tiene licenciadas para el uso de los docentes
            Tomasinos dentro de sus procesos académicos y pedagógicos.
          </p>
        </div>

        <div className="tools-grid">
          {toolsData.map((tool) => {
            return (
              <a
                className="tool-card"
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--tool-hover-color': tool.color } as CSSProperties}
              >
                <div className="tool-card-icon-wrapper">
                  <div className="tool-icon">
                    <img src={tool.img} alt={tool.name} />
                  </div>
                </div>
                <div className="tool-card-content">
                  <h3 className="tool-card-title">{tool.name}</h3>
                  <p className="tool-card-desc">{tool.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
