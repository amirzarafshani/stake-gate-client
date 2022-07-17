import React, { Component } from 'react';
import Currency from '../../../components/common/base/Currency';
import Price from '../../../components/common/base/Price';
import Loading from '../../../components/common/base/Loading';
import userRequestsService from '../../../services/userRequestsService';
import UserRequestSideName from '../../../components/common/base/UserRequestSideName';
import { NumberInput, NUMBER_FORMAT_LATIN } from 'react-hichestan-numberinput';
import SelectProtocol from '../../../components/common/base/SelectProtocol';
import systemWalletsService from '../../../services/systemWalletsService';

import { Formik } from 'formik';
import * as Yup from 'yup';

const data = {
  side: '',
  request_type: 0,
  symbol: '',
  protocol: '',
  address: '',
  amount: '',
  transaction_number: '',
  has_tag: false,
  has_memo: false,
  openSavedWalletAddresses: false,
};

const getSystemWallet = (symbol, protocol, setFieldValue) => {
  systemWalletsService
    .getBySymbolProtocol(symbol, protocol)
    .then((res) => {
      setFieldValue('address', res.data.address);
      setFieldValue('tag', res.data.tag);
      setFieldValue('memo', res.data.memo);
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
};

class DepositCurrency extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false,
      key: 'info',
      id: this.props.id,
      data: data,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data }, () => {
        // this.getData();
      });
    }
  }

  // getData = () => {
  //   let data = this.state.data;

  //   if (data.symbol) {
  //     this.setState({ loading: true });

  //     currenciesService
  //       .getBySymbol(data.symbol)
  //       .then((res) => {
  //         let side = data.side;
  //         data = res.data;
  //         data.side = side;
  //         this.setState({ data: data });
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         // console.log(error);
  //       })
  //       .finally(() => {
  //         this.setState({ loading: false });
  //       });
  //   } else {
  //     this.setState({ data: data });
  //   }
  // };

  handleSubmit = (values, setSubmitting) => {
    let dto = {};
    dto.symbol = values.symbol;
    dto.amount = values.amount;
    dto.side = values.side;
    dto.protocol = values.protocol;
    dto.address = values.address;
    dto.tag = values.tag;
    dto.memo = values.memo;
    dto.transaction_number = values.transaction_number;
    dto.request_type = 0;
    dto.attachments = [];
    console.log(values);
    userRequestsService
      .add(JSON.stringify(dto))
      .then((res) => {
        console.log(res.data);
        // toastr.success('ویرایش پلن انجام شد');
        // history.push("/ubitexAdmin/users")
        this.props.onCloseAndReload();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  render() {
    const { data } = this.state;
    const ValidationSchema = Yup.object().shape({
      side: Yup.string().trim().nullable().required(' '),
      symbol: Yup.string().trim().nullable().required(' '),
      protocol: Yup.string().trim().nullable().required(' '),
      address: Yup.string().trim().nullable().required(' '),
      amount: Yup.string().trim().nullable().required(' '),
      transaction_number: Yup.string().trim().nullable().required(' '),

      tag: Yup.string()
        .nullable()
        .when('has_tag', {
          is: true,
          then: Yup.string().trim().nullable().required(' '),
        }),
      memo: Yup.string()
        .nullable()
        .when('has_memo', {
          is: true,
          then: Yup.string().trim().nullable().required(' '),
        }),
    });
    return (
      <Formik
        enableReinitialize
        initialValues={data}
        onSubmit={(values, { setSubmitting }) => {
          this.handleSubmit(values, setSubmitting);
        }}
        validationSchema={ValidationSchema}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            setFieldValue,
            setFieldTouched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            validateForm,
          } = props;
          return (
            <div>
              <form onSubmit={handleSubmit}>
                <div className="order-form-container">
                  <h4 className="text-center font-semibold mb-5">
                    <UserRequestSideName id={values.side} />
                  </h4>
                  <div className="box">
                    <div className="item">
                      <label className="block text-sm">Currency</label>
                      <Currency symbol={values.symbol} />
                    </div>
                    {/* <div className="item">
        <label className="block text-sm">Price</label>
        <span className="flex items-baseline">
          <Price data={values.price} fraction={values.currency.fraction} />
          <span className="pl-1">
            <Currency onlyName symbol={values.currency} />
          </span>
        </span>
      </div> */}
                  </div>

                  <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Network
                    </label>
                    <SelectProtocol
                      onChange={(e) => {
                        console.log(e);
                        setFieldValue('protocolItem', e);
                        setFieldValue('protocol', e.label);
                        setFieldValue('has_tag', e.has_tag);
                        setFieldValue('has_memo', e.has_memo);

                        getSystemWallet(values.symbol, e.label, setFieldValue);
                      }}
                      data={values.protocols}
                      value={values.protocol}
                      error={errors.protocol}
                    />
                  </div>

                  {values.address ? (
                    <div className="mb-4">
                      <label className="block text-sm">Wallet Address</label>
                      <div className="mt-1 relative rounded-md shadow-sm border">
                        <div className="block w-full py-3 pl-3 pr-16 sm:text-sm rounded-md focus:outline-none">
                          {values.address}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {values.tag && values.has_tag ? (
                    <div className="mb-4">
                      <label className="block text-sm">Tag</label>
                      <div className="mt-1 relative rounded-md shadow-sm border">
                        <div className="block w-full py-3 pl-3 pr-16 sm:text-sm rounded-md focus:outline-none">
                          {values.tag}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {values.memo && values.has_memo ? (
                    <div className="mb-4">
                      <label className="block text-sm">Memo</label>
                      <div className="mt-1 relative rounded-md shadow-sm border">
                        <div className="block w-full py-3 pl-3 pr-16 sm:text-sm rounded-md focus:outline-none">
                          {values.memo}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  <div className="my-4">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Amount
                    </label>
                    <div
                      className={`mt-1 relative rounded-md shadow-sm border 
       ${errors.amount ? 'border-red-500' : 'border-gray-200'}
      `}
                    >
                      <NumberInput
                        type="text"
                        name="amount"
                        id="amount"
                        numberFormat={NUMBER_FORMAT_LATIN}
                        value={values.amount}
                        onChange={(e) =>
                          setFieldValue('amount', e.target.value)
                        }
                        className="block w-full py-3 pl-3 pr-16 sm:text-sm rounded-md focus:outline-none"
                        // placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center">
                        <Currency onlyName symbol={values.symbol} />
                      </div>
                    </div>
                  </div>

                  <div className="my-4">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Transaction Number
                    </label>
                    <div
                      className={`mt-1 relative rounded-md shadow-sm border 
       ${errors.transaction_number ? 'border-red-500' : 'border-gray-200'}
      `}
                    >
                      <input
                        type="text"
                        value={values.transaction_number}
                        onChange={(e) =>
                          setFieldValue('transaction_number', e.target.value)
                        }
                        className="block w-full py-3 pl-3 pr-3 sm:text-sm rounded-md focus:outline-none"
                        // placeholder="0.00"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`btn-primary ${
                      isSubmitting ? 'submitting' : ''
                    }`}
                    disabled={
                      isSubmitting
                      //  || values.amount * values.price > values.credit + values.deposit
                    }
                  >
                    Add Request
                  </button>
                </div>
              </form>
              {this.state.loading ? <Loading /> : ''}
            </div>
          );
        }}
      </Formik>
    );
  }
}

export default DepositCurrency;
