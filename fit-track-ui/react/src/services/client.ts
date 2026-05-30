import axios, {AxiosRequestConfig} from "axios";
import jwtDecode, {JwtPayload} from "jwt-decode";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

let refreshPromise: Promise<string | null> | null = null;

export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(refreshToken);
        if (!decoded.exp || Date.now() > decoded.exp * 1000) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return null;
        }

        const {data} = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh`,
            {refreshToken},
            {headers: {"Content-Type": "application/json"}}
        );

        if (data.accessToken) {
            localStorage.setItem("access_token", data.accessToken);
            return data.accessToken;
        }
    } catch (error) {
        console.error("Failed to refresh access token:", error);
        return null;
    }
    return null;
};

axiosInstance.interceptors.request.use(
    async (config) => {
        if (config.data && config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        let accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            try {
                const decoded = jwtDecode<JwtPayload>(accessToken);
                if (decoded.exp && Date.now() > decoded.exp * 1000) {
                    if (!refreshPromise) {
                        refreshPromise = refreshAccessToken().finally(() => { refreshPromise = null; });
                    }
                    accessToken = await refreshPromise;

                    if (!accessToken) {
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("refresh_token");
                        window.location.href = "/login";
                        return Promise.reject(new Error("Token refresh failed"));
                    }
                }
            } catch {
                accessToken = null;
            }
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

export const customInstance = async <T>(config: AxiosRequestConfig): Promise<T> => {
    return axiosInstance(config).then(({data}) => data);
};

export const buildProfileImage = (id: number) => `${import.meta.env.VITE_API_BASE_URL}/api/v1/members/${id}/profile-image`;