import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Navigation from './Navigation';
import { useRouteMatch } from 'react-router-dom';
import withAuth from '../../redux/providers/withAuth';
import _ from 'lodash';

const outOfLayoutLocations = ['/forgotPassword', '/register', '/login'];
const haveSideMenuPages = ['/', '/referrals', '/assets', '/releases'];

const Layout = (props) => {
  function IsOutOfLayoutRoute() {
    var res = false;
    outOfLayoutLocations.forEach((item) => {
      const match = useRouteMatch(item);
      if (match && match.isExact) {
        res = true;
      }
    });

    return res;
  }

  function ShowSideMenuPages() {
    var res = false;
    haveSideMenuPages.forEach((item) => {
      const match = useRouteMatch(item);
      if (match && match.isExact && props.user && !_.isEmpty(props.user)) {
        res = true;
      }
    });

    return res;
  }

  function ShowSideMenuIcon() {
    var res = false;

    const match = useRouteMatch('/');
    if (match && match.isExact && props.user && !_.isEmpty(props.user)) {
      res = true;
    }

    return res;
  }

  const { children } = props;
  return (
    <React.Fragment>
      <ToastContainer
        position="top-left"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      // autoClose={false}
      />

      {IsOutOfLayoutRoute() || !props.user ? (
        children
      ) : (
        <React.Fragment>
          <Navigation
            sideMenu={ShowSideMenuPages()}
            ShowSideMenuIcon={ShowSideMenuIcon()}
            children={children}
          />

          {/* <div id="main-wrapper">{children}</div> */}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withAuth(Layout);
