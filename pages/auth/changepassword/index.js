import { useRouter } from 'next/router';
import { useContext, Fragment } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import Spinner from '../../../components/ui/Spinner';
import AuthContext from '../../../store/auth-context';
import useHttp from '../../../hooks/useHttp';
import useInput from '../../../hooks/useInput';
import StringUtils from '../../../helpers/string-utils';
import classes from "./ChangePassword.module.css";

const authUrl = '/api/auth';

const ChangePassword = () => {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    const {
        isLoading,
        error,
        sendRequest,
    } = useHttp();

    const {
        value: currentPasswordValue,
        hasError: currentPasswordHasError,
        isValid: currentPasswordIsValid,
        reset: resetCurrentPasswordInput,
        valueChangeHandler: currentPasswordChangedHandler,
        inputBlurHandler: currentPasswordBlurHandler,
    } = useInput(StringUtils.isNotEmpty);

    const {
        value: newPasswordValue,
        hasError: newPasswordHasError,
        isValid: newPasswordIsValid,
        reset: resetNewPasswordInput,
        valueChangeHandler: newPasswordChangedHandler,
        inputBlurHandler: newPasswordBlurHandler,
    } = useInput(StringUtils.isValidPassword);

    const {
        value: confirmPasswordValue,
        hasError: confirmPasswordHasError,
        isValid: confirmPasswordIsValid,
        reset: resetConfirmPasswordInput,
        valueChangeHandler: confirmPasswordChangedHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
    } = useInput(value => StringUtils.isValidPassword(value) && value === newPasswordValue);

    const isFormValid = currentPasswordIsValid && newPasswordIsValid && confirmPasswordIsValid;

    const submitHandler = async (event) => {
        event.preventDefault();

        await sendRequest({
            url: `${authUrl}/changepassword`,
            method: 'PUT',
            body: {
                email: authContext.email,
                currentPassword: currentPasswordValue,
                newPassword: newPasswordValue,
                confirmPassword: confirmPasswordValue,
            }
        }, data => {
            alert(data.message);
            router.replace('/');
        });
        clearForm();
    };

    const keyUpHandler = (event) => {
        if (event.keyCode === 13) {
            submitHandler(event);
        }
    };

    const clearForm = () => {
        resetCurrentPasswordInput();
        resetNewPasswordInput();
        resetConfirmPasswordInput();
    }

    const cancelHandler = () => {
        clearForm();
        router.push('/');
    }

    return (<Fragment>
        {error && <Alert severity="error" color="error">
            {error}
        </Alert>}
        <Container className={classes.container}>
            <header>
                <h1>Change password</h1>
            </header>

            <section>
                {isLoading && <Spinner />}
                {!isLoading &&
                    <form onSubmit={submitHandler} className={classes.inputs} onKeyUp={keyUpHandler}>
                        <TextField
                            required
                            id="currentPassword"
                            label="Current Password"
                            className={classes['text-field']}
                            type="password"
                            error={currentPasswordHasError}
                            helperText="Current password is mandatory."
                            value={currentPasswordValue}
                            onChange={currentPasswordChangedHandler}
                            onBlur={currentPasswordBlurHandler}
                        />
                        <TextField
                            required
                            id="newPassword"
                            label="New Password"
                            className={classes['text-field']}
                            type="password"
                            error={newPasswordHasError}
                            helperText="New Password does not meet the requirements."
                            value={newPasswordValue}
                            onChange={newPasswordChangedHandler}
                            onBlur={newPasswordBlurHandler}
                        />
                        <TextField
                            required
                            id="confirmPassword"
                            label="Confirm Password"
                            className={classes['text-field']}
                            type="password"
                            error={confirmPasswordHasError}
                            helperText="Password not confirmed."
                            value={confirmPasswordValue}
                            onChange={confirmPasswordChangedHandler}
                            onBlur={confirmPasswordBlurHandler}
                        />
                        <div className={classes.actions}>
                            {isFormValid && <Button onClick={submitHandler}>
                                Ok
                            </Button>}

                            <Button
                                type="button"
                                className={classes.toggle}
                                onClick={cancelHandler}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                }
            </section>
        </Container >
    </Fragment>);
}

export default ChangePassword;