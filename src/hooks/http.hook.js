import { useCallback } from "react";

export const useHttp = () => {
    // const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        // setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            // setProcess('error');
            throw e;
        }
    }, []);

    const deleteRequest = useCallback(async (url, headers = {'Content-Type': 'application/json'}) => {
        return await request(url, 'DELETE', null, headers);
    }, [request]);

    const postRequest = useCallback(async (url, body = {}, headers = {'Content-Type': 'application/json'}) => {
        const stringifiedBody = JSON.stringify(body);
        return await request(url, 'POST', stringifiedBody, headers);
    }, [request]);

    // const clearError = useCallback(() => {
        // setProcess('loading');
    // }, []);

    return {request,
            deleteRequest,
            postRequest 
            // clearError, 
            // process, 
            // setProcess
    }
}