<script setup>
import { AppState } from '@/AppState.js';
import { postsService } from '@/services/PostsService.js';
import Pop from '@/utils/Pop.js';
import { computed } from 'vue';

const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

async function changePage(PageNum) {
  try {
    if (AppState.postPageNum == '') {
      await postsService.changePostPage(PageNum)
    }
    else {
      await postsService.changeProfilePage(PageNum, AppState.postPageNum)
    }
  } catch (error) {
    Pop.meow(error)
  }
}
</script>


<template>
  <div class="d-flex gap-3 align-items-center my-3">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage < 2" class="btn btn-outline-primary">
      Newer
    </button>
    <button @click="changePage(currentPage + 1)" :disabled="currentPage == 40 || currentPage == totalPages"
      class="btn btn-outline-primary">
      Older
    </button>
  </div>
</template>



<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
</style>