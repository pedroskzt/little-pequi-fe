import {AxiosError, AxiosInstance} from "axios";
import axios from "axios";
import {fireSignOutCallback, tokenStore} from "./auth.ts";



const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

// Separate instance with no interceptors — used only for token refresh
// to avoid triggering the request interceptor recursively.
const refreshClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;

// Queue to store failed requests while refreshing
type QueueItem = {
    resolve: (value: string) => void;
    reject: (error: AxiosError) => void;
}
let failedQueue: QueueItem[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(({resolve, reject}) => {
        if (error) reject(error);
        else resolve(token as string);
    });
    failedQueue = [];
};

const refreshToken = async (): Promise<string> => {
    const refresh = tokenStore.getRefresh()
    if (!refresh) throw new Error('No refresh token available');

    try {
        // Request new token
        const response = await refreshClient.post('/auth/refresh/', {refresh});

        // Update token in session storage
        const newToken = response.data.access;
        tokenStore.setAccess(newToken);

        return newToken;
    } catch (error) {
        // Clear tokens on refresh failure
        tokenStore.clear(); //Redundant?

        // Fire logout callback
        fireSignOutCallback();
        throw error;
    }
};

// Request interceptor — attaches the current access token (JWT scheme for Djoser)
apiClient.interceptors.request.use(
    (config) => {
        const token = tokenStore.getAccess();
        if (token && config.headers) {
            config.headers.Authorization = `JWT ${token}`;
        }

        return config;
    }, (error) => {
        console.log(error);
        return Promise.reject(error);
    })

// Response interceptor — refreshes on 401, queues concurrent requests
apiClient.interceptors.response.use(response => response,
    async (responseError: AxiosError) => {
        const originalRequest = responseError.config as typeof responseError.config & { _retry?: boolean };
        if (responseError.response?.status === 401 && !originalRequest?._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                }).then(token => {
                    if (originalRequest?.headers) {
                        originalRequest.headers.Authorization = `JWT ${token}`;
                    }
                    return apiClient(originalRequest!);
                }).catch(error => {
                    return Promise.reject(error);
                });

            }

            originalRequest._retry = true; // Mark the request as retried to avoid infinite loops
            isRefreshing = true;

            try {
                const newToken = await refreshToken();
                processQueue(null, newToken);

                if (originalRequest?.headers) {
                    originalRequest.headers.Authorization = `JWT ${newToken}`;
                }

                return apiClient(originalRequest!);
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

export default apiClient;