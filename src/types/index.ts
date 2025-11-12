// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Header type
export interface Header {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

// Authentication types
export type AuthenticationType = 'None' | 'Bearer';

export interface Authentication {
  type: AuthenticationType;
  token: string;
  enabled: boolean;
}

// Request configuration
export interface ApiRequest {
  url: string;
  method: HttpMethod;
  headers: Header[];
  body: string;
  authentication?: Authentication;
}

// Response data
export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time: number;
  size: number;
}

// Tab types for UI
export type TabType = 'body' | 'headers' | 'authorization';

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Input types
export type InputType = 'text' | 'url' | 'password';
