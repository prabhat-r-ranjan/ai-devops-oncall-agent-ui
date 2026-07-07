// app/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import ThemeToggle from "@/components/ThemeToggle";
import { testApiConnection } from "@/lib/api";

export default function SettingsPage() {
  const [apiUrl, setApiUrl] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_AGENT_API_URL || 'http://localhost:8000';
    const stored = localStorage.getItem('API_BASE_URL');
    setApiUrl(stored || url);
  }, []);

  const handleApiUrlChange = (value: string) => {
    setApiUrl(value);
    localStorage.setItem('API_BASE_URL', value);
    window.location.reload();
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const result = await testApiConnection(apiUrl);
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Connection test failed'
      });
    } finally {
      setTesting(false);
    }
  };

  const handleResetApiUrl = () => {
    const defaultUrl = 'http://localhost:8000';
    localStorage.removeItem('API_BASE_URL');
    setApiUrl(defaultUrl);
    window.location.reload();
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure your AI DevOps On-Call Agent</p>
        </div>

        <div className="glass-card p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Theme Preference</h3>
            <ThemeToggle />
          </div>

          <div className="border-t border-gray-200 dark:border-navy-700 pt-6">
            <h3 className="text-lg font-semibold mb-4">API Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  API Base URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-navy-800 border border-gray-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-accent-purple"
                    placeholder="http://localhost:8000"
                  />
                  <button
                    onClick={() => handleApiUrlChange(apiUrl)}
                    className="px-4 py-2 rounded-lg bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleResetApiUrl}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-navy-700 hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
                  >
                    Reset
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Current API URL: {apiUrl}
                </p>
              </div>

              <div>
                <button
                  onClick={handleTestConnection}
                  disabled={testing}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-navy-700 hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testing ? 'Testing...' : 'Test Connection'}
                </button>
              </div>

              {testResult && (
                <div className={`p-4 rounded-lg ${testResult.success ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                  <p className={testResult.success ? 'text-emerald-500' : 'text-red-500'}>
                    {testResult.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}