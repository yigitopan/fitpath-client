import classes from './MyAccount.module.css'
import { useSelector } from 'react-redux'
import React from 'react'

const MyAccount = () => {
    const username = useSelector(state => state.sLogin.user.name)

    return (
        <React.Fragment>
        <div className={classes.accContainer}>
            <div className={classes.accWrapper}>
                <h2 className={classes.welcomeText}>Welcome, {username}!</h2>
                <h5>In beta version of FitPath, you can't edit your mail/password credentials, but you'll be able to do it soon.</h5>
            </div>
        </div>
    </React.Fragment>
    )
}
export default MyAccount