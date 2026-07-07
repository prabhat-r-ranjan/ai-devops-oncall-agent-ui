// components/FixPlanCard.tsx
"use client";

import { useState } from "react";
import { Activity, Bot, Shield, ChevronDown, ChevronRight } from "lucide-react";

interface FixPlanCardProps {
  ruleFixPlan?: Record<string, any> | null;
  aiFixPlan?: Record<string, any> | null;
  fixPlan?: Record<string, any> | null;
}

export default function FixPlanCard({ ruleFixPlan, aiFixPlan, fixPlan }: FixPlanCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  const plan = fixPlan || ruleFixPlan || aiFixPlan;
  if (!plan) return null;

  const isAiGenerated = !!aiFixPlan;

  return (
    <div className="glass-card p-6 border-l-4 border-accent-blue/30">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg flex-shrink-0 ${isAiGenerated ? 'bg-accent-purple/20' : 'bg-emerald-500/20'}`}>
          {isAiGenerated ? <Bot className="w-5 h-5 text-accent-purple" /> : <Shield className="w-5 h-5 text-emerald-500" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold">Fix Plan</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${isAiGenerated ? 'bg-accent-purple/20 text-accent-purple' : 'bg-emerald-500/20 text-emerald-500'}`}>
              {isAiGenerated ? 'AI Generated' : 'Rule-Based'}
            </span>
          </div>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm text-accent-purple hover:text-accent-purple/80 transition-colors"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            {expanded ? 'Hide details' : 'View fix details'}
          </button>

          {expanded && (
            <div className="mt-4 p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50 overflow-x-auto">
              <pre className="text-xs font-mono whitespace-pre-wrap">
                {JSON.stringify(plan, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}