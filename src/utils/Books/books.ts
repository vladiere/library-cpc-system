import { api } from 'boot/axios';
import { useBooksStore } from 'stores/books-store';
import { useUserStore } from 'src/stores/user-store';

const bookStore = useBooksStore();
const userStore = useUserStore();

const getAllBooks = async () => {
  try {
    const response = await api.post('/get/all/books/inventory', { limit: 0 }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    bookStore.initBooks(response.data);
  } catch (error) {
    throw error;
  }
}

const getUserContributions = async () => {
  try {
    const response = await api.post('/user/book/contribute/list', { user_id: 0, limit: 0 }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });
    bookStore.initEBooks(response.data);
  } catch (error) {
    throw error;
  }
}

export default {
  getAllBooks,
  getUserContributions,
}
