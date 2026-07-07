// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatConfidence(confidence: number): string {
  return `${Math.round(confidence * 100)}%`;
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getSeverityColor(severity: string): string {
  const colors = {
    'LOW': 'text-emerald-500',
    'MEDIUM': 'text-yellow-500',
    'HIGH': 'text-orange-500',
    'CRITICAL': 'text-red-500',
  };
  return colors[severity as keyof typeof colors] || 'text-gray-500';
}