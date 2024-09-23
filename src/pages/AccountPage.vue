<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Account from '@/components/Account.vue';
import AdCard from '@/components/globals/AdCard.vue';

const account = computed(() => AppState.account)
const ads = computed(() => AppState.ads)

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
    <div class="p-5">
      <Account />
    </div>
    <div class="col-4 mt-3">
        <adCard v-for="ad in ads" :key="ad.id" :adProps="ad"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
