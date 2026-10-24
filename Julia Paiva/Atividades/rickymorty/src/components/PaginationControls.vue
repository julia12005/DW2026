<template>
  <nav class="pagination" aria-label="Paginação dos personagens">
    <button type="button" :disabled="page <= 1 || loading" @click="$emit('change-page', page - 1)">
      ← Anterior
    </button>
    <span>Página <strong>{{ page }}</strong> de <strong>{{ totalPages }}</strong></span>
    <button type="button" :disabled="page >= totalPages || loading" @click="$emit('change-page', page + 1)">
      Próxima →
    </button>
  </nav>
</template>

<script>
export default {
  name: 'PaginationControls',
  emits: ['change-page'],
  props: {
    page: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    loading: { type: Boolean, default: false }
  }
}
</script>
