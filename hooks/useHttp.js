import { useCallback, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../store/auth-context';

const useHttp = () => {
    const context = useContext(AuthContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData, onError) => {
        setIsLoading(true);
        setError(null);

        try {
            const headers = requestConfig.headers ? requestConfig.headers : { 'Content-Type': 'application/json' };

            if (context.isLoggedIn && !headers.authorization) {
                headers.authorization = `Bearer ${context.token}`;
            }

            const requestInit = {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers,
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            };

            const response = await fetch(requestConfig.url, requestInit);

            if (response.status === 401) {
                router.replace('/auth/login');
            }

            const data = await response.json();
            if (!response.ok) {
                throw new Error( data.message || 'Request failed!' );
            }

            
            applyData(data);

        } catch (err) {
            setError(err.message || 'Something went wrong!');
            onError && onError(err);
        }

        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
    }
};

export default useHttp;