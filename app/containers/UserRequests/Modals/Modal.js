import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import currenciesService from '../../../services/currenciesService';

import DepositCurrency from '../Forms/DepositCurrency';
import WithdrawCurrency from '../Forms/WithdrawCurrency';

import DepositFiat from '../Forms/DepositFiat';
import WithdrawFiat from '../Forms/WithdrawFiat';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Modal = React.memo((props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (props.open && props.data && props.data.symbol) {
      setLoading(true);
      currenciesService
        .getBySymbol(props.data.symbol)
        .then((res) => {
          let side = props.data.side;
          let newData = res.data;
          newData.side = side;
          setData({ ...newData });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setOpen(props.open);
    // return () => {
    //   setData(undefined);
    // };
  }, [props.open]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      fullWidth={true}
      onClose={() => props.onClose()}
    >
      <DialogContent className="rtl right bg-gray-50 !p-0">
        {data != undefined ? (
          !data.fiat ? (
            data.side === 0 ? (
              <DepositCurrency
                data={data}
                onCloseAndReload={() => props.onCloseAndReload()}
              />
            ) : (
              <WithdrawCurrency
                data={data}
                onCloseAndReload={() => props.onCloseAndReload()}
              />
            )
          ) : data.fiat ? (
            data.side === 0 ? (
              <DepositFiat
                data={data}
                onCloseAndReload={() => props.onCloseAndReload()}
              />
            ) : (
              <WithdrawFiat
                data={data}
                onCloseAndReload={() => props.onCloseAndReload()}
              />
            )
          ) : (
            ''
          )
        ) : loading ? (
          <div>Loading</div>
        ) : (
          ''
        )}
        {/* <Form data={data} onCloseAndReload={() => props.onCloseAndReload()} /> */}
      </DialogContent>
    </Dialog>
  );
});

export default Modal;
