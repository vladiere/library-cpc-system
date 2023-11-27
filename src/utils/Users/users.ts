import { api } from 'boot/axios';
import { useUserStore } from 'stores/user-store';
import { jwtDecode } from 'jwt-decode';

const userStore = useUserStore();

const getUserdata = async () => {
  try {
    if (userStore.getUserData.length === 0 ) {
      const decoded = jwtDecode(userStore.token);

      const response = await api.post('/user/get/details', { user_id: decoded.user_id }, {
        headers: {
          authorization: `Bearer ${userStore.token}`
        }
      });
      userStore.initUser(response.data);
    }
  } catch (error) {
    throw error
  }
}

export default {
  getUserdata,
}
