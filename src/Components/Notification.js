import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'

const Notification = (props) => {
    const{notify,setNotify}=props
    return (
        <Snackbar open={notify.isOpen}
        outoHideDuration={6000}
        anchorOrigin={{vertical: 'top', horizontal: 'right' }}
        >
            <Alert severity={notify.type}>
            {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
