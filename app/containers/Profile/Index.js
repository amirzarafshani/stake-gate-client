import React, { useEffect, useState, useCallback } from 'react';
import withAuth from '../../components/redux/providers/withAuth';
import profileService from '../../services/profileService';
import config from '../../config';

const Profile = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);

    profileService
      .getUserInfo()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCopyReferralLink = useCallback(() => {
    navigator.clipboard.writeText(
      `${config.platformUrl}signup/${data?.referral_code}`,
    );
  }, [data]);

  return (
    <div className="p-5">
      <div className="container mx-auto">
        <div className="page-title-container">
          <span className="page-title">Profile</span>
        </div>
        <div className="box whitespace-nowrap">
          <div className="w-full flex flex-col justify-between flex-wrap gap-5">
          <div className="flex items-center gap-1">
              <span>Email:</span>
              <span>
                <strong>{data?.email}</strong>
              </span>
            </div>
            <hr />
            <div className="flex items-center gap-1">
              <span>Joined Date:</span>
              <span>
                <strong>{data?.registered_date}</strong>
              </span>
            </div>
            <hr />
            <div className="flex items-center gap-1">
              <span>Your Referral Code:</span>
              <span>
                <strong>{data?.referral_code}</strong>
              </span>
            </div>
            <div>
              <a
                onClick={handleCopyReferralLink}
                className="bg-[#e6eafb] text-sm p-1 rounded cursor-pointer hover:bg-[#cdd4f3] select-none"
              >
                Click Here To Copy Your Referral Link
              </a>
            </div>
            <hr />
            <div className="flex items-center gap-1">
              <span>Invited Users Conut:</span>
              <span>
                <strong>{data?.referral_count}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Profile);
