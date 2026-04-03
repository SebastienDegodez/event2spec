import { GridCanvas } from './ui/components/Canvas/GridCanvas';
import './App.css';

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">event<strong>2spec</strong></span>
        </div>
        <div className="app-hint">
          Right-click to add a Domain Event · Click label to edit · Drag to reposition · Delete key to remove
        </div>
      </header>
      <main className="app-canvas">
        <GridCanvas />
      </main>
    </div>
  );
}
