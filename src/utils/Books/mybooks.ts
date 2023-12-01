import { api } from 'boot/axios';
import { useMybookStore } from 'stores/mybooks-store';
import { jwtDecode } from 'jwt-decode';
import { useUserStore } from 'stores/user-store';

const mybookStore = useMybookStore();

const getTransactionPendingAndBooks = async () => {
  try {
    const userStore = useUserStore();
    const decode = jwtDecode(userStore.token);

    if (mybookStore.getTransactionPending.length === 0 || mybookStore.getTransactionBook.length === 0) {
      const response = await api.post('/user/get/borrowed/books', { user_id: decode.user_id }, {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      });

      mybookStore.initTransactions(response.data.transaction_pending, response.data.transaction_book);
    }
  } catch (error) {
    throw error;
  }
}

export default {
  getTransactionPendingAndBooks,
}
