import React, { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { navigate } from 'gatsby';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      navigate('/'); // Redirect to home after successful login
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">welcome</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-field">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="your@email.com"
            disabled={loading}
          />
        </div>

        <div className="form-field">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="enter your password"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary form-submit"
          disabled={loading}
        >
          {loading ? 'signing in...' : 'sign In'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
