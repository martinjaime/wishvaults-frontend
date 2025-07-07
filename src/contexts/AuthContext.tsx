import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: BaseUser | null;
  token: string | null;
  loading: boolean;
}

type LoadingAction = { type: 'SET_LOADING'; payload: boolean };
type LoginSuccessAction = { type: 'LOGIN_SUCCESS'; payload: { user: BaseUser; token: string } };
type LogoutAction = { type: 'LOGOUT' };
type RestoreSessionAction = { type: 'RESTORE_SESSION'; payload: { user: BaseUser; token: string } };

type AuthAction =
  | LoadingAction
  | LoginSuccessAction
  | LogoutAction
  | RestoreSessionAction;

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  restoreSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      };
    case 'RESTORE_SESSION':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session on app load
  useEffect(() => {
    restoreSession();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { user, token } = await response.json();

      // Store in memory (session storage for persistence across tabs)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const logout = (): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('user');
    }
    dispatch({ type: 'LOGOUT' });
  };

  const restoreSession = (): void => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('authToken');
      const userStr = sessionStorage.getItem('user');

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          dispatch({ type: 'RESTORE_SESSION', payload: { user, token } });
        } catch (error) {
          console.error('Failed to restore session:', error);
          logout();
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
