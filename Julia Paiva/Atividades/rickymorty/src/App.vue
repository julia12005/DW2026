<template>
  <div class="app-shell">
    <header class="hero">
      <div class="hero-content">
        <p class="eyebrow">Wubba Lubba Dub Dub!</p>
        <h1>Rick and Morty</h1>
        <p>Explore personagens de diferentes dimensões, suas localizações e seus status.</p>
        <div class="legend" aria-label="Legenda de status">
          <span><i class="legend-dot alive"></i> Vivo</span>
          <span><i class="legend-dot dead"></i> Morto</span>
          <span><i class="legend-dot unknown"></i> Desconhecido</span>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="section-title">
        <div>
          <p class="eyebrow">Multiverso</p>
          <h2>Personagens</h2>
        </div>
        <span v-if="!loading && !error" class="results-count">{{ characters.length }} nesta página</span>
      </div>

      <div v-if="loading" class="state-box" role="status">
        <span class="loader" aria-hidden="true"></span>
        <p>Carregando personagens...</p>
      </div>

      <div v-else-if="error" class="state-box error-box" role="alert">
        <span aria-hidden="true">⚠️</span>
        <p>{{ error }}</p>
        <button type="button" @click="loadCharacters(currentPage)">Tentar novamente</button>
      </div>

      <CharacterList v-else :characters="characters" />

      <PaginationControls
        v-if="!error && totalPages > 1"
        :page="currentPage"
        :total-pages="totalPages"
        :loading="loading"
        @change-page="changePage"
      />
    </main>

    <footer>
      Desenvolvido com Vue 3 e Rick and Morty API.
    </footer>
  </div>
</template>

<script>
import CharacterList from './components/CharacterList.vue'
import PaginationControls from './components/PaginationControls.vue'
import { getCharacters } from './services/api'

export default {
  name: 'App',
  components: { CharacterList, PaginationControls },
  data() {
    return {
      characters: [],
      currentPage: 1,
      totalPages: 1,
      loading: false,
      error: ''
    }
  },
  created() {
    this.loadCharacters(this.currentPage)
  },
  methods: {
    async loadCharacters(page) {
      this.loading = true
      this.error = ''
      try {
        const data = await getCharacters(page)
        this.characters = data.results
        this.totalPages = data.info.pages
        this.currentPage = page
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async changePage(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return
      await this.loadCharacters(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>
