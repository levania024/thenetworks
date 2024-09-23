<script setup>
import Navbar from './components/Navbar.vue';
import Login from './components/Login.vue';
import { AppState } from './AppState.js';
import { computed } from 'vue';

const ads = computed(() => AppState.ads)

</script>

<template>
  <header>
    <section class="row">
      <Navbar />
    </section>

  </header>
  <main>
    <div class="row">
      <div class="col-2">
        <div class="sidebar">
          <Login />
        </div>
      </div>
      <div class="col-8">
        <router-view />
      </div>
      <div class="col-2 my-3">
        <adCard v-for="ad in ads" :key="ad.id" :adProps="ad" />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.sidebar {
  margin: 0%;
  height: var(--main-height);
  background-color: #f8f9fa;
  padding: 2px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}
</style>
