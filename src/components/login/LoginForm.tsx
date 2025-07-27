import React, { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { navigate } from 'gatsby';
import { Button } from 'components/Button';
import FormGroup from 'components/FormGroup';
import Input from 'components/Input';
import PasswordField from 'components/PasswordField';

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

        <FormGroup>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="your@email.com"
            label="email"
            disabled={loading}
          />
        </FormGroup>

        <FormGroup>
          <PasswordField
            id="password"
            value={password}
            onChange={setPassword}
            placeholder="enter your password"
            label="password"
            disabled={loading}
          />
        </FormGroup>

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="form-submit"
        >
          {loading ? 'signing in...' : 'sign in'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
