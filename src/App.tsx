import { GridCanvas } from './ui/components/Canvas/GridCanvas';
import { ExportToolbar } from './ui/components/Toolbar/ExportToolbar';
import { NodePalette } from './ui/components/Toolbar/NodePalette';
import { SwimlanePanel } from './ui/components/Toolbar/SwimlanePanel';
import { BoardModeToggle } from './ui/components/Toolbar/BoardModeToggle';
import { SlicePanel } from './ui/components/Slices/SlicePanel';
import { SliceEditorView } from './ui/components/Slices/SliceEditorView';
import { PropertiesPanel } from './ui/components/PropertiesPanel/PropertiesPanel';
import { ValidationCounter } from './ui/components/Validation/ValidationCounter';
import { useSelectedColumns } from './core/store/useBoardStore';
import './App.css';

export default function App() {
  const selectedColumns = useSelectedColumns();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">event<strong>2spec</strong></span>
        </div>
        <div className="app-hint">
          Right-click · Double-click to add · Click + to add Command · Double-click label to edit · Drag to move · Alt+click to select column
        </div>
        <ValidationCounter />
        <BoardModeToggle />
        <ExportToolbar />
      </header>
      <div className="app-workspace">
        <div className="app-sidebar">
          <NodePalette />
          <SwimlanePanel />
          <SlicePanel />
        </div>
        <main className="app-canvas">
          <GridCanvas />
        </main>
        {selectedColumns.length > 0 ? (
          <SliceEditorView selectedColumns={selectedColumns} />
        ) : (
          <PropertiesPanel />
        )}
      </div>
    </div>
  );
}
