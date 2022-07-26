import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import withAuth from '../../../redux/providers/withAuth';
import { Link } from 'react-router-dom';
import { ReactComponent as Avatar } from '../../../../images/avatar.svg';

const LoggedInUserMenu = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <a
          className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
        >
          <span className="sr-only">Open user menu</span>
          <Avatar className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100" />
          <div
            className={`z-10 origin-top-right absolute right-0 !top-6 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none 
            ${open ? 'block' : 'hidden'}
            `}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex="-1"
          >
            {/* <Link
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          to="/profile"
        >
          Profile
        </Link> */}

            <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                props.logout();
              }}
            >
              Sign out
            </a>
          </div>
        </a>
      </ClickAwayListener>
    </div>
  );
};

export default withAuth(LoggedInUserMenu);
