<template>
  <nav class="breadcrumb">
    <router-link v-for="(item, index) in breadcrumbs" :key="index" :to="item.path">
      {{ item.label }}
      <span v-if="index < breadcrumbs.length - 1">  <span style="color: grey;">/</span>  </span>
    </router-link>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  return route.matched
    .filter(r => r.meta && r.meta.breadcrumb)
    .map(r => ({
      label: r.meta.breadcrumb,
      path: r.path.startsWith('/') ? r.path : `/${r.path}`
    }))
})
</script>

<style scoped>
.breadcrumb {
  font-size: 18px;
}
.breadcrumb a {
  color: #000000fb;
  font-weight: bold;
  text-decoration: none;
  margin-right: 5px;
}
</style>
