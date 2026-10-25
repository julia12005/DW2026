<template>
  <div class="photo" :class="{ 'photo-large': large }">
    <img
      v-if="valid && !broken"
      :src="valid"
      :alt="`Foto de ${name}`"
      loading="lazy"
      @error="broken = true"
    /><span v-else role="img" aria-label="Foto indisponível">{{
      initials
    }}</span>
  </div>
</template>
<script>
import { safeUrl } from "../utils.mjs";
export default {
  name: "DeputyPhoto",
  props: {
    src: String,
    name: { type: String, default: "Deputado" },
    large: Boolean,
  },
  data() {
    return { broken: false };
  },
  computed: {
    valid() {
      return safeUrl(this.src);
    },
    initials() {
      return this.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0])
        .join("");
    },
  },
  watch: {
    src() {
      this.broken = false;
    },
  },
};
</script>
