import { defineStore } from 'pinia';
import { IPending, IHistorybook } from 'src/utils/transaction';

export const useMybookStore = defineStore('mybooks', {
  state: () => ({
    transaction_pending: [] as Array<IPending>,
    transaction_book: [] as Array<IHistorybook>,
  }),

  getters: {
    getTransactionPending: (state) => state.transaction_pending,
    getTransactionBook: (state) => state.transaction_book,
  },

  actions: {
    initTransactions (transaction_pending, transaction_book) {
      this.transaction_pending = transaction_pending;
      this.transaction_book = transaction_book;
    },
    addTransactionPending (new_transaction) {
      if (this.transaction_pending.length <= 5) {
        this.transaction_pending.push(new_transaction);
      }
    },
    clearTransactions () {
      this.transaction_pending = [];
      this.transaction_book = [];
    },
    getTransactionPendingByStatus (status) {
      return this.transaction_pending.filter((transaction) => transaction.status === status)
    }
  }
});
