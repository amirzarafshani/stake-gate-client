import React, { useState } from 'react';
import withAuth from '../../redux/providers/withAuth';
import { useRouteMatch } from 'react-router-dom';
import logo from '../../../images/logo.svg';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import LoggedInUserMenu from './Partials/LoggedInUserMenu';
import AuthModal from '../../../containers/Auth/Modals/AuthModal';
import { isMobileOnly } from 'react-device-detect';

const Navigation = (props) => {
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  function isActiveMenu(menu) {
    var res = false;
    const match = useRouteMatch(menu);
    if (match && match.isExact) {
      res = true;
    }

    return res;
  }

  const { children } = props;
  return (
    <div
      className={`flex h-screen bg-gray-50 ${isSideMenuOpen ? 'overflow-hidden' : ''
        }`}
    >
      {props.sideMenu && (
        <React.Fragment>
          <aside
            className={`z-20  w-64 overflow-y-auto bg-[#1E1E2D] flex-shrink-0 hidden 
         ${props.ShowSideMenuIcon ? '' : 'md:block'}
          `}
          >
            <div className="pb-4 text-[#ADACAC] ">
              <Link to="/" className="cursor-pointer">
                <img src={logo} alt="" className="my-3 mx-3 h-full px-2 w-16" />
              </Link>

              <ul className="mt-6">
                <li
                  className={`relative px-6 py-3 ${isActiveMenu('/') ? 'bg-primary text-secondary' : ''
                    }`}
                >
                  {/* <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span> */}
                  <Link
                    to="/"
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span className="ml-4">Home</span>
                  </Link>
                </li>
              </ul>
              <ul>
                <li
                  className={`relative px-6 py-3 ${isActiveMenu('/referrals')
                    ? 'bg-primary text-secondary'
                    : ''
                    }`}
                >
                  <Link
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                    to="/referrals"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                    <span className="ml-4">Referrals</span>
                  </Link>
                </li>
                <li
                  className={`relative px-6 py-3 ${isActiveMenu('/assets')
                    ? 'bg-primary text-secondary'
                    : ''
                    }`}
                >
                  <Link
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                    to="/assets"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                    <span className="ml-4">Assets</span>
                  </Link>
                </li>
                <li
                  className={`relative px-6 py-3 ${isActiveMenu('/releases')
                    ? 'bg-primary text-secondary'
                    : ''
                    }`}
                >
                  <Link
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                    to="/releases"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                    <span className="ml-4">Releases</span>
                  </Link>
                </li>

                {/* <li
                  className={`relative px-6 py-3 ${
                    isActiveMenu('/profile') ? 'bg-primary text-secondary' : ''
                  }`}
                >
                  <Link
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                    to="/profile"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                    <span className="ml-4">Ptofile</span>
                  </Link>
                </li> */}
              </ul>
            </div>
          </aside>

          {isSideMenuOpen ? (
            <div
              className={`fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center transition ease-in-out duration-150 
        ${isSideMenuOpen ? 'opacity-100' : 'opacity-0'}
         ${props.ShowSideMenuIcon ? '' : 'md:hidden'}
        `}
              onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
            ></div>
          ) : (
            ''
          )}
          <aside
            className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-[#1E1E2D] transition ease-in-out duration-150 
      ${isSideMenuOpen ? 'opacity-100' : ' transform -translate-x-80'
              }  ${props.ShowSideMenuIcon ? '' : 'md:hidden'}
      `}
          >
            <div className="py-4 text-gray-500">
              <ul className="mt-6">
                <li
                  className={`relative px-6 py-3 ${isActiveMenu('/') ? 'bg-primary text-secondary' : ''
                    }`}
                >
                  <Link
                    to="/"
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span className="ml-4">Home</span>
                  </Link>
                </li>
              </ul>
              <ul>
                <li
                  className={`relative px-6 py-3 ${isActiveMenu('/referrals')
                    ? 'bg-primary text-secondary'
                    : ''
                    }`}
                >
                  <Link
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                    to="/referrals"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                    <span className="ml-4">Referrals</span>
                  </Link>
                </li>
                <li
                  className={`relative px-6 py-3 ${isActiveMenu('/assets')
                    ? 'bg-primary text-secondary'
                    : ''
                    }`}
                >
                  <Link
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                    to="/assets"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                    <span className="ml-4">Assets</span>
                  </Link>
                </li>
                <li
                  className={`relative px-6 py-3 ${isActiveMenu('/releases')
                    ? 'bg-primary text-secondary'
                    : ''
                    }`}
                >
                  <Link
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                    to="/releases"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                    <span className="ml-4">Releases</span>
                  </Link>
                </li>

                {/* <li
                  className={`relative px-6 py-3 ${
                    isActiveMenu('/profile') ? 'bg-primary text-secondary' : ''
                  }`}
                >
                  <Link
                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-white"
                    to="/profile"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <span className="ml-4">Ptofile</span>
                  </Link>
                </li> */}
              </ul>
            </div>
          </aside>
        </React.Fragment>
      )}
      <div className="flex flex-col flex-1 w-full">
        <header className="z-10 py-4 bg-[#1E1E2D] shadow-md h-20">
          <div className="container flex items-center justify-between h-full px-6 mx-auto text-[#E0AC32] relative">
            <div className="flex-shrink-0 flex items-center">
           {!isMobileOnly ?    <button
                className={`p-1 mr-5 -ml-1 rounded-md focus:outline-none  
              ${props.ShowSideMenuIcon
                    ? ''
                    : props.user && !_.isEmpty(props.user)
                      ? 'md:hidden'
                      : 'hidden'
                  }`}
                onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                aria-label="Menu"
              >
                <svg
                  className="w-8 h-8"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button> :''}
              {(!props.sideMenu ||
                props.ShowSideMenuIcon ||
                _.isEmpty(props.user) ||
                !props.user) && (
                  <Link to="/">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src={logo}
                      alt=""
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src={logo}
                      alt=""
                    />
                  </Link>
                )}
              <Link
                to="/aboutus"
                className="block px-4 py-2 text-sm text-primary hover:text-primary-light cursor-pointer"
              >
                About Us
              </Link>
            </div>

            <div className="absolute inset-y-0 right-0 top-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative flex items-center">
                <AuthControl user={props.user} />
              </div>
            </div>
          </div>
        </header>
        <main
          className={`h-full overflow-y-auto md:p-4 ${props.sideMenu
            ? 'bg-[#F2F3F7]'
            : isActiveMenu('/')
              ? 'bg-[#132846]'
              : ''
            }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
export default withAuth(Navigation);

export function AuthControl(props) {
  const [tab, setTab] = useState('login');
  const [open, setOpen] = useState(false);

  const handleClickSignUp = () => {
    setTab('register');
    setOpen(true);
  };

  const handleClickSignIn = () => {
    setTab('login');
    setOpen(true);
  };

  return !props.user || _.isEmpty(props.user) ? (
    <React.Fragment>
      <a
        className="border border-primary text-secondary px-3 py-0.5 bg-primary rounded cursor-pointer"
        onClick={() => {
          handleClickSignUp();
        }}
      >
        Sign Up
      </a>
      <a
        className="border border-primary text-primary px-3 py-0.5 rounded ml-2 cursor-pointer"
        onClick={() => {
          handleClickSignIn();
        }}
      >
        Sign In
      </a>
      <AuthModal open={open} tab={tab} onClose={() => setOpen(false)} />
    </React.Fragment>
  ) : (
    <LoggedInUserMenu />
  );
}
