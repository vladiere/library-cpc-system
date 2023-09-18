import { RouteRecordRaw } from 'vue-router';
import { Platform } from 'quasar';

const routes: RouteRecordRaw[] = [];

if (Platform.is.electron) {
  routes.push(
    {
      path: '/',
      name: 'DesktopLayout',
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
              name: 'HomeLayout',
              component: () => import('layouts/desktop/HomeLayout.vue'),
              children: [
                {
                  path: '',
                  name: 'ReportsActivity',
                  component: () => import('components/desktop/Home/ReportsActivity.vue'),
                },
                {
                  path: '/trending',
                  name: 'TrendingBooks',
                  component: () => import('components/desktop/Home/TrendBooks.vue')
                },
                {
                  path: '/notifications',
                  name: 'Notifications',
                  component: () => import('components/desktop/Home/Notifications.vue')
                },
                {
                  path: '/onlines',
                  name: 'Onlines',
                  component: () => import('components/desktop/Home/Onlines.vue')
                },
                {
                  path: '/new-registers',
                  name: 'NewRegister',
                  component: () => import('components/desktop/Home/NewRegister.vue')
                },
                {
                  path: '/recent-visits',
                  name: 'RecentVisits',
                  component: () => import('components/desktop/Home/RecentVisit.vue')
                },
                {
                  path: '/account',
                  name: 'Account',
                  component: () => import('components/desktop/Home/Account.vue')
                },
                {
                  path: '/settings',
                  name: 'Settings',
                  component: () => import('components/desktop/Home/Settings.vue')
                },
              ]
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
              component: () => import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: '',
                  name: 'DefaultDailyView',
                  component: () => import('components/desktop/Charts/DailyReport.vue'),
                  children: [
                    {
                      path: '',
                      name: 'DailyChart',
                      component: () => import('components/desktop/Charts/DailyChart.vue')
                    },
                    {
                      path: 'add_report',
                      name: 'AddReport',
                      component: () => import('components/desktop/Charts/AddDailyReport.vue')
                    },
                  ]
                },
              ]
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
                  name: 'DisplayResources',
                  component: () => import('pages/desktop/Resources/ViewResources.vue')
                },
                {
                  path: '/view',
                  name: 'ViewAllResources',
                  component: () => import('components/desktop/Resources/ResourcesView.vue')
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
                  name: 'AddResources',
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
                  name: 'ManageResources',
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
              component: () => import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: '',
                  name: 'UsersLists',
                  component: () => import('pages/desktop/Users/UsersList.vue')
                },
              ]
            },
            {
              path: '/reservations-holds',
              name: 'ReservationHold',
              component: () => import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: '',
                  name: 'ReservationsHolds',
                  component: () => import('components/desktop/Circulation/ReservationHolds.vue'),
                  children: [
                    {
                      path: '',
                      name: 'ReservationsView',
                      component: () => import('components/desktop/Circulation/Reservations.vue')
                    },
                    {
                      path: 'holds',
                      name: 'HoldsRecords',
                      component: () => import('components/desktop/Circulation/Holds.vue')
                    },
                  ]
                },
              ]
            },
            {
              path: '/borrow',
              name: 'ForBorrow',
              component: () => import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: '',
                  name: 'ViewBooks',
                  component: () => import('components/desktop/Circulation/Borrow.vue')
                },
                {
                  path: 'check-in',
                  name: 'CheckinRecords',
                  component: () => import('components/desktop/Circulation/Checkin.vue')
                },
                {
                  path: 'check-out',
                  name: 'CheckoutRecords',
                  component: () => import('components/desktop/Circulation/Checkout.vue')
                },
              ]
            },
            {
              path: '/fines-fees',
              name: 'FinesFees',
              component: import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: '',
                  name: 'FinesFees',
                  component: () => import('components/desktop/FinesFees/FinesFees.vue')
                },
              ]
            },
            {
              path: '/renewal',
              name: 'Renewal',
              component: () => import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: '',
                  name: 'RenewalView',
                  component: () => import('components/desktop/Renewal/Renewal.vue')
                },
              ]
            },
            {
              path: '/catalogue',
              name: 'Catalogue',
              component: () => import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: 'book_subject',
                  name: 'BookSubject',
                  component: () => import('components/desktop/Catalogue/BookSubject.vue'),
                },
                {
                  path: 'classification_no',
                  name: 'ClassificationNumber',
                  component: () => import('components/desktop/Catalogue/ClassificationNo.vue')
                },
                {
                  path: 'formats',
                  name: 'FormatsView',
                  component: () => import('components/desktop/Catalogue/Formats.vue')
                },
              ]
            },
            {
              path: '/acquisitions',
              name: 'AcquisitionsView',
              component: () => import('layouts/desktop/InnerPageLayout.vue'),
              children: [
                {
                  path: 'book_purchase',
                  name: 'BookPurchase',
                  component: () => import('components/desktop/Acquisitions/BookPurchase.vue')
                },
                {
                  path: 'contributions',
                  name: 'ContributionsPage',
                  component: () => import('components/desktop/Acquisitions/Contributions.vue')
                },
              ]
            },
          ],
        },
      ],
    },
  );
}

export default routes;
