/*eslint-env jquery*/
import React, { Component, useEffect, useState } from 'react';
import { toastr } from 'react-redux-toastr';
import Loading from '../../../components/common/base/Loading';
import UploadAttachment from '../../../components/common/base/UploadAttachment';
import assetsService from '../../../services/assetsService';
import PlanSelect from '../Components/PlanSelect';

import { Formik } from 'formik';
import * as Yup from 'yup';

const initialData = {
  amount: '',
  transaction_id: '',
  plan_id: '',
  image: ''
};

const DepositForm = ({ onCloseAndReload, planId }) => {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    setData({ ...initialData, plan_id: planId })
  }, [planId])

  const handleSubmit = (values, setSubmitting, resetForm) => {

    let formData = new FormData()
    formData.append("image", values.image)
    formData.append("action", 'deposit')
    formData.append("amount", values.amount)
    formData.append("transaction_id", values.transaction_id)
    formData.append("plan_id", values.plan_id)


    assetsService
      .add(formData)
      .then((res) => {
        onCloseAndReload();
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const ValidationSchema = Yup.object().shape({
    amount: Yup.string().trim().nullable().required(' '),
    transaction_id: Yup.string().trim().nullable().required(' '),
    plan_id: Yup.string().trim().nullable().required(' '),
    image: Yup.string().trim().nullable().required(' '),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSubmit(values, setSubmitting, resetForm);
      }}
      validationSchema={ValidationSchema}
    >
      {(props) => {
        const {
          values,
          errors,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
          handleChange,
          handleSubmit,
        } = props;
        return (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="w-full mb-4">
                <div className="my-4">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Wallet Address (TRC20)
                  </label>
                  <div
                    className={`mt-1 relative rounded-md shadow-sm border border-gray-200`}
                  >
                    <span className="block w-full py-3 pl-3 pr-3 sm:text-sm rounded-md focus:outline-none">
                      TC3HwYZ21kyFPyLJ6aSvYexvuYPm9cdugk
                    </span>
                  </div>
                </div>
                <div className="my-4">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amount
                  </label>
                  <div
                    className={`mt-1 relative rounded-md shadow-sm border ${errors.amount ? 'border-red-500' : 'border-gray-200'
                      }`}
                  >
                    <input
                      type="text"
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      className="block w-full py-3 pl-3 pr-3 sm:text-sm rounded-md focus:outline-none"
                      placeholder="Amount"
                    />
                  </div>
                </div>
                <div className="my-4">
                  <label
                    htmlFor="transaction_id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Transaction Id
                  </label>
                  <div
                    className={`mt-1 relative rounded-md shadow-sm border ${errors.transaction_id
                      ? 'border-red-500'
                      : 'border-gray-200'
                      }`}
                  >
                    <input
                      type="text"
                      name="transaction_id"
                      value={values.transaction_id}
                      onChange={handleChange}
                      className="block w-full py-3 pl-3 pr-3 sm:text-sm rounded-md focus:outline-none"
                      placeholder="Transaction Id"
                    />
                  </div>
                </div>
                <div className="my-4">
                  <UploadAttachment error={errors.image} label="Transaction Screenshot"
                    onChange={val => setFieldValue("image", val)} />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="plan_id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Plan
                  </label>
                  <PlanSelect
                    value={values.plan_id}
                    onChange={(val) => setFieldValue('plan_id', val)}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn-primary w-full !py-2 md:!w-1/4 !px-20 ${isSubmitting ? 'submitting' : ''
                    }`}
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};
export default DepositForm;
