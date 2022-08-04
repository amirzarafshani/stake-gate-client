import React from 'react';

export default function Support() {

  return (
    <div className="p-5">
      <div className="container mx-auto">
        <div className="page-title-container">
          <span className="page-title">Support</span>
        </div>
        <div className="box whitespace-nowrap">
          <div className="w-full flex flex-col justify-between flex-wrap gap-5">
            <div className="flex items-center gap-1">
              <span>Email:</span>
              <span>
                <strong>support@diamond-gate.com</strong>
              </span>
            </div>
            <hr />
            <div className="flex items-center gap-1">
              <span>Tel:</span>
              <span>
                <strong>+901100000000</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
