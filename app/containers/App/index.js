/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { hot } from 'react-hot-loader/root';
import HomePage from 'containers/HomePage/Loadable';
import Login from 'containers/Auth/Forms/LoginForm';
import Authentication from 'containers/Auth/Authentication';
import Assets from 'containers/Assets/Loadable';
import Referrals from 'containers/Referrals/Loadable';
import ReferralCode from 'containers/ReferralCode/Loadable';
import Releases from 'containers/Releases/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Aboutus from 'containers/Pages/Aboutus/Loadable';
import Layout from 'components/common/layout/Layout';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../components/common/styles/tailwind.scss';
import '../../components/common/styles/main.scss';
import withAuth from './../../components/redux/providers/withAuth';
import _ from 'lodash';

function App(props) {
  const PrivateRoute = ({ component: Component, user, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user && !_.isEmpty(user) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
  return (
    <div>
      <Helmet titleTemplate="%s - Stake Gate" defaultTitle="Stake Gate">
        <meta name="description" content="A Stake Gate application" />
      </Helmet>

      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/signup/:referralcode?"
            component={Authentication}
          />
          <Route exact path="/Aboutus" component={Aboutus} />
          <PrivateRoute
            exact
            path="/ReferralCode"
            component={ReferralCode}
            user={props.user}
          />
          <PrivateRoute
            exact
            path="/referrals"
            component={Referrals}
            user={props.user}
          />
          <PrivateRoute
            exact
            path="/Assets"
            component={Assets}
            user={props.user}
          />
          <PrivateRoute
            exact
            path="/releases"
            component={Releases}
            user={props.user}
          />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Layout>
    </div>
  );
}
export default withAuth(hot(App));
