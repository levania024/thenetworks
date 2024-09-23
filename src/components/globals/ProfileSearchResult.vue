<script setup>

import { postsService } from '@/services/PostsService.js';
import Pop from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { ref } from 'vue';


const query = ref('');

const showUrlInput = ref(false);


async function searchPosts() {
  try {
    await postsService.searchPosts(query.value)
    showUrlInput.value = !showUrlInput.value;
  } catch (error) {
    Pop.meow(error)
    logger.log(error)
  }
}

</script>

<template>
  <router-link :to="{ name: 'Search' }">
    <form @submit.prevent="searchPosts()" class="navbar-form">
      <input v-if="showUrlInput" v-model="query" type="text" placeholder="Enter query" name="query" id="query"
        class="form-control" />
      <button @click="searchPosts()" type="submit" class="btn btn-outline-primary">Search</button>
    </form>
  </router-link>

</template>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.navbar-form {
  flex: 1;
  display: flex;
  gap: 10px;
  border-radius: 20%;
}
</style>
