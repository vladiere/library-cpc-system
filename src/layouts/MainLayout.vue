<template>
  <q-layout view="hHh LpR lFr">
    <q-header reveal elevated class="bg-blue-12">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <q-img avatar :src="LibraryLogo" style="width: 2rem" />
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
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
      <q-separator />
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
      overlay
      elevated
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
            <span class="text-subtitle1 text-capitalize">{{ userData.fullname }}</span>
            <span class="text-caption text-uppercase">{{ userData.department}}</span>
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
      <router-view v-slot="{ Component }">
        <transition apper v-bind="backTransition">
          <component :is="Component" />
        </transition>
      </router-view>
      <FooterComponent />
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
import { ref, onMounted, onBeforeMount } from 'vue';
import { Platform, SessionStorage } from 'quasar';
import { useRouter } from 'vue-router'
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import BrowseLinks, { BrowseLinksProps } from 'components/BrowseLinks.vue';
import LibraryLogo from 'src/assets/applogo.png';
import FooterComponent from 'src/components/Footer/FooterComponent.vue';
import { backTransition } from 'src/utils/transitions';
import { api } from 'src/boot/axios';
import jwt_decode from 'jwt-decode';
import { useUserStore } from 'src/stores/user-store';
import { useBooksStore } from 'src/stores/books-store'

interface UserData {
  user_id: number;
  fullname: string;
  id_number: number;
  department: string;
  email_address: string;
  img_path: string;
}

const router = useRouter();
const userData = ref<UserData>([]);
const userStore = useUserStore();
const bookStore = useBooksStore();
const rightDrawerOpen = ref(false);

const decoded = jwt_decode(userStore.token);

const getUserData = async () => {
  try {
    const response = await api.post('/user/get/details', { user_id: decoded.user_id }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })

    userData.value = response.data[0];
  } catch (error: any) {
    throw new Error(error)
  }
}

const getAllBooks = async () => {
  try {
    const response = await api.get('/get/all/books/inventory', {
      headers: {
        Authorization: `Bearer ${(userStore.token as string)}`
      }
    })

    bookStore.initBooks(response.data);
  } catch (error: any) {
    throw new Error(error)
  }
}

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
  {
    title: 'Recommendations',
    icon: 'fas fa-lightbulb',
    link: '/recommendation',
  },
  {
    title: 'Advance Search',
    icon: 'fas fa-magnifying-glass',
    link: '/advancesearch',
  },
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

const essentialLinks: EssentialLinkProps[] = [
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
    link: 'profile',
    acc: `${userData.value.fullname}`
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
];


const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}


onBeforeMount(() => {
  rightDrawerOpen.value = false;
})

onMounted(() => {
  getUserData();
  if (bookStore.getAllBooks.length === 0) {
     getAllBooks();
  }
})
</script>
