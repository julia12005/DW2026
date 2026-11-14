<template>
    <div class="text-bg-dark py-5" 
    :style="{ background: 'url(/img/banner.jpeg) center/cover' }"
    >
        <div class="container text-end py-3">
        <h1 class="fw-bold text-warning">Hamburguer de Churrasqueiro</h1>
                <p class="text-light mb-0">Sabor do Churrasco</p>
            
        </div>
    </div>
</template>
<script>
export default {
    name: "BannerComponent"
};
</script>

<style scoped>
.banner_img {
    background: "url(/img/banner.jpeg) center/cover"
}
</style>