import React from 'react';
import { Link } from 'react-router-dom';
import deposit from '../../../images/deposit.svg';
import withdraw from '../../../images/withdraw.svg';
import order from '../../../images/order.svg';
import profile from '../../../images/profile.svg';

export default function UserShortcuts() {
  return (
    <div className="container mx-auto my-5 px-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/assets" className="shortcut-box">
          <img src={deposit} alt="" />
          <span>Assets</span>
        </Link>
        <Link to="/releases" className="shortcut-box">
          <img src={withdraw} alt="" />
          <span>Releases</span>
        </Link>
        <Link to="/referrals" className="shortcut-box">
          <img src={order} alt="" />
          <span>Referrals</span>
        </Link>
        <Link to="/referralcode" className="shortcut-box text-center">
          <img src={profile} alt="" />
          <span>Get Referral Code</span>
        </Link>
      </div>
    </div>
  );
}
