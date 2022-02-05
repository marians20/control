import { useRouter } from 'next/router';
import { useContext, useState, Fragment } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import Spinner from '../../../components/ui/Spinner';
import AuthContext from '../../../store/auth-context';
import useHttp from '../../../hooks/useHttp';
import classes from "./ChangePassword.module.css";

const authUrl = '/api/auth';

const initialFormData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
};

const ChangePassword = () => {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const [formData, setFormData] = useState(initialFormData);

    const {
        isLoading,
        error,
        sendRequest,
    } = useHttp();

    const submitHandler = async (event) => {
        event.preventDefault();

        await sendRequest({
            url: `${authUrl}/changepassword`,
            method: 'PUT',
            body: {
                email: authContext.email,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            }
        }, data => {
            alert(data.message);
            authContext.login(data.token, authContext.email);
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
        setFormData(initialFormData);
    }

    const currentPasswordChangeHandler = (event) =>
        setFormData(current => ({ ...current, currentPassword: event.target.value }));

    const newPasswordChangeHandler = (event) =>
        setFormData(current => ({ ...current, newPassword: event.target.value }));

    const confirmPasswordChangeHandler = (event) =>
        setFormData(current => ({ ...current, confirmPassword: event.target.value }));

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
                            value={formData.currentPassword}
                            onChange={currentPasswordChangeHandler}
                        />
                        <TextField
                            required
                            id="newPassword"
                            label="New Password"
                            className={classes['text-field']}
                            type="password"
                            value={formData.newPassword}
                            onChange={newPasswordChangeHandler}
                        />
                        <TextField
                            required
                            id="confirmPassword"
                            label="Confirm Password"
                            className={classes['text-field']}
                            type="password"
                            value={formData.confirmPassword}
                            onChange={confirmPasswordChangeHandler}
                        />
                        <div className={classes.actions}>
                            <Button onClick={submitHandler}>
                                Ok
                            </Button>

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