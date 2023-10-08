import { RouteRecordRaw } from 'vue-router';
import webRoute from './web'

const routes: RouteRecordRaw[] = [
  ...webRoute,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
