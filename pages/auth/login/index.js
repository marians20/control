import { useRouter } from 'next/router';
import { useContext, useState, Fragment } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import Spinner from '../../../components/ui/Spinner';
import AuthContext from '../../../store/auth-context';
import useHttp from '../../../hooks/useHttp';
import classes from "./AuthForm.module.css";

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const authUrl = '/api/auth';
const AuthForm = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState(initialFormData);
  const [isLogin, setIsLogin] = useState(true);
  const {
    isLoading,
    error,
    sendRequest
  } = useHttp();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const clearForm = () => {
    setFormData(initialFormData);
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

    if (isLogin) {
      await login(formData.email, formData.password);
    } else {
      await register(formData.firstName, formData.lastName, formData.email, formData.password);
    }
  };

  const firstNameChangeHandler = (event) =>
    setFormData(current => ({ ...current, firstName: event.target.value }));

  const lastNameChangeHandler = (event) =>
    setFormData(current => ({ ...current, lastName: event.target.value }));

  const emailChangeHandler = (event) =>
    setFormData(current => ({ ...current, email: event.target.value }));

  const passwordChangeHandler = (event) =>
    setFormData(current => ({ ...current, password: event.target.value }));

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
                    id="firstName"
                    label="First Name"
                    className={classes['text-field']}
                    value={formData.firstName}
                    onChange={firstNameChangeHandler}
                  />
                  <TextField
                    required
                    id="lastName"
                    label="Last Name"
                    className={classes['text-field']}
                    value={formData.lastName}
                    onChange={lastNameChangeHandler}
                  />
                </Fragment>
              )}
              <TextField
                required
                id="email"
                label="Email"
                type="email"
                className={classes['text-field']}
                value={formData.email}
                onChange={emailChangeHandler}
              />
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                className={classes['text-field']}
                value={formData.password}
                onChange={passwordChangeHandler}
              />
              <div className={classes.actions}>
                <Button onClick={submitHandler}>
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
