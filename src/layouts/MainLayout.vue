<template>
  <q-layout view="hHr lpR lFr">
    <q-header elevated class="bg-blue-12">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <q-img avatar :src="LibraryLogo" style="width: 2rem; border-radius: 50%"/>
          <span
            :class="
              Platform.is.mobile
                ? 'q-mx-sm text-grey-2 text-h6 text-bold'
                : 'q-mx-xs text-grey-2 text-h4 text-bold'
            "
            >CPC
            <small
              :style="
                Platform.is.mobile
                  ? 'font-size: 14px !important'
                  : 'font-size: 18px !important'
              "
              >Library</small
            ></span
          >
        </q-toolbar-title>

        <q-btn-dropdown
          flat
          :label="Platform.is.mobile ? '' : 'Browse'"
          :class="Platform.is.mobile ? '' : 'q-mx-xl'"
        >
          <q-list>
            <BrowseLinks
              class="text-dark"
              v-for="browse in browseLinks"
              :key="browse.title"
              v-bind="browse"
            />
          </q-list>
        </q-btn-dropdown>
        <div class="relative-position ">
          <q-badge v-if="unReadCounts > 0" color="negative" floating>{{ unReadCounts }}</q-badge>
          <q-btn-dropdown
            flat
            rounded
            dense
            :dropdown-icon="unReadCounts > 0 ? 'mdi-bell-ring' : 'mdi-bell-outline'"
            :color="unReadCounts > 0 ? 'warning' : undefined"
            no-icon-animation
          >
          <q-list separator>
            <q-virtual-scroll
              style="max-height: 300px; overflow-x: hidden; max-width: 450px"
              :items="notifications"
              separator
              v-slot="{ item, index }"
            >
              <ListNotifications :key="index" v-bind="item" />
            </q-virtual-scroll>
          </q-list>
            <div v-if="notifications.length === 0" class="column items-center q-pa-md q-pt-md text-grey-7">
              Empty notifications
            </div>
            <div v-if="notifications.length > 0" class="column absolute-top-right">
              <q-btn flat dense no-caps icon="mdi-broom" class="self-center" @click="clearMyNotifications">
                <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">Clear notifications</q-tooltip>
              </q-btn>
            </div>
          </q-btn-dropdown>
        </div>
        <q-btn dense flat round icon="menu" @click="rightDrawerOpen = !rightDrawerOpen" />
      </q-toolbar>
      <q-separator />
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
      :width="270"
      class="bg-grey-2"
    >
      <q-list dense>
        <q-item-label
          header
          :class="
            Platform.is.mobile
              ? 'text-dark text-h6 text-bold row q-gutter-x-md'
              : 'text-dark text-h5 text-bold row q-gutter-x-md'
          "
        >
          <q-avatar>
            <q-img :src="userData.img_path || 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png'" fit="contain" />
          </q-avatar>
          <div class="column">
            <span class="text-subtitle2 text-capitalize">{{ userData.fullname }}</span>
            <span class="text-caption text-uppercase">{{ userData.department }}</span>
          </div>
        </q-item-label>
        <q-separator />
        <EssentialLink
          class="text-dark q-mt-sm"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-list dense>
        <q-item-label
          header
          :class="
            Platform.is.mobile
              ? 'text-dark text-h6 text-bold'
              : 'text-dark text-h5 text-bold'
          "
        >
          Browse
        </q-item-label>

        <q-separator />

        <BrowseLinks
          class="text-dark q-mt-sm"
          v-for="browse in browseLinks"
          :key="browse.title"
          v-bind="browse"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view v-if="!isRouteLoading" />
      <FooterComponent v-if="!isRouteLoading"/>
      <!-- place QPageScroller at end of page -->
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[10, 10]"
      >
        <q-btn
          :round="Platform.is.mobile"
          :fab="!Platform.is.mobile"
          icon="keyboard_arrow_up"
          color="primary"
        />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onMounted, watch } from 'vue';
import { Platform } from 'quasar';
import { EssentialLinkProps } from 'components/EssentialLink.vue';
import { BrowseLinksProps } from 'components/BrowseLinks.vue';
import LibraryLogo from 'src/assets/applogo.png';
import { NotificationsProps } from 'components/Notifications/ListNotifications.vue'
import { api } from 'src/boot/axios';
import { jwtDecode } from 'jwt-decode';
import { useUserStore } from 'src/stores/user-store';
import { useRouter } from 'vue-router';
import { SpinnerFacebook } from 'src/utils/loading';
import users from 'src/utils/Users/users';

const FooterComponent = defineAsyncComponent({
  loader: () => import('components/Footer/FooterComponent.vue'),
  delay: 200,
  timeout: 2300,
  suspensible: false
});

const EssentialLink = defineAsyncComponent({
  loader: () => import('components/EssentialLink.vue'),
  delay: 250,
  timeout: 2300,
  suspensible: false
});

const BrowseLinks = defineAsyncComponent({
  loader: () => import('components/BrowseLinks.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const ListNotifications = defineAsyncComponent({
  loader: () => import('components/Notifications/ListNotifications.vue'),
  delay: 350,
  timeout: 2300,
  suspensible: false
});


const router = useRouter();
const userStore = useUserStore();
const rightDrawerOpen = ref(false);
const isRouteLoading = ref(false);
const notifications = ref<NotificationsProps>([]);
const unReadCounts = ref(0);
const userData = ref({
  fullname: '',
  department: '',
});
const decoded = jwtDecode(userStore.token)

const browseLinks: BrowseLinksProps[] = [
  {
    title: 'All Categories',
    icon: 'fas fa-book-open',
    link: '/category',
  },
  {
    title: 'Trending',
    icon: 'fas fa-hashtag',
    link: '/trending',
  },
  {
    title: 'Newly Added',
    icon: 'fas fa-burst',
    link: '/recent',
  },
  //{
   // title: 'Advance Search',
  //  icon: 'fas fa-magnifying-glass',
  //  link: '/advancesearch',
  //},
  {
    title: 'Contribute',
    icon: 'fas fa-book',
    link: '/contribute',
  },
  {
    title: 'Instructor Recommendations',
    icon: 'fas fa-chalkboard-user',
    link: 'instructor_recommend',
  },
];

const essentialLinks = ref<EssentialLinkProps[]>([
  {
    title: 'Home',
    icon: 'fas fa-house',
    link: '/home',
  },
  {
    title: 'My Books',
    icon: 'fas fa-book',
    link: '/userbooks',
  },
  {
    title: 'Profile',
    icon: 'fas fa-user',
    link: '/profile'
  },
  {
    title: 'Settings',
    icon: 'chat',
    link: '/settings',
  },
  {
    title: 'Logout',
    icon: 'logout',
    link: 'logout',
  },
]);


const getNotifications = async () => {
  try {
    const response = await api.post('/notifications/user', { user_id: decoded.user_id }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });
    notifications.value = [];
    notifications.value = response.data;
    unReadCounts.value = notifications.value.filter((item: unknown) => item.status === 'unread').length;
  } catch (error) {
    throw error;
  }
}

const clearMyNotifications = async () => {
  try {
    await api.post('/notifications/clear', { user_id: decoded.user_id, notification_id: 0 }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });
    notifications.value.filter((item: unknown) => item.status = 'read')
    unReadCounts.value = 0;
  } catch (error) {
    throw error;
  }
}

const routeLoading = async () => {
  isRouteLoading.value = true;
  SpinnerFacebook(isRouteLoading.value, 'Loading...');
  await setTimeout(() => {
    isRouteLoading.value = false;
    SpinnerFacebook(isRouteLoading.value);
  }, 1100);
}

const setFullnameDepartment = async () => {
  await users.getUserdata();
  await userStore.getUserData.map((item: unknown) => {
    userData.value.fullname = item.fullname;
    userData.value.department = item.department;
  })
}

onMounted( async () => {
  await getNotifications();
  await setFullnameDepartment();
})

watch(() => router.currentRoute.value, () => {
  routeLoading();
  rightDrawerOpen.value = false;
})
</script>
