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
    <div>
     <img :src="adProps.tall" :alt="adProps.title">
        <p>{{ adProps.description }}</p>
    </div>
</template>

<style scoped>
.ads-container {
    position: sticky;
    top: 0; 
}

.ad-card {
    background-color: #f8f9fa; 
    border: 1px solid #dee2e6;
    border-radius: 5px; 
    padding: 10px; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>