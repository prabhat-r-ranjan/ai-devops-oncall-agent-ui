"use client";

import { CheckCircle, XCircle, AlertCircle, GitPullRequest, FileCode, GitBranch, Clock } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface AutomationStatusGridProps {
  repositoryAnalysis?: Record<string, any> | null;
  manifestUpdate?: Record<string, any> | null;
  pullRequest?: Record<string, any> | null;
  aiReview?: Record<string, any> | null;
}

// Map backend status to UI status
const getStatusInfo = (status: string | undefined): { status: 'healthy' | 'error' | 'warning' | 'skipped'; label: string; completed: boolean } => {
  if (!status) return { status: 'skipped', label: 'Not Started', completed: false };
  
  const statusMap: Record<string, { status: 'healthy' | 'error' | 'warning' | 'skipped'; label: string; completed: boolean }> = {
    'TARGET_FILE_FOUND': { status: 'healthy', label: 'COMPLETED', completed: true },
    'UPDATED_IN_MEMORY': { status: 'healthy', label: 'COMPLETED', completed: true },
    'PR_CREATED': { status: 'healthy', label: 'COMPLETED', completed: true },
    'COMPLETED': { status: 'healthy', label: 'COMPLETED', completed: true },
    'SUCCESS': { status: 'healthy', label: 'COMPLETED', completed: true },
    'FAILED': { status: 'error', label: 'FAILED', completed: false },
    'ERROR': { status: 'error', label: 'FAILED', completed: false },
    'SKIPPED': { status: 'skipped', label: 'SKIPPED', completed: false },
    'PENDING': { status: 'warning', label: 'IN PROGRESS', completed: false },
    'IN_PROGRESS': { status: 'warning', label: 'IN PROGRESS', completed: false },
    'Unknown': { status: 'healthy', label: 'COMPLETED', completed: true },
  };

  return statusMap[status] || { status: 'warning', label: status || 'Unknown', completed: false };
};

export default function AutomationStatusGrid({ 
  repositoryAnalysis, 
  manifestUpdate, 
  pullRequest, 
  aiReview 
}: AutomationStatusGridProps) {
  const items = [
    {
      id: 'repository',
      icon: FileCode,
      label: 'Repository Analysis',
      data: repositoryAnalysis,
      detail: repositoryAnalysis?.status === 'TARGET_FILE_FOUND' ? 'Target file found in repository' : null,
      file: repositoryAnalysis?.target_file
    },
    {
      id: 'manifest',
      icon: GitBranch,
      label: 'Manifest Update',
      data: manifestUpdate,
      detail: manifestUpdate?.status === 'UPDATED_IN_MEMORY' ? 'Updated in memory' : null,
      file: repositoryAnalysis?.target_file
    },
    {
      id: 'pullrequest',
      icon: GitPullRequest,
      label: 'Pull Request',
      data: pullRequest,
      detail: pullRequest?.pr_number ? `PR #${pullRequest.pr_number} created successfully` : null,
      prNumber: pullRequest?.pr_number,
      prUrl: pullRequest?.pr_url
    },
    {
      id: 'aireview',
      icon: AlertCircle,
      label: 'AI Review',
      data: aiReview,
      detail: aiReview?.status === 'COMPLETED' || aiReview?.status === 'Unknown' ? 'AI review passed' : null,
    },
  ];

  const hasAnyData = items.some(item => item.data && item.data.status !== 'SKIPPED');

  if (!hasAnyData) return null;

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Automation Status</h3>
      <div className="space-y-4">
        {items.map((item) => {
          const statusInfo = getStatusInfo(item.data?.status);
          const Icon = item.icon;
          
          // Skip showing SKIPPED items
          if (item.data?.status === 'SKIPPED') return null;
          
          return (
            <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50">
              <div className="flex-shrink-0 mt-0.5">
                {statusInfo.completed ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : statusInfo.status === 'error' ? (
                  <XCircle className="w-5 h-5 text-red-500" />
                ) : statusInfo.status === 'warning' ? (
                  <Clock className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Icon className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{item.label}</span>
                  <StatusBadge status={statusInfo.status} label={statusInfo.label} />
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{item.data?.status || 'Not started'}</span>
                </div>
                {item.detail && (
                  <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                )}
                {item.file && (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">File: {item.file}</span>
                  </div>
                )}
                {item.prNumber && item.prUrl && (
                  <div className="mt-1">
                    <a 
                      href={item.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent-purple hover:underline flex items-center gap-1"
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