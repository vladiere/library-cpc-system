<template>
  <q-layout view="hHr lpr fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title
          class="row items-center cursor-pointer"
          @click="navigateToHome"
        >
          <q-img avatar src="../assets/logo.png" style="width: 2rem" />
          <span
            :class="
              $q.platform.is.mobile
                ? 'q-mx-sm text-dark text-h6 text-bold'
                : 'q-mx-xs text-dark text-h4 text-bold'
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
        <div
          v-if="!$q.platform.is.mobile"
          class="bg-primary text-white row justify-center rounded-borders"
        >
          <q-input
            dark
            dense
            standout
            v-model="text"
            input-class="text-right"
            class="q-ml-md"
          >
            <template v-slot:prepend>
              <q-icon color="dark" v-if="text === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                color="dark"
                class="cursor-pointer"
                @click="text = ''"
              />
            </template>
          </q-input>
        </div>

        <q-btn-dropdown
          flat
          :label="$q.platform.is.mobile ? '' : 'Browse'"
          dropdown-icon="fas fa-regular fa-chevron-down"
          :class="$q.platform.is.mobile ? '' : 'q-mx-xl'"
          color="dark"
          @click="onMainClick"
        >
          <q-list class="bg-secondary">
            <BrowseLinks
              class="text-dark"
              v-for="browse in browseLinks"
              :key="browse.title"
              v-bind="browse"
            />
          </q-list>
        </q-btn-dropdown>
        <q-btn
          dense
          flat
          round
          icon="menu"
          color="dark"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
      <hr />
    </q-header>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      class="bg-secondary"
      side="right"
      bordered
    >
      <q-list>
        <q-item-label
          header
          :class="
            $q.platform.is.mobile
              ? 'text-dark text-h6 text-bold'
              : 'text-dark text-h5 text-bold'
          "
        >
          CPC Library
        </q-item-label>
        <hr />
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
        <hr />
        <BrowseLinks
          class="text-dark"
          v-for="browse in browseLinks"
          :key="browse.title"
          v-bind="browse"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-primary">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 91.5vh; max-width: 100%"
      >
        <router-view />
        <FooterPage />
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import BrowseLinks, { BrowseLinksProps } from 'components/BrowseLinks.vue';
import FooterPage from 'components/web/TheFooter.vue';

const $q = useQuasar();
const text = ref('');
const router = useRouter();

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
];

const essentialLinks: EssentialLinkProps[] = [
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

const navigateToHome = () => {
  router.push('/home');
};
const thumbStyle = {
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: 0.75,
};

const barStyle = {
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '9px',
  opacity: 0.2,
};
</script>
