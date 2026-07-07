// app/fix-history/page.tsx
"use client";

import AppShell from "@/components/AppShell";
import EmptyState from "@/components/EmptyState";
import { GitPullRequest, Package, Gauge, Activity } from "lucide-react";

const supportedFixes = [
  { icon: Package, label: "UPDATE_IMAGE_TAG", description: "Update container image tag" },
  { icon: Gauge, label: "UPDATE_MEMORY_LIMIT", description: "Adjust memory limits" },
  { icon: Activity, label: "UPDATE_PROBE", description: "Modify health probes" },
];

export default function FixHistoryPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Fix History</h1>
          <p className="text-muted-foreground">Track applied fixes and PR history</p>
        </div>

        <EmptyState
          title="No Fix History Yet"
          description="Fix history will appear here after PR persistence is enabled."
          icon={<GitPullRequest className="w-12 h-12 text-muted-foreground" />}
        >
          <div className="mt-6 p-4 rounded-lg bg-gray-100 dark:bg-navy-800/50">
            <h4 className="font-medium mb-3 text-sm">Supported fix types:</h4>
            <div className="space-y-2">
              {supportedFixes.map((fix) => (
                <div key={fix.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <fix.icon className="w-4 h-4" />
                  <span className="font-mono">{fix.label}</span>
                  <span className="text-xs">— {fix.description}</span>
                </div>
              ))}
            </div>
          </div>
        </EmptyState>
      </div>
    </AppShell>
  );
}