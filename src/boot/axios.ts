import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useUserStore } from 'src/stores/user-store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// For development
const api = axios.create({ baseURL: 'http://localhost:3000/api/' });
const notApi = axios.create({ baseURL: 'http://localhost:3000/api/' });
const userStore = useUserStore();
// const api = axios.create({
//   baseURL: 'https://cpc-backend.up.railway.app/api/',
// });
// const notApi = axios.create({
//   baseURL: 'https://cpc-backend.up.railway.app/api/',
// });

const refreshToken = async () => {
  try {
    const response = await api.post('/refresh/user/tokens', {
      refreshToken: userStore.refresh,
    });

    return response.data[0];
  } catch (error) {
    throw error;
  }
};

// Add a request interceptors
api.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();

    const decodedToken: unknown = jwtDecode(userStore.token);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      config.headers['Authorization'] = `Bearer ${data.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  app.config.globalProperties.$notApi = notApi;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, notApi };
