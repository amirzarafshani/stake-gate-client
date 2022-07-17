import React, { Component } from 'react';
import Currency from '../../../components/common/base/Currency';
import Loading from '../../../components/common/base/Loading';
// import currenciesService from '../../../services/currenciesService';
import userRequestsService from '../../../services/userRequestsService';
import UserRequestSideName from '../../../components/common/base/UserRequestSideName';
import { NumberInput, NUMBER_FORMAT_LATIN } from 'react-hichestan-numberinput';
import SelectProtocol from '../../../components/common/base/SelectProtocol';
import SavedWalletAddressesModal from '../../Wallet/Modals/SavedWalletAddressesModal';

import { Formik } from 'formik';
import * as Yup from 'yup';

const data = {
  side: '',
  request_type: 0,
  symbol: '',
  protocol: '',
  wallet_address: '',
  amount: '',
  has_tag: false,
  has_memo: false,
  openSavedWalletAddresses: false,
};

class WithdrawCurrency extends Component {
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
    dto.wallet_address = values.wallet_address;
    dto.tag = values.tag;
    dto.memo = values.memo;
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
      wallet_address: Yup.string().trim().nullable().required(' '),
      amount: Yup.string().trim().nullable().required(' '),

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
                    <div className="item !py-0">
                      <label className="block text-sm">Currency</label>
                      <Currency symbol={values.symbol} />
                    </div>
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
                      }}
                      data={values.protocols}
                      value={values.protocol}
                      error={errors.protocol}
                    />
                  </div>

                  <div className="my-4">
                    <label
                      htmlFor="wallet_address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <div className="flex items-center">
                        <span>Address</span>
                        <a
                          className="ml-2 text-blue-400 cursor-pointer hover:text-blue-500"
                          onClick={() =>
                            setFieldValue('openSavedWalletAddresses', true)
                          }
                        >
                          (Select From My Wallets)
                        </a>
                      </div>
                    </label>
                    <input
                      className={`appearance-none block w-full  text-gray-700 border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
          ${errors.wallet_address ? 'border-red-500' : 'border-gray-200'}
          `}
                      id="wallet_address"
                      name="wallet_address"
                      type="text"
                      onChange={handleChange}
                      value={values.wallet_address}
                      placeholder="Wallet Address"
                    />
                  </div>
                  <SavedWalletAddressesModal
                    open={values.openSavedWalletAddresses || false}
                    onClose={() =>
                      setFieldValue('openSavedWalletAddresses', false)
                    }
                    onChange={(val) => {
                      setFieldValue('wallet_address', val.wallet_address);
                      setFieldValue('tag', val.tag);
                      setFieldValue('memo', val.memo);
                      setFieldValue('openSavedWalletAddresses', false);
                    }}
                    protocol={values.protocol}
                    symbol={values.symbol}
                  />

                  {values.protocolItem && values.protocolItem.has_tag ? (
                    <div className="my-4">
                      <label
                        htmlFor="tag"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tag
                      </label>
                      <input
                        className={`appearance-none block w-full  text-gray-700 border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
     ${errors.tag ? 'border-red-500' : 'border-gray-200'}
     `}
                        id="tag"
                        name="tag"
                        type="text"
                        onChange={handleChange}
                        value={values.tag}
                        placeholder="Tag"
                      />
                    </div>
                  ) : (
                    ''
                  )}

                  {values.protocolItem && values.protocolItem.has_memo ? (
                    <div className="my-4">
                      <label
                        htmlFor="memo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Memo
                      </label>
                      <input
                        className={`appearance-none block w-full  text-gray-700 border rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
     ${errors.memo ? 'border-red-500' : 'border-gray-200'}
     `}
                        id="memo"
                        name="memo"
                        type="text"
                        onChange={handleChange}
                        value={values.memo}
                        placeholder="Memo"
                      />
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

                  <button
                    type="submit"
                    className={`btn-primary ${
                      isSubmitting ? 'submitting' : ''
                    }`}
                    disabled={isSubmitting}
                    // onClick={() => console.log(errors)}
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

export default WithdrawCurrency;
