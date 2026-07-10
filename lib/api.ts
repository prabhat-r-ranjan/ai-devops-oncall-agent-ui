// lib/api.ts
import type { AnalyzeRequest, AnalyzeResponse } from "./types";

const getApiBaseUrl = (): string => {
  const stored = localStorage.getItem('API_BASE_URL');
  if (stored) return stored;
  return process.env.NEXT_PUBLIC_AGENT_API_URL || '/api';
};

export async function analyzeIncident(request: AnalyzeRequest): Promise<AnalyzeResponse> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/analyze`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      let errorMessage = `API error: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = `${response.status} - ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const data: AnalyzeResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to backend. Please ensure the API server is running at ' + baseUrl);
    }
    throw error;
  }
}

export async function testApiConnection(baseUrl: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${baseUrl}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      return {
        success: true,
        message: 'API is healthy and reachable',
      };
    }

    return {
      success: false,
      message: `Health endpoint returned ${response.status}`,
    };
  } catch (error) {
    // If /health doesn't exist, check if the base URL is reachable
    try {
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        return {
          success: true,
          message: 'Health endpoint not available. Analyze API can still be used.',
        };
      }
      
      return {
        success: false,
        message: `API returned ${response.status}`,
      };
    } catch (e) {
      return {
        success: false,
        message: 'Cannot connect to API. Please check the URL and ensure the server is running.',
      };
    }
  }
}