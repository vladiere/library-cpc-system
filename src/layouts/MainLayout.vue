<template>
  <q-layout view="lHr lpR lFr">
    <q-header reveal elevated class="bg-blue-12">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <q-img avatar :src="LibraryLogo" style="width: 2rem" />
          <span
            :class="
              $q.platform.is.mobile
                ? 'q-mx-sm text-grey-2 text-h6 text-bold'
                : 'q-mx-xs text-grey-2 text-h4 text-bold'
            "
            >CPC
            <small
              :style="
                $q.platform.is.mobile
                  ? 'font-size: 14px !important'
                  : 'font-size: 18px !important'
              "
              >Library</small
            ></span
          >
        </q-toolbar-title>

        <q-btn-dropdown
          flat
          :label="$q.platform.is.mobile ? '' : 'Browse'"
          :class="$q.platform.is.mobile ? '' : 'q-mx-xl'"
          @click="onMainClick"
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
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      bordered
      class="bg-grey-2"
    >
      <q-list dense>
        <q-item-label
          header
          :class="
            $q.platform.is.mobile
              ? 'text-dark text-h6 text-bold row q-gutter-x-md'
              : 'text-dark text-h5 text-bold row q-gutter-x-md'
          "
        >
          <q-avatar>
            <q-img src="https://cdn.quasar.dev/img/avatar.png" fit="contain" />
          </q-avatar>
          <div class="column">
            <span class="text-subtitle1">Danya, John B.</span>
            <span class="text-caption">BSIT</span>
          </div>
        </q-item-label>
        <q-separator />
        <EssentialLink
          class="text-dark"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-list>
        <q-item-label
          header
          :class="
            $q.platform.is.mobile
              ? 'text-dark text-h6 text-bold'
              : 'text-dark text-h5 text-bold'
          "
        >
          Browse
        </q-item-label>

        <q-separator />

        <BrowseLinks
          class="text-dark"
          v-for="browse in browseLinks"
          :key="browse.title"
          v-bind="browse"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />

      <!-- place QPageScroller at end of page -->
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-4 text-dark column q-pa-md">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="src/assets/applogo.png" />
          </q-avatar>
          CPC Library
        </q-toolbar-title>
      </q-toolbar>
      <div class="row q-gutter-x-md">
        <div class="col column">
          <span>Providing Knowledge Since 2020</span>
          <span>Proudly Serving the CPC Community</span>
        </div>
        <div class="col column">
          <span>School CPC Founded in March 2005</span>
          <span>CPC Library Establish in July 2020</span>
        </div>
        <div class="col column">
          <div class="row q-gutter-x-sm">
            <span class="text-bold">Address: </span>
            <span>Cordova, Poblacion, 6017, Cebu</span>
          </div>
          <div class="row q-gutter-x-sm">
            <span class="text-bold">Phone: </span>
            <span>(032) 494 1410</span>
          </div>
          <div class="row q-gutter-x-sm">
            <span class="text-bold">Email: </span>
            <span>cpc.library@gmail.com</span>
          </div>
        </div>
      </div>
      <div class="col self-center">
        <span class="text-bold">© 2023 CPC Library. All Rights Reserved.</span>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import BrowseLinks, { BrowseLinksProps } from 'components/BrowseLinks.vue';
import LibraryLogo from 'src/assets/applogo.png';

const $q = useQuasar();

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
    caption: 'Return to homepage',
    icon: 'fas fa-house',
    link: '/home',
  },
  {
    title: 'My Books',
    caption: 'Collections, Borrow History and Lists',
    icon: 'fas fa-book',
    link: '/userbooks',
  },
  {
    title: 'Profile',
    caption: 'User Profile and Information',
    icon: 'fas fa-user',
    link: 'profile',
  },
  {
    title: 'Settings',
    caption: 'System and User Settings',
    icon: 'chat',
    link: '/settings',
  },
  {
    title: 'Logout',
    icon: 'logout',
    link: 'logout',
  },
];

const rightDrawerOpen = ref(false);

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

const onMainClick = () => {
  console.log('Clicked on main button');
};
</script>
