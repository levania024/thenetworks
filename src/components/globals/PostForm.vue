<script setup>
import { AppState } from '@/AppState.js';
import { postsService } from '@/services/PostsService.js';
import Pop from '@/utils/Pop.js';
import { computed, ref } from 'vue';

const account = computed(() => AppState.account)

const postForm = ref({
    body: '',
    imgUrl: ''
})

const showUrlInput = ref(false);

async function createPost() {
    try {
        await postsService.createPost(postForm.value)
        postForm.value = {
            body: '',
            imgUrl: ''
        }
        Pop.confirm('create post')
    }
    catch (error) {
        Pop.meow(error);
    }
}

function toggleUrlInput() {
    showUrlInput.value = !showUrlInput.value;
}
</script>

<template>
    <div v-if="account" class="card d-flex flex-row">
        <div class="col-3 m-2">
            <img :src="account.picture" :alt="account.name" class="creator-img">
        </div>
        <div class="col-8">
            <div class="align-items-center">
                <form @submit.prevent="createPost()">
                    <textarea v-model="postForm.body" name="body" id="" placeholder="Share posts" maxlength="5000"
                        required class="form-control mt-3"></textarea>
                    <div class="d-flex my-3 align-items-center gap-2">
                        <i class="mdi mdi-image-multiple fs-2" type="button" @click="toggleUrlInput()"></i>
                        <p class="ms-2"> Photo/Video</p>
                        <input v-if="showUrlInput" v-model="postForm.imgUrl" type="url" name="imgUrl" id="imgUrl"
                            maxlength="500" class="ms-2 form-control">
                        <div class="ms-auto">
                            <button class="btn btn-outline-primary" type="submit"><i
                                    class="mdi mdi-send"></i>Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.creator-img {
    height: 15dvh;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
}

textarea {
    height: 10dvb;
}
</style>