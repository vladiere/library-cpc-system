import { RouteRecordRaw } from 'vue-router';
import { Platform } from 'quasar';

const routes: RouteRecordRaw[] = [];

if (Platform.is.electron) {
  routes.push(
    {
      path: '/',
      component: () => import('layouts/DesktopLayout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('pages/desktop/Login/LoginViewPage.vue'),
        },
        {
          path: '/home',
          name: 'HomePage',
          component: () => import('layouts/desktop/Sidebar.vue'),
          children: [
            {
              path: '',
              name: 'HomeView',
              component: () => import('pages/desktop/Home/HomeViewPage.vue'),
            },
            {
              path: '/staff',
              name: 'DisplayStaff',
              component: () => import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: '',
                  name: 'DisplayAllStaffs',
                  component: () => import('components/desktop/Staff/ViewStaff.vue')
                },
                {
                  path: 'add-change',
                  name: 'AddChangeStaff',
                  component: () => import('components/desktop/Staff/AddChangeStaff.vue')
                },
              ]
            },
            {
              path: '/profile/staff/edit',
              name: 'EditStaff',
              component: () => import('components/desktop/Staff/EditStaff.vue')
            },
            {
              path: '/profile',
              name: 'ProfileStaff',
              component: () => import('pages/desktop/Home/Staff/StaffProfile.vue'),
              children: [
                {
                  path: '/profile/staff',
                  name: 'ProfileDetails',
                  component: () => import('components/desktop/Staff/ProfileStaff.vue')
                },
              ]
            },
            {
              path: '/daily',
              name: 'DailyReports',
              component: () => import('components/desktop/Charts/DailyReport.vue')
            },
            {
              path: '/weekly',
              name: 'WeeklyReports',
              component: () => import('components/desktop/Charts/WeeklyReport.vue')
            },
            {
              path: '/monthly',
              name: 'MonthlyReports',
              component: () => import('components/desktop/Charts/MonthlyReport.vue')
            },
            {
              path: '/yearly',
              name: 'YearlyReports',
              component: () => import('components/desktop/Charts/YearlyReport.vue')
            },
            {
              path: '/resources',
              name: 'ViewResources',
              component: () => import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: '',
                  component: () => import('pages/desktop/Resources/ViewResources.vue')
                },
              ]
            },
            {
              path: '/resources/add',
              name: 'AddResources',
              component: () => import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: '',
                  component: () => import('components/desktop/Resources/AddResources.vue')
                },
                {
                  path: 'bulk-upload',
                  name: 'BulkUploads',
                  component: () => import('components/desktop/Resources/BulkUpload.vue')
                },
              ]
            },

            {
              path: '/resources/manage',
              name: 'ManageAllResources',
              component: () => import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: '',
                  component: () => import('pages/desktop/Resources/ManageResourcesPage.vue'),
                },
                {
                  path: 'edit',
                  name: 'ResourcesEdit',
                  component: () => import('components/desktop/Resources/EditResources.vue')
                },
              ]
            },
            {
              path: '/users',
              name: 'UsersList',
              component: () => import('pages/desktop/Users/UsersList.vue')
            },
            {
              path: '/circulation',
              name: 'ForCirculations',
              component: () => import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: '',
                  name: 'ViewBooks',
                  component: () => import('components/desktop/Circulation/Borrow.vue')
                }
              ]
            },
          ],
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: () =>
            import('pages/desktop/ForgotPass/ForgotPasswordView.vue'),
        },
      ],
    },
  );
}

export default routes;
