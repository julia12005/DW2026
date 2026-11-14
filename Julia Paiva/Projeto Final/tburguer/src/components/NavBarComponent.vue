<template>
    <nav class="navbar navbar-dark bg-dark border-bottom border-warning border-3">
        <div class="container"> 
            <router-link to="/" class="navbar-brand fw-bold text-warning">
                T-Burguer
            </router-link>
        </div>
        <div class="navbar-nav flex-row gap-3">
            <router-link class="nav-link text-warning" to="/">Menu</router-link>
            <router-link class="nav-link text-warning" to="/pedidos">Pedidos</router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavBarComponent"
};
</script>
