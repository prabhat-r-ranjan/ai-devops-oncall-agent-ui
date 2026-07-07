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
  X
} from "lucide-react";

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
      <nav className="flex-1 p-4 space-y-1">
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

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-navy-700">
        <p className="text-xs text-muted-foreground">
          v1.0.0 • {process.env.NEXT_PUBLIC_AGENT_API_URL || 'http://localhost:8000'}
        </p>
      </div>
    </div>
  );
}