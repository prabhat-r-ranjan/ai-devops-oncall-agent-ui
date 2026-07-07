// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-navy-800">
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded transition-colors ${
          theme === 'light' 
            ? 'bg-white dark:bg-navy-700 shadow-sm' 
            : 'hover:bg-white/50 dark:hover:bg-navy-700/50'
        }`}
        aria-label="Light mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded transition-colors ${
          theme === 'dark' 
            ? 'bg-white dark:bg-navy-700 shadow-sm' 
            : 'hover:bg-white/50 dark:hover:bg-navy-700/50'
        }`}
        aria-label="Dark mode"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded transition-colors ${
          theme === 'system' 
            ? 'bg-white dark:bg-navy-700 shadow-sm' 
            : 'hover:bg-white/50 dark:hover:bg-navy-700/50'
        }`}
        aria-label="System mode"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
}