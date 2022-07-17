import React from 'react';
import { Helmet } from 'react-helmet-async';
import withAuth from './../../components/redux/providers/withAuth';
import Authentication from './Partials/Authentication';
import UserShortcuts from './Partials/UserShortcuts';
import ProfitChart from './Partials/ProfitChart';

class HomePage extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          {/* <title>Home Page</title> */}
          <meta name="description" content="Stake Gate" />
        </Helmet>
        {this.props.user ? <UserShortcuts /> : <Authentication />}
        <ProfitChart />
      </React.Fragment>
    );
  }
}

export default withAuth(HomePage);
