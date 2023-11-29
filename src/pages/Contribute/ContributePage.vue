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
          :error="errorsMap.title.error"
          :error-message="errorsMap.title.message"
        />
        <q-input
          color="grey-10"
          outlined
          dense
          v-model="books.author"
          label="Author"
          lazy-rules
          :error="errorsMap.author.error"
          :error-message="errorsMap.author.message"
        />
         <q-select
          outlined
          color="grey-10"
          v-model="books.category"
          use-input
          use-chips
          multiple
          hide-dropdown-icon
          input-debounce="200"
          :options="options"
          dense
          popup-content-style="width: 150px; max-height: 210px"
          @filter="filterFn"
          lazy-rules
          @new-value="createValue"
          :error="errorsMap.category.error"
          :error-message="errorsMap.category.message"
          label="Category"
        />
        <q-input
          color="grey-10"
          outlined
          dense
          v-model="books.publisher"
          label="Publisher"
          lazy-rules
          :error="errorsMap.publisher.error"
          :error-message="errorsMap.publisher.message"
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
          :error="errorsMap.description.error"
          :error-message="errorsMap.description.message"
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
          :error="errorsMap.model.error"
          :error-message="errorsMap.model.message"
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
            :loading="isLoading"
            padding="5px 20px"
            no-caps
            color="blue-9"
          />
        <q-btn
          label="Reset"
          type="reset"
          v-if="!isLoading"
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
import { Platform, Notify, debounce } from 'quasar';
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
const multiple = ref(null)
const isLoading = ref(false);
const books = ref<Book>({
  title: null,
  author: null,
  category: null,
  publisher: null,
  description: null,
});
const categories = [
  'Adventure',
  'Art',
  'Biography/Autobiography',
  'Business/Finance',
  'Classics',
  'Comic/Graphic Novels',
  'Cookbooks',
  'Crime/Mystery',
  'Drama/Play',
  'Education',
  'Fantasy',
  'Health/Fitness',
  'Historical Fiction',
  'History',
  'Horror',
  'Humor',
 'Inspirational/Self-Help',
  'Information Technology',
  'Music',
 'Parenting/Family',
  'Philosophy',
  'Poetry',
 'Politics/Current Affairs',
  'Psychology',
  'Religion/Spirituality',
  'Romance',
 'Science',
 'Science Fiction',
  'Sports',
 'Technology',
  'Thriller',
  'Travel',
  'True Crime',
  'Weste',
];
const options = ref(categories);

const errorsMap = ref({
  title: {
    error: false,
    message: '',
  },
  author: {
    error: false,
    message: '',
  },
  category: {
    error: false,
    message: '',
  },
  publisher: {
    error: false,
    message: '',
  },
  description: {
    error: false,
    message: '',
  },
  model: {
    error: false,
    message: '',
  },
});

const resetForm = () => {
  books.value.title = null;
  books.value.author = null;
  books.value.category = null;
  books.value.publisher = null;
  books.value.description = null;
  model.value = null;
}

const checkInputs = () => {
  let isValid = true;

  // Validate title
  if (!books.value.title) {
    errorsMap.value.title.error = true;
    errorsMap.value.title.message = 'Title is required';
    isValid = false;
  } else {
    errorsMap.value.title.error = false;
    errorsMap.value.title.message = '';
  }

  // Validate author
  if (!books.value.author) {
    errorsMap.value.author.error = true;
    errorsMap.value.author.message = 'Author is required';
    isValid = false;
  } else {
    errorsMap.value.author.error = false;
    errorsMap.value.author.message = '';
  }

  // Validate category
  if (!books.value.category) {
    errorsMap.value.category.error = true;
    errorsMap.value.category.message = 'Category is required';
    isValid = false;
  } else {
    errorsMap.value.category.error = false;
    errorsMap.value.category.message = '';
  }

  // Validate publisher
  if (!books.value.publisher) {
    errorsMap.value.publisher.error = true;
    errorsMap.value.publisher.message = 'Publisher is required';
    isValid = false;
  } else {
    errorsMap.value.publisher.error = false;
    errorsMap.value.publisher.message = '';
  }

  // Validate description
  if (!books.value.description) {
    errorsMap.value.description.error = true;
    errorsMap.value.description.message = 'Description is required';
    isValid = false;
  } else {
    errorsMap.value.description.error = false;
    errorsMap.value.description.message = '';
  }

  // Validate model
  if (!model.value) {
    errorsMap.value.model.error = true;
    errorsMap.value.model.message = 'File is required';
    isValid = false;
  } else {
    errorsMap.value.model.error = false;
    errorsMap.value.model.message = '';
  }

  return isValid;
};

const filterFn = (val: unknown, update: unknown) => {
  setTimeout(() => {
    update(() => {
      if (val === '') {
        options.value = categories;
      } else {
        const needle = val.toLowerCase();
        options.value = categories.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        )
      }
    })
  }, 1000);
}

const createValue = (val: unknown, done: unknown) => {
  if (val.length > 0) {
    if (!categories.includes(val)) {
      categories.push(val);
    }
    done(val, 'toggle');
  }
}

const addContribution = debounce(async (formdata: object) => {
  try {
    const response = await api.post('/user/book/contribute', formdata, {
      headers: {
        'Content-Type':'multipart/form-data',
        Authorization: `Bearer ${userStore.token}`
      }
    });

    if (response.data.status === 201) {
      isLoading.value = false;
      Notify.create({
        message: response.data.message,
        position: 'top',
        type: 'positive',
        timeout: 2300
      });
    }
    await socket.emit('notifications', decoded.user_id);
  } catch (error) {
    isLoading.value = false;
    throw error;
  }
}, 1500);

const sendContribution = async () => {
  try {
    isLoading.value = true;

    if (checkInputs()) {
      const temp = books.value.category.map(item => item.toLowerCase()).join(', ');
      const formData= new FormData();
      formData.append('file_book', model.value);
      formData.append('user_id', decoded.user_id);
      formData.append('file_title', books.value.title.toLowerCase());
      formData.append('file_author', books.value.author.toLowerCase());
      formData.append('file_category', temp);
      formData.append('file_publisher', books.value.publisher.toLowerCase());
      formData.append('file_description', books.value.description.toLowerCase());

      await addContribution(formData);

      resetForm();
    } else {
      isLoading.value = false;
      Notify.create({
        message: response.data.message,
        position: 'top',
        type: 'negative',
        timeout: 2300
      })
    }
  } catch (error) {
    isLoading.value = false;
    throw error;
  }
}
</script>
