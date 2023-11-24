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
    clearAll () {
      this.allEBooks = [];
      this.allBooks = [];
      this.ebooks = [];
      this.books = [];
    }
  },
  getters: {
    getAllBooks: (state) =>  state.books,
    getBooks: (state) =>  state.allBooks,
    getAllEBooks: (state) => state.ebooks,
    getEBooks: (state) => state.allEBooks,

    getBookById: (state) => (book_id: number) => {
      return state.allBooks.find((book: unknown) => book.book_id === book_id);
    },
    getBookAuthor: (state) => (author_name: string) => {
      return state.allBooks.filter((book: unknown) => book.author_name === author_name);
    },
    getBookByTitle: (state) => (book_title: string) => {
      return state.allBooks.find((book: unknown) => book.title === book_title);
    }
  },
});
