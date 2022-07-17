import React, { useCallback, useEffect, useState } from 'react';
import plansServicce from '../../../services/plansServicce'

export default function PlanSelect({ value, onChange }) {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {

    plansServicce.getAll()
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        //
      })

  }

  const handleSelectPlan = useCallback((plan_id) => {
    onChange(plan_id)
  }, [])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {data.map((plan, index) => (
        <a key={index}
          className={`flex flex-col p-4 rounded-lg shadow-md bg-white cursor-pointer border ${value === plan.id ? 'border-primary' : 'border-white'}`}
          onClick={() => handleSelectPlan(plan.id)}>
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
  );
}
