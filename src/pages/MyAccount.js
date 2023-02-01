import classes from './MyAccount.module.css'
import { useSelector } from 'react-redux'
import React from 'react'

const MyAccount = () => {
    const username = useSelector(state => state.sLogin.user.name)

    return (
        <React.Fragment>
        <div className={classes.accContainer}>
            <div className={classes.accWrapper}>
                <h2 className={classes.welcomeText}>Hosgeldin {username}!</h2>
            </div>
        </div>
    </React.Fragment>
    )
}
export default MyAccount