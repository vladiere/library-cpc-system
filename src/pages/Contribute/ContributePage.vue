<template>
  <q-page :padding="!Platform.is.mobile">
    <div class="text-h4 text-grey-10 text-bold q-pl-lg q-mt-md">Contribute</div>
    <q-form
      greedy
      @submit.prevent="sendContribution"
      :class="
        Platform.is.mobile
          ? 'q-pa-md'
          : 'q-py-lg q-px-md q-ma-xl row content-center q-gutter-x-lg'
      "
      :style="
        Platform.is.mobile
          ? ''
          : 'border: 1px solid #212121; border-radius: 5px'
      "
    >
      <div class="col-6 column q-gutter-y-md">
        <q-input
          color="grey-10"
          outlined
          dense
          v-model="books.title"
          label="Title"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || 'Enter title'
          ]"
        />
        <q-input
          color="grey-10"
          outlined
          dense
          v-model="books.author"
          label="Author"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || 'Enter author'
          ]"
        />
        <q-input
          color="grey-10"
          outlined
          dense
          v-model="books.category"
          label="Category"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || 'Enter category'
          ]"
        />
        <q-input
          color="grey-10"
          outlined
          dense
          v-model="books.publisher"
          label="Publisher"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || 'Enter publisher'
          ]"
        />
      </div>
      <div
        :class="
          Platform.is.mobile
            ? 'col-4 column q-mt-xs q-gutter-y-md'
            : 'col-4 column q-gutter-y-md'
        "
      >
        <q-file
          outlined
          v-model="model"
          label="Attach File"
          dense
          color="grey-10"
          capture
          use-chips
          lazy-rules
          accept=".pdf,.docx,.doc,.txt,.epub"
          :rules="[
            val => val || 'Insert a file'
          ]"
        >
          <template v-slot:append>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <q-btn
            label="Send File"
            type="submit"
            dense
            padding="5px 20px"
            no-caps
            class="self-start text-subtitle1"
            color="blue-9"
          />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { Platform } from 'quasar';
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import jwt_decode from 'jwt-decode';

defineComponent({
  name: 'ContributePage',
});

interface Book {
  title: string;
  author: string;
  category: string;
  publisher: string;
}

const userStore = useUserStore();
const model = ref(null);
const decoded = jwt_decode(userStore.token);
const books = ref<Book>({
  title: '',
  author: '',
  category: '',
  publisher: '',
});

const sendContribution = async () => {
  try {
    const formData= new FormData();
    formData.append('file_book', model.value);
    formData.append('user_id', decoded.user_id);
    formData.append('file_title', books.value.title);
    formData.append('file_author', books.value.author);
    formData.append('file_category', books.value.category);
    formData.append('file_publisher', books.value.publisher);
    const response = await api.post("/user/book/contribute", formData, {
      headers: {
        'Content-Type':'multipart/form-data',
        Authorization: `Bearer ${userStore.token}`
      }
    });
    console.log(response.data)
    console.log(formData)
  } catch (error) {
    throw error;
  }
}
</script>
