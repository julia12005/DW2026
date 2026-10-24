<template>
  <span class="status-badge" :class="statusClass" :aria-label="`Status: ${statusLabel}`">
    <span class="status-dot" aria-hidden="true"></span>
    {{ statusLabel }}
  </span>
</template>

<script>
export default {
  name: 'StatusBadge',
  props: {
    status: { type: String, required: true }
  },
  computed: {
    normalizedStatus() {
      return this.status.toLowerCase()
    },
    statusClass() {
      return `status-${this.normalizedStatus}`
    },
    statusLabel() {
      const labels = { alive: 'Vivo', dead: 'Morto', unknown: 'Desconhecido' }
      return labels[this.normalizedStatus] || 'Desconhecido'
    }
  }
}
</script>
