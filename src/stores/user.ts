import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    librarian_id: null,
    login_id: null,
    message: '',
    privilege: '',
    token: '',
    username: '',
  }),
  actions: {
    initUser(userData: any) {
      this.librarian_id = userData.librarian_id;
      this.login_id = userData.login_id;
      this.message = userData.message;
      this.privilege = userData.privilege;
      this.token = userData.token;
      this.username = userData.username;
    },
    clearUser() {
      this.librarian_id = null;
      this.login_id = null;
      this.message = '';
      this.privilege = '';
      this.token = '';
      this.username = '';
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
