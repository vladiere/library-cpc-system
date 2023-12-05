<style lang="sass" scoped>
.upper-div
  width: 80vw

.bg-picture
  object-fit: cover
  height: 100%
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
  margin-top: 3em
  width: 69%

  .body-text
    font-size: 20px
    font-weight: 400
    line-height: 28px
    letter-spacing: 0
    text-align: left

.bottom-div-title h2
  font-weight: 700
  letter-spacing: 0

.bg-shade
  opacity: 0.5

.full-footer
  padding:2em 0px 5em 0px

.body-footer
  width: 69%
  display: flex
  margin: 0 auto

  .footer-line
    height: 2px
    width: 100%
    border-bottom: 1px solid
    margin: 8px

  .first
    background: linear-gradient(to top right, #121FCF 23%, #84CFAA 100%)

  .second
    background: linear-gradient(to left, #121FCF 23%, #84CFAA 100%)

.footer-logo
  strong
    font-size: 24px
  img
    width: 10%
</style>

<template>
  <div class="bg-dark">
    <img :src="BgPicture" class="absolute-bottom bg-picture" />
    <img v-if="!Platform.is.mobile" :src="BgCurve" class="absolute-full bg-curve" />
    <div class="absolute-full bg-dark bg-shade">
    </div>
    <div :class="!Platform.is.mobile ? 'column flex flex-center relative-position' : 'column items-center relative-position q-pa-md'">
      <div :class="!Platform.is.mobile ? 'window-height row upper-div' : 'window-height column reverse'">
        <div :class="!Platform.is.mobile ? 'col column q-gutter-y-lg q-pa-md upper-inner-div' : 'col column q-gutter-y-md'" >
          <span :class="!Platform.is.mobile ? 'text-h2 text-weight-bold text-grey-4' : 'text-h4 text-weight-bold text-grey-4'">CPC Library</span>
          <span :class="!Platform.is.mobile ? 'text-h1 text-weight-light text-blue-2' : 'text-h2 text-weight-light text-blue-2'">Everywhere!</span>
          <span class="text-grey-2">Studying with us!.</span>
          <span :class="!Platform.is.mobile ? 'text-weight-light text-grey-2' : 'text-subtile1 text-weight-light text-grey-1'">Elevate your college experience with our online resources. Dive into a world of knowledge, anytime, anywhere. Explore today!</span>
          <div class="column flex flex-center q-gutter-y-md">
            <span :class="!Platform.is.mobile ? 'text-h3 text-weight-regular text-grey-1' : 'text-h4 text-weight-regular text-grey-1'">Come and join!</span>
            <q-btn to="/account/register" color="primary" padding="15px 5em" size="md" rounded no-caps>Register Now!</q-btn>
          </div>
        </div>
        <div class="col-4 column flex flex-center">
          <img :src="AppLogo" :style="!Platform.is.mobile ? 'width: 100%' : 'width: 50%'"/>
        </div>
      </div>

      <div :class="!Platform.is.mobile ? 'column items-center bottom-div text-white' : 'text-white column'">
        <div class="bottom-div-title">
          <h2>
            Knowledge Beyond Boundaries
          </h2>
        </div>
        <div class="column items-center q-gutter-y-md body-text">
          <span>This year, CPC Library underwent remarkable enhancements, introducing an extensive array of digital resources and innovative features. In 2024, envision accessing the vast world of knowledge seamlessly on CPC Library, empowering students.</span>
          <span>You are the reason why we are here! If CPC Library adds value to your academic journey, kindly consider contributing a donation to CPC and help us achieve our mission.</span>
        </div>
      </div>
    </div>

    <div class="column q-gutter-y-md items-center q-mt-xl full-footer">
      <div class="body-footer">
        <div class="footer-line first"></div>
        <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="24px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)">
<g id="SVGRepo_bgCarrier" stroke-width="0"/>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
<g id="SVGRepo_iconCarrier"> <g> <path fill="#62a0ea" d="M58.714,29.977c0,0-0.612,0.75-1.823,1.961S33.414,55.414,33.414,55.414C33.023,55.805,32.512,56,32,56 s-1.023-0.195-1.414-0.586c0,0-22.266-22.266-23.477-23.477s-1.823-1.961-1.823-1.961C3.245,27.545,2,24.424,2,21 C2,13.268,8.268,7,16,7c3.866,0,7.366,1.566,9.899,4.101l0.009-0.009l4.678,4.677c0.781,0.781,2.047,0.781,2.828,0l4.678-4.677 l0.009,0.009C40.634,8.566,44.134,7,48,7c7.732,0,14,6.268,14,14C62,24.424,60.755,27.545,58.714,29.977z"/> <path fill="#62a0ea" d="M58.714,29.977c0,0-0.612,0.75-1.823,1.961S33.414,55.414,33.414,55.414C33.023,55.805,32.512,56,32,56 s-1.023-0.195-1.414-0.586c0,0-22.266-22.266-23.477-23.477s-1.823-1.961-1.823-1.961C3.245,27.545,2,24.424,2,21 C2,13.268,8.268,7,16,7c3.866,0,7.366,1.566,9.899,4.101l0.009-0.009l4.678,4.677c0.781,0.781,2.047,0.781,2.828,0l4.678-4.677 l0.009,0.009C40.634,8.566,44.134,7,48,7c7.732,0,14,6.268,14,14C62,24.424,60.755,27.545,58.714,29.977z"/> <g> <path fill="#5e5c64" d="M48,5c-4.418,0-8.418,1.791-11.313,4.687l-3.979,3.961c-0.391,0.391-1.023,0.391-1.414,0 c0,0-3.971-3.97-3.979-3.961C24.418,6.791,20.418,5,16,5C7.163,5,0,12.163,0,21c0,3.338,1.024,6.436,2.773,9 c0,0,0.734,1.164,1.602,2.031s24.797,24.797,24.797,24.797C29.953,57.609,30.977,58,32,58s2.047-0.391,2.828-1.172 c0,0,23.93-23.93,24.797-24.797S61.227,30,61.227,30C62.976,27.436,64,24.338,64,21C64,12.163,56.837,5,48,5z M58.714,29.977 c0,0-0.612,0.75-1.823,1.961S33.414,55.414,33.414,55.414C33.023,55.805,32.512,56,32,56s-1.023-0.195-1.414-0.586 c0,0-22.266-22.266-23.477-23.477s-1.823-1.961-1.823-1.961C3.245,27.545,2,24.424,2,21C2,13.268,8.268,7,16,7 c3.866,0,7.366,1.566,9.899,4.101l0.009-0.009l4.678,4.677c0.781,0.781,2.047,0.781,2.828,0l4.678-4.677l0.009,0.009 C40.634,8.566,44.134,7,48,7c7.732,0,14,6.268,14,14C62,24.424,60.755,27.545,58.714,29.977z"/> <path fill="#5e5c64" d="M48,11c-0.553,0-1,0.447-1,1s0.447,1,1,1c4.418,0,8,3.582,8,8c0,0.553,0.447,1,1,1s1-0.447,1-1 C58,15.478,53.522,11,48,11z"/> </g> </g> </g>
</svg>
        <div class="footer-line second"></div>
      </div>
      <div class="column items-center footer-logo q-mt-md text-white">
        <strong>CPC Library</strong>
        <img :src="AppLogo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { Platform } from 'quasar';
import AppLogo from 'src/assets/applogo.png';
import BgCurve from 'src/assets/bgcurve.svg';
import BgPicture from 'src/assets/bg.jpg';

defineComponent({
  name: 'LandingPage'
});

</script>
