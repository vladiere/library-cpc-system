<template>
  <q-list class="text-capitalize">
    <q-item clickable v-ripple :class="status === 'unread' ? 'text-bold' : ''" class="column">
      <q-item-section side top :class="status === 'unread' ? 'text-grey-10' : ''">
        <q-item-label >{{ notification_date }}</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label caption lines="2" :class="status === 'unread' ? 'text-grey-10' : ''">{{ message }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator inset />
  </q-list>
</template>

<script setup lang="ts">
export interface NotificationsProps {
  notification_id: number;
  message: string;
  notification_type: string;
  notification_date: string;
  status: string;
}

withDefaults(defineProps<NotificationsProps>(), {
  notification_id: 0,
  message: '',
  notification_type: '',
  notification_date: '',
  status: '',
});
</script>
