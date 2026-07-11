// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Search, 
  AlertCircle, 
  GitPullRequest, 
  Settings,
  Bot,
  X,
  Sun,
  Moon,
  Monitor,
  Shield,
  Check
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface SidebarProps {
  onClose?: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Analyze', href: '/analyze', icon: Search },
  { name: 'Incidents', href: '/incidents', icon: AlertCircle },
  { name: 'Fix History', href: '/fix-history', icon: GitPullRequest },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const;

  const currentTheme = themeOptions.find(opt => opt.value === theme) || themeOptions[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="h-full bg-white dark:bg-navy-800 border-r border-gray-200 dark:border-navy-700 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-navy-700">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold gradient-text">AI DevOps</h1>
            <p className="text-[10px] text-muted-foreground">On-Call Agent</p>
          </div>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 text-accent-purple dark:text-accent-blue' 
                  : 'hover:bg-gray-100 dark:hover:bg-navy-700 text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer with Theme Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-navy-700 space-y-3">
        {/* System Status */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-muted-foreground">System Safe</span>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="relative">
          <button
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
            aria-label="Toggle theme"
          >
            <div className="flex items-center gap-2">
              {mounted ? (
                <CurrentIcon className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Sun className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-sm text-muted-foreground capitalize">
                {mounted ? currentTheme.label : 'Loading...'}
              </span>
            </div>
            <span className={clsx(
              "text-xs text-muted-foreground transition-transform duration-200",
              isThemeOpen && "rotate-180"
            )}>
              ▼
            </span>
          </button>

          {isThemeOpen && mounted && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsThemeOpen(false)}
              />
              <div className="absolute bottom-full left-0 right-0 mb-1 z-20 bg-white dark:bg-navy-800 rounded-lg shadow-lg border border-gray-200 dark:border-navy-700 py-1">
                {themeOptions.map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setTheme(value);
                      setIsThemeOpen(false);
                    }}
                    className={clsx(
                      'w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors',
                      theme === value
                        ? 'text-accent-purple dark:text-accent-blue bg-gray-100 dark:bg-navy-700'
                        : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-navy-700 hover:text-foreground'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                    {theme === value && (
                      <Check className="w-4 h-4 ml-auto text-accent-purple dark:text-accent-blue" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Version Info */}
        <div className="px-2 pt-2 border-t border-gray-200 dark:border-navy-700">
          <p className="text-[10px] text-muted-foreground">
            v1.0.0 • {process.env.NEXT_PUBLIC_AGENT_API_URL || 'http://localhost:8000'}
          </p>
        </div>
      </div>
    </div>
  );
}