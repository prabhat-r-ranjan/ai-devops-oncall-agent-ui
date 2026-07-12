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
  const issueType = plan.issue_type || 'IMAGE_PULL_BACKOFF';

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold">Fix Plan</h3>
        <span className={`text-xs px-3 py-1 rounded-full ${
          isAiGenerated ? 'bg-purple-500/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'
        }`}>
          {isAiGenerated ? 'AI Generated' : 'Rule-Based'}
        </span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-auto text-sm text-accent-purple hover:text-accent-purple/80 transition-colors flex items-center gap-1"
        >
          {expanded ? 'Hide details' : 'View fix details'}
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      <div className="mb-4">
        <p className="text-muted-foreground">
          Automated fix plan generated using rules for {issueType}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-accent-purple hover:underline mt-1"
        >
          {expanded ? 'Hide details' : 'View fix details'} →
        </button>
      </div>

      {expanded && (
        <div className="mt-4 p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50 overflow-x-auto">
          <pre className="text-xs font-mono whitespace-pre-wrap">
            {JSON.stringify(plan, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}