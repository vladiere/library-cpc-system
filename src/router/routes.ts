import { RouteRecordRaw } from 'vue-router';
import webRoutes from './webRoutes'
import desktopnRoutes from './desktopRoutes'

const routes: RouteRecordRaw[] = [

  ...desktopnRoutes,
  ...webRoutes,
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  }

];


export default routes;
