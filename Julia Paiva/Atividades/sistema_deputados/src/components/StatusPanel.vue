<template>
  <section
    class="state"
    :class="{ error: !!error }"
    :role="error ? 'alert' : 'status'"
  >
    <template v-if="loading"
      ><span class="spinner" />
      <h2>Consultando dados oficiais…</h2>
      <p>A consulta pode percorrer várias páginas da API.</p></template
    ><template v-else-if="error"
      ><span class="state-icon">!</span>
      <h2>Não foi possível carregar</h2>
      <p>{{ error }}</p>
      <button class="primary" @click="$emit('retry')">
        Tentar novamente
      </button></template
    ><template v-else
      ><span class="state-icon">⌕</span>
      <h2>{{ title || "Nenhum deputado encontrado" }}</h2>
      <p>{{ message || "Tente outro nome ou remova os filtros." }}</p>
      <button class="secondary" @click="$emit('reset')">
        Explorar todos
      </button></template
    >
  </section>
</template>
<script>
export default {
  name: "StatusPanel",
  props: { loading: Boolean, error: String, title: String, message: String },
  emits: ["retry", "reset"],
};
</script>
