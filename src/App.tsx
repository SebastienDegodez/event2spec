import { GridCanvas } from './ui/components/Canvas/GridCanvas';
import { ExportToolbar } from './ui/components/Toolbar/ExportToolbar';
import { SlicePanel } from './ui/components/Slices/SlicePanel';
import { SliceEditorView } from './ui/components/Slices/SliceEditorView';
import { SliceInspectorView } from './ui/components/Slices/SliceInspectorView';
import { PropertiesPanel } from './ui/components/PropertiesPanel/PropertiesPanel';
import { ValidationCounter } from './ui/components/Validation/ValidationCounter';
import { useActiveSliceInspectorId, useSelectedSliceRange } from './core/store/useBoardStore';
import './App.css';

export default function App() {
  const selectedSliceRange = useSelectedSliceRange();
  const activeSliceInspectorId = useActiveSliceInspectorId();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">event<strong>2spec</strong></span>
        </div>
        <div className="app-hint">
          Hover to add · Drag handles to connect · Drag to move · Alt+click to select column
        </div>
        <ValidationCounter />
        <ExportToolbar />
      </header>
      <div className="app-workspace">
        <div className="app-sidebar">
          <SlicePanel />
        </div>
        <main className="app-canvas">
          <GridCanvas />
        </main>
        {selectedSliceRange ? (
          <SliceEditorView selectedSliceRange={selectedSliceRange} />
        ) : activeSliceInspectorId ? (
          <SliceInspectorView />
        ) : (
          <PropertiesPanel />
        )}
      </div>
    </div>
  );
}
