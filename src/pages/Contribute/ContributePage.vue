<template>
  <q-page :padding="!Platform.is.mobile">
    <div class="text-h4 text-grey-10 text-bold q-pl-lg q-mt-md">Contribute</div>
    <div class="row q-ml-lg q-mt-lg">
      <q-btn
        label="See my contribution list"
        no-caps
        flat
        icon-right="mdi-playlist-play"
        to="/contribute/list"
        >
        <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">
          Your contribution books list
        </q-tooltip>
      </q-btn>
    </div>
    <q-form
      greedy
      @submit.prevent="sendContribution"
      @reset="resetForm"
      :class="
        Platform.is.mobile
          ? 'q-pa-md'
          : 'q-py-lg q-px-md row q-mx-lg justify-center q-gutter-x-lg'
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
        <q-input
          color="grey-10"
          outlined
          dense
          class="q-pt-md q-ma-none"
          v-model="books.description"
          label="Book description"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || 'Type a short description for the book'
          ]"
          autogrow
        />
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
        <div class="row q-gutter-x-md">
        <q-btn
            label="Send File"
            type="submit"
            dense
            padding="5px 20px"
            no-caps
            color="blue-9"
          />
        <q-btn
          label="Reset"
          type="reset"
          no-caps
          dense
          flat
          padding="5px 20px"
          />
      </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { Platform, Notify } from 'quasar';
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import { jwtDecode } from 'jwt-decode';
import { socket } from 'src/utils/socket';

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
const decoded = jwtDecode(userStore.token);
const books = ref<Book>({
  title: null,
  author: null,
  category: null,
  publisher: null,
  description: null,
});

const resetForm = () => {
  books.value.title = null;
  books.value.author = null;
  books.value.category = null;
  books.value.publisher = null;
  books.value.description = null;
  model.value = null;
}

const sendContribution = async () => {
  try {
    const formData= new FormData();
    formData.append('file_book', model.value);
    formData.append('user_id', decoded.user_id);
    formData.append('file_title', books.value.title.toLowerCase());
    formData.append('file_author', books.value.author.toLowerCase());
    formData.append('file_category', books.value.category.toLowerCase());
    formData.append('file_publisher', books.value.publisher.toLowerCase());
    formData.append('file_description', books.value.description.toLowerCase());
    const response = await api.post('/user/book/contribute', formData, {
      headers: {
        'Content-Type':'multipart/form-data',
        Authorization: `Bearer ${userStore.token}`
      }
    });
    if (response.data.status === 201) {
      Notify.create({
        message: response.data.message,
        position: 'top-right',
        type: 'positive',
        timeout: 2300
      });
      await socket.emit('notifications', decoded.user_id);
      resetForm();
    } else {
      Notify.create({
        message: response.data.message,
        position: 'top-right',
        type: 'negative',
        timeout: 2300
      })
    }
  } catch (error) {
    throw error;
  }
}
</script>
