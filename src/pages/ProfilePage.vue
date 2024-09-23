<script setup>
import { AppState } from '@/AppState.js';
import PageNavigation from '@/components/globals/PageNavigation.vue';
import ProfileDetails from '@/components/ProfileDetails.vue';
import PostCard from '@/components/globals/PostCard.vue';
import { postsService } from '@/services/PostsService.js';
import { profilesService } from '@/services/ProfilesService.js';
import Pop from '@/utils/Pop.js';
import { watch, computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { adsService } from '@/services/AdsService.js';

const route = useRoute();
const profileId = computed(() => route.params.profileId);
const posts = computed(() => AppState.posts);

onUnmounted(() => {
    postsService.clearProfile()
})


watch(profileId, () => {
    getAds()
    getProfileById();
    getPostsByCreatorId();
}, { immediate: true });

async function getProfileById() {
    try {
        await profilesService.getProfileById(profileId.value);
    } catch (error) {
        Pop.error(error);
    }
}

async function getPostsByCreatorId() {
    try {
        await postsService.getPostsByCreatorId(profileId.value);
    } catch (error) {
        Pop.error(error);
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
            <div class="col-8">
                <ProfileDetails />
            </div>
        </section>
        <section class="row">
            <div v-for="post in posts" :key="post.id" class="my-3 col-8">
                <PostCard :postProps="post" />
            </div>
        </section>
        <section class="row">
            <div class="col-8">
                <PageNavigation />
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
</style>