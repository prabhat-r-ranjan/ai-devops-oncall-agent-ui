// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  Bot, 
  GitPullRequest, 
  Activity,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";
import AppShell from "@/components/AppShell";
import StatusBadge from "@/components/StatusBadge";
import MetricCard from "@/components/MetricCard";
import WorkflowTimeline from "@/components/WorkflowTimeline";

const statusItems = [
  { id: 'rca', label: 'RCA Engine', status: 'active', description: 'Rule-based root cause analysis' },
  { id: 'ai', label: 'AI Fallback', status: 'active', description: 'LLM-based fallback when rules fail' },
  { id: 'fixplan', label: 'Safe FixPlan', status: 'active', description: 'Guarded fix plan generation' },
  { id: 'pr', label: 'PR Automation', status: 'active', description: 'Automated pull request creation' },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleScrollToWorkflow = () => {
    const element = document.getElementById('workflow-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl glass-card p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-accent-blue/5 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-accent-purple/20">
                <Bot className="w-6 h-6 text-accent-purple" />
              </div>
              <span className="text-sm font-mono text-accent-purple">v1.0.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">AI-Powered DevOps</span>
              <span className="block text-foreground">On-Call Agent</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              Detect, diagnose, and safely remediate Kubernetes incidents using 
              rule-based RCA, AI fallback, and guarded PR automation.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.push('/analyze')}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-white font-medium hover:shadow-glow transition-all duration-300 flex items-center gap-2"
              >
                Analyze Deployment
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleScrollToWorkflow}
                className="px-6 py-3 rounded-lg border border-gray-300 dark:border-navy-700 hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
              >
                View System Flow
              </button>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statusItems.map((item) => (
            <MetricCard
              key={item.id}
              title={item.label}
              value="Active"
              icon={
                <div className="p-2 rounded-lg bg-accent-purple/20">
                  {item.id === 'rca' && <Shield className="w-5 h-5 text-accent-purple" />}
                  {item.id === 'ai' && <Bot className="w-5 h-5 text-accent-blue" />}
                  {item.id === 'fixplan' && <Activity className="w-5 h-5 text-accent-indigo" />}
                  {item.id === 'pr' && <GitPullRequest className="w-5 h-5 text-emerald-500" />}
                </div>
              }
              status="healthy"
              description={item.description}
            />
          ))}
        </div>

        {/* Workflow Timeline */}
        <div id="workflow-section" className="glass-card p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">System Workflow</h2>
          <WorkflowTimeline />
        </div>
      </div>
    </AppShell>
  );
}