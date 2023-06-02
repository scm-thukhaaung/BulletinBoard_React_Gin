import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import classes from './Loading.module.css'
import DialogContent from '@mui/material/DialogContent';

export default function Loading() {

    return (
        <div className={classes['wrapper-load']}>
            <Dialog
                PaperProps={{
                    sx: {
                        borderRadius: '50%',
                        overflow: 'hidden',
                        maxWidth: 'none',
                        width: 'fit-content',
                        background: 'transparent',
                    },
                }}
                open={true}
            >
                <DialogContent sx={{
                    width: '150px',
                    height: '150px',
                    background: 'none',
                    border: 'none'
                }}>
                    <div className={classes['ring']}>Loading
                        <span></span>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}