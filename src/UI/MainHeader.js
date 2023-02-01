import classes from './MainHeader.module.css'
import headerLogo from '../assets/logo.webp'
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
        navigate('giris');
    }
    const SignupButtonClickHandler = () => {
        navigate('kayit');
    }
    const navigateToAcc = () => {
        navigate('hesabim');
    }

    const navigateToCal = () => {
        navigate('kalori');
    }

    const navigateToFit = () => {
        navigate('fitness');
    }

    const navigateToAb = () => {
        navigate('nedir');
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
            {!isLoggedIn &&<div onClick={LoginButtonClickHandler} className={classes.mobileHeaderButton}><button><p>Giriş Yap</p></button></div>}
            {isLoggedIn &&<div className={classes.mobileHeaderButton}><button><p>Hesabım</p></button></div>}
            <div onClick={navigateToHomePage} className={classes.headerLogo}><img src={headerLogo}></img></div>
            {!isLoggedIn &&<div onClick={SignupButtonClickHandler} className={classes.mobileHeaderButton}><button><p>Üye Ol</p></button></div>}
            {isLoggedIn &&<div className={classes.mobileHeaderButton}><button onClick={LogoutHandler} ><p>Çıkış Yap</p></button></div>}



            <ul className={classes.headerList}>
                <li onClick={navigateToAb} className={homePageLi}>TestApp nedir?</li>
                <li onClick={navigateToFit} className={homePageLi}>Antrenman Takibi</li>
                <li onClick={navigateToCal} className={homePageLi}>Kalori Takibi</li>
            </ul>  
            <div className={classes.headerButtonWrapper}>
                {!isLoggedIn &&
                    <div>
                    <button onClick={LoginButtonClickHandler}><p>Giriş Yap</p></button>
                    <button onClick={SignupButtonClickHandler}><p>Üye Ol</p></button>
                    </div>
                }

                {isLoggedIn &&
                    <div>
                        <button onClick={MyAcc}><p>Hesabım</p></button>
                        <button onClick={LogoutHandler} ><p>Çıkış Yap</p></button>
                    </div>
                }

            </div> 
        </header>
        </div>
    )
}

export default MainHeader