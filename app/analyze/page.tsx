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
    try {
      const response = await analyzeIncident(request);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
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
            Enter incident details to analyze and get automated remediation
          </p>
        </div>

        {!result && !loading && (
          <AnalyzeForm onSubmit={handleAnalyze} loading={loading} />
        )}

        {loading && (
          <div className="glass-card p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent-purple border-t-transparent" />
            <p className="mt-4 text-muted-foreground">Analyzing incident...</p>
          </div>
        )}

        {error && (
          <div className="glass-card p-6 border-l-4 border-red-500">
            <p className="text-red-500">{error}</p>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 rounded-lg border border-gray-300 dark:border-navy-700 hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {result && !loading && (
          <ResultSummary result={result} onReset={handleReset} />
        )}
      </div>
    </AppShell>
  );
}