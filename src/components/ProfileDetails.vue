<script setup>
import { AppState } from '@/AppState.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const profiles = computed(() => AppState.activeProfile);

watch(() => route.params.profileId, () => {
    getProfileById();
}, { immediate: true });

async function getProfileById() {
    try {
        const profileId = route.params.profileId;
        await profilesService.getProfileById(profileId);
    } catch (error) {
        Pop.error
        logger.error(error)
    }
}

</script>

<template>
    <div class="my-3" v-if="profiles" :style="{ backgroundImage: `url(${profiles.coverImg})` }">
        <div class="text-black d-flex flex-column my-3">
            <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                    <img :src="profiles.picture" class="creator-img" :alt="profiles.name">
                </div>
                <div class="fs-2 m-3">
                    <a v-if="profiles.github" :href="profiles.github" target="_blank">
                        <i class="mdi mdi-github me-3"></i>
                    </a>
                    <a v-if="profiles.linkedin" :href="profiles.linkedin" target="_blank">
                        <i class="mdi mdi-linkedin me-3"></i>
                    </a>
                    <a v-if="profiles.resume" :href="profiles.resume" target="_blank">
                        <i class="mdi mdi-card-account-details me-3"></i>
                    </a>
                </div>
            </div>
            <div class="d-flex flex-column mt-3">
                <p v-if="profiles.graduated"><i class="mdi mdi-account-school fs-2"></i></p>
                <h5>Class of: {{ profiles.class }}</h5>
                <h3>{{ profiles.name }}</h3>
                <p>{{ profiles.bio }}</p>
                <div class="text-end">
                    <button class="btn btn-primary">Edit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.creator-img {
    height: 15dvh;
    aspect-ratio: 1/1;
    border-radius: 50%;
}
</style>