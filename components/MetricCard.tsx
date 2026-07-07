// components/MetricCard.tsx
"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  status?: 'healthy' | 'warning' | 'error' | 'neutral';
  description?: string;
  className?: string;
}

const statusColors = {
  healthy: 'border-emerald-500/30',
  warning: 'border-yellow-500/30',
  error: 'border-red-500/30',
  neutral: 'border-gray-500/30',
};

export default function MetricCard({ 
  title, 
  value, 
  icon, 
  status = 'neutral', 
  description,
  className 
}: MetricCardProps) {
  return (
    <div className={cn(
      'glass-card p-6 border-l-4 transition-all duration-200 hover:shadow-lg',
      statusColors[status],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}