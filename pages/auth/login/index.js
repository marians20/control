import { useRouter } from 'next/router';
import { useContext, useState, Fragment } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import Spinner from '../../../components/ui/Spinner';
import AuthContext from '../../../store/auth-context';
import useHttp from '../../../hooks/useHttp';
import useInput from '../../../hooks/useInput';
import classes from "./AuthForm.module.css";

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const authUrl = '/api/auth';

const isNotEmpty = (value) => value.trim() !== '';

const isValidEmail = (email) =>
  email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

const isValidPassword = (value) => value.trim().length >= 6;

const AuthForm = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  //const [formData, setFormData] = useState(initialFormData);
  const [isLogin, setIsLogin] = useState(true);
  const {
    isLoading,
    error,
    sendRequest
  } = useHttp();

  const {
    value: firstNameValue,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    reset: resetFirstNameInput,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    reset: resetLastNameInput,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    reset: resetEmailInput,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isValidEmail);

  const {
    value: passwordValue,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    reset: resetPasswordInput,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isValidPassword);

  let formIsValid = emailIsValid && passwordIsValid && (isLogin || (firstNameIsValid && lastNameIsValid));

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const clearForm = () => {
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
    resetPasswordInput();
  }

  const login = async (email, password) => {
    await sendRequest({
      url: `${authUrl}/login`,
      method: 'POST',
      body: {
        email: email,
        password: password
      }
    }, data => {
      authContext.login(data.token, email);
      router.replace('/');
    });
  };

  const register = async (firstName, lastName, email, password) => {
    await sendRequest({
      url: `${authUrl}/register`,
      method: 'POST',
      body: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      }
    }, data => {
      authContext.login(data.token, email);
      router.replace('/');
    });
  };

  const keyUpHandler = (event) => {
    if (event.keyCode === 13) {
      submitHandler(event);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    if (isLogin) {
      await login(emailValue, passwordValue);
    } else {
      await register(firstNameValue, lastNameValue, emailValue, passwordValue);
    }
  };

  return (
    <Fragment>
      {error && <Alert severity="error" color="error">
        {error}
      </Alert>}
      <Container className={classes.container}>
        <header>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        </header>
        <section>
          {isLoading && <Spinner />}
          {!isLoading &&
            <form onSubmit={submitHandler} className={classes.inputs} onKeyUp={keyUpHandler}>
              {!isLogin && (
                <Fragment>
                  <TextField
                    required
                    error={firstNameHasError}
                    helperText="First Name should have a value."
                    id="firstName"
                    label="First Name"
                    className={`${classes['text-field']}`}
                    value={firstNameValue}
                    onChange={firstNameChangedHandler}
                    onBlur={firstNameBlurHandler}
                  />
                  <TextField
                    required
                    error={lastNameHasError}
                    helperText="Last Name should have a value."
                    id="lastName"
                    label="Last Name"
                    className={`${classes['text-field']}`}
                    value={lastNameValue}
                    onChange={lastNameChangedHandler}
                    onBlur={lastNameBlurHandler}
                  />
                </Fragment>
              )}
              <TextField
                required
                error={emailHasError}
                helperText="Invalid email."
                id="email"
                label="Email"
                type="email"
                className={`${classes['text-field']}`}
                value={emailValue}
                onChange={emailChangedHandler}
                onBlur={emailBlurHandler}
              />
              <TextField
                required
                error={passwordHasError}
                helperText="Invalid password."
                id="password"
                label="Password"
                type="password"
                className={`${classes['text-field']}`}
                value={passwordValue}
                onChange={passwordChangedHandler}
                onBlur={passwordBlurHandler}
              />
              <div className={classes.actions}>
                <Button disabled={!formIsValid} onClick={submitHandler}>
                  {isLogin ? "Login" : "Create Account"}
                </Button>

                <Button
                  type="button"
                  className={classes.toggle}
                  onClick={switchAuthModeHandler}
                >
                  {isLogin ? "Create new account" : "Login with existing account"}
                </Button>
              </div>
            </form>
          }
        </section>
      </Container >
    </Fragment>
  );
};

export default AuthForm;
