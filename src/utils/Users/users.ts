import { api } from 'boot/axios';
import { useUserStore } from 'stores/user-store';
import jwt_decode from 'jwt-decode';

const userStore = useUserStore();
const decoded = jwt_decode(userStore.token);

const getUserdata = async () => {
  try {
    const response = await api.post('/user/get/details', { user_id: decoded.user_id }, {
      headers: {
        authorization: `Bearer ${userStore.token}`
      }
    });
    userStore.initUser(response.data);
  } catch (error) {
    throw error
  }
}

export default {
  getUserdata,
}
