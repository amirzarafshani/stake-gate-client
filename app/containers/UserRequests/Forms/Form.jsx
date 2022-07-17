/*eslint-env jquery*/
import React, { Component } from 'react';
// import { toastr } from 'react-redux-toastr';
import Loading from '../../../components/common/base/Loading';
import currenciesService from '../../../services/currenciesService';
import userRequestsService from '../../../services/userRequestsService';

import { Formik } from 'formik';
import * as Yup from 'yup';

import DepositCurrency from './DepositCurrency';
import WithdrawCurrency from './WithdrawCurrency';

import DepositFiat from './DepositFiat';
import WithdrawFiat from './WithdrawFiat';

const data = {
  side: '',
  request_type: 0,
  symbol: '',
  protocol: '',
  address: '',
  transaction_no: '',
  amount: '',
  has_tag: false,
  has_memo: false,
  openSavedWalletAddresses: false,
};

class EditForm extends Component {
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
        this.getData();
      });
    }
  }

  getData = () => {
    let data = this.state.data;

    if (data.symbol) {
      this.setState({ loading: true });

      currenciesService
        .getBySymbol(data.symbol)
        .then((res) => {
          let side = data.side;
          data = res.data;
          data.side = side;
          this.setState({ data: data });
          console.log(data);
        })
        .catch((error) => {
          // console.log(error);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ data: data });
    }
  };

  handleSubmit = (values, setSubmitting) => {
    console.log(values);
    let dto = values;
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
      protocol: Yup.string().trim().nullable().required(' '),
      address: Yup.string().trim().nullable().required(' '),
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
                {!data.fiat || data.base ? (
                  data.side === 0 ? (
                    <DepositCurrency {...props} />
                  ) : (
                    <WithdrawCurrency {...props} />
                  )
                ) : data.fiat ? (
                  data.side === 0 ? (
                    <DepositFiat {...props} />
                  ) : (
                    <WithdrawFiat {...props} />
                  )
                ) : (
                  ''
                )}
              </form>
              {this.state.loading ? <Loading /> : ''}
            </div>
          );
        }}
      </Formik>
    );
  }
}

export const Form = (props) => {
  return (
    <React.Fragment>
      <EditForm {...props} />
    </React.Fragment>
  );
};
