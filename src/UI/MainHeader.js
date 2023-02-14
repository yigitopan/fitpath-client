import classes from './MainHeader.module.css'
import headerLogo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { loginActions } from '../store/auth-slice';

const MainHeader = () => {

    const islogged = useSelector(state => state.sLogin.isAuthenticated)

    const MyAcc = () => {
        navigateToAcc();
    }

    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    const navigateToHomePage = () => {
        navigate('/');
    }
    const LoginButtonClickHandler = () => {
        navigate('login');
    }
    const SignupButtonClickHandler = () => {
        navigate('signup');
    }
    const navigateToAcc = () => {
        navigate('account');
    }

    const navigateToFit = () => {
        navigate('fitness');
    }

    const navigateToAb = () => {
        navigate('about');
    }

    const LogoutHandler = () => {
        dispatch(loginActions.logout());
        LoginButtonClickHandler();
    }

    const isLoggedIn = useSelector(state => state.sLogin.isAuthenticated)
    const { pathname } = useLocation();
    const headerClass = (pathname === "/") ? classes.mainHeaderHomePage : classes.mainHeader;
    const wrapperClass = (pathname === "/") ? classes.headerWrapperHomePage : classes.headerWrapper;
    const homePageLi = (pathname === "/") ? classes.homePageLi : "";


    return (
        <div  className={wrapperClass}>
        <header className={headerClass}>
            {!isLoggedIn &&<div onClick={LoginButtonClickHandler} className={classes.mobileHeaderButton}><button><p>Log In</p></button></div>}
            {isLoggedIn &&<div className={classes.mobileHeaderButton}><button  onClick={navigateToFit}><p>Tracker</p></button></div>}
            <div onClick={navigateToHomePage} className={classes.headerLogo}><img src={headerLogo}></img></div>
            {!isLoggedIn &&<div onClick={SignupButtonClickHandler} className={classes.mobileHeaderButton}><button><p>Sign Up</p></button></div>}
            {isLoggedIn &&<div className={classes.mobileHeaderButton}><button onClick={LogoutHandler} ><p>Log Out</p></button></div>}



            <ul className={classes.headerList}>
                <li onClick={navigateToAb} className={homePageLi}>About</li>
                <li onClick={navigateToFit} className={homePageLi}>Exercise</li>
            </ul>  
            <div className={classes.headerButtonWrapper}>
                {!isLoggedIn &&
                    <div>
                    <button onClick={LoginButtonClickHandler}><p>Log In</p></button>
                    <button onClick={SignupButtonClickHandler}><p>Sign Up</p></button>
                    </div>
                }

                {isLoggedIn &&
                    <div>
                        <button onClick={MyAcc}><p>Account</p></button>
                        <button onClick={LogoutHandler} ><p>Log Out</p></button>
                    </div>
                }

            </div> 
        </header>
        </div>
    )
}

export default MainHeader