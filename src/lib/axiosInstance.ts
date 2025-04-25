import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from 'axios';
  
  const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // ✅ Request Interceptor
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
  
  // ✅ Response Interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.warn('Unauthorized — maybe redirect or clear token.');
        // Optional: handle logout or refresh token
      }
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;
  