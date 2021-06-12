import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'

const Notification = (props) => {
    const { notify, setNotify } = props
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setNotify({
            ...notify,
            isOpen:false
        })
    }
    return (
        <Snackbar open={notify.isOpen}
            outoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}
        >
            <Alert severity={notify.type}
                onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
