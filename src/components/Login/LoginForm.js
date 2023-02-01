import classes from './LoginForm.module.css'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../../store/auth-slice';
import { useNavigate } from 'react-router-dom'
import { testAuth } from '../../store/auth-action';

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


const LoginForm = () => {

  const invalidAttempt = useSelector(state => state.sLogin.invalidAttempt)
  const isLoggedIn = useSelector(state => state.sLogin.isAuthenticated)
  const loginErrorMessage = useSelector(state => state.sLogin.errorMessage)
  const loginErrorType = useSelector(state => state.sLogin.errorType)

  let navigate = useNavigate();
  
  const navigateToSignupPage = () => {
      navigate('/kayit');
  }
  const navigateToHomePage = () => {
    navigate('/');
  }

    const dispatch = useDispatch();

    const [allValid, setAllValid] = useState(false);

    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");

    const [validEmail, setValidEmail] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
  
    const [validPass, setValidPass] = useState(false);
    const [passTouched, setPassTouched] = useState(false);
    
    const mailBlurHandler = () => {
        setEmailTouched(true);
    }

    const passBlurHandler = () => {
        setPassTouched(true);
    }

   const emailHandler = (e) => {
     setMail(e.target.value);
    if(validateEmail(e.target.value)) {
        setValidEmail(true)
    }
    else {
        setValidEmail(false)
    }
  };

  const passHandler = (e) => {
    setPass(e.target.value);

    if(e.target.value.length>=6) {
        setValidPass(true)
    }
    else {
        setValidPass(false)
    }
  };

  const loginSubmitHandler = (e) => {
    setEmailTouched(true)
    setPassTouched(true)

    e.preventDefault();
    if(allValid) {
        authSubmitHandler();
        setEmailTouched(false)
        setPassTouched(false)
    }
    setAllValid(false);
  }

  useEffect(()=>{
    (validEmail&&validPass) ? setAllValid(true) : setAllValid(false)
  },[validEmail, validPass, allValid])

  useEffect(()=>{
    if(isLoggedIn === true) {
      //navigateToHomePage();
    }
   },[isLoggedIn])
 
   useEffect(()=>{
     if(invalidAttempt === true) {
       setValidEmail(false);
       setValidPass(false)
     }
    },[invalidAttempt])

    useEffect(()=>{
      if(loginErrorType === "both") {
        setMail("");
        setPass("");
      }

      if(loginErrorType === "pass") {
        setPass("");
        setEmailTouched(true);
        setValidEmail(true);
      }
     },[loginErrorType])

    const authSubmitHandler = async() => {
      try{
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          
          var raw = JSON.stringify({
            email:mail,
            password:pass
          });
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };

        const response = await fetch("https://fitpath-server.herokuapp.com/api/users/login", requestOptions)
        const responseData = await response.json();

          if (response.status !== 200){
            throw new Error(responseData.message);
          }
          
        localStorage.setItem("token",responseData.token)
        const actionResponse = await dispatch(testAuth(true));
          if(actionResponse){
            navigateToHomePage();
          }
        }

      catch(err){
        const errorString = err.toString();
        dispatch(loginActions.login({loggedin:false, errorMessage:errorString}))
      }
    };
      
    return (
        <div  className={classes.loginFormWrapper}>
            <h2 className={classes.h2}>Giriş Yap</h2>
            {invalidAttempt && <h4 className={classes.invalidLogin}>{loginErrorMessage}</h4>}
            <form  className={classes.form} onSubmit={loginSubmitHandler}>
                    {(emailTouched && !validEmail) && <p className={classes.error}>Geçersiz E-mail</p>}
                    <input value={mail} className={classes.input} onChange={emailHandler} onBlur={mailBlurHandler} placeholder="Emailiniz" type="text" id="loginEmail" name="loginEmail"></input>
                    {(passTouched && !validPass) && <p className={classes.error}>Şifre 6 karaktarden daha kısa</p>}
                    <input value={pass} className={classes.input} onChange={passHandler} onBlur={passBlurHandler} placeholder="Şifreniz" type="password" id="loginPass" name="loginPass"></input>
                    <button className={`${classes.button} ${allValid ? classes.valid : classes.notvalid}`} type="submit">GİRİŞ YAP</button>
            </form> 
            <p className={classes.signup}>Hala hesabınız yok mu? <span className={classes.span} onClick={navigateToSignupPage}>Üye olun</span></p>
        </div>
    )
}
export default LoginForm