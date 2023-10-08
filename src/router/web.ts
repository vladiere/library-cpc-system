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
        component: () => import('pages/Login/LoginViewPage.vue'),
      },
      {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('pages/ForgotPassword/ForgotPass.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('pages/RegisterPage/RegisterPage.vue')
      },
    ],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Home/HomeViewPage.vue'),
      },
      {
        path: '/book',
        name: 'books',
        component: () => import('pages/BookInfo/BookInfo.vue')
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('pages/Category/Category.vue')
      },
      {
        path: '/trending',
        name: 'trending',
        component: () => import('pages/Trending/TrendingPage.vue')
      },
      {
        path: '/profile/:account',
        name: 'UserProfile',
        component: () => import('pages/UserProfile/UserProfile.vue')
      },
      {
        path: '/recommendation',
        name: 'recommendation',
        component: () => import('pages/Recommendations/Recommendations.vue')
      },
      {
        path: '/contribute',
        name: 'contribute',
        component: () => import('pages/Contribute/Contribute.vue')
      },
      {
        path: '/instructor',
        name: 'Intructor',
        component: () => import('layouts/IntructorRecommendLayout.vue'),
        children: [
          {
            path: 'recommend',
            name: 'InstructorRecommendations',
            component: () => import('components/InstructorRecommendations.vue')
          }
        ]
      },
      {
        path: '/userbooks',
        name: 'userbooks',
        component: () => import('layouts/MyBooksLayout.vue'),
        children: [
          {
            path: '',
            name: 'DisplayUserbooks',
            component: () => import('components/MyBooks.vue')
          },
          {
            path: '/userbooks/mylists',
            name: 'mylists',
            component: () => import('components/SeeAllLists.vue')
          },
          {
            path: '/userbooks/collections',
            name: 'user_collections',
            component: () => import('components/Collections.vue')
          },
          {
            path: '/userbooks/borrowshistory',
            name: 'user_borrow_history',
            component: () => import('components/BorrowsHistory.vue')
          },
          {
            path: '/userbooks/mylists/add',
            name: 'create_list',
            component: () => import('components/CreateList.vue')
          },
          {
            path: '/userbooks/mylists/:list_id',
            name: 'ListsName',
            component: () => import('components/MyList.vue')
          },
        ]
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('pages/Settings/PageSettings.vue'),
        children: [
          {
            path: '/settings/account',
            name: 'account_settings',
            component: () => import('pages/Settings/AccountSettings.vue')
          },
          {
            path: '/settings/system',
            name: 'system_settings',
            component: () => import('pages/Settings/SystemSettings.vue')
          },
        ]
      },
      {
        path: '/recent',
        name: 'recent',
        component: () => import('pages/RecentBooks/RecentBooksPage.vue')
      },
      {
        path: '/advancesearch',
        name: 'advancesearch',
        component: () => import('pages/Search/SearchPage.vue'),
        children: [
          {
            path: '',
            name: 'advance_searchall',
            component: () => import('components/Search/AdvanceSearch.vue'),
          },
          {
            path: '/search/book',
            name: 'search_book',
            component: () => import('components/Search/BooksSearch.vue')
          },
          {
            path: '/search/author',
            name: 'search_author',
            component: () => import('components/Search/AuthorSearch.vue')
          },
          {
            path: '/search/inside',
            name: 'search_inside',
            component: () => import('components/Search/InsideSearch.vue')
          },
        ]
      },
    ],
  },
);



export default routes;
