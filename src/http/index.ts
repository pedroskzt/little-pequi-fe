import {AxiosError} from "axios";
import axios from "axios";
import {decodeJwt, tokenStore} from "./auth.ts";
import {JwtPayload} from "jwt-decode";


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,

})

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;

// Queue to store failed requests while refreshing
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(({resolve, reject}) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });

    failedQueue = [];
};

const refreshToken = async (): Promise<string> => {
    const payload = {
        refresh: tokenStore.getRefresh(),
    }
    if (!payload.refresh) {
        throw new Error('No refresh token available');
    }

    try {
        // Request new token
        const response = await apiClient.post('/auth/refresh/', payload);

        // Update token in session storage
        const newToken = response.data.access;
        tokenStore.setAccess(newToken);

        return newToken;
    } catch (error) {
        // Clear tokens on refresh failure
        tokenStore.clear();

        // Redirect to sign-in or dispatch logout action
        window.location.href = '/login';

        throw error;
    }
};


// Response interceptor for handling token refresh
apiClient.interceptors.response.use(response => response,
    async (responseError) => {
        const originalRequest = responseError.config;

        if (responseError.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                }).then(token => {
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `JWT ${token}`;
                    }
                    return apiClient(originalRequest);
                }).catch(error => {
                    return Promise.reject(error);
                });

            }

            originalRequest._retry = true; // Mark the request as retried to avoid infinite loops
            isRefreshing = true;

            try {
                const newToken = await refreshToken();
                processQueue(null, newToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `JWT ${newToken}`;
                }

                return apiClient(originalRequest);
            } catch (refreshError) {
                console.log("Fail", refreshError)
                processQueue(refreshError as AxiosError, null);
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false;
            }

        }
        return Promise.reject(responseError);
    }
)

// Check if the token is expired
const isTokenExpired = (token: string): boolean => {
    try {
        const payload = decodeJwt(token) as JwtPayload;
        if (!payload.exp) {
            return true;
        }
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
};

// Request interceptor to add token to headers
apiClient.interceptors.request.use(
    async (config) => {
        let token = tokenStore.getAccess();

        if (token && config.headers) {
            if (isTokenExpired(token)) {
                await refreshToken();
                token = tokenStore.getAccess();
            }
            config.headers.Authorization = `JWT ${token}`;
        }

        return config;
    }, (error) => {
        console.log(error);
        return Promise.reject(error);
    })


export default apiClient;