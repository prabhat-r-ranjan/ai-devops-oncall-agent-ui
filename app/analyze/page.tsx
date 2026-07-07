// app/analyze/page.tsx
"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import AnalyzeForm from "@/components/AnalyzeForm";
import ResultSummary from "@/components/ResultSummary";
import { analyzeIncident } from "@/lib/api";
import type { AnalyzeRequest, AnalyzeResponse } from "@/lib/types";

export default function AnalyzePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (request: AnalyzeRequest) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await analyzeIncident(request);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analyze Incident</h1>
          <p className="text-muted-foreground">
            Submit an incident for rule-based RCA with AI fallback
          </p>
        </div>

        {!result && !error && (
          <AnalyzeForm onSubmit={handleAnalyze} loading={loading} />
        )}

        {loading && (
          <div className="glass-card p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent-purple border-t-transparent" />
            <p className="mt-4 text-muted-foreground">Analyzing incident...</p>
          </div>
        )}

        {error && (
          <div className="glass-card p-6 border-red-500/30">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-red-500/20 flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-500">Error</h3>
                <p className="text-muted-foreground mt-1">{error}</p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 rounded-lg bg-gray-200 dark:bg-navy-700 hover:bg-gray-300 dark:hover:bg-navy-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {result && (
          <ResultSummary result={result} onReset={handleReset} />
        )}
      </div>
    </AppShell>
  );
}