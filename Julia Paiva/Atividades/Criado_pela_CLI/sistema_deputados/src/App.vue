<template>
  <div>
    <a class="skip-link" href="#main-content" @click.prevent="focusMain"
      >Pular para o conteúdo</a
    >
    <header class="header">
      <div class="header-inner">
        <a class="brand" href="#/" @click="reset"
          ><span class="brand-mark" aria-hidden="true">RC</span
          ><span>Radar Cívico<small>CONSULTA DE DEPUTADOS</small></span></a
        >
        <nav aria-label="Navegação principal">
          <a
            href="#/"
            :aria-current="isList && !onlyFavorites ? 'page' : undefined"
            @click="reset"
            >Explorar</a
          ><button
            :class="{ 'nav-active': onlyFavorites }"
            @click="showFavorites"
          >
            Favoritos <span class="count">{{ favorites.length }}</span></button
          ><button
            class="theme-button"
            :aria-label="`Ativar modo ${theme === 'light' ? 'escuro' : 'claro'}`"
            @click="toggleTheme"
          >
            {{ theme === "light" ? "☾" : "☀" }}
          </button>
        </nav>
      </div>
    </header>
    <main id="main-content" ref="main" class="container" tabindex="-1">
      <div class="sr-only" role="status" aria-live="polite">{{ notice }}</div>
      <DeputyDetails
        v-if="detailId"
        :id="detailId"
        :favorites="favorites"
        @toggle="toggleFavorite"
      />
      <section v-else-if="!isList" class="state">
        <h1>Página não encontrada</h1>
        <a href="#/">Voltar à consulta</a>
      </section>
      <template v-else
        ><section class="hero">
          <div>
            <span class="eyebrow">DADOS ABERTOS. CIDADANIA ATIVA.</span>
            <h1>Conheça quem<br />representa você<span>.</span></h1>
            <p>
              Explore os deputados federais, encontre seus representantes e
              tenha os canais de contato sempre à mão.
            </p>
            <div class="hero-tags">
              <span>✓ Fonte oficial da Câmara</span
              ><span>✓ Acesso público</span>
            </div>
          </div>
          <aside class="hero-aside">
            <span class="orb" aria-hidden="true">◎</span
            ><strong>Informação aproxima.</strong>
            <p>Uma consulta simples para uma participação mais consciente.</p>
            <span class="aside-line" />
          </aside>
        </section>
        <section class="search-panel" aria-label="Busca e filtros">
          <form @submit.prevent="submitSearch">
            <label for="name">Quem você está procurando?</label>
            <div class="search-row">
              <input
                id="name"
                v-model="input"
                type="search"
                placeholder="Digite o nome do deputado…"
                maxlength="100"
              /><button class="primary" type="submit">
                Buscar deputados <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
          <div class="filters">
            <label
              >Estado (UF)<select v-model="uf">
                <option value="">Todos os estados</option>
                <option v-for="state in ufs" :key="state">{{ state }}</option>
              </select></label
            ><label
              >Partido<select v-model="party">
                <option value="">Todos os partidos</option>
                <option v-for="item in parties" :key="item">{{ item }}</option>
              </select></label
            ><label
              >Ordenar por<select v-model="order">
                <option value="asc">Nome: A a Z</option>
                <option value="desc">Nome: Z a A</option>
              </select></label
            ><button class="clear-button" @click="reset">Limpar filtros</button>
          </div>
        </section>
        <section class="results" aria-label="Resultados" :aria-busy="loading">
          <div class="results-header">
            <div>
              <span class="eyebrow">{{
                onlyFavorites ? "SUA LISTA PESSOAL" : "EXPLORE A CÂMARA"
              }}</span>
              <h2>
                {{
                  onlyFavorites ? "Deputados favoritos" : "Deputados federais"
                }}
                <span v-if="!loading && !error" class="result-count">{{
                  filtered.length
                }}</span>
              </h2>
              <p>
                {{
                  search
                    ? `Resultados da API para “${search}”.`
                    : "Consulta sem filtro de legislatura."
                }}
                Filtros aplicados à consulta completa.
              </p>
            </div>
            <button
              class="secondary"
              :disabled="loading || !!error || !filtered.length"
              @click="exportCsv"
            >
              ↓ Exportar CSV
            </button>
          </div>
          <StatusPanel
            v-if="loading || error"
            :loading="loading"
            :error="error"
            @retry="load"
          /><StatusPanel
            v-else-if="!filtered.length"
            :title="onlyFavorites ? 'Nenhum favorito encontrado' : ''"
            :message="
              onlyFavorites
                ? 'Use a estrela nos cards para salvar deputados ou remova os filtros.'
                : ''
            "
            @reset="reset"
          /><template v-else
            ><div class="cards-grid">
              <DeputyCard
                v-for="deputy in visible"
                :key="deputy.id"
                :deputy="deputy"
                :favorite="favorites.includes(deputy.id)"
                @toggle="toggleFavorite"
              />
            </div>
            <nav class="pagination" aria-label="Paginação">
              <button
                class="secondary"
                :disabled="current === 1"
                @click="page = current - 1"
              >
                ← Anterior</button
              ><span aria-live="polite"
                >Página <strong>{{ current }}</strong> de
                <strong>{{ pages }}</strong></span
              ><button
                class="secondary"
                :disabled="current === pages"
                @click="page = current + 1"
              >
                Próxima →
              </button>
            </nav>
            <p class="results-note">
              Exibindo {{ (current - 1) * pageSize + 1 }}–{{
                Math.min(current * pageSize, filtered.length)
              }}
              de {{ filtered.length }} resultados. O CSV inclui todos os
              resultados filtrados.
            </p></template
          >
        </section></template
      >
    </main>
    <footer class="footer">
      <div class="container">
        <strong>Radar Cívico</strong>
        <p>
          Projeto acadêmico independente • Dados Abertos da Câmara dos Deputados
        </p>
        <a
          href="https://dadosabertos.camara.leg.br/swagger/api.html"
          target="_blank"
          rel="noopener noreferrer"
          >Documentação da API ↗</a
        >
        <p class="small">
          Favoritos e tema ficam neste navegador. Não há cadastro nem vínculo
          oficial com a Câmara.
        </p>
      </div>
    </footer>
  </div>
</template>
<script>
import DeputyCard from "./components/DeputyCard.vue";
import StatusPanel from "./components/StatusPanel.vue";
import DeputyDetails from "./pages/DeputyDetails.vue";
import { listDeputies } from "./services/api.mjs";
import {
  UFS,
  filterDeputies,
  readStorage,
  writeStorage,
  toCsv,
} from "./utils.mjs";
export default {
  name: "App",
  components: { DeputyCard, StatusPanel, DeputyDetails },
  data() {
    const saved = readStorage("radar-favorites", []);
    return {
      hash: window.location.hash || "#/",
      input: "",
      search: "",
      uf: "",
      party: "",
      order: "asc",
      onlyFavorites: false,
      page: 1,
      pageSize: 12,
      rows: [],
      catalog: [],
      loading: true,
      error: "",
      notice: "",
      favorites: Array.isArray(saved) ? saved.filter(Number.isInteger) : [],
      theme: readStorage("radar-theme", "light") === "dark" ? "dark" : "light",
      ufs: UFS,
      controller: null,
    };
  },
  computed: {
    detailId() {
      return /^#\/deputado\/(\d+)$/.exec(this.hash)?.[1] || "";
    },
    isList() {
      return ["#/", "#", ""].includes(this.hash);
    },
    parties() {
      return [
        ...new Set(
          [...this.catalog, ...this.rows]
            .map((d) => d.siglaPartido)
            .filter(Boolean),
        ),
      ].sort();
    },
    filtered() {
      return filterDeputies(this.rows, {
        uf: this.uf,
        party: this.party,
        order: this.order,
        favoritesOnly: this.onlyFavorites,
        favorites: this.favorites,
      });
    },
    pages() {
      return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
    },
    current() {
      return Math.min(this.page, this.pages);
    },
    visible() {
      return this.filtered.slice(
        (this.current - 1) * this.pageSize,
        this.current * this.pageSize,
      );
    },
  },
  watch: {
    uf() {
      this.page = 1;
    },
    party() {
      this.page = 1;
    },
    order() {
      this.page = 1;
    },
    onlyFavorites() {
      this.page = 1;
    },
  },
  mounted() {
    window.addEventListener("hashchange", this.routeChanged);
    document.documentElement.dataset.theme = this.theme;
    this.load();
  },
  beforeUnmount() {
    window.removeEventListener("hashchange", this.routeChanged);
    this.controller?.abort();
  },
  methods: {
    focusMain() {
      this.$refs.main.focus();
    },
    routeChanged() {
      this.hash = window.location.hash || "#/";
      window.scrollTo(0, 0);
      this.$nextTick(() => this.focusMain());
    },
    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = this.theme;
      writeStorage("radar-theme", this.theme);
    },
    toggleFavorite(id) {
      const previous = this.favorites.includes(id);
      this.favorites = previous
        ? this.favorites.filter((v) => v !== id)
        : [...this.favorites, id];
      const saved = writeStorage("radar-favorites", this.favorites);
      this.notice = saved
        ? previous
          ? "Deputado removido dos favoritos."
          : "Deputado salvo nos favoritos."
        : "Favoritos alterados nesta sessão; o navegador não permitiu salvar.";
    },
    submitSearch() {
      this.search = this.input.trim();
      this.page = 1;
      this.load();
    },
    reset() {
      const reload = !!this.search;
      this.input = "";
      this.search = "";
      this.uf = "";
      this.party = "";
      this.order = "asc";
      this.onlyFavorites = false;
      this.page = 1;
      if (reload) this.load();
    },
    showFavorites() {
      const reload = !!this.search;
      this.input = "";
      this.search = "";
      this.uf = "";
      this.party = "";
      this.onlyFavorites = true;
      this.page = 1;
      window.location.hash = "#/";
      if (reload) this.load();
    },
    exportCsv() {
      const url = URL.createObjectURL(
        new Blob([toCsv(this.filtered)], { type: "text/csv;charset=utf-8;" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "deputados-consulta.csv";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
    async load() {
      this.controller?.abort();
      const controller = new AbortController();
      this.controller = controller;
      this.loading = true;
      this.error = "";
      try {
        const rows = await listDeputies(this.search, controller.signal);
        if (!controller.signal.aborted) {
          this.rows = rows;
          if (!this.search) this.catalog = rows;
        }
      } catch (error) {
        if (!controller.signal.aborted) this.error = error.message;
      } finally {
        if (!controller.signal.aborted) this.loading = false;
      }
    },
  },
};
</script>
