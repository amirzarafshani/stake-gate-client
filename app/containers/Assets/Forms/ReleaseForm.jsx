/*eslint-env jquery*/
import React, { Component, useState } from 'react';
import { toastr } from 'react-redux-toastr';
import Loading from '../../../components/common/base/Loading';
import releasesServicce from '../../../services/releasesServicce';

import { Formik } from 'formik';
import * as Yup from 'yup';

const data = {
  address: '',
};

const ReleaseForm = ({ onSubmit, asset_id }) => {


  const handleSubmit = (values, setSubmitting, resetForm) => {

    values.asset_id = asset_id
    releasesServicce
      .add(JSON.stringify(values))
      .then((res) => {
        onSubmit();
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {

        setSubmitting(false);
      });

  };

  const ValidationSchema = Yup.object().shape({
    address: Yup.string().trim().nullable().required(' '),
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
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Adress
                  </label>
                  <div
                    className={`mt-1 relative rounded-md shadow-sm border ${errors.address ? 'border-red-500' : 'border-gray-200'}`}
                  >
                    <input
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      className="block w-full py-3 pl-3 pr-3 sm:text-sm rounded-md focus:outline-none"
                      placeholder="Adress"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`btn-primary w-full !py-2 md:!w-1/2 !px-20 ${isSubmitting ? 'submitting' : ''
                    }`}
                  disabled={isSubmitting}
                >
                  Withdraw
                </button>
              </div>
            </form>

          </div>
        );
      }}
    </Formik>
  );

}
export default ReleaseForm