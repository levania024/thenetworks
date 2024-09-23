<script setup>
import { AppState } from '@/AppState.js';
import PostCard from '@/components/globals/PostCard.vue';
import { adsService } from '@/services/AdsService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const ads = computed(() => AppState.ads)
const posts = computed(() => AppState.posts);

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
    <section class="row">
        <div v-for="post in posts" :key="post.id" class="col-12 my-3">
            <PostCard :postProps="post" />
         </div>
     </section>
</template>


<style lang="scss" scoped>

</style>