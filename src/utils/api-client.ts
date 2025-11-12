import type { ApiRequest, ApiResponse, Header } from '../types';

export class ApiClient {
  /**
   * Sends an HTTP request and returns the response
   */
  static async sendRequest(request: ApiRequest): Promise<ApiResponse> {
    const startTime = performance.now();

    try {
      // Build headers object from enabled headers
      const headers: Record<string, string> = {};
      request.headers
        .filter((h: Header) => h.enabled && h.key && h.value)
        .forEach((h: Header) => {
          headers[h.key] = h.value;
        });

      // Add authentication header if enabled
      if (request.authentication?.enabled && request.authentication.type === 'Bearer' && request.authentication.token) {
        headers['Authorization'] = `Bearer ${request.authentication.token}`;
      }

      // Add default Content-Type if not specified and body exists
      if (request.body && !headers['Content-Type'] && !headers['content-type']) {
        headers['Content-Type'] = 'application/json';
      }

      // Build fetch options
      const options: RequestInit = {
        method: request.method,
        headers,
      };

      // Add body for non-GET requests
      if (request.method !== 'GET' && request.body) {
        options.body = request.body;
      }

      // Make the request
      const response = await fetch(request.url, options);
      const endTime = performance.now();

      // Parse response
      let data: any;
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Get response size (approximate)
      const responseText = typeof data === 'string' ? data : JSON.stringify(data);
      const size = new Blob([responseText]).size;

      // Build response headers object
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      return {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data,
        time: Math.round(endTime - startTime),
        size,
      };
    } catch (error) {
      const endTime = performance.now();
      
      // Return error response
      return {
        status: 0,
        statusText: 'Network Error',
        headers: {},
        data: {
          error: error instanceof Error ? error.message : 'An unknown error occurred',
        },
        time: Math.round(endTime - startTime),
        size: 0,
      };
    }
  }

  /**
   * Validates a JSON string
   */
  static validateJSON(jsonString: string): { valid: boolean; error?: string } {
    if (!jsonString.trim()) {
      return { valid: true }; // Empty is valid
    }

    try {
      JSON.parse(jsonString);
      return { valid: true };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Invalid JSON',
      };
    }
  }

  /**
   * Generates a cURL command from the request
   */
  static generateCurl(request: ApiRequest): string {
    let curl = `curl -X ${request.method}`;

    // Add headers
    request.headers
      .filter((h: Header) => h.enabled && h.key && h.value)
      .forEach((h: Header) => {
        curl += ` \\\n  -H "${h.key}: ${h.value}"`;
      });

    // Add authentication header if enabled
    if (request.authentication?.enabled && request.authentication.type === 'Bearer' && request.authentication.token) {
      curl += ` \\\n  -H "Authorization: Bearer ${request.authentication.token}"`;
    }

    // Add body
    if (request.body && request.method !== 'GET') {
      // Use single quotes for body to avoid escaping JSON double quotes
      // If body contains single quotes, we'd need to escape them
      const bodyHasSingleQuotes = request.body.includes("'");
      
      if (bodyHasSingleQuotes) {
        // If body has single quotes, escape them and use double quotes
        const escapedBody = request.body.replace(/"/g, '\\"');
        curl += ` \\\n  -d "${escapedBody}"`;
      } else {
        // Use single quotes (no escaping needed for JSON)
        curl += ` \\\n  -d '${request.body}'`;
      }
    }

    // Add URL
    curl += ` \\\n  "${request.url}"`;

    return curl;
  }
}
