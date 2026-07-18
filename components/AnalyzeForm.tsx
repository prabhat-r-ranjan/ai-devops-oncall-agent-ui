"use client";

import { useState } from "react";
import type { AnalyzeRequest } from "@/lib/types";

interface AnalyzeFormProps {
  onSubmit: (request: AnalyzeRequest) => void;
  loading: boolean;
}

export default function AnalyzeForm({ onSubmit, loading }: AnalyzeFormProps) {
  const [formData, setFormData] = useState<AnalyzeRequest>({
    incident_id: "DEMO-001",              // ✅ Pre-filled for demo
    title: "ImagePullBackOff in demo",
    description: "Pod is unable to pull image nginx:wrong-version",
    severity: "HIGH",
    namespace: "demo-incidents",          // ✅ Fixed
    deployment_name: "demo-imagepull",    // ✅ Fixed
    service_name: "demo-imagepull",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Incident ID</label>
          <input
            type="text"
            name="incident_id"
            value={formData.incident_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800"
            placeholder="INC-1234"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Severity</label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800"
          >
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800"
          placeholder="Pod crash loop backoff"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800"
          placeholder="Describe the incident..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Namespace</label>
          <input
            type="text"
            name="namespace"
            value={formData.namespace}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800"
            placeholder="e.g., demo-incidents"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Deployment Name</label>
          <input
            type="text"
            name="deployment_name"
            value={formData.deployment_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800"
            placeholder="e.g., demo-imagepull"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Service Name</label>
          <input
            type="text"
            name="service_name"
            value={formData.service_name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-navy-700 bg-white dark:bg-navy-800"
            placeholder="backend-service"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-white font-medium hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing..." : "Analyze Incident"}
      </button>
    </form>
  );
}