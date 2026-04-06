import { GridCanvas } from './ui/components/Canvas/GridCanvas';
import { ExportToolbar } from './ui/components/Toolbar/ExportToolbar';
import { NodePalette } from './ui/components/Toolbar/NodePalette';
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
          Right-click · Double-click to add · Click + to add Command · Double-click label to edit · Drag to move
        </div>
        <ExportToolbar />
      </header>
      <div className="app-workspace">
        <NodePalette />
        <main className="app-canvas">
          <GridCanvas />
        </main>
      </div>
    </div>
  );
}
