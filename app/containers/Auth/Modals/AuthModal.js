import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegisterForm';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AuthModal = (props) => {
  const [tab, setTab] = useState('login');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTab(props.tab);
    setOpen(props.open);
  }, [props.tab, props.open]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth={`${tab === 'login' ? 'xs' : 'sm'}`}
      fullWidth={true}
      onClose={() => props.onClose()}
    >
      <DialogContent className="rtl right">
        <ul className="tabs">
          <li
            className={`${tab === 'register' ? 'active' : ''}`}
            onClick={() => setTab('register')}
          >
            Sign up
          </li>
          <li
            className={`${tab === 'login' ? 'active' : ''}`}
            onClick={() => setTab('login')}
          >
            Sign in
          </li>
        </ul>
        {tab === 'login' ? <LoginForm onClose={() => props.onClose()} /> : ''}
        {tab === 'register' ? (
          <RegisterForm onClose={() => props.onClose()} />
        ) : (
          ''
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
