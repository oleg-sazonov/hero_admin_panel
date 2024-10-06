export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            throw e;
        }
    };

    const deleteRequest = async (url, headers = {'Content-Type': 'application/json'}) => {
        return await request(url, 'DELETE', null, headers);
    };

    const postRequest = async (url, body = {}, headers = {'Content-Type': 'application/json'}) => {
        const stringifiedBody = JSON.stringify(body);
        return await request(url, 'POST', stringifiedBody, headers);
    };

    return {
        request,
        deleteRequest,
        postRequest 
    }
}