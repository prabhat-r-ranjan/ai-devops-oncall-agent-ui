"use client";

import { Bot, CheckCircle, Shield } from "lucide-react";

interface AiUsageCardProps {
  aiFallbackUsed: boolean;
  aiReview?: Record<string, any> | null;
}

export default function AiUsageCard({ aiFallbackUsed, aiReview }: AiUsageCardProps) {
  // Check if AI review was completed
  const isReviewCompleted = aiReview?.status === 'COMPLETED' || aiReview?.status === 'Unknown';
  
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">AI Usage</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${aiFallbackUsed ? 'bg-purple-500/20' : 'bg-emerald-500/20'}`}>
            <Bot className={`w-5 h-5 ${aiFallbackUsed ? 'text-purple-400' : 'text-emerald-500'}`} />
          </div>
          <div>
            <p className="text-sm">
              {aiFallbackUsed 
                ? 'AI fallback was used for fix plan generation.' 
                : 'AI fallback was not used. Rule-based RCA successfully identified the issue.'}
            </p>
            {!aiFallbackUsed && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 inline-flex items-center gap-1 mt-1">
                <Shield className="w-3 h-3" />
                Guardrail Active
              </span>
            )}
          </div>
        </div>
        
        {isReviewCompleted && aiReview && (
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <p className="text-sm font-medium">AI Review Summary</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {aiReview.review_summary || aiReview.message || 'Review completed successfully'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}