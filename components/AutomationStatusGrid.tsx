"use client";

import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileCode,
  GitBranch,
  GitPullRequest,
  RefreshCw,
  XCircle,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

interface AutomationStatusGridProps {
  fixPlan?: Record<string, any> | null;
  repositoryAnalysis?: Record<string, any> | null;
  manifestUpdate?: Record<string, any> | null;
  pullRequest?: Record<string, any> | null;
  aiReview?: Record<string, any> | null;
}

interface AutomationItem {
  id: string;
  icon: React.ElementType;
  label: string;
  data?: Record<string, any> | null;
  detail?: string | null;
  file?: string | null;
  prNumber?: number | string | null;
  prUrl?: string | null;
  liveImage?: string | null;
  gitImage?: string | null;
}

type UiStatus = "healthy" | "error" | "warning" | "skipped";

interface StatusInfo {
  status: UiStatus;
  label: string;
  completed: boolean;
}

const getStatusInfo = (
  status: string | undefined
): StatusInfo => {
  if (!status) {
    return {
      status: "skipped",
      label: "NOT STARTED",
      completed: false,
    };
  }

  const statusMap: Record<string, StatusInfo> = {
    TARGET_FILE_FOUND: {
      status: "healthy",
      label: "COMPLETED",
      completed: true,
    },
    UPDATED_IN_MEMORY: {
      status: "healthy",
      label: "COMPLETED",
      completed: true,
    },
    PR_CREATED: {
      status: "healthy",
      label: "COMPLETED",
      completed: true,
    },
    COMPLETED: {
      status: "healthy",
      label: "COMPLETED",
      completed: true,
    },
    SUCCESS: {
      status: "healthy",
      label: "COMPLETED",
      completed: true,
    },
    DRIFT_DETECTED: {
      status: "warning",
      label: "DETECTED",
      completed: false,
    },
    FAILED: {
      status: "error",
      label: "FAILED",
      completed: false,
    },
    ERROR: {
      status: "error",
      label: "FAILED",
      completed: false,
    },
    SKIPPED: {
      status: "skipped",
      label: "SKIPPED",
      completed: false,
    },
    PENDING: {
      status: "warning",
      label: "IN PROGRESS",
      completed: false,
    },
    IN_PROGRESS: {
      status: "warning",
      label: "IN PROGRESS",
      completed: false,
    },
    Unknown: {
      status: "healthy",
      label: "COMPLETED",
      completed: true,
    },
  };

  return (
    statusMap[status] || {
      status: "warning",
      label: status,
      completed: false,
    }
  );
};

export default function AutomationStatusGrid({
  fixPlan,
  repositoryAnalysis,
  manifestUpdate,
  pullRequest,
  aiReview,
}: AutomationStatusGridProps) {
  const driftDetected = fixPlan?.drift_detected === true;

  const items: AutomationItem[] = [
    ...(driftDetected
      ? [
          {
            id: "drift",
            icon: RefreshCw,
            label: "Runtime Drift",
            data: {
              status: "DRIFT_DETECTED",
            },
            detail:
              "The live Kubernetes image differs from the Git desired image. Restore the Git-defined image. No pull request is required.",
            liveImage: fixPlan?.live_image,
            gitImage: fixPlan?.git_image,
          },
        ]
      : []),

    {
      id: "repository",
      icon: FileCode,
      label: "Repository Analysis",
      data: repositoryAnalysis,
      detail:
        repositoryAnalysis?.status === "TARGET_FILE_FOUND"
          ? "Target file found in repository"
          : repositoryAnalysis?.message || null,
      file: repositoryAnalysis?.target_file,
    },

    {
      id: "manifest",
      icon: GitBranch,
      label: "Manifest Update",
      data: manifestUpdate,
      detail:
        manifestUpdate?.status === "UPDATED_IN_MEMORY"
          ? "Manifest updated in memory"
          : manifestUpdate?.message || null,
      file: repositoryAnalysis?.target_file,
    },

    {
      id: "pullrequest",
      icon: GitPullRequest,
      label: "Pull Request",
      data: pullRequest,
      detail: pullRequest?.pr_number
        ? `PR #${pullRequest.pr_number} created successfully`
        : pullRequest?.message || null,
      prNumber: pullRequest?.pr_number,
      prUrl: pullRequest?.pr_url,
    },

    {
      id: "aireview",
      icon: AlertCircle,
      label: "AI Review",
      data: aiReview,
      detail:
        aiReview?.status === "COMPLETED" ||
        aiReview?.status === "Unknown"
          ? "AI review completed"
          : aiReview?.message ||
            aiReview?.review_summary ||
            null,
    },
  ];

  const visibleItems = items.filter(
    (item) => item.data && item.data.status !== "SKIPPED"
  );

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">
        Automation Status
      </h3>

      <div className="space-y-4">
        {visibleItems.map((item) => {
          const statusInfo = getStatusInfo(
            item.data?.status
          );

          const Icon = item.icon;

          const isDriftItem = item.id === "drift";

          return (
            <div
              key={item.id}
              className={`flex items-start gap-4 p-4 rounded-lg ${
                isDriftItem
                  ? "border border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/20"
                  : "bg-gray-100 dark:bg-navy-800/50"
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {statusInfo.completed ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : statusInfo.status === "error" ? (
                  <XCircle className="w-5 h-5 text-red-500" />
                ) : statusInfo.status === "warning" ? (
                  <Clock className="w-5 h-5 text-amber-500" />
                ) : (
                  <Icon className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">
                    {item.label}
                  </span>

                  <StatusBadge
                    status={statusInfo.status}
                    label={statusInfo.label}
                  />

                  <span className="text-xs text-muted-foreground">
                    •
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {item.data?.status || "Not started"}
                  </span>
                </div>

                {item.detail && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.detail}
                  </p>
                )}

                {isDriftItem && (
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Live Image
                      </p>

                      <p className="mt-1 text-sm font-mono break-all">
                        {item.liveImage || "Not available"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Git Desired Image
                      </p>

                      <p className="mt-1 text-sm font-mono break-all">
                        {item.gitImage || "Not available"}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Recommended Action
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          Restore Git desired state
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Pull Request
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          Not required
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {item.file && !isDriftItem && (
                  <div className="mt-1">
                    <span className="text-xs font-mono text-muted-foreground break-all">
                      File: {item.file}
                    </span>
                  </div>
                )}

                {item.prNumber && item.prUrl && (
                  <div className="mt-2">
                    <a
                      href={item.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent-purple hover:underline inline-flex items-center gap-1"
                    >
                      View Pull Request →
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}