<template>
  <section class="characters-grid" aria-label="Lista de personagens">
    <CharacterCard
      v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </section>
</template>

<script>
import CharacterCard from './CharacterCard.vue'

export default {
  name: 'CharacterList',
  components: { CharacterCard },
  props: {
    characters: { type: Array, required: true }
  }
}
</script>
