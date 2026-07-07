// components/AnalyzeForm.tsx
"use client";

import { useState } from "react";
import type { AnalyzeRequest } from "@/lib/types";

interface AnalyzeFormProps {
  onSubmit: (data: AnalyzeRequest) => void;
  loading: boolean;
}

export default function AnalyzeForm({ onSubmit, loading }: AnalyzeFormProps) {
  const [formData, setFormData] = useState<AnalyzeRequest>({
    incident_id: "INC-HEALTHY-001",
    title: "Healthy deployment check",
    description: "Validate healthy deployment behavior",
    severity: "LOW",
    namespace: "default",
    deployment_name: "incident-backend",
    service_name: "incident-backend",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AnalyzeRequest, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AnalyzeRequest, string>> = {};
    
    if (!formData.incident_id.trim()) newErrors.incident_id = 'Incident ID is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.namespace.trim()) newErrors.namespace = 'Namespace is required';
    if (!formData.deployment_name.trim()) newErrors.deployment_name = 'Deployment name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Incident ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.incident_id}
            onChange={(e) => setFormData({ ...formData, incident_id: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-navy-800 border border-gray-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-accent-purple"
            placeholder="INC-001"
          />
          {errors.incident_id && <p className="text-xs text-red-500 mt-1">{errors.incident_id}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Severity <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.severity}
            onChange={(e) => setFormData({ ...formData, severity: e.target.value as AnalyzeRequest['severity'] })}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-navy-800 border border-gray-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-accent-purple"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
            <option value="CRITICAL">CRITICAL</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-navy-800 border border-gray-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-accent-purple"
            placeholder="Brief incident title"
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-navy-800 border border-gray-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-accent-purple resize-none"
            rows={3}
            placeholder="Detailed incident description"
          />
          {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Namespace <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.namespace}
            onChange={(e) => setFormData({ ...formData, namespace: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-navy-800 border border-gray-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-accent-purple"
            placeholder="default"
          />
          {errors.namespace && <p className="text-xs text-red-500 mt-1">{errors.namespace}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Deployment Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.deployment_name}
            onChange={(e) => setFormData({ ...formData, deployment_name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-navy-800 border border-gray-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-accent-purple"
            placeholder="my-app"
          />
          {errors.deployment_name && <p className="text-xs text-red-500 mt-1">{errors.deployment_name}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Service Name (optional)
          </label>
          <input
            type="text"
            value={formData.service_name || ''}
            onChange={(e) => setFormData({ ...formData, service_name: e.target.value || undefined })}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-navy-800 border border-gray-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-accent-purple"
            placeholder="my-service"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-navy-700">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-white font-medium hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Analyze Incident'}
        </button>
      </div>
    </form>
  );
}