import { api } from 'boot/axios';
import { useBooksStore } from 'stores/books-store';
import { useUserStore } from 'src/stores/user-store';

const bookStore = useBooksStore();
const userStore = useUserStore();

const getAllContributorsBooks = async () => {
  try {
    if (bookStore.getAllBooks.length === 0 && bookStore.getAllEBooks.length === 0) {
      const response = await api.get('/contributorsbooks/all', {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      });
      bookStore.initEBooks(response.data[0]);
      bookStore.initAllEBooks(response.data[1]);
      bookStore.initBooks(response.data[2]);
      bookStore.initAllBooks(response.data[3]);
    }
  } catch (error) {
    throw error;
  }
}

export default {
  getAllContributorsBooks,
}
