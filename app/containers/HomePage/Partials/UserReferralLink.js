import React, { useCallback } from 'react';
import config from '../../../config';

export default function UserReferralLink({ referralCode }) {
  const handleCopyReferralLink = useCallback(() => {
    navigator.clipboard.writeText(
      `${config.platformUrl}signup/${referralCode}`,
    );
  }, [referralCode]);

  return (
    <div className="container mx-auto my-5 px-5">
      <div className="referral-link-box whitespace-nowrap">
        <div className="w-full flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <span>Your Referral Code:</span>
            <span>
              <strong>{referralCode}</strong>
            </span>
          </div>
          <div>
            <a
              onClick={handleCopyReferralLink}
              className="bg-[#e6eafb] text-sm p-1 rounded cursor-pointer hover:bg-[#cdd4f3]"
            >
              Click Here To Copy Your Referral Link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
