import React, { useState, useEffect } from 'react';
import withAuth from '../../../components/redux/providers/withAuth';
import LoginForm from '../../Auth/Forms/LoginForm';
import RegisterForm from '../../Auth/Forms/RegisterForm';

const Authentication = props => {
  const [tab, setTab] = useState('login');


  return (
    <div className="flex items-center min-h-screen bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-cover w-full h-full"
              src="https://source.unsplash.com/user/erondu/1600x900"
              alt="img"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="rtl right">
              <ul className="tabs">
                <li
                  className={`${tab === 'register' ? 'active' : ''}`}
                  onClick={() => setTab('register')}
                >
                  Sign up
                </li>
                <li
                  className={`${tab === 'login' ? 'active' : ''}`}
                  onClick={() => setTab('login')}
                >
                  Sign in
                </li>
              </ul>
              {tab === 'login' ? <LoginForm onClose={() => props.onClose()} /> : ''}
              {tab === 'register' ? (
                <RegisterForm onClose={() => props.onClose()} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Authentication);
