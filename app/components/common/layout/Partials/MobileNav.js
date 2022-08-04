import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import history from '../../../../utils/history';
import { isMobileOnly } from 'react-device-detect';
import { TiHome } from 'react-icons/ti';
import { BiSupport } from 'react-icons/bi';
import { IoBarChart } from 'react-icons/io5';
import { IoDiamondSharp } from 'react-icons/io5';
import { RiUserSettingsFill } from 'react-icons/ri';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: 12,
  },
  imgLogo: {
    display: 'inline-block',
    height: 32,
    width: 32,
  },
  txtLogo: {
    display: 'inline-block',
    fontSize: 16,
    lineHeight: '32px',
    verticalAlign: 'bottom',
  },
  menuButton: {
    // marginRight: -theme.spacing.unit
  },
  appconfbar: {
    boxShadow:
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  },
  bottomNav: {
    height: '5em',
    position: 'fixed',
    bottom: '0',
    width: '100%',
    boxShadow:
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  },
  bottomNavAct: {
    minWidth: '72px',
    maxWidth: '120px',
  },
});

export default function MobileNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // props.changeNav(newValue);
  };

  return isMobileOnly ? (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.bottomNav}
      showLabels
    >
      <BottomNavigationAction
        className={
          classes.bottomNavAct + value === 'home' ? 'home Mui-selected' : 'home'
        }
        label=""
        value="home"
        icon={<TiHome size="2.1em" />}
        onClick={() => history.push('/')}
      />
      <BottomNavigationAction
        className={classes.bottomNavAct}
        label=""
        value="statistics"
        icon={<IoBarChart size="2em" />}
        onClick={() => history.push('/statistics')}
      />
      <BottomNavigationAction
        className={classes.bottomNavAct}
        label=""
        value="plans"
        icon={<IoDiamondSharp size="2em" />}
        onClick={() => history.push('/plans')}
      />
      <BottomNavigationAction
        className={classes.bottomNavAct}
        label=""
        value="support"
        icon={<BiSupport size="2em" />}
        onClick={() => history.push('/support')}
      />
      <BottomNavigationAction
        className={classes.bottomNavAct}
        label=""
        value="profile"
        icon={<RiUserSettingsFill size="2em" />}
        onClick={() => history.push('/profile')}
      />
    </BottomNavigation>
  ) : (
    <></>
  );
}
