import React, { useState, useEffect, useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DepositForm from '../Forms/DepositForm';
import { AiOutlineClose } from 'react-icons/ai';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DepositModal = (props) => {
    const { onClose, onCloseAndReload } = props
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const handleCloseModal = useCallback(() => {
        onClose()
    }, [])

    const handleCloseModalAndReload = useCallback(() => {
        onCloseAndReload()
    }, [])

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted={false}
            maxWidth="lg"
            fullWidth={true}
            onClose={handleCloseModal}
        >
            <DialogTitle>
                <div className="flex items-center justify-between">
                    <span className="font-semibold">
                        Deposit
                    </span>
                    <a
                        className="cursor-pointer hover:text-gray-600"
                        onClick={handleCloseModal}
                    >
                        <AiOutlineClose />
                    </a>
                </div>
            </DialogTitle>
            <DialogContent className="bg-gray-50">
                <DepositForm onCloseAndReload={handleCloseModalAndReload} />
            </DialogContent>
        </Dialog>
    );
};

export default DepositModal;