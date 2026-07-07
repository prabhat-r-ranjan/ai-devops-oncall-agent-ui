// components/ResultSummary.tsx
"use client";

import { useState } from "react";
import { 
  CheckCircle, 
  AlertCircle, 
  Zap, 
  GitPullRequest,
  Bot,
  Shield,
  Copy,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import type { AnalyzeResponse } from "@/lib/types";
import RootCauseCard from "./RootCauseCard";
import FixPlanCard from "./FixPlanCard";
import AutomationStatusGrid from "./AutomationStatusGrid";
import AiUsageCard from "./AiUsageCard";
import CommandList from "./CommandList";
import DiagnosticsPanel from "./DiagnosticsPanel";
import CopyButton from "./CopyButton";
import StatusBadge from "./StatusBadge";

interface ResultSummaryProps {
  result: AnalyzeResponse;
  onReset: () => void;
}

export default function ResultSummary({ result, onReset }: ResultSummaryProps) {
  const isHealthy = result.primary_issue === 'HEALTHY';
  const hasFixPlan = result.fix_plan || result.rule_fix_plan || result.ai_fix_plan;

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className={`glass-card p-6 border-l-4 ${isHealthy ? 'border-emerald-500' : 'border-accent-purple'}`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isHealthy ? (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-accent-purple" />
              )}
              <h3 className="text-lg font-semibold">
                {isHealthy ? '✅ No Change Required' : 'Analysis Complete'}
              </h3>
              <StatusBadge 
                status={isHealthy ? 'healthy' : 'active'} 
                label={isHealthy ? 'Healthy' : 'Action Required'} 
              />
            </div>
            <p className="text-muted-foreground">{result.summary}</p>
            {result.confidence !== undefined && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <div className="flex-1 max-w-48 h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-purple to-accent-blue rounded-full transition-all duration-500"
                    style={{ width: `${Math.round(result.confidence * 100)}%` }}
                  />
                </div>
                <span className="text-sm font-mono">{Math.round(result.confidence * 100)}%</span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={onReset}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-navy-700 hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors text-sm"
            >
              New Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Root Cause Card */}
      {result.probable_root_cause && (
        <RootCauseCard 
          rootCause={result.probable_root_cause}
          evidence={result.evidence || []}
        />
      )}

      {/* Fix Plan Card */}
      {hasFixPlan && (
        <FixPlanCard 
          ruleFixPlan={result.rule_fix_plan}
          aiFixPlan={result.ai_fix_plan}
          fixPlan={result.fix_plan}
        />
      )}

      {/* Automation Status Grid */}
      <AutomationStatusGrid 
        repositoryAnalysis={result.repository_analysis}
        manifestUpdate={result.manifest_update}
        pullRequest={result.pull_request}
        aiReview={result.ai_review}
      />

      {/* AI Usage Card */}
      <AiUsageCard 
        aiFallbackUsed={!!result.ai_fix_plan}
        aiReview={result.ai_review}
      />

      {/* Suggested Commands */}
      {result.suggested_kubectl_commands && result.suggested_kubectl_commands.length > 0 && (
        <CommandList commands={result.suggested_kubectl_commands} />
      )}

      {/* Diagnostics */}
      {result.diagnostics && Object.keys(result.diagnostics).length > 0 && (
        <DiagnosticsPanel diagnostics={result.diagnostics} />
      )}
    </div>
  );
}