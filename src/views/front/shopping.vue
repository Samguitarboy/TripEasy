<template>
  <div class="wrap">
    <!-- Header -->
    <HeaderComponent />
    <div class="hero-banner position-relative d-flex align-items-center justify-content-center">
        <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-end px-4 px-md-5">
            <h2 class="main-title text-white fw-bold text-end pe-5 pe-md-5 flex-grow-1 text-shadow-lg">
                購物專區
            </h2>
            <div class="verse-container d-flex flex-row-reverse align-items-start pe-3">
                <p class="right-text me-3">
                世界這麼大、<br />
                不必走得太遠<br />
                也能遇見<br />
                讓你心動的風景
                </p>
                <p class="right-text">
                跟著我們<br />
                把每一次出走<br />
                變成生活裡<br />
                最溫柔的片段
                </p>
            </div>
        </div>
    </div>
    <div class="container my-4">
        <div class="row g-4">
        <div class="col-md-3">
            <SidebarFilters />
        </div>
        <div class="col-md-9">
            <Breadcrumb />
            <TopFilter />
            <ProductList />
        </div>
        </div>
    </div>
    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SidebarFilters from '@/components/SidebarFilters.vue';
import TopFilter from '@/components/TopFilter.vue';
import ProductList from '@/components/ProductList.vue';
import * as func from '@/utils/function.js';
import * as api from '@/utils/api.js';

export default {
  name: 'shopping',
  components: { HeaderComponent,SidebarFilters,Breadcrumb,TopFilter,ProductList,FooterComponent },
  data() {
    return {
      filters: [
        {
          id: 'category',
          label: '分類',
          options: [
            { value: 'group', text: '旅行團' },
            { value: 'backpacker', text: '背包客' }
          ]
        },
        {
          id: 'theme',
          label: '主題',
          options: [
            { value: '', text: '選擇主題' },
            { value: 'mountains', text: '山脈' },
            { value: 'lake', text: '湖泊' }
          ]
        },
        {
          id: 'location',
          label: '所在地區',
          options: [
            { value: '', text: '選擇地區' },
            { value: 'europe', text: '歐洲' },
            { value: 'asia', text: '亞洲' }
          ]
        },
        {
          id: 'good-for',
          label: '適合',
          options: [
            { value: '', text: '選擇' },
            { value: 'solo', text: '單人' },
            { value: 'family', text: '家庭' }
          ]
        },
        {
          id: 'choose',
          label: '選擇',
          options: [
            { value: '', text: '選擇' },
            { value: 'option1', text: '選項1' },
            { value: 'option2', text: '選項2' }
          ]
        }
      ],
      search: '',
      errorMsg: '',
    };
  },
  computed: {

  },
  methods: {

  }
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css');
@import '@/assets/css/user_register.css';

.hero-banner {
  height: 450px;
  background-image: url('@/assets/img/shopping/banner.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.main-title {
  font-size: 3.8rem;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
}

.right-text {
  color: white;
  font-size: 1.1rem;
  line-height: 1.5;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  white-space: nowrap;
  writing-mode: vertical-lr;
  text-orientation: upright;
}
</style>