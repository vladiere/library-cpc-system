import { RouteRecordRaw } from 'vue-router';
import { Platform } from 'quasar';

const routes: RouteRecordRaw[] = [];


if (!Platform.is.electron) {
  routes.push(
    {
      path: '/',
      component: () => import('layouts/OutsideLayout.vue'),
      children: [
        {
          path: '/',
          name: 'login',
          component: () => import('pages/web/Login/LoginViewPage.vue'),
        },
        {
          path: '/forgot-password',
          name: 'ForgotPassword',
          component: () => import('pages/web/ForgotPassword/ForgotPass.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('pages/web/RegisterPage/RegisterPage.vue')
        },
      ],
    },
    {
      path: '/home',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('pages/web/Home/HomeViewPage.vue'),
        },
        {
          path: '/book',
          name: 'books',
          component: () => import('pages/web/BookInfo/BookInfo.vue')
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('pages/web/Category/Category.vue')
        },
        {
          path: '/trending',
          name: 'trending',
          component: () => import('pages/web/Trending/TrendingPage.vue')
        },
        {
          path: '/profile/:account',
          name: 'UserProfile',
          component: () => import('pages/web/UserProfile/UserProfile.vue')
        },
        {
          path: '/recommendation',
          name: 'recommendation',
          component: () => import('pages/web/Recommendations/Recommendations.vue')
        },
        {
          path: '/contribute',
          name: 'contribute',
          component: () => import('pages/web/Contribute/Contribute.vue')
        },
        {
          path: '/userbooks',
          name: 'userbooks',
          component: () => import('pages/web/UserBooks/UserBooks.vue'),
          children: [
            {
              path: '',
              component: () => import('components/web/MyBooks.vue')
            },
            {
              path: '/userbooks/mylists',
              name: 'mylists',
              component: () => import('components/web/SeeAllLists.vue')
            },
            {
              path: '/userbooks/collections',
              name: 'user_collections',
              component: () => import('components/web/Collections.vue')
            },
            {
              path: '/userbooks/borrowshistory',
              name: 'user_borrow_history',
              component: () => import('components/web/BorrowsHistory.vue')
            },
            {
              path: '/userbooks/mylists/add',
              name: 'create_list',
              component: () => import('components/web/CreateList.vue')
            },
            {
              path: '/userbooks/mylists/:list_id',
              name: 'ListsName',
              component: () => import('components/web/MyList.vue')
            },
          ]
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('pages/web/Settings/PageSettings.vue'),
          children: [
            {
              path: '/settings/account',
              name: 'account_settings',
              component: () => import('pages/web/Settings/AccountSettings.vue')
            },
            {
              path: '/settings/system',
              name: 'system_settings',
              component: () => import('pages/web/Settings/SystemSettings.vue')
            },
          ]
        },
        {
          path: '/recent',
          name: 'recent',
          component: () => import('pages/web/RecentBooks/RecentBooksPage.vue')
        },
        {
          path: '/advancesearch',
          name: 'advancesearch',
          component: () => import('pages/web/Search/SearchPage.vue'),
          children: [
            {
              path: '',
              component: () => import('components/web/Search/AdvanceSearch.vue'),
            },
            {
              path: '/search/book',
              name: 'search_book',
              component: () => import('components/web/Search/BooksSearch.vue')
            },
            {
              path: '/search/author',
              name: 'search_author',
              component: () => import('components/web/Search/AuthorSearch.vue')
            },
            {
              path: '/search/inside',
              name: 'search_inside',
              component: () => import('components/web/Search/InsideSearch.vue')
            },
          ]
        },
      ],
    },
  );
}


export default routes;
