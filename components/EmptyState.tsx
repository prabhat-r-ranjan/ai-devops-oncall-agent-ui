// components/EmptyState.tsx
"use client";

import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
}

export default function EmptyState({ 
  title, 
  description, 
  icon, 
  actionLabel, 
  onAction,
  children 
}: EmptyStateProps) {
  return (
    <div className="glass-card p-12 text-center">
      {icon && (
        <div className="flex justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
      
      {children}
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-white font-medium hover:shadow-glow transition-all duration-300"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}