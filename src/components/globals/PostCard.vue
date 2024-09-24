<script setup>
import { AppState } from '@/AppState.js';
import { Post } from '@/models/Post.js';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, ref } from 'vue';

const account = computed(() => AppState.account)

const prop = defineProps({
    postProps: { type: Post, required: true }
});



const isLiked = ref(false);

async function toggleLike() {
    try {
        await postsService.toggleLike(prop.postProps.id)
        isLiked.value = !isLiked.value
    }
    catch (error) {
        Pop.error(error);
        logger.log(error)
    }
}

async function deletePost() {
    try {
        const wantsToDelete = await Pop.confirm('Are you sure you want to delete')

        if (!wantsToDelete) { return }

        await postsService.deletePost(prop.postProps.id)
    } catch (error) {
        Pop.meow(error)
        logger.error(error)
    }
}

</script>

<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class=" d-flex col-12">
                    <router-link :to="{ name: 'Profile', params: { profileId: postProps.creatorId } }">
                        <div class="d-flex gap-3 mb-3 align-items-center">
                            <img :src="postProps.creator.picture" :alt="postProps.creator.name" class="creator-img">
                        </div>
                    </router-link>
                    <div class="d-flex flex-column m-3">
                        <p class="fs-5 mb-0">{{ postProps.creator.name }}</p>
                        <span class="">{{ new Date(postProps.createdAt).toLocaleString() }}</span>
                        <div>
                            <i v-if="account == account?.graduated" class="mdi mdi-account-school fs-1"></i>
                        </div>
                        <div>
                            <i v-if="prop.postProps.creatorId == account?.id" @click="deletePost()"
                                class="mdi mdi-delete fs-3 ms-2" type="button"></i>
                        </div>
                    </div>
                </div>
                <p class="card-text">{{ postProps.body }}</p>
                <img v-if="postProps.imgUrl" :src="postProps.imgUrl" class="card-img" :alt="postProps.creator.name">
                <div class="text-end">
                    <i class="mdi" :class="isLiked ? 'mdi-heart fs-3' : 'mdi-heart-outline fs-3'" type="button"
                        @click="toggleLike">
                    </i>
                    {{ postProps.likes.length }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

img {
    object-fit: cover;
    object-position: center;
}

.card-img {
    height: 30dvh;
    width: 100%;
    border-radius: 0%;
}

.creator-img {
    height: 15dvh;
    aspect-ratio: 1/1;
    border-radius: 50%;
}
</style>