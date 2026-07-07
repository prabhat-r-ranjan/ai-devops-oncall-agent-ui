// components/CommandList.tsx
"use client";

import { Terminal, Copy } from "lucide-react";
import CopyButton from "./CopyButton";

interface CommandListProps {
  commands: string[];
}

export default function CommandList({ commands }: CommandListProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-5 h-5 text-accent-purple" />
        <h4 className="font-semibold">Suggested Commands</h4>
      </div>
      <div className="space-y-2">
        {commands.map((cmd, index) => (
          <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-navy-800/50 group">
            <code className="flex-1 text-sm font-mono text-accent-purple dark:text-accent-blue break-all">
              $ {cmd}
            </code>
            <CopyButton text={cmd} />
          </div>
        ))}
      </div>
    </div>
  );
}