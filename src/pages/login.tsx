import React from 'react';
import LoginHeader from 'components/login/LoginHeader';
import LoginForm from 'components/login/LoginForm';
import LoginFooterLinks from 'components/login/LoginFooterLinks';
import 'styles/colors.css';
import 'styles/landing.css'; // For shared button styles
import 'styles/login.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <LoginHeader />

      <main className="login-main">
        <LoginForm />
        <LoginFooterLinks />
      </main>
    </div>
  );
};

export default LoginPage;

export const Head = () => (
  <>
    <title>Login - WishVaults</title>
    <meta name="description" content="Sign in to your WishVaults account to manage your wishlists." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
);
