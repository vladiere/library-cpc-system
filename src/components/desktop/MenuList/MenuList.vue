<template>
  <div
    class="column fit q-mt-md content-center q-pt-md text-capitalize text-subtitle1"
  >
    <q-btn align="left" no-caps stretch flat to="/home">
      <q-avatar size="42px" class="q-mr-md">
        <img :src="Dashboard" />
      </q-avatar>
      Dashboard
    </q-btn>
    <q-btn align="left" no-caps stretch flat :to="{ name: 'UsersList' }">
      <q-avatar size="42px" class="q-mr-md">
        <img :src="UsersList" />
      </q-avatar>
      Users List
    </q-btn>
    <q-list>
      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar>
              <img :src="Reports" />
            </q-avatar>
          </q-item-section>

          <q-item-section> Reports </q-item-section>
        </template>

        <q-card class="bg-blue-grey-4">
          <q-card-section>
            <q-list>
              <q-item
                clickable
                :to="{ name: 'DailyReports' }"
                active-class="text-grey-12 text-h6"
              >
                <q-item-section> Daily </q-item-section>
              </q-item>
              <q-item
                clickable
                :to="{ name: 'WeeklyReports' }"
                active-class="text-grey-12 text-h6"
              >
                <q-item-section> Weekly </q-item-section>
              </q-item>
              <q-item
                clickable
                :to="{ name: 'MonthlyReports' }"
                active-class="text-grey-12 text-h6"
              >
                <q-item-section> Monthly </q-item-section>
              </q-item>
              <q-item
                clickable
                :to="{ name: 'YearlyReports' }"
                active-class="text-grey-12 text-h6"
              >
                <q-item-section> Yearly </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar>
              <img :src="Circulation" />
            </q-avatar>
          </q-item-section>

          <q-item-section> Circulation </q-item-section>
        </template>

        <q-card class="bg-blue-grey-4">
          <q-card-section>
            <q-list>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> reservation and holds </q-item-section>
              </q-item>
              <q-item
                clickable
                active-class="text-grey-12 text-h6"
                to="/circulation"
              >
                <q-item-section> borrow </q-item-section>
              </q-item>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> fines and fees </q-item-section>
              </q-item>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> renewal </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar>
              <img :src="Assistants" />
            </q-avatar>
          </q-item-section>

          <q-item-section> staff </q-item-section>
        </template>

        <q-card class="bg-blue-grey-4">
          <q-card-section>
            <q-list>
              <q-item clickable active-class="text-grey-12 text-h6" to="/staff">
                <q-item-section> staff directory </q-item-section>
              </q-item>
              <q-item
                clickable
                active-class="text-grey-12 text-h6"
                :to="{ name: 'ProfileStaff' }"
              >
                <q-item-section> staff profiles </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar>
              <img :src="Resources" />
            </q-avatar>
          </q-item-section>

          <q-item-section> Resources </q-item-section>
        </template>

        <q-card class="bg-blue-grey-4">
          <q-card-section>
            <q-list>
              <q-item
                clickable
                active-class="text-grey-12 text-h6"
                to="/resources"
              >
                <q-item-section> view resources </q-item-section>
              </q-item>
              <q-item
                clickable
                to="/resources/add"
                active-class="text-grey-12 text-h6"
              >
                <q-item-section> add resources </q-item-section>
              </q-item>
              <q-item
                clickable
                active-class="text-grey-12 text-h6"
                to="/resources/manage"
              >
                <q-item-section> manage resources </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar>
              <img :src="Catalogue" />
            </q-avatar>
          </q-item-section>

          <q-item-section> catalogue </q-item-section>
        </template>

        <q-card class="bg-blue-grey-4">
          <q-card-section>
            <q-list>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> view resources </q-item-section>
              </q-item>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> add resources </q-item-section>
              </q-item>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> manage resources </q-item-section>
              </q-item>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> edit resources </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar>
              <img :src="Acquisition" />
            </q-avatar>
          </q-item-section>

          <q-item-section> Acquisitions </q-item-section>
        </template>

        <q-card class="bg-blue-grey-4">
          <q-card-section>
            <q-list>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> Daily </q-item-section>
              </q-item>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> Weekly </q-item-section>
              </q-item>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> Mothly </q-item-section>
              </q-item>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> Yearly </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item>
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar>
              <img :src="ResetPassword" />
            </q-avatar>
          </q-item-section>

          <q-item-section> Reset password </q-item-section>
        </template>

        <q-card class="bg-blue-grey-4">
          <q-card-section>
            <q-list>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> reset staff password </q-item-section>
              </q-item>
              <q-item clickable active-class="text-grey-12 text-h6">
                <q-item-section> reset client password </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import Dashboard from 'assets/desktop/dashboard.png';
import Reports from 'assets/desktop/report.png';
import Circulation from 'assets/desktop/circulation.png';
import Assistants from 'assets/desktop/assistants.png';
import Resources from 'assets/desktop/resources.png';
import Acquisition from 'assets/desktop/acquisitions.png';
import ResetPassword from 'assets/desktop/reset-password.png';
import Catalogue from 'assets/desktop/catalogue.png';
import UsersList from 'assets/desktop/userslist.png';

defineComponent({
  name: 'MenuList',
});
</script>
