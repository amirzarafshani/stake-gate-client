import React from 'react';
import { Link } from 'react-router-dom';
import deposit from '../../../images/deposit.svg';
import withdraw from '../../../images/withdraw.svg';
import order from '../../../images/order.svg';

export default function UserShortcuts() {
  return (
    <div className="container mx-auto my-5 px-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>
    </div>
  );
}
