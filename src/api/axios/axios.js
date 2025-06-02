import axios from "axios";
let adminUrl = "https://wtsacademy.dedicateddevelopers.us/api";

export const baseURL = adminUrl;
let axiosInstance = axios.create({
    baseURL,
});

export { adminUrl };

export const product = (media) => {
    return `https://wtsacademy.dedicateddevelopers.us/uploads/product/${media}`;
};

export const profile_pic = (media) => {
  return `https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/${media}`;
};
axiosInstance.interceptors.request.use(
    async function (config) {
        console.log(config);
        const token =
            localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token !== null || token !== undefined) {
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

export default axiosInstance;