import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    authorize: false,
    token: '',
    refresh: '',
  }),
  actions: {
    initAuthorize(tokens: any) {
      this.token = tokens.accessToken;
      this.refresh = tokens.refreshToken;
      this.authorize = true;
    },
    logoutUser() {
      this.refresh = '';
      this.token = '';
      this.authorize = false;
    },
  },
  getters: {
    isAuthenticated: (state) => state.authorize,
  },
  persist: {
    storage: sessionStorage,
  },
});
