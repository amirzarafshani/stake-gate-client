import React, { useEffect, useState, useCallback } from 'react';
import withAuth from '../../components/redux/providers/withAuth';
import plansServicce from '../../services/plansServicce';
import DepositModal from '../Assets/Modals/DepositModal';

const Plans = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setDate] = useState(undefined);
  const [selectedPlanId, setSelectedPlanId] = useState(undefined);
  const [depositWithdrawModalShow, setDepositModalShow] = useState(false)

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);

    plansServicce
      .getAll()
      .then((res) => {
        setDate(res.data)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleShowDepositModal = (planId) => {
    setSelectedPlanId(planId)
    setDepositModalShow(true)
  };

  const handleCloseModal = useCallback(() => {
    setDepositModalShow(false)
  }, [])

  const handleCloseModalAndReload = useCallback(() => {
    setDepositModalShow(false)
    getData()
  }, [])

  return (
    <div className="container mx-auto my-5 px-5">
      <div className='flex flex-col gap-3'>
        {data?.map((plan, index) => (
          <a key={index}
            className={`flex flex-col p-4 rounded-lg shadow-md bg-white cursor-pointer border ${selectedPlanId === plan.id ? 'border-primary' : 'border-white'}`}
            onClick={() => handleShowDepositModal(plan.id)}
          >
            <h6 className='border-b mb-4 font-bold text-lg'>{`Plan: ${plan.name}`}</h6>
            <div className='flex gap-2'>
              <span>Days:</span>
              <span className='font-bold'>{plan.days}</span>
            </div>
            <div className='flex gap-2'>
              <span>Profit:</span>
              <span className='font-bold'>{plan.profit}</span>
            </div>
            <div className='flex gap-2'>
              <span>Penalty:</span>
              <span className='font-bold'>{plan.penalty}</span>
            </div>
          </a>
        ))}
      </div>
      <DepositModal
        planId={selectedPlanId}
        open={depositWithdrawModalShow}
        onClose={handleCloseModal}
        onCloseAndReload={handleCloseModalAndReload}
      />
    </div>
  )
};

export default withAuth(Plans);
