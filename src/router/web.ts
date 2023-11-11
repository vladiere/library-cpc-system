import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [];

routes.push(
  {
    path: '/',
    component: () => import('layouts/OutsideLayout.vue'),
    children: [
      {
        path: '/',
        name: 'login',
        meta: { auth: false },
        component: () => import('pages/Login/LoginViewPage.vue'),
      },
      {
        path: '/forgot-password',
        name: 'ForgotPassword',
        meta: { auth: false },
        component: () => import('pages/ForgotPassword/ForgotPass.vue'),
      },
      {
        path: '/register',
        name: 'register',
        meta: { auth: false },
        component: () => import('pages/RegisterPage/RegisterPage.vue'),
      },
    ],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { auth: true },
        component: () => import('pages/Home/HomeViewPage.vue'),
      },
      {
        path: '/book',
        name: 'books',
        meta: { auth: true },
        component: () => import('layouts/BookLayouts.vue'),
        children: [
          {
            path: 'info',
            name: 'book_info',
            meta: { auth: true },
            component: () => import('pages/Books/BookInfoPage.vue'),
          },
          {
            path: 'collections',
            name: 'all_books',
            meta: { auth: true },
            component: () => import('pages/Books/AllBooksPage.vue'),
          },
        ],
      },
      {
        path: '/category',
        name: 'category',
        meta: { auth: true },
        component: () => import('pages/Category/Category.vue'),
      },
      {
        path: '/trending',
        name: 'trending',
        meta: { auth: true },
        component: () => import('pages/Trending/TrendingPage.vue'),
      },
      {
        path: '/profile/:account',
        name: 'UserProfile',
        meta: { auth: true },
        component: () => import('pages/UserProfile/UserProfile.vue'),
      },
      {
        path: '/contribute',
        name: 'contribute',
        meta: { auth: true },
        component: () => import('layouts/ContributionLayout.vue'),
        children: [
          {
            path: '',
            name: 'home-contribution',
            component: () => import('pages/Contribute/ContributePage.vue'),
          },
          {
            path: 'list',
            name: 'list-contribution',
            component: () => import('pages/Contribute/ListContributionPage.vue')
          },
        ]
      },
      {
        path: '/instructor',
        name: 'Intructor',
        meta: { auth: true },
        component: () => import('layouts/IntructorRecommendLayout.vue'),
        children: [
          {
            path: 'recommend',
            name: 'InstructorRecommendations',
            meta: { auth: true },
            component: () => import('components/InstructorRecommendations.vue'),
          },
        ],
      },
      {
        path: '/userbooks',
        name: 'userbooks',
        meta: { auth: true },
        component: () => import('layouts/MyBooksLayout.vue'),
        children: [
          {
            path: '',
            name: 'mybooks',
            meta: { auth: true },
            component: () => import('pages/MyBooks/MyBooksPage.vue'),
          },
          {
            path: 'collections',
            meta: { auth: true },
            name: 'user_collections',
            component: () => import('components/Collections.vue'),
          },
          {
            path: 'borrowshistory',
            name: 'user_borrow_history',
            meta: { auth: true },
            component: () => import('pages/HistoryBooks/HistoryBooksPage.vue'),
          },
          {
            path: 'recommendation',
            name: 'recommendation',
            meta: { auth: true },
            component: () =>
              import('pages/Recommendations/Recommendations.vue'),
          },
        ],
      },
      {
        path: '/settings/:email',
        name: 'settings',
        meta: { auth: true },
        component: () => import('pages/Settings/PageSettings.vue'),
      },
      {
        path: '/recent',
        name: 'recent',
        meta: { auth: true },
        component: () => import('pages/RecentBooks/RecentBooksPage.vue'),
      },
      {
        path: '/advancesearch',
        name: 'advancesearch',
        meta: { auth: true },
        component: () => import('pages/Search/SearchPage.vue'),
        children: [
          {
            path: '',
            name: 'advance_searchall',
            meta: { auth: true },
            component: () => import('components/Search/AdvanceSearch.vue'),
          },
          {
            path: '/search/book',
            name: 'search_book',
            meta: { auth: true },
            component: () => import('components/Search/BooksSearch.vue'),
          },
          {
            path: '/search/author',
            name: 'search_author',
            meta: { auth: true },
            component: () => import('components/Search/AuthorSearch.vue'),
          },
          {
            path: '/search/inside',
            name: 'search_inside',
            meta: { auth: true },
            component: () => import('components/Search/InsideSearch.vue'),
          },
        ],
      },
    ],
  },
);

export default routes;
