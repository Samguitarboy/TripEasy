<template>
  <div class="card mb-4 shadow-sm border-0">
    <div class="row g-0">
      <!-- 圖片區 -->
      <div class="col-md-4 position-relative">
        <img
          :src="product.image"
          class="img-fluid h-100 object-fit-cover"
          alt="Product image"
        />
        <span
          v-if="hasTag('優惠')"
          class="badge bg-success position-absolute top-0 end-0 m-2"
        >
          優惠
        </span>
        <span
          v-if="hasTag('熱門')"
          class="badge bg-warning text-dark position-absolute top-0 end-0 m-2"
          style="right: 70px"
        >
          熱門
        </span>
      </div>

      <!-- 詳細區 -->
      <div class="col-md-5 p-3">
        <h5 class="fw-bold mb-1">{{ product.title }}</h5>
        <p class="text-muted mb-2">
          <i class="bi bi-geo-alt-fill me-1"></i>{{ product.location }}
        </p>
        <p class="text-secondary small mb-3" style="line-height: 1.5;">
          {{ product.description }}
        </p>
        <div class="text-muted small">
          <i class="bi bi-calendar-week me-1"></i> 立即預訂可用
        </div>
      </div>

      <!-- 價格與按鈕 -->
      <div class="col-md-3 d-flex flex-column justify-content-center align-items-center border-start px-3">
        <div class="text-primary fw-bold fs-4 mb-1">
          NT${{ product.price.toLocaleString() }}
        </div>
        <div
          v-if="product.originalPrice"
          class="text-muted text-decoration-line-through mb-2"
        >
          NT${{ product.originalPrice.toLocaleString() }}
        </div>
        <button class="btn btn-primary btn-sm w-100">
          查看詳情
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    hasTag(tag) {
      return this.product.tags?.includes(tag);
    },
  },
};
</script>

<style scoped>
.object-fit-cover {
  object-fit: cover;
}
</style>
