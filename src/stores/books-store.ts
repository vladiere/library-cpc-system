import { defineStore } from 'pinia';
import IBooks from 'src/utils/interfaces/books';

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [] as Array<IBooks>,
  }),

  getters: {
    getAllBooks(state) {
      return state.books;
    },
  },

  actions: {
    initBooks(books_data: any) {
      this.books = books_data;
    },
    clearBooks() {
      this.books = [];
    },
  },
});
