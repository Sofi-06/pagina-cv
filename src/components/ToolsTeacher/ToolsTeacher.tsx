import './ToolsTeacher.css';

// Ejemplo de datos, reemplaza los src por tus imágenes reales
const toolsData = [
  { name: 'Padlet', img: 'padlet.png' },
  { name: 'Vyond', img: 'vyond.png' },
  { name: 'Genially', img: 'genially.png' },
  { name: 'FLIPHTML5', img: 'fliphtml5.png' }
];

export default function ToolsTeacher() {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <div className="tools-circles-row" style={{ maxWidth: '100vw' }}>
        {toolsData.map(tool => (
          <div className="tool-circle" key={tool.name}>
            <img src={tool.img} alt={tool.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
