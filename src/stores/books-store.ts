import { defineStore } from 'pinia';
import IBooks from 'src/utils/interfaces/books';
import IEBooks from 'src/utils/interfaces/ebooks';

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [] as Array<IBooks>,
    ebooks: [] as Array<IEBooks>,
    allBooks: [] as Array<IBooks>,
    allEBooks: [] as Array<IEBooks>,
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
    initAllBooks(books_data: unknown) {
      this.allBooks = books_data;
    },
    clearAllBooks() {
      this.allBooks = [];
    },
    initAllEBooks(ebooks_data: unknown) {
      this.allEBooks = ebooks_data;
    },
    clearAllEBooks() {
      this.allEBooks = [];
    },
  },
  getters: {
    getAllBooks: (state) =>  state.books,
    getBooks: (state) =>  state.allBooks,

    getAllEBooks: (state) => state.ebooks,
    getEBooks: (state) => state.allEBooks,
  },
});
