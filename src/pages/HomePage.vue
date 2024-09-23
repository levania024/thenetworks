<script setup>
import { AppState } from '@/AppState.js';
import PageNavigation from '@/components/globals/PageNavigation.vue';
import PostCard from '@/components/globals/PostCard.vue';
import PostForm from '@/components/globals/PostForm.vue';
import { postsService } from '@/services/PostsService.js';
import { adsService } from '@/services/AdsService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.posts);
const ads = computed(() => AppState.ads);

onMounted(() => {
  getPosts();
  getAds();
});

async function getPosts() {
  try {
    await postsService.getPost();
  } catch (error) {
    Pop.meow(error);
  }
}

async function getAds() {
  try {
    await adsService.getAds();
  } catch (error) {
    Pop.meow(error);
  }
}
</script>

<template>
  <div class="container">
    <section class="row">
      <div class="my-3 col-8">
        <PostForm />
      </div>
    </section>
    <section class="row">
      <div v-for="post in posts" :key="post.id" class="my-3 col-8">
        <PostCard :postProps="post" />
      </div>
    </section>
    <section class="row">
      <div class="my-3 col-8">
        <PageNavigation />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';
</style>
