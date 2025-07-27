import React from 'react';
import BasicHeader from 'components/BasicHeader';
import LoginForm from 'components/login/LoginForm';
import LoginFooterLinks from 'components/login/LoginFooterLinks';

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <BasicHeader />

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
    <title>Login - wishvaults</title>
    <meta name="description" content="Sign in to your wishvaults account to manage your wishlists." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
);
