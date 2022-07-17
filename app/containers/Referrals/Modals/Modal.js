import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import styled, { createGlobalStyle } from 'styled-components';
import { useRanger } from 'react-ranger';
import { parse } from 'browserslist';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Modal = React.memo((props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [values, setValues] = React.useState([]);

  const { getTrackProps, ticks, segments, handles } = useRanger({
    min:
      parseFloat(props.data?.amount) -
      parseFloat(props.data?.plan?.penalty) * parseFloat(props.data?.remaining),
    max:
      parseFloat(props.data?.amount) +
      parseFloat(props.data?.plan?.profit) * parseFloat(props.data?.plan?.days),
    stepSize: 10,
    values,
    onChange: setValues,
  });

  useEffect(() => {
    if (props.open && props.data) {
      console.log(props.data);
      setData({ ...props.data });
      setValues([
        parseFloat(props.data?.amount) -
          parseFloat(props.data?.calculated_penalty),
        parseFloat(props.data?.amount),
        parseFloat(props.data?.amount) +
          parseFloat(props.data?.calculated_profit),
      ]);
    }
    setOpen(props.open);
    // return () => {
    //   setData(undefined);
    // };
  }, [props.open, props.data]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted={false}
      maxWidth="md"
      fullWidth={true}
      onClose={() => props.onClose()}
    >
      <DialogContent className="rtl right bg-gray-50 !p-10">
        {loading ? (
          <div>Loading</div>
        ) : (
          data && (
            <div className="flex flex-col">
              {/* <Track {...getTrackProps()}>
                {ticks.map(({ value, getTickProps }) => (
                  <Tick {...getTickProps()}>
                    <TickLabel>{value}</TickLabel>
                  </Tick>
                ))}
                {segments.map(({ getSegmentProps }, i) => (
                  <Segment {...getSegmentProps()} index={i} />
                ))}
                {handles.map(({ value, active, getHandleProps }) => (
                  <button
                    {...getHandleProps({
                      style: {
                        appearance: 'none',
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                      },
                    })}
                  >
                    <Handle active={active}>{value}</Handle>
                  </button>
                ))}
              </Track> */}
              <div className="font-bold flex justify-between border-b pb-5 mb-5">
                <span>{`Plan: ${data.plan?.name}`}</span>
                <span> {`Days: ${data.plan?.days}`}</span>
                <span> {`Amount: ${data.amount}`}</span>
              </div>
              <div className="flex">
                <div className="w-1/2">
                  <div className="flex flex-col gap-5">
                    <span>{`Profit: ${data.plan?.profit}`}</span>
                    <span>{`Elapsed: ${data.elapsed}`}</span>
                    <div className="divide-y-2 divide-gray-400"></div>
                    <span>{`Total Profit: ${data.calculated_profit}`}</span>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex flex-col gap-5">
                    <span>{`Penalty: ${data.plan?.penalty}`}</span>
                    <span>{`Remaining: ${data.remaining}`}</span>
                    <div className="divide-y-2 divide-blue-200"></div>
                    <span>{`Total Penalty: ${data.calculated_penalty}`}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
});

export default Modal;

const GlobalStyles = createGlobalStyle`
  body {
   font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
   font-weight: 300;
  }
`;

export const Track = styled('div')`
  display: inline-block;
  height: 8px;
  width: 90%;
  margin: 0 5%;
`;

export const Tick = styled('div')`
  :before {
    content: '';
    position: absolute;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    height: 5px;
    width: 2px;
    transform: translate(-50%, 0.7rem);
  }
`;

export const TickLabel = styled('div')`
  position: absolute;
  font-size: 0.6rem;
  color: rgba(0, 0, 0, 0.5);
  top: 100%;
  transform: translate(-50%, 1.2rem);
  white-space: nowrap;
`;

export const Segment = styled('div')`
  background: ${(props) =>
    props.index === 0
      ? '#3e8aff'
      : props.index === 1
      ? '#00d5c0'
      : props.index === 2
      ? '#f5c200'
      : '#ff6050'};
  height: 100%;
`;

export const Handle = styled('div')`
  background: #ff1a6b;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 100%;
  font-size: 0.7rem;
  white-space: nowrap;
  color: white;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  transform: ${(props) =>
    props.active ? 'translateY(-100%) scale(1.3)' : 'translateY(0) scale(0.9)'};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;
