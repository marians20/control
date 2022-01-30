import { useRouter } from 'next/router';
import { useContext, useState, Fragment } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import AuthContext from '../../../store/auth-context';
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
    const [isLoading, setIsLoading] = useState(false);

    const changePassword = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${authUrl}/changepassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.email,
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                })
            });

            const data = (await response.json()) || undefined;

            if (!response.ok) {
                throw data || 'Changing password failed!';
            }

            authContext.login(data.token, email);
            router.replace('/');
        } catch (err) {
            clearForm();
            console.log(err);
            if (err.message) {
                alert(err.message);
            } else {
                alert('Changing password failed!');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        
        setIsLoading(true);
        try {
            const response = await fetch(`${authUrl}/changepassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: authContext.email,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                    confirmPassword: formData.confirmPassword,
                })
            });

            const data = (await response.json()) || undefined;

            if (!response.ok) {
                throw data || 'Changing password failed!';
            }

            authContext.login(data.token, email);
            router.replace('/');
        } catch (err) {
            clearForm();
            console.log(err);
            if (err.message) {
                alert(err.message);
            } else {
                alert('Changing password failed!');
            }
        } finally {
            setIsLoading(false);
        }

        clearForm();
        router.push('/');
    }

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

return (
    <Container className={classes.container}>
        <header>
            <h1>Change password</h1>
        </header>
        <section>
            <form onSubmit={submitHandler} className={classes.inputs}>
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
                    {!isLoading &&
                        <Fragment>
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
                        </Fragment>
                    }
                    {isLoading && <p>Sending request...</p>}
                </div>
            </form>
        </section>
    </Container >
);
}

export default ChangePassword;