import { getToken } from "backend-api/auth";
import { ErrorResponse } from "types/error";

export const API_BASE_URL = process.env.GATSBY_API_URL || 'http://localhost:9000';

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
      const errorData = await response.json().catch(() => ({})) as ErrorResponse;
      throw new ApiError(
        errorData.error || `Unexpected HTTP error! status: ${response.status}`,
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
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();

  return apiRequest<T>(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      // let the server handle the case where the token is not set lol
      Authorization: `Bearer ${token || ''}`,
    },
  });
};
