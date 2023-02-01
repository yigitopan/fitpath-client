import classes from './LoginPage.module.css'
import LoginForm from '../components/Login/LoginForm'

const LoginPage = () => {
    return (
        <div  className={classes.LoginPage}>
            <div className={classes.LoginLeft}></div>
            <LoginForm/>
        </div>
    )
}
export default LoginPage