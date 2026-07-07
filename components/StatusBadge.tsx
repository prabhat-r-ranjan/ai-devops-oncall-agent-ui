// components/StatusBadge.tsx
"use client";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'healthy' | 'warning' | 'error' | 'skipped';
  label: string;
  className?: string;
}

const statusColors = {
  active: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30',
  healthy: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30',
  inactive: 'bg-gray-500/20 text-gray-500 border-gray-500/30',
  warning: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  error: 'bg-red-500/20 text-red-500 border-red-500/30',
  skipped: 'bg-gray-500/20 text-gray-500 border-gray-500/30',
};

export default function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
      statusColors[status],
      className
    )}>
      <span className={cn(
        'w-1.5 h-1.5 rounded-full',
        status === 'active' || status === 'healthy' ? 'bg-emerald-500 animate-pulse' :
        status === 'warning' ? 'bg-yellow-500' :
        status === 'error' ? 'bg-red-500' :
        'bg-gray-500'
      )} />
      {label}
    </span>
  );
}