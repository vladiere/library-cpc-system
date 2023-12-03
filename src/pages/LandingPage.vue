<style lang="sass" scoped>
.upper-div
  width: 80vw

.bg-picture
  object-fit: contain
  width: 100%

.bg-curve
  z-index: 0 !important

.upper-inner-div
  margin-top: 3em

.upper-inner-div
  span:nth-child(3), span:nth-child(4)
    font-weight: 500
    font-size: 18px
    line-height: 27px

.routes
  margin-top: 2em
  font-size: 24px
  color: #030405
  text-decoration: none
  a

    &hover
      text-decoration: underline

.btn-download
  padding: 15px 3em
  background-color: #1976d2
  font-size: 20px
  color: #fff
  text-decoration: none
  font-weight: 500
  border-radius: 28px

.bottom-div
  margin-top: 5em

.bottom-div-title
  font-size: 32px
  font-weight: 700
  letter-spacing: 0

.bg-shade
  opacity: 0.5
</style>

<template>
  <img :src="BgPicture" class="absolute-bottom bg-picture" />
  <img :src="BgCurve" class="absolute-full bg-curve" />
  <div class="absolute-full bg-dark bg-shade">
  </div>
  <div class="column flex flex-center relative-position">
    <div class="window-height row upper-div">
      <div class="col column q-gutter-y-lg q-pa-md upper-inner-div" >
        <span class="text-h2 text-weight-bold text-grey-4">CPC Library</span>
        <span class="text-h1 text-weight-light text-blue-2">Everywhere!</span>
        <span class="text-grey-2">Studying with us!.</span>
        <span class="text-weight-light text-grey-2">Elevate your college experience with our online resources. Dive into a world of knowledge, anytime, anywhere. Explore today!</span>
        <div class="column flex flex-center q-gutter-y-md">
          <div class="row q-gutter-x-sm items-center routes">
            <router-link to="/account/register" class="text-grey-1">Register Now!</router-link>
            <span class="text-grey-1">CPCnians!</span>
          </div>
          <a href="/src-pwa/manifest.json" rel="manifest" class="btn-download">Download App</a>
        </div>
      </div>
      <div class="col-4 column flex flex-center">
        <img :src="AppLogo" style="width: 100%; height: 50%"/>
      </div>
    </div>
    <div class="column items-center bottom-div">
      <div  class="bottom-div-title">
        <h2>
          Knowledge Beyond Boundaries
        </h2>
      </div>
      Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import AppLogo from 'src/assets/applogo.png';
import BgCurve from 'src/assets/bgcurve.svg';
import BgPicture from 'src/assets/bg.jpg';

defineComponent({
  name: 'LandingPage'
});

</script>
