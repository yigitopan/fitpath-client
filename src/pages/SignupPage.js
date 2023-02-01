import classes from './SignupPage.module.css'
import SignupForm from '../components/Signup/SignupForm'

const SignupPage = () => {
    return (
        <div  className={classes.SignupPage}>
            <div className={classes.SignupLeft}></div>
            <SignupForm/>
        </div>
    )
}
export default SignupPage