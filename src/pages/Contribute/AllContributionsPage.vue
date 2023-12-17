<template>
  <q-page class="column q-mb-xl" >
    <div :class="!Platform.is.mobile ? 'column items-center q-my-xl q-gutter-y-md' : 'column items-center q-my-md q-gutter-y-sm'">
      <span :class="!Platform.is.mobile ? 'text-h3 text-weight-thin text-blue-9' : 'text-h4 text-weight-thin text-blue-9'">Contributed eBooks</span>
      <span class="text-h6 text-weight-regualr text-blue-9">eBooks you might love!</span>
    </div>

    <q-separator size="2px" width="95%" class="self-center"/>
    <div :class="!Platform.is.mobile ? 'q-ml-xl row q-gutter-x-md q-my-md justify-between' : 'column items-center q-gutter-y-xs q-my-sm'">
      <div class="row content-center items-center">
        <span class="text-subtitle1 text-blue-9">Pages</span>
        <q-pagination
          v-model="current"
          :max="totalPages"
          :max-pages="!Platform.is.mobile ? 8 : 4"
          direction-links
          boundary-links
          icon-first="mdi-page-first"
          icon-last="mdi-page-last"
          icon-prev="mdi-chevron-left"
          icon-next="mdi-chevron-right"
        />
      </div>
        <q-input
          placeholder="Search ebook or author"
          outlined
          :class="!Platform.is.mobile ? 'q-mr-xl' : ''"
          dense
          v-model="filter"
          rounded
          >
          <template v-slot:append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
    </div>

    <q-separator size="2px" width="95%" class="self-center"/>

    <div :class="!Platform.is.mobile ? 'row q-gutter-lg justify-center q-mt-md' : 'row q-gutter-md justify-center q-mt-sm'">
      <q-intersection
        v-for="item in paginatedContributeList"
        :key="item.book_id"
        transition="scale"
      >
        <AllContributionComponent v-bind="item" />
      </q-intersection>
      <div v-if="filteredContributeList.length === 0" class="q-mt-xl flex flex-center text-center text-h6 text-weight-light text-grey-8">
        Apologies, but the ebooks you were searching for could not be found.
      </div>
   </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, ref, computed } from 'vue'
import { AllContributionProps } from 'components/Contribute/AllContributionComponent.vue';
import { Platform } from 'quasar';
import { useBooksStore } from 'stores/books-store';
import books from 'src/utils/Books/books';

defineComponent({
  name: 'AllContributionsPage'
});

const AllContributionComponent = defineAsyncComponent({
  loader: () => import('components/Contribute/AllContributionComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const contributionList = ref<AllContributionProps>([])
const current = ref(1);
const itemsPerPage = !Platform.is.mobile ? 15 : 10;
const totalPages = computed(() => Math.ceil(contributionList.value.length / itemsPerPage));
const filter = ref('');
const bookStore = useBooksStore();

const paginatedContributeList = computed(() => {
  const start = (current.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredContributeList.value.slice(start, end);
});

const filteredContributeList = computed(() => {
  const searchTerm = filter.value.toLowerCase();
  return contributionList.value.filter((ebook) => {
    return (
      ebook.file_title.toLowerCase().includes(searchTerm) ||
      ebook.author_fullname.toLowerCase().includes(searchTerm)
    );
  });
});

onMounted(async() => {
  if (contributionList.value.length === 0 ) {
    await books.getAllContributorsBooks();
  }

  setTimeout(() => {
    contributionList.value = bookStore.getEBooks
  }, 400);
});

</script>
