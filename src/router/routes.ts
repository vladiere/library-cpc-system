import { RouteRecordRaw } from 'vue-router';
import webRoutes from './webRoutes'
const routes: RouteRecordRaw[] = [

  ...webRoutes,
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  }

];


export default routes;
