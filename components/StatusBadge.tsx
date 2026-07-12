"use client";

interface StatusBadgeProps {
  status: 'healthy' | 'error' | 'warning' | 'skipped' | 'active' | 'inactive';
  label: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const styles = {
    healthy: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30',
    error: 'bg-red-500/20 text-red-500 border-red-500/30',
    warning: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    skipped: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    active: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${styles[status]}`}>
      {label}
    </span>
  );
}