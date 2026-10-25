<template>
  <div>
    <div class="detail-toolbar">
      <a href="#/" class="back">← Voltar à consulta</a
      ><button
        v-if="deputy && !loading"
        class="secondary"
        @click="printProfile"
      >
        Imprimir perfil
      </button>
    </div>
    <StatusPanel
      v-if="loading || error"
      :loading="loading"
      :error="error"
      @retry="load"
    /><template v-else-if="deputy"
      ><section class="profile-hero">
        <DeputyPhoto :src="status.urlFoto" :name="name" large />
        <div class="profile-heading">
          <span class="eyebrow">PERFIL PARLAMENTAR</span>
          <h1>{{ name }}</h1>
          <div class="badges">
            <span>{{ status.siglaPartido || "Partido não informado" }}</span
            ><span>{{ status.siglaUf || "UF não informada" }}</span>
          </div>
          <p>
            {{ status.situacao || "Situação não informada"
            }}<span v-if="status.condicaoEleitoral">
              • {{ status.condicaoEleitoral }}</span
            >
          </p>
        </div>
        <button
          class="favorite"
          :class="{ active: isFavorite }"
          :aria-pressed="isFavorite"
          :aria-label="`${isFavorite ? 'Remover dos' : 'Adicionar aos'} favoritos`"
          @click="$emit('toggle', Number(id))"
        >
          {{ isFavorite ? "★" : "☆" }}
        </button>
      </section>
      <div class="details-grid">
        <section class="panel">
          <h2>Dados pessoais</h2>
          <p class="section-description">
            Informações públicas disponibilizadas pela Câmara.
          </p>
          <dl>
            <div class="field">
              <dt>Nome civil</dt>
              <dd>{{ deputy.nomeCivil || "Não informado" }}</dd>
            </div>
            <div class="field">
              <dt>Nascimento</dt>
              <dd>{{ formatDate(deputy.dataNascimento) }}</dd>
            </div>
            <div class="field">
              <dt>Naturalidade</dt>
              <dd>
                {{
                  [deputy.municipioNascimento, deputy.ufNascimento]
                    .filter(Boolean)
                    .join(" / ") || "Não informado"
                }}
              </dd>
            </div>
            <div class="field">
              <dt>Escolaridade</dt>
              <dd>{{ deputy.escolaridade || "Não informado" }}</dd>
            </div>
            <div class="field">
              <dt>Legislatura (ID)</dt>
              <dd>{{ status.idLegislatura ?? "Não informado" }}</dd>
            </div>
          </dl>
        </section>
        <section class="panel">
          <h2>Contato do gabinete</h2>
          <p class="section-description">
            Canais institucionais informados na API.
          </p>
          <dl>
            <div class="field">
              <dt>E-mail</dt>
              <dd>
                <a v-if="email" :href="`mailto:${email}`">{{ email }}</a
                ><span v-else>Não informado</span
                ><button v-if="email" class="copy-button" @click="copyEmail">
                  Copiar e-mail
                </button>
              </dd>
            </div>
            <div class="field">
              <dt>Telefone</dt>
              <dd>
                <a v-if="phone" :href="`tel:${phone}`">{{ cabinet.telefone }}</a
                ><span v-else>Não informado</span>
              </dd>
            </div>
            <div v-for="field in cabinetFields" :key="field.key" class="field">
              <dt>{{ field.label }}</dt>
              <dd>{{ cabinet[field.key] ?? "Não informado" }}</dd>
            </div>
          </dl>
          <p class="small" role="status">{{ copyNotice }}</p>
        </section>
        <section class="panel">
          <h2>Redes sociais e site</h2>
          <p class="section-description">
            Links fornecidos pela API, abertos em nova aba.
          </p>
          <ul v-if="networks.length" class="social-list">
            <li v-for="url in networks" :key="url">
              <a :href="url" target="_blank" rel="noopener noreferrer"
                >{{ socialName(url) }} ↗</a
              >
            </li>
          </ul>
          <p v-else>Nenhuma rede social informada pela API.</p>
          <a
            v-if="safeUrl(deputy.urlWebsite)"
            :href="safeUrl(deputy.urlWebsite)"
            target="_blank"
            rel="noopener noreferrer"
            >Site informado pelo deputado ↗</a
          >
          <p v-else class="small">Site não informado.</p>
        </section>
        <section class="panel source-panel">
          <span class="eyebrow">TRANSPARÊNCIA</span>
          <h2>Direto da fonte</h2>
          <p>
            Projeto acadêmico independente. Os dados são exibidos conforme
            disponibilizados pela Câmara e podem estar incompletos ou
            desatualizados na origem.
          </p>
          <a
            :href="`https://www.camara.leg.br/deputados/${id}`"
            target="_blank"
            rel="noopener noreferrer"
            >Perfil no portal da Câmara ↗</a
          >
          <p class="small">Identificador na API: {{ id }}</p>
        </section>
      </div></template
    >
  </div>
</template>
<script>
import { getDeputy } from "../services/api.mjs";
import { safeUrl, formatDate, socialName } from "../utils.mjs";
import DeputyPhoto from "../components/DeputyPhoto.vue";
import StatusPanel from "../components/StatusPanel.vue";
export default {
  name: "DeputyDetails",
  components: { DeputyPhoto, StatusPanel },
  props: {
    id: { type: String, required: true },
    favorites: { type: Array, required: true },
  },
  emits: ["toggle"],
  data() {
    return {
      deputy: null,
      loading: true,
      error: "",
      copyNotice: "",
      controller: null,
      cabinetFields: [
        { key: "nome", label: "Gabinete" },
        { key: "predio", label: "Prédio" },
        { key: "sala", label: "Sala" },
        { key: "andar", label: "Andar" },
      ],
    };
  },
  computed: {
    status() {
      return this.deputy?.ultimoStatus || {};
    },
    cabinet() {
      return this.status.gabinete || {};
    },
    name() {
      return (
        this.status.nomeEleitoral ||
        this.status.nome ||
        this.deputy?.nomeCivil ||
        "Deputado"
      );
    },
    email() {
      return this.cabinet.email || this.status.email || "";
    },
    phone() {
      return String(this.cabinet.telefone || "").replace(/[^0-9+]/g, "");
    },
    networks() {
      return [
        ...new Set(
          (Array.isArray(this.deputy?.redeSocial) ? this.deputy.redeSocial : [])
            .map(safeUrl)
            .filter(Boolean),
        ),
      ];
    },
    isFavorite() {
      return this.favorites.includes(Number(this.id));
    },
  },
  watch: {
    id() {
      this.load();
    },
  },
  mounted() {
    this.load();
  },
  beforeUnmount() {
    this.controller?.abort();
  },
  methods: {
    safeUrl,
    formatDate,
    socialName,
    printProfile() {
      window.print();
    },
    async copyEmail() {
      try {
        await navigator.clipboard.writeText(this.email);
        this.copyNotice = "E-mail copiado.";
      } catch {
        this.copyNotice =
          "Não foi possível copiar. Selecione o e-mail e use Ctrl+C.";
      }
    },
    async load() {
      this.controller?.abort();
      const controller = new AbortController();
      this.controller = controller;
      this.loading = true;
      this.error = "";
      this.copyNotice = "";
      try {
        const data = await getDeputy(this.id, controller.signal);
        if (!controller.signal.aborted) this.deputy = data;
      } catch (error) {
        if (!controller.signal.aborted) this.error = error.message;
      } finally {
        if (!controller.signal.aborted) this.loading = false;
      }
    },
  },
};
</script>
