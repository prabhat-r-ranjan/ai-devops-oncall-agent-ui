// components/Topbar.tsx
"use client";

import { Menu, Bot } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 dark:bg-navy-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-navy-700 lg:pl-64">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="lg:hidden flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold gradient-text">AI DevOps</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}