// components/AutomationStatusGrid.tsx
"use client";

import { CheckCircle, XCircle, AlertCircle, GitPullRequest, FileCode, GitBranch } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface AutomationStatusGridProps {
  repositoryAnalysis?: Record<string, any> | null;
  manifestUpdate?: Record<string, any> | null;
  pullRequest?: Record<string, any> | null;
  aiReview?: Record<string, any> | null;
}

const getStatus = (data: Record<string, any> | null | undefined): { status: 'healthy' | 'error' | 'warning' | 'skipped'; label: string } => {
  if (!data) return { status: 'skipped', label: 'Not Started' };
  
  if (data.status === 'COMPLETED' || data.status === 'SUCCESS') {
    return { status: 'healthy', label: 'Completed' };
  }
  
  if (data.status === 'FAILED' || data.status === 'ERROR') {
    return { status: 'error', label: 'Failed' };
  }
  
  if (data.status === 'SKIPPED') {
    return { status: 'skipped', label: 'Skipped' };
  }
  
  if (data.status === 'PENDING' || data.status === 'IN_PROGRESS') {
    return { status: 'warning', label: 'In Progress' };
  }
  
  return { status: 'warning', label: data.status || 'Unknown' };
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
    },
    {
      id: 'manifest',
      icon: GitBranch,
      label: 'Manifest Update',
      data: manifestUpdate,
    },
    {
      id: 'pullrequest',
      icon: GitPullRequest,
      label: 'Pull Request',
      data: pullRequest,
    },
    {
      id: 'aireview',
      icon: AlertCircle,
      label: 'AI Review',
      data: aiReview,
    },
  ];

  const hasAnyData = items.some(item => item.data);

  if (!hasAnyData) return null;

  return (
    <div className="glass-card p-6">
      <h4 className="font-semibold mb-4">Automation Status</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const { status, label } = getStatus(item.data);
          const Icon = item.icon;
          
          return (
            <div key={item.id} className="p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
              <StatusBadge status={status} label={label} />
              {item.data?.skip_reason && (
                <p className="text-xs text-muted-foreground mt-2">{item.data.skip_reason}</p>
              )}
              {item.data?.pr_number && (
                <p className="text-xs text-accent-purple mt-2">PR #{item.data.pr_number}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}