import { useRouter } from 'next/router';
import { useContext, useState, Fragment } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import AuthContext from '../../store/auth-context';
import classes from "./AuthForm.module.css";

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const authUrl = '/api';
const AuthForm = () => {
  const history = useRouter();
  const [formData, setFormData] = useState(initialFormData);

  const authContext = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const clearForm = () => {
    setFormData(initialFormData);
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
      setFormData(current => ({ ...current, password: '' }));
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

    setIsLoading(true);
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
    <Container className={classes.container}>
      <header>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      </header>
      <section>
        <form onSubmit={submitHandler} className={classes.inputs}>
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
            {!isLoading && <Button onClick={submitHandler}>
              {isLogin ? "Login" : "Create Account"}
            </Button>}
            {isLoading && <p>Sending request...</p>}
            <Button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </Button>
          </div>
        </form>
      </section>
    </Container >
  );
};

export default AuthForm;
