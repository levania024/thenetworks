<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Account from '@/components/Account.vue';
import { adsService } from '@/services/AdsService.js';
import Pop from '@/utils/Pop.js';

const account = computed(() => AppState.account)
const ads = computed(() => AppState.ads)
onMounted(() => {
  getAds();
});

async function getAds() {
  try {
    await adsService.getAds();
  } catch (error) {
    Pop.meow(error);
  }
}

</script>

<template>
  <div class="about text-center">
    <div v-if="account" class="col-8">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div v-else class="col-8">
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
    <div class="col-8">
      <Account />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

img {
  max-width: 100px;
}
</style>
