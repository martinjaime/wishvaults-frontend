export const API_BASE_URL = process.env.GATSBY_API_URL || 'http://localhost:9000';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error occurred', 0);
  }
};

export const apiRequestWithAuth = async <T>(
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<T> => {
  return apiRequest<T>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};
