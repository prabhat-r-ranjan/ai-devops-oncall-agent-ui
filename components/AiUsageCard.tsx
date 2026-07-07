// components/AiUsageCard.tsx
"use client";

import { Bot, CheckCircle } from "lucide-react";

interface AiUsageCardProps {
  aiFallbackUsed: boolean;
  aiReview?: Record<string, any> | null;
}

export default function AiUsageCard({ aiFallbackUsed, aiReview }: AiUsageCardProps) {
  return (
    <div className="glass-card p-6 border-l-4 border-accent-purple/30">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg flex-shrink-0 ${aiFallbackUsed ? 'bg-accent-purple/20' : 'bg-emerald-500/20'}`}>
          <Bot className={`w-5 h-5 ${aiFallbackUsed ? 'text-accent-purple' : 'text-emerald-500'}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold">AI Usage</h4>
            {!aiFallbackUsed && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Guardrail Active
              </span>
            )}
          </div>
          <p className="text-muted-foreground">
            {aiFallbackUsed 
              ? 'AI fallback was used for fix plan generation.' 
              : 'AI fallback was not used. Rule-based RCA successfully identified the issue.'}
          </p>
          {aiReview && (
            <div className="mt-4 p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50">
              <p className="text-sm font-medium mb-2">AI Review Summary</p>
              <p className="text-sm text-muted-foreground">
                {aiReview.summary || 'Review completed successfully'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}