import classes from './SignupForm.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const SignupForm = () => {
    let navigate = useNavigate();

    const navigateToHomePage = () => {
      navigate('/');
  }

    const [allValid, setAllValid] = useState(false);
    
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");

    const [validName, setValidName] = useState(false);
    const [nameTouched, setNameTouched] = useState(false);

    const [validSurname, setValidSurname] = useState(false);
    const [surnameTouched, setSurnameTouched] = useState(false);

    const [validEmail, setValidEmail] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
  
    const [validPass, setValidPass] = useState(false);
    const [passTouched, setPassTouched] = useState(false);

    const nameChangeHandler = (e) => {
        setName(e.target.value);
        if(e.target.value.length > 0) {
            setValidName(true)
        }

        else {
            setValidName(false)
        }
    }   
    
    const surnameChangeHandler = (e) => {
        setSurname(e.target.value);
        if(e.target.value.length > 0) {
            setValidSurname(true)
        }
        else {
            setValidSurname(false)
        }
    }   

    const emailChangeHandler = (e) => {
        setMail(e.target.value);
        if(validateEmail(e.target.value)) {
            setValidEmail(true)
        } 
        else {
            setValidEmail(false)
        }
    }   

    const passChangeHandler = (e) => {
        setPass(e.target.value);
        if(e.target.value.length >= 6) {
            setValidPass(true)
        }
        else {
            setValidPass(false)
        }
    }
    
    //////////////////////////////////////

    const nameBlurHandler = () => {
        setNameTouched(true)
    }
    
    const surnameBlurHandler = () => {
        setSurnameTouched(true)
    }

    const emailBlurHandler = () => {
        setEmailTouched(true)
    }

    const passBlurHandler = () => {
        setPassTouched(true)
    }

    useEffect(()=>{
        (validEmail && validPass && validName && validSurname) ? setAllValid(true) : setAllValid(false)     
      },[validEmail, validPass, validName, validSurname])

      const signUpSubmitHandler = (event) => {
        setNameTouched(true)
        setSurnameTouched(true)
        setEmailTouched(true)
        setPassTouched(true)
        event.preventDefault();
        if(allValid){
           authSignup();
        }
    }
    
    const authSignup = async() => {
        try{
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({
              name,
              surname,
              email:mail,
              password:pass
            });
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
  
          const response = await fetch("hhttps://fitpath-server.herokuapp.com/api/users/signup", requestOptions)
          const responseData = await response.json();
            
            if (response.status !== 201){
                console.log(responseData.message);
                throw new Error(responseData.message);
            }
          navigateToHomePage();
          alert("Başarıyla üye oldunuz.");
          }
  
        catch(err){
          console.log("signup false")
          alert("Eksik veya yanlış veri");
        }
      };
    return (
        <div  className={classes.signupFormWrapper}>
            <h2 className={classes.h2}>Üye Ol</h2>
            <form className={classes.form} onSubmit={signUpSubmitHandler}>
                    {(nameTouched && !validName) && <p className={classes.error}>İsim girdisi boş kalamaz</p>}
                    <input value={name} onChange={nameChangeHandler} onBlur={nameBlurHandler} className={classes.input} placeholder='İsminiz' type="text"></input>
                    {(surnameTouched && !validSurname) && <p className={classes.error}>Soyad girdisi boş kalamaz</p>}
                    <input value={surname} onChange={surnameChangeHandler} onBlur={surnameBlurHandler} className={classes.input}  placeholder='Soyadınız' type="text"></input>
                    {(emailTouched && !validEmail) && <p className={classes.error}>Geçersiz E-mail</p>}
                    <input value={mail} onChange={emailChangeHandler} onBlur={emailBlurHandler} className={classes.input}  placeholder='Emailiniz' type="email"></input>
                    {(passTouched && !validPass) && <p className={classes.error}>Şifre en az 6 karakterden oluşmalı</p>}
                    <input value={pass} onChange={passChangeHandler} onBlur={passBlurHandler} className={classes.input}  placeholder='Şifreniz' type="password"></input>
                    <button className={`${classes.button} ${allValid ? classes.valid : classes.notvalid}`} type="submit">ÜYE OL</button>
            </form> 
        </div>
    )
}
export default SignupForm