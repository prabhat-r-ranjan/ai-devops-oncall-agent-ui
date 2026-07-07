// lib/types.ts
export interface AnalyzeRequest {
  incident_id: string;
  title: string;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  namespace: string;
  deployment_name: string;
  service_name?: string;
}

export interface AnalyzeResponse {
  summary: string;
  primary_issue?: string | null;
  probable_root_cause: string;
  evidence: string[];
  recommended_actions: string[];
  suggested_kubectl_commands: string[];
  confidence: number;
  diagnostics: Record<string, any>;
  rule_fix_plan?: Record<string, any> | null;
  ai_fix_plan?: Record<string, any> | null;
  fix_plan?: Record<string, any> | null;
  repository_analysis?: Record<string, any> | null;
  manifest_update?: Record<string, any> | null;
  pull_request?: Record<string, any> | null;
  ai_review?: Record<string, any> | null;
}