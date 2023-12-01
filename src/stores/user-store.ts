import { defineStore } from 'pinia';
import IUser from 'src/utils/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    authorize: false,
    token: '',
    refresh: '',
    users: [] as Array<IUser>,
  }),
  actions: {
    initUser(user_data: object) {
      this.users = user_data;
    },
    initAuthorize(tokens: unknown) {
      this.token = tokens.accessToken;
      this.refresh = tokens.refreshToken;
      this.authorize = true;
    },
    initToken (token) {
      this.token = token;
    },
    initRefresh (refresh) {
      this.refresh = refresh;
    },
    logoutUser() {
      this.refresh = '';
      this.token = '';
      this.authorize = false;
      this.users = [];
  },
  },
  getters: {
    isAuthenticated: (state) => state.authorize,
    getUserData: (state) => state.users,
  },
  persist: {
    storage: localStorage,
  },
});
