// app/incidents/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import AppShell from "@/components/AppShell";
import EmptyState from "@/components/EmptyState";

export default function IncidentsPage() {
  const router = useRouter();

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Incidents</h1>
          <p className="text-muted-foreground">View and manage incident history</p>
        </div>

        <EmptyState
          title="No Incidents Yet"
          description="Incident history will appear here once persistence is enabled."
          icon={<AlertCircle className="w-12 h-12 text-muted-foreground" />}
          actionLabel="Analyze New Incident"
          onAction={() => router.push('/analyze')}
        />
      </div>
    </AppShell>
  );
}