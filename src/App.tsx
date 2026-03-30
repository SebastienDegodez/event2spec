import { Board } from './components/Board';
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
          Double-click the canvas to add a Domain Event · Drag to reposition · Shift+click to connect
        </div>
      </header>
      <main className="app-canvas">
        <Board />
      </main>
    </div>
  );
}
