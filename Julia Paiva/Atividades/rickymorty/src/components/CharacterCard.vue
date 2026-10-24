<template>
  <article class="character-card">
    <div class="image-wrapper">
      <img :src="character.image" :alt="`Foto de ${character.name}`" loading="lazy">
      <StatusBadge :status="character.status" />
    </div>
    <div class="card-content">
      <p class="card-label">Personagem</p>
      <h2>{{ character.name }}</h2>
      <div class="location">
        <span class="location-icon" aria-hidden="true">📍</span>
        <div>
          <span>Última localização conhecida</span>
          <strong>{{ character.location.name }}</strong>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import StatusBadge from './StatusBadge.vue'

export default {
  name: 'CharacterCard',
  components: { StatusBadge },
  props: {
    character: { type: Object, required: true }
  }
}
</script>
