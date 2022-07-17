import React, { Component } from 'react';
import Currency from '../../../components/common/base/Currency';
import Loading from '../../../components/common/base/Loading';
import Price from '../../../components/common/base/Price';
import userRequestsService from '../../../services/userRequestsService';
import UserRequestSideName from '../../../components/common/base/UserRequestSideName';
import { NumberInput, NUMBER_FORMAT_LATIN } from 'react-hichestan-numberinput';
import SelectBankAccount from '../../../components/common/base/SelectBankAccount';
import UploadReceipt from '../../../components/common/base/UploadReceipt';
import systemWalletsService from '../../../services/systemWalletsService';

import { Formik } from 'formik';
import * as Yup from 'yup';

const data = {
  side: '',
  request_type: 0,
  symbol: '',
  bank_account_id: '',
  amount: '',
  attachments: [],
};

class DepositFiat extends Component {
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
    console.log(nextProps);
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
    dto.bank_account_id = values.bank_account_id;
    dto.attachments = values.attachments || [];
    dto.request_type = 0;
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
      bank_account_id: Yup.string().trim().nullable().required(' '),
      amount: Yup.string().trim().nullable().required(' '),
      // file_id: Yup.string().trim().nullable().required(' '),
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
                      Bank Account
                    </label>
                    <SelectBankAccount
                      onChange={(e) => {
                        console.log(e);
                        setFieldValue('bank_account_id', e);
                      }}
                      symbol={values.symbol}
                      value={values.bank_account_id}
                      error={errors.bank_account_id}
                    />
                  </div>

                  <div className="my-4">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Amount
                    </label>
                    <div
                      className={`mt-1 relative rounded-md shadow-sm border ${
                        errors.amount ? 'border-red-500' : 'border-gray-200'
                      }`}
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

                  <div className="mt-4 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Attachments
                    </label>
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {Array(2)
                        .fill()
                        .map((attach, i) => (
                          <UploadReceipt
                            key={`upload-ticket-${i}`}
                            onChange={(e) =>
                              setFieldValue(`attachments[${i}]`, e)
                            }
                            onRemove={() =>
                              setFieldValue(`attachments[${i}]`, undefined)
                            }
                            type={5}
                            label="Attachment"
                            value={values.attachments && values.attachments[i]}
                          />
                        ))}
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

export default DepositFiat;
