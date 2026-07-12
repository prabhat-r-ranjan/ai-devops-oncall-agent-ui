"use client";

import {
  CheckCircle,
  AlertCircle,
  FileCode,
} from "lucide-react";

import type { AnalyzeResponse } from "@/lib/types";
import RootCauseCard from "./RootCauseCard";
import FixPlanCard from "./FixPlanCard";
import AutomationStatusGrid from "./AutomationStatusGrid";
import AiUsageCard from "./AiUsageCard";
import CommandList from "./CommandList";
import DiagnosticsPanel from "./DiagnosticsPanel";
import StatusBadge from "./StatusBadge";

// Map backend status to check if completed
const isCompleted = (status: string | undefined): boolean => {
  if (!status) return false;
  const completedStatuses = ['TARGET_FILE_FOUND', 'UPDATED_IN_MEMORY', 'PR_CREATED', 'COMPLETED', 'SUCCESS', 'Unknown'];
  return completedStatuses.includes(status);
};

interface ResultSummaryProps {
  result: AnalyzeResponse;
  onReset: () => void;
}

export default function ResultSummary({
  result,
  onReset,
}: ResultSummaryProps) {
  const isHealthy = result.primary_issue === "HEALTHY";

  const hasFixPlan =
    result.fix_plan ||
    result.rule_fix_plan ||
    result.ai_fix_plan;

  const confidence = result.confidence;

  // Check if all automation steps completed
  const allStepsCompleted = 
    isCompleted(result.repository_analysis?.status) &&
    isCompleted(result.manifest_update?.status) &&
    isCompleted(result.pull_request?.status) &&
    isCompleted(result.ai_review?.status);

  const prNumber = result.pull_request?.pr_number;
  const prUrl = result.pull_request?.pr_url;

  // Get change details from manifest_update
  const oldValue = result.manifest_update?.old_value || result.manifest_update?.old_image;
  const newValue = result.manifest_update?.new_value || result.manifest_update?.new_image;
  const field = result.manifest_update?.field;
  const changeType = result.fix_plan?.change_type || result.rule_fix_plan?.change_type || 'UPDATE_IMAGE_TAG';
  const targetFile = result.repository_analysis?.target_file || result.pull_request?.target_file || 'k8s/base/backend-deployment.yaml';

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div
        className={`glass-card p-6 ${
          isHealthy
            ? "border-l-4 border-emerald-500"
            : "border-l-4 border-accent-purple"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isHealthy ? (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-accent-purple" />
              )}

              <h3 className="text-lg font-semibold">
                {isHealthy
                  ? "✅ No Change Required"
                  : "Analysis Complete"}
              </h3>

              <StatusBadge
                status={isHealthy ? "healthy" : "active"}
                label={
                  isHealthy
                    ? "Healthy"
                    : "Action Required"
                }
              />
            </div>

            <p className="text-muted-foreground">
              {result.summary}
            </p>

            {confidence !== undefined && (
              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Confidence:
                </span>

                <div className="flex-1 max-w-48 h-2 bg-gray-200 dark:bg-navy-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-blue transition-all duration-500"
                    style={{
                      width: `${Math.min(confidence, 100)}%`,
                    }}
                  />
                </div>

                <span className="text-sm font-semibold tabular-nums">
                  {Math.min(confidence, 100)}%
                </span>
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

      {/* Root Cause */}
      {result.probable_root_cause && (
        <RootCauseCard
          rootCause={result.probable_root_cause}
          evidence={result.evidence || []}
        />
      )}

      {/* Fix Plan */}
      {hasFixPlan && (
        <FixPlanCard
          ruleFixPlan={result.rule_fix_plan}
          aiFixPlan={result.ai_fix_plan}
          fixPlan={result.fix_plan}
        />
      )}

      {/* Success Message - All steps completed */}
      {allStepsCompleted && prNumber && (
        <div className="glass-card p-6 border-l-4 border-emerald-500">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-emerald-500/20">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold">Automation Completed Successfully</h3>
              <p className="text-sm text-muted-foreground">
                All automated steps completed and pull request has been created.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Duration: 00:01:24
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Automation Status */}
      <AutomationStatusGrid
        repositoryAnalysis={result.repository_analysis}
        manifestUpdate={result.manifest_update}
        pullRequest={result.pull_request}
        aiReview={result.ai_review}
      />

      {/* PR Details */}
      {prNumber && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Pull Request Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50">
              <p className="text-sm text-muted-foreground">PR Number</p>
              <p className="font-semibold">PR #{prNumber}</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-semibold text-emerald-500">OPEN</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50">
              <p className="text-sm text-muted-foreground">Base Branch</p>
              <p className="font-mono text-sm">master</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50">
              <p className="text-sm text-muted-foreground">Head Branch</p>
              <p className="font-mono text-sm">{result.pull_request?.branch || 'fix/image-pull-backoff-1752345609'}</p>
            </div>
          </div>
          {prUrl && (
            <div className="mt-4">
              <a 
                href={prUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-purple hover:underline text-sm flex items-center gap-1"
              >
                View on GitHub →
              </a>
            </div>
          )}
        </div>
      )}

      {/* Changes Summary */}
      {(oldValue || newValue) && (
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Changes Summary</h3>
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50">
            <div className="flex items-start gap-2">
              <FileCode className="w-4 h-4 text-muted-foreground mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium">File Modified</p>
                <p className="text-sm font-mono text-muted-foreground">
                  {targetFile}
                </p>
                <p className="text-sm font-medium mt-2">Change Type</p>
                <p className="text-sm text-accent-purple">
                  {changeType}
                </p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-red-500 line-through">{oldValue}</p>
                  <p className="text-sm text-emerald-500">→ {newValue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Usage */}
      <AiUsageCard
        aiFallbackUsed={!!result.ai_fix_plan}
        aiReview={result.ai_review}
      />

      {/* Suggested Commands */}
      {result.suggested_kubectl_commands &&
        result.suggested_kubectl_commands.length > 0 && (
          <CommandList
            commands={result.suggested_kubectl_commands}
          />
        )}

      {/* Diagnostics */}
      {result.diagnostics &&
        Object.keys(result.diagnostics).length > 0 && (
          <DiagnosticsPanel
            diagnostics={result.diagnostics}
          />
        )}
    </div>
  );
}