import { defineStore } from 'pinia';
import IBooks from 'src/utils/interfaces/books';
import IEBooks from 'src/utils/interfaces/ebooks';

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [] as Array<IBooks>,
    ebooks: [] as Array<IEBooks>,
  }),
  actions: {
    initBooks(books_data: unknown) {
      this.books = books_data;
    },
    clearBooks() {
      this.books = [];
    },
    initEBooks(ebooks_data: unknown) {
      this.ebooks = ebooks_data;
    },
    clearEBooks() {
      this.ebooks = [];
    },

  },
  getters: {
    getAllBooks: (state) =>  state.books ,
    getAllEBooks: (state) => state.ebooks ,
  },
  persist: {
    storage: sessionStorage,
  }
});
