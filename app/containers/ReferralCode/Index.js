import React, { useEffect, useState, useCallback } from 'react';
import withAuth from '../../components/redux/providers/withAuth';
import profileService from '../../services/profileService';
import config from '../../config';

const ReferralCode = (props) => {
  const [loading, setLoading] = useState(false);
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
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCopyReferralLink = useCallback(() => {
    navigator.clipboard.writeText(
      `${config.platformUrl}signup/${referralCode}`,
    );
  }, [referralCode]);

  return (
    <div className="p-5">
      <div className="container mx-auto">
        <div className="page-title-container">
          <span className="page-title">Referral Code</span>
        </div>
        <div className="box whitespace-nowrap">
          <div className="w-full flex flex-col justify-between flex-wrap gap-5">
            <div className="flex items-center gap-1">
              <span>Your Referral Code:</span>
              <span>
                <strong>{referralCode}</strong>
              </span>
            </div>
            <hr />
            <div>
              <a
                onClick={handleCopyReferralLink}
                className="bg-[#e6eafb] text-sm p-1 rounded cursor-pointer hover:bg-[#cdd4f3] select-none"
              >
                Click Here To Copy Your Referral Link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ReferralCode);
