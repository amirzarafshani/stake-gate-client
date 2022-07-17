import React, { Component } from 'react';
// import { toastr } from 'react-redux-toastr';
import Loading from '../../../components/common/base/Loading';
// import currenciesService from '../../../services/currenciesService';
import userRequestsService from '../../../services/userRequestsService';
import Currency from '../../../components/common/base/Currency';
import { NumberInput, NUMBER_FORMAT_LATIN } from 'react-hichestan-numberinput';
import SelectBankAccount from '../../../components/common/base/SelectBankAccount';
import UserRequestSideName from '../../../components/common/base/UserRequestSideName';

import { Formik } from 'formik';
import * as Yup from 'yup';

const data = {
  side: '',
  request_type: 0,
  symbol: '',
  bank_account_id: '',
  amount: '',
};

class WithdrawFiat extends Component {
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
    dto.bank_account_id = values.bank_account_id;
    dto.symbol = values.symbol;
    dto.amount = values.amount;
    dto.side = values.side;
    dto.attachments = [];
    dto.request_type = 0;

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
      bank_account_id: Yup.string().trim().nullable().required(' '),
      amount: Yup.string().trim().nullable().required(' '),
    });
    return (
      <Formik
        enableReinitialize
        initialValues={data}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
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
                  </div>

                  <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Account
                    </label>
                    <SelectBankAccount
                      onChange={(e) => {
                        setFieldValue('bank_account_id', e);
                      }}
                      symbol={values.symbol}
                      value={values.bank_account_id}
                      error={errors.bank_account_id}
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

export default WithdrawFiat;
