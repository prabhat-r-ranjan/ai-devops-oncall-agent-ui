export interface AnalyzeResponse {
  summary: string;
  primary_issue: string;
  probable_root_cause: string;
  evidence: string[];
  recommended_actions: string[];
  suggested_kubectl_commands: string[];
  confidence: number;
  diagnostics: Record<string, any>;
  
  // Fix Plan related
  rule_fix_plan?: {
    issue_type: string;
    can_auto_fix: boolean;
    target_file?: string;
    change_type: string;
    reason: string;
    confidence: number;
    evidence: string[];
    recommended_changes: Record<string, any>;
    source: string;
  };
  ai_fix_plan?: Record<string, any> | null;
  fix_plan?: Record<string, any>;
  
  // Repository Analysis
  repository_analysis?: {
    enabled: boolean;
    status: string;
    message: string;
    files_checked?: string[];
    target_file?: string;
    file_sha?: string;
    content?: string;
    preview?: string;
  };
  
  // Manifest Update
  manifest_update?: {
    enabled: boolean;
    status: string;
    message: string;
    field?: string;
    old_value?: string;
    new_value?: string;
    old_image?: string;
    new_image?: string;
    old_memory?: string;
    new_memory?: string;
    updated_content?: string;
  };
  
  // AI Review
  ai_review?: {
    enabled: boolean;
    status: string;
    message?: string;
    approved?: boolean;
    risk?: string;
    confidence?: number;
    review_summary?: string;
    why_this_fix_is_safe?: string;
    additional_checks?: string[];
    source?: string;
  };
  
  // Pull Request
  pull_request?: {
    enabled: boolean;
    status: string;
    message: string;
    branch?: string;
    target_file?: string;
    field?: string;
    old_value?: any;
    new_value?: any;
    pr_url?: string;
    pr_number?: number;
    commit_message?: string;
    ai_review?: Record<string, any>;
  };
}