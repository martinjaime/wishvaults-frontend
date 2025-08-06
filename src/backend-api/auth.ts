export const setToken = (token: string): void => {
  localStorage.setItem('session-token', token);
}

export const getToken = (): string | null => {
   return localStorage.getItem('session-token');
}
