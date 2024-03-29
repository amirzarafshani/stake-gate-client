import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authService from '../../../services/authService';
import withAuth from '../../../components/redux/providers/withAuth';
import ClientCaptcha from 'react-client-captcha';

const RegisterForm = (props) => {
  const [captchaCode, setCaptchaCode] = useState('');

  useEffect(() => {
    // console.log(BiRefresh);
  }, []);

  const hanldeSubmit = (values, setSubmitting) => {
    if (captchaCode.toLowerCase() !== values.captcha.toLowerCase()) {
      console.log('captchaCode error!');
    } else {
      authService
        .signup(JSON.stringify(values))
        .then((res) => {
          console.log(res.data);
          props.login(res.data);
          props.onClose();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().nullable().required('Required'),
    password: Yup.string().nullable().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'تکرار کلمه عبور صحیح نیست')
      .trim()
      .required('تکرار کلمه عبور الزامی است'),
    // acceptTheRules: Yup.boolean().oneOf([true], ' '),
    captcha: Yup.string().nullable().trim().required(' '),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      captcha: '',
      referral_code: props.referralCode,
    },
    enableReinitialize: true,
    // initialTouched: true,
    // validateOnChange: false,
    // validateOnBlur: false,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      hanldeSubmit(values, setSubmitting);
    },
  });

  const setCaptchaCodeFunc = (code, setFieldValue) => {
    setCaptchaCode(code);
    setFieldValue('captcha', '');
  };

  return (
    <form onSubmit={formik.handleSubmit} className="w-full my-5">
      <div className="flex flex-wrap -mx-3 mb-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
          ${formik.errors.email ? 'border-red-500' : 'border-gray-200'}
          `}
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="referral_code"
          >
            Refferal Code
          </label>
          <input
            className={`appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
          ${formik.errors.referral_code ? 'border-red-500' : 'border-gray-200'}
          `}
            id="referral_code"
            name="referral_code"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.referral_code}
            placeholder="Refferal Code"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
          ${formik.errors.password ? 'border-red-500' : 'border-gray-200'}
          `}
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className={`appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
          ${
            formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
          }
          `}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="captcha"
          >
            captcha
          </label>
          <input
            className={`appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
        ${
          formik.touched.captcha && formik.errors.captcha
            ? 'border-red-500'
            : 'border-gray-200'
        }
        `}
            id="captcha"
            name="captcha"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.captcha}
            placeholder=""
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="captcha"
          >
            &nbsp;
          </label>
          <ClientCaptcha
            chars="abcdefghjkmnprstuvwxyz123456789"
            captchaCode={(e) => setCaptchaCodeFunc(e, formik.setFieldValue)}
            height={38}
            containerClassName="flex items-center h-full justify-between bg-white border border-gray-100 h-12 rounded"
            retryButtonClassName="ml-1 p-2"
            // retryIcon={BiRefresh}
            retryIconSize={28}
            // retry={false}
            backgroundColor="#fff"
          />
        </div>
      </div>

      <button
        type="submit"
        className={`btn-primary ${formik.isSubmitting ? 'submitting' : ''}`}
        disabled={formik.isSubmitting}
      >
        Sign in
      </button>
    </form>
  );
};

export default withAuth(RegisterForm);
