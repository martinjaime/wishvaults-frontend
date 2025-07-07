import React from 'react';
import { Link } from 'gatsby';

const LoginFooterLinks: React.FC = () => {
  return (
    <div className="login-footer-links">
      <p className="auth-switch">
        don't have an account? <Link to="/signup" className="auth-link">sign up</Link>
      </p>
      <p className="anonymous-option">
        <Link to="/create" className="auth-link">or create lists without an account</Link>
      </p>
    </div>
  );
};

export default LoginFooterLinks;
