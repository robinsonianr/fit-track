import axios, {AxiosRequestConfig} from "axios";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");

        if (config.data && config.data instanceof FormData) {
            // If the request contains FormData, don't set the 'Content-Type', 
            // the browser will handle it automatically
            delete config.headers["Content-Type"];
        } else {
            // Default to 'application/json' if not FormData
            config.headers["Content-Type"] = "application/json";
        }

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const customInstance = <T>(config:
                                  AxiosRequestConfig): Promise<T> => {
    return axiosInstance(config).then(({data}) => data);
};

export const buildProfileImage = (id: number) => `${import.meta.env.VITE_API_BASE_URL}/api/v1/members/${id}/profile-image`;

export const getAllWorkoutsByCustomerId = async (id: any) => {
    try {
        return await axiosInstance.get(`/api/v1/workouts/log/${id}`);
    } catch (e) {
        throw e;
    }
};