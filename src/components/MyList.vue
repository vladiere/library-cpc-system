<template>
  <div class="column">
    <div class="row q-gutter-x-sm q-ml-sm">
      <span
        class="text-caption cursor-pointer"
        @click="gotoLink('/userbooks/mylists')"
      >
        <q-icon name="arrow_back" size="1rem" />
        Back to all list
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'

defineComponent({
  name: 'MyListComponent'
});

const router = useRouter()

const gotoLink = (link: string) => {
  router.push(link);
}

</script>
