import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import withAuth from './../../components/redux/providers/withAuth';
import Authentication from '../Auth/Authentication';
import UserShortcuts from './Partials/UserShortcuts';
import Slider from './Partials/Slider';
import ProfitChart from './Partials/ProfitChart';
import profileService from '../../services/profileService';

const HomePage = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [referralCode, setReferralCode] = useState(undefined);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);

    profileService
      .getUserInfo()
      .then((res) => {
        setReferralCode(res.data.referral_code);

        const data_ = {
          labels: res.data.labels,
          datasets: [
            {
              label: 'Amount',
              data: res.data.amounts,
              backgroundColor: 'rgb(0, 170, 160)',
            },
            {
              label: 'Profit',
              data: res.data.profits,
              backgroundColor: 'rgb(142, 210, 201)',
            },
          ],
        };

        console.log(data_);

        setData({ ...data_ });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Stake Gate</title>
        <meta name="description" content="Stake Gate" />
      </Helmet>

      {props.user ? (
        <React.Fragment>
          <Slider />
          <UserShortcuts />
          <ProfitChart data={data} />
        </React.Fragment>
      ) : (
        <Authentication />
      )}
    </React.Fragment>
  );
};

export default withAuth(HomePage);
