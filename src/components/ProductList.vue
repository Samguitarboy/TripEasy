<template>
  <section class="flex-grow-1">
    <!-- Top Filter -->
    <div class="d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm mb-4 text-secondary small">
      <div class="d-flex align-items-center gap-2">
        <i class="fas fa-file-lines"></i>
        <span>筆數</span>
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="d-flex align-items-center gap-2">
        <i class="fas fa-images"></i>
        <span>金額排序</span>
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>

    <!-- Product List -->
    <!--<ProductList :products="yourFetchedProductList" />-->
    <ProductItem v-for="product in products" :key="product.id" :product="product" />

    <!-- Pagination -->
    <nav class="mt-5 d-flex justify-content-center">
      <ul class="pagination mb-0">
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">4</a></li>
        <li class="page-item disabled"><span class="page-link">...</span></li>
        <li class="page-item"><a class="page-link" href="#">99</a></li>
      </ul>
    </nav>
  </section>
</template>

<script setup>
import ProductItem from './ProductItem.vue'

const products = [
  {
    id: 1,
    title: '厚沼澤',
    location: '波蘭',
    description: '厚沼澤濕地是波蘭最大最珍貴的自然保護區之一，面積達592.23平方公里，橫跨普德拉謝省，位於波蘭的東北部生態走廊。厚沼澤的景觀特點是，巨大的低窪河流從300公里延伸至400公里並逐漸向周邊的沼澤過渡。是許多稀有動植物的棲息地，尤其是鳥類的主要繁殖區。每年，黑鸛和鷺鸕會隨著湖泊周圍的土地而繁殖。同時，厚沼澤也是許多水鳥的越冬地之一。',
    price: 18800,
    originalPrice: 20800,
    tags: ['熱門', '優惠'],
    image: '@/assets/img/shopping/view1.png',
  },
  {
    id: 2,
    title: '九份懷舊老街半日遊',
    location: '新北市瑞芳區',
    description: '穿梭九份山城小巷，品味地道芋圓、草仔粿與紅燒肉，感受懷舊氛圍與茶屋文化。',
    price: 1500,
    originalPrice: null,
    tags: ['熱門'],
    image: 'https://source.unsplash.com/250x180/?taiwan,street',
  }
]
/*
const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})*/
</script>
