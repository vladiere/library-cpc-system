import { api } from 'boot/axios';
import { useRecommendationStore } from 'stores/recommendation-store';
import { jwtDecode } from 'jwt-decode';
import { useUserStore } from 'stores/user-store';

const recommendationStore = useRecommendationStore();
const userStore = useUserStore();

const getAllRecommendations = async () => {
  try {
    const decode = jwtDecode(userStore.token);
    if (recommendationStore.getRecommendations.length === 0 || recommendationStore.getPersonalize.length === 0) {
      const response = await api.post('/instructor/get/recommendations', { p_role: decode.privilege, user_id: decode.user_id }, {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      });
      if (decode.privilege === 'instructor') {
        recommendationStore.initRecommendation(response.data);
      } else if (decode.privilege === 'student') {
        recommendationStore.initPersonalize(response.data);
      }
    }
  } catch (error) {
    throw error;
  }
}

const getRecommendations = async () => {
  try {
    if (recommendationStore.getAllRecommendations.length === 0) {
      const response = await api.get('/student/get/instructor/recommendations', {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      });
      recommendationStore.initAllRecommendations(response.data);
    }
  } catch (error) {
    throw error;
  }
};

export default {
  getAllRecommendations,
  getRecommendations
}
