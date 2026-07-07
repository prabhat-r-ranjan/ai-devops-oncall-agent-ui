// components/WorkflowTimeline.tsx
"use client";

import { 
  AlertCircle, 
  Activity, 
  GitPullRequest, 
  CheckCircle,
  Bot,
  FileCode,
  Shield,
  GitBranch,
  Search
} from "lucide-react";

const steps = [
  { 
    icon: AlertCircle, 
    label: "Incident Input", 
    description: "Incident detected and submitted for analysis" 
  },
  { 
    icon: Search, 
    label: "Kubernetes Diagnostics", 
    description: "Gathering pod logs, events, and metrics" 
  },
  { 
    icon: Shield, 
    label: "Rule-based RCA", 
    description: "Applying predefined rules to identify root cause" 
  },
  { 
    icon: Bot, 
    label: "AI Fallback", 
    description: "LLM-based analysis when rules don't match" 
  },
  { 
    icon: Activity, 
    label: "FixPlan", 
    description: "Generating safe remediation plan" 
  },
  { 
    icon: FileCode, 
    label: "Repository Analysis", 
    description: "Analyzing manifests and configuration" 
  },
  { 
    icon: GitBranch, 
    label: "Manifest Update", 
    description: "Applying changes to Kubernetes manifests" 
  },
  { 
    icon: GitPullRequest, 
    label: "AI Review", 
    description: "Automated code review of changes" 
  },
  { 
    icon: CheckCircle, 
    label: "Pull Request or Skip", 
    description: "PR created if changes needed, otherwise skipped" 
  },
];

export default function WorkflowTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-purple via-accent-blue to-transparent" />
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4 group">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-navy-800 border-2 border-accent-purple flex items-center justify-center z-10 relative">
                <step.icon className="w-4 h-4 text-accent-purple" />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm">{step.label}</h4>
                <span className="text-xs text-muted-foreground">Step {index + 1}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}