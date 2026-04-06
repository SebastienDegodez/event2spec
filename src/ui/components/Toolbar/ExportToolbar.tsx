import { useCallback } from 'react';
import { useBoardActions } from '../../../core/store/useBoardStore';

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function ExportToolbar() {
  const { exportJSON, exportMarkdown } = useBoardActions();

  const handleExportJSON = useCallback(() => {
    const json = exportJSON();
    downloadFile(json, 'event-model.json', 'application/json');
  }, [exportJSON]);

  const handleExportMarkdown = useCallback(() => {
    const markdown = exportMarkdown();
    downloadFile(markdown, 'event-model.md', 'text/markdown');
  }, [exportMarkdown]);

  return (
    <div className="export-toolbar">
      <button
        className="export-btn"
        onClick={handleExportJSON}
        title="Export as JSON"
        aria-label="Export as JSON"
      >
        ⬇ JSON
      </button>
      <button
        className="export-btn"
        onClick={handleExportMarkdown}
        title="Export as Markdown"
        aria-label="Export as Markdown"
      >
        ⬇ Markdown
      </button>
    </div>
  );
}
