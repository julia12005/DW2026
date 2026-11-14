<template>
  <div>
    <h1 class="h3 mb-4">Cardápio</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="burguer in listaMenu" :key="burguer.id" class="col">
        <div class="card h-100">
          <img 
          :src="burguer.foto"
          class="card-img-top" 
          style="height: 180px; object-fit: cover;"
          />
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between mb-2">
              <h2 class="h5 mb-0">{{ burguer.nome }}</h2>
              <span class="badge bg-success">R$ {{ burguer.valor }}</span>
            </div>
            <p class="card-text text-muted small flex-grow-1">
              {{ burguer.descricao }}
            </p>
          </div>
          <button class="btn btn-outline-success fw-bold w-100 mt-2">
            Monte o seu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  data() {
    return {
      listaMenu: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch("http://localhost:3000/menu");
      const jsonObj = await response.json();
      this.listaMenu = jsonObj.burgues;
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>

<style scoped></style>
