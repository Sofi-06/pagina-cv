import { useState } from 'react';
import './ToolsTeacher.css';
import logoFlip from '../../assets/Logos-apps-05.png';
import logoGenially from '../../assets/Logos-apps-06.png';
import logoVyond from '../../assets/Logos-apps-07.png';
import logoPadlet from '../../assets/Logos-apps-08.png';

interface ToolData {
  name: string;
  img: string;
  desc: string;
  color: string;
}

const toolsData: ToolData[] = [
  {
    name: 'FLIPHTML5',
    img: logoFlip,
    desc: 'Convierte documentos estáticos (PDF, PPT, Word, imágenes) en revistas, catálogos y folletos interactivos.',
    color: '#4db8ff'
  },
  {
    name: 'GENIALLY',
    img: logoGenially,
    desc: 'Crea contenidos interactivos y animados (presentaciones, infografías, imágenes, etc.)',
    color: '#8f81ff'
  },
  {
    name: 'VYOND',
    img: logoVyond,
    desc: 'Creación de videos animados en línea basada (IA)',
    color: '#FFB84D'
  },
  {
    name: 'PADLET',
    img: logoPadlet,
    desc: 'Colaboración visual para labores creativas y fines educativos',
    color: '#F4D03F' // Hover color, update to match image exactly
  }
];

export default function ToolsTeacher() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const handleToolClick = (toolName: string) => {
    setActiveTool(activeTool === toolName ? null : toolName);
  };

  return (
    <section className="tools-section">
      <div className="tools-header">
        <h2 className="tools-title">Herramientas TIC para Docentes</h2>
        <p className="tools-subtitle">
          Conoce las herramientas que la Universidad tiene licenciadas para el uso de los docentes
          Tomasinos dentro de sus procesos académicos y pedagógicos.
        </p>
      </div>

      <div className="tools-grid">
        {toolsData.map(tool => {
          const isActive = activeTool === tool.name;
          return (
            <div
              className={`tool-card ${isActive ? 'active' : ''}`}
              key={tool.name}
              onClick={() => handleToolClick(tool.name)}
              style={
                isActive
                  ? { backgroundColor: tool.color, borderColor: tool.color }
                  : ({} as React.CSSProperties)
              }
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
