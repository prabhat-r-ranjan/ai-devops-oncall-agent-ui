// README.md
# AI DevOps On-Call Agent UI

A modern, production-quality Next.js dashboard for AI-assisted DevOps incident triage and remediation.

## Features

- 🚀 **Dashboard**: Overview of system status and workflow
- 🔍 **Incident Analysis**: Submit incidents for rule-based RCA with AI fallback
- 📊 **Results Visualization**: Clear display of root cause, fix plans, and automation status
- 🌓 **Dark/Light Mode**: Full theme support with persistence
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- 🎨 **Premium UI**: Glassmorphism, gradients, and professional design

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running at `http://localhost:8000` (or custom URL)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-devops-oncall-agent-ui

Github action flow.
-------------------

git push
      │
      ▼
GitHub Actions
      │
      ├── Build Docker image
      ├── Push to ACR
      ├── Update ui-deployment.yaml
      ├── Commit manifest
      └── Push back to GitHub
                 │
                 ▼
            ArgoCD
                 │
          (Auto Sync or Manual Sync)
                 │
                 ▼
               AKS