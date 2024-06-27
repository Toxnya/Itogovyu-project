import config from "../frontend/config";

export const apiRequest = async (endpoint, method, body = null, headers = {}) => {
    const token = localStorage.getItem('token');

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
            ...headers,
        },
    };

    if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
    }

    console.log('API request options:' , options);

    try {
        const response = await fetch(`${config.SERVER_URL}${endpoint}`, options);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            throw new Error(errorData.error || 'Unknown error');
        }

        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};