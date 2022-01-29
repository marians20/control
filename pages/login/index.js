import { useRouter } from 'next/router';
import { useContext, useRef, useState, Fragment } from 'react';
import AuthContext from '../../store/auth-context';
import classes from "./AuthForm.module.css";

const authUrl = '/api';
const AuthForm = () => {
  const history = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();

  const authContext = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const clearForm = () => {
    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';

    if (!isLogin) {
      firstNameInputRef.current.value = '';
      lastNameInputRef.current.value = '';
    }
  }



  const login = async (email, password) => {
    try {
      const response = await fetch(`${authUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = (await response.json()) || undefined;

      if (!response.ok) {
        throw data || 'Authentication failed!';
      }

      
      authContext.login(data.token, email);
      history.replace('/');
    } catch (err) {
      console.log(err);
      if (err.message) {
        alert(err.message);
      } else {
        alert('*Authentication failure');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (firstName, lastName, email, password) => {
    try {
      const response = await fetch(`${authUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      authContext.login(data.token, email);
      history.replace('/');
    } catch (err) {
      console.log(err);
      if (err.message) {
        alert(err.message);
      } else {
        alert('*Authentication failure');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
      //optional: add validation
      setIsLoading(true);
      if (isLogin) {
        await login(enteredEmail, enteredPassword);
      } else {
        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        await register(firstName, lastName, enteredEmail, enteredPassword);
        // fetch(`${authUrl}/register`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     first_name: enteredFirstName,
        //     last_name: enteredLastName,
        //     email: enteredEmail,
        //     password: enteredPassword
        //   })
        // }).then(response => {
        //   if (response.ok) {
        //     return response.json().then(data => {
        //       clearForm();
        //       authContext.login(data.token, enteredEmail);
        //       history.replace('/');
        //     });
        //   } else {
        //     return response.json().then(data => {
        //       alert(data.message);
        //     });
        //   }
        // }).catch(err => {
        //   alert(err.message);
        // }).finally(() => setIsLoading(false));
      }
    };

    return (
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <Fragment>
              <div className={classes.control}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" ref={firstNameInputRef} required />
              </div>
              <div className={classes.control}>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" ref={lastNameInputRef} required />
              </div>
            </Fragment>
          )}
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" ref={emailInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              ref={passwordInputRef}
              required
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>{isLogin ? "Login" : "Create Account"}</button>}
            {isLoading && <p>Sending request...</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    );
  };

  export default AuthForm;
