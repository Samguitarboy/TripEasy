<template>
  <div class="container my-4">
    <div class="d-flex align-items-center gap-3 flex-wrap">
      <label for="top-category-select" class="form-label mb-0">分類</label>

      <div class="dropdown">
        <select
          id="top-category-select"
          class="form-select"
          v-model="selectedCategory"
          @change="handleChange"
        >
          <option value="">全部</option>
          <option value="travel">旅行</option>
          <option value="outdoor">戶外</option>
          <option value="adventure">探險</option>
          <option value="culture">文化</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopFilter',
  data() {
    return {
      selectedCategory: '',
    };
  },
  methods: {
    handleChange() {
      this.$emit('filter-change', this.selectedCategory);
    },
  },
};
</script>

<style scoped>
/* 可選：額外微調樣式 */
</style>
