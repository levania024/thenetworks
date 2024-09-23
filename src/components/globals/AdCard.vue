<script setup>
import { adsService } from '@/services/AdsService.js';
import Pop from '@/utils/Pop.js';
import { onMounted } from 'vue';

defineProps({
    adProps: {
        type: Object,
        required: true
    }
});

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
    <div class="col-4">
        <img :src="adProps.tall" :alt="adProps.title" class="ad-img">
        <p>{{ adProps.description }}</p>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.ad-img {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    height: 50dvh;
}
</style>