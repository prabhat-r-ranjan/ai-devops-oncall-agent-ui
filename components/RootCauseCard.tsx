// components/RootCauseCard.tsx
"use client";

import { AlertCircle } from "lucide-react";

interface RootCauseCardProps {
  rootCause: string;
  evidence?: string[];
}

export default function RootCauseCard({ rootCause, evidence = [] }: RootCauseCardProps) {
  return (
    <div className="glass-card p-6 border-l-4 border-yellow-500/30">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-yellow-500/20 flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-2">Probable Root Cause</h4>
          <p className="text-muted-foreground">{rootCause}</p>
          
          {evidence.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm font-medium mb-2">Evidence</h5>
              <ul className="space-y-1">
                {evidence.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent-purple">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}