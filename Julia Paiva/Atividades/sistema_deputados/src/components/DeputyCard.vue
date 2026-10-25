<template>
  <article class="deputy-card">
    <div class="card-top">
      <DeputyPhoto :src="deputy.urlFoto" :name="deputy.nome" /><button
        class="favorite"
        :class="{ active: favorite }"
        :aria-pressed="favorite"
        :aria-label="`${favorite ? 'Remover' : 'Adicionar'} ${deputy.nome} ${favorite ? 'dos' : 'aos'} favoritos`"
        @click="$emit('toggle', deputy.id)"
      >
        {{ favorite ? "★" : "☆" }}
      </button>
    </div>
    <div class="card-content">
      <div class="badges">
        <span>{{ deputy.siglaPartido || "Não informado" }}</span
        ><span class="uf">{{ deputy.siglaUf || "UF não informada" }}</span>
      </div>
      <h3>{{ deputy.nome }}</h3>
      <p>Deputado(a) federal</p>
      <a
        class="card-link"
        :href="`#/deputado/${deputy.id}`"
        :aria-label="`Ver detalhes de ${deputy.nome}`"
        >Conhecer deputado <span aria-hidden="true">↗</span></a
      >
    </div>
  </article>
</template>
<script>
import DeputyPhoto from "./DeputyPhoto.vue";
export default {
  name: "DeputyCard",
  components: { DeputyPhoto },
  props: { deputy: { type: Object, required: true }, favorite: Boolean },
  emits: ["toggle"],
};
</script>
