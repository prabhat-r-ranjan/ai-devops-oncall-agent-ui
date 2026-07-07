// components/DiagnosticsPanel.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, FileJson } from "lucide-react";

interface DiagnosticsPanelProps {
  diagnostics: Record<string, any>;
}

export default function DiagnosticsPanel({ diagnostics }: DiagnosticsPanelProps) {
  const [expanded, setExpanded] = useState(false);

  if (!diagnostics || Object.keys(diagnostics).length === 0) return null;

  return (
    <div className="glass-card p-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left"
      >
        <FileJson className="w-5 h-5 text-accent-purple" />
        <span className="font-semibold">Diagnostics</span>
        {expanded ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
      </button>

      {expanded && (
        <div className="mt-4 p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50 overflow-x-auto">
          <pre className="text-xs font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
            {JSON.stringify(diagnostics, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}