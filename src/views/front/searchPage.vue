<template>
  <div class="wrap">
    <!-- Header -->
    <HeaderComponent />

    <div class="container-fluid px-0">
        <div class="hero-banner d-flex align-items-center justify-content-center">
          <div class="container top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-end px-4 px-md-5">
              <h2 class="main-title text-white fw-bold text-center pe-5 pe-md-9 flex-grow-1 text-shadow-lg">
                  購物專區
              </h2>
              <div class="verse-container d-flex flex-row-reverse align-items-start pe-3">
                  <p class="right-text">
                  世界這麼大、<br />
                  不必走得太遠<br />
                  也能遇見<br />
                  讓你心動的風景
                  </p>
                  <p class="right-text me-5">
                  跟著我們<br />
                  把每一次出走<br />
                  變成生活裡<br />
                  最溫柔的片段
                  </p>
              </div>
          </div>
      </div>

      <!-- 搜尋區+商品清單區+分頁器 -->
    <div class="main-content">
      <Breadcrumb />
      <!-- 搜尋區 -->
      <div class="bg-white py-4">
        <div class="container">

          <!-- 分類 -->
          <div class="row g-3 align-items-end mb-3">
            <div class="col-6 col-md-3">
              <div class="d-flex align-items-center">
                <label class="form-label mb-0 me-5" style="white-space:nowrap;">分類</label>
                <select class="form-select" v-model="filters.category" style="width:180px;">
                  <option disabled value="">旅行團</option>
                  <option>背包客</option>
                </select>
              </div>
            </div>

            <!-- 項目類別 -->
            <div class="col-6 col-md-3">
              <div class="d-flex align-items-center">
                <label class="form-label mb-0 me-3" style="white-space:nowrap;">項目類別</label>
                <select class="form-select" v-model="filters.itemType" style="width:180px;">
                  <option disabled value="">旅遊行程</option>
                  <option>美食專區</option>
                  <option>飯店專區</option>
                  <option>旅遊專區</option>
                </select>
              </div>
            </div>

            <!-- 偏好分類 -->
            <div class="col-6 col-md-3">
              <div class="d-flex align-items-center">
                <label class="form-label mb-0 me-3" style="white-space:nowrap;">偏好分類</label>
                <select class="form-select" v-model="filters.preference" style="width:180px;">
                  <option disabled value="">選擇分類</option>
                  <option>探索冒險系</option>
                  <option>放鬆療癒系</option>
                  <option>文化體驗系</option>
                  <option>美食探索系</option>
                  <option>都市感官系</option>
                  <option>自然療癒系</option>
                  <option>親子家庭系</option>
                  <option>拍照打卡系</option>
                  <option>懶人輕鬆系</option>
                  <option>特殊主題系</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row g-3 align-items-end mb-3">
            <!-- 國家 -->
            <div class="col-6 col-md-3">
              <div class="d-flex align-items-center">
                <label class="form-label mb-0 me-3" style="white-space:nowrap;">所在國家</label>
                <select class="form-select" v-model="filters.country" style="width:180px;">
                  <option disabled value="">選擇國家</option>
                  <option>台灣</option>
                  <option>日本</option>
                  <option>韓國</option>
                  <option>泰國</option>
                  <option>新加坡</option>
                  <option>馬來西亞</option>
                  <option>美國</option>
                </select>
              </div>
            </div>

            <!-- 地區 -->
            <div class="col-6 col-md-3">
              <div class="d-flex align-items-center">
                <label class="form-label mb-0 me-3" style="white-space:nowrap;">所在地區</label>
                <select class="form-select" v-model="filters.area" style="width:180px;">
                  <option disabled value="">選擇地區</option>
                  <option>台北市</option>
                  <option>新北市</option>
                  <option>宜蘭市</option>
                  <option>桃園市</option>
                  <option>新竹市</option>
                </select>
              </div>
            </div>
          </div>

            <!-- 金額 -->
          <div class="row g-3 align-items-end mb-3">
            <div class="col-6 col-md-3">
              <div class="d-flex align-items-center">
                <label class="form-label mb-0 me-3" style="white-space:nowrap;">購買金額</label>
                <input type="text" class="form-control" placeholder="最小金額"  style="width:180px;"/>
                <span class="mx-1"> – </span>
                <input type="text" class="form-control" placeholder="最大金額"  style="width:180px;"/>
              </div>
            </div>
          </div>

          <!-- 旅遊日期 + 旅遊天數：同一列 -->
          <div class="row g-3 align-items-end mb-3">
            <!-- 旅遊日期（左側） -->
            <div class="col-12 col-md-6">
              <div class="d-flex align-items-center">
                <label class="form-label mb-0 me-3" style="white-space:nowrap;">旅遊日期</label>

                <!-- 最早日期 -->
                <div class="fake-date-input" style="width:180px;">
                  <input type="text" class="form-control" :value="displayStartDate || ''" placeholder="最早日期" readonly />
                  <span class="calendar-icon" @click="openDatePicker('start')">📅</span>
                  <input type="date" ref="startDateRef" v-model="filters.startDate" @change="onStartDateChange" />
                </div>

                <span class="mx-1"> – </span>

                <!-- 最晚日期 -->
                <div class="fake-date-input" style="width:180px;">
                  <input type="text" class="form-control" :value="displayEndDate || ''" placeholder="最晚日期" readonly />
                  <span class="calendar-icon" @click="openDatePicker('end')">📅</span>
                  <input type="date" ref="endDateRef" v-model="filters.endDate" @change="onEndDateChange" />
                </div>
              </div>
            </div>

            <!-- 旅遊天數（右側） -->
            <div class="col-12 col-md-3">
              <div class="d-flex align-items-center">
                <label class="form-label mb-0 me-3" style="white-space:nowrap;">旅遊天數</label>
                <select class="form-select" v-model="filters.days" style="width:180px;">
                  <option disabled value="">選擇天數</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>

            <!-- 佔位（保持右對齊用，可留空） -->
            <div class="col-md-3"></div>
          </div>

          <!-- 關鍵字 -->
          <div class="row g-3 align-items-end mb-3">
            <div class="col-12 col-md-6">
              <div class="d-flex align-items-center">
                <label class="form-label mb-0" style="white-space:nowrap; margin-right: 2em;">關鍵字</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入關鍵字"
                  v-model="filters.keyword"
                  style="width:376px;"
                />
              </div>
            </div>
          </div>


            <!-- 搜尋 -->
            <div class="col-12 col-md-12 text-end">
              <button class="btn btn-outline-dark mt-4 btn-oval">搜尋</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 排序與每頁顯示數量控制列 -->
      <div class="container d-flex justify-content-between align-items-center my-3">
          <!-- 每頁顯示筆數選單 -->
          <div class="d-flex align-items-center">
            <select v-model="itemsPerPage" class="form-select form-select-lg" style="width: 180px;">
              <option :value="2">筆數：2</option>
              <option :value="4">筆數：4</option>
              <option :value="6" selected>筆數</option>
            </select>
          </div>
          <!-- 金額排序選單 -->
          <div class="d-flex align-items-center">
            <select v-model="sortOrder" @change="onSortOrderChange" class="form-select form-select-lg" style="width: 180px;">
              <option value=null>金額排序</option>
              <option value="asc">金額升序 ▲</option>
              <option value="desc">金額降序 ▼</option>
            </select>
          </div>
        </div>
      <!-- 商品清單區 -->
    <div class="container my-5">
        <div class="row gy-4">
          <div class="col-12" v-for="(item) in paginatedItems" :key="item.id">
            <div class="d-flex bg-white rounded shadow-sm overflow-hidden">

              <!-- 圖片 -->
              <img :src="item.img" class="img-fluid" style="object-fit: cover;" />

              <!-- 內容 -->
              <div class="p-3 flex-grow-1">

                  <!-- 標籤 -->
                  <div>
                    <span v-if="item.tag1" class="badge bg-warning text-dark me-1">{{ item.tag1 }}</span>
                    <span v-if="item.tag2" class="badge bg-warning text-dark me-1">{{ item.tag2 }}</span>
                    <span v-if="item.tag3" class="badge bg-danger text-white">{{ item.tag3 }}</span>
                  </div>

                <!-- 主內容區塊：左側(title/desc) + 右側(日期/價格/按鈕) -->
                <div class="d-flex">
                  <!-- 左側：title + 收藏 + desc -->
                  <div class="flex-grow-1">
                    <div class="d-flex align-items-center mb-1">
                      <h5 class="mb-0">{{ item.title }}</h5>
                      <span
                        class="fs-5 favorite-icon ms-2"
                        :class="{ active: item.isFavorite }"
                        @click="toggleFavorite(item)"
                        role="button"
                        title="收藏"
                      >
                        {{ item.isFavorite ? '♥' : '♡' }}
                      </span>
                    </div>
                    <p class="mb-2 small text-start">{{ item.desc }}</p>
                  </div>

                  <!-- 右側：日期/價格/按鈕 -->
                  <div class="text-end ms-3" style="min-width: 210px;">
                    <div>{{ item.date }}</div>
                    <div class="price-custom mt-2 mb-1">
                      NT${{ item.price.toLocaleString() }}
                    </div>
                    <small class="text-muted text-decoration-line-through d-block mb-2">
                      NT${{ item.original.toLocaleString() }}
                    </small>
                    <button class="btn btn-outline-dark btn-sm">查看詳情</button>
                  </div>

                </div>

              </div>

            </div>
          </div>

        <!-- 分頁器 -->
        <nav class="d-flex justify-content-center mt-4">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="prevPage">&laquo;</button>
            </li>
            <li
              class="page-item"
              v-for="page in totalPages"
              :key="page"
              :class="{ active: currentPage === page }"
            >
              <button class="page-link" @click="goToPage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="nextPage">&raquo;</button>
            </li>
          </ul>
        </nav>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>


<script setup>
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import view1 from '@/assets/img/search/view1.png';
import view2 from '@/assets/img/search/view2.jpg';
import view3 from '@/assets/img/search/view3.jpg';
import view4 from '@/assets/img/search/view4.jpg';
import view5 from '@/assets/img/search/view5.jpg';
import view6 from '@/assets/img/search/view6.jpg';

import { reactive, computed, ref } from 'vue';

const filters = reactive({
  category: '',   //分類
  itemType: '',   //項目類別
  preference: '', //偏好分類
  country: '',    //國家
  area:'',        //地區
  days:'',        //天數
  keyword: '',    //關鍵字
});
const sortOrder = ref(null) // null=沒排序, 'asc'=升序, 'desc'=降序
const itemsPerPageOptions = [2, 4, 6]

const allItems = ref([
  {
    id: 1,
    title: '摩洛哥｜撒哈拉沙漠',
    desc: '薩哈拉沙漠是全球最大的熱帶沙漠，面積達到約940萬平方公里，橫跨多個國家，擁有壯麗的沙丘和多樣的生態系統。這裡的氣候極端，白天的氣溫可達50攝氏度，而夜晚則驟降至接近零度。沙漠中的生物適應了這種極端環境，形成了獨特的生態平衡。每年，無數探險者和攝影愛好者被這片神秘的土地所吸引，來此探索其壯觀的自然景觀和豐富的文化遺產。',
    price: 18800,
    original: 20800,
    date: '2025.04.10 ~ 2025.04.12',
    tag1: '探索冒險',
    tag2: '自然療癒',
    img: view1,
    isFavorite: false,
  },
  {
    id: 2,
    title: '秘魯｜馬丘比丘',
    desc: '馬丘比丘是秘魯最著名的古代遺址之一，坐落在安第斯山脈的高處，海拔約2430米。這座印加城市以其壯觀的石造建築和壯麗的自然景觀而聞名，周圍環繞著雲霧繚繞的山峰和翠綠的山谷。遊客可以在這裡欣賞到精美的梯田、神秘的神廟和壯觀的日出，感受印加文明的魅力。每年吸引著成千上萬的遊客前來探索這片歷史悠久的土地，體驗古代文化的獨特氛圍。',
    price: 120000,
    original: 140800,
    date: '2025.04.10 ~ 2025.04.12',
    tag1: '懶人輕鬆',
    tag2: '自然療癒',
    img: view2,
    isFavorite: false,
  },
  {
    id: 3,
    title: '土耳其｜熱氣球之旅',
    desc: '在土耳其，熱氣球飛行是一項令人驚嘆的體驗，尤其是在卡帕多奇亞地區。這裡的獨特地貌和壯麗的日出景色吸引了無數遊客。乘坐熱氣球，您可以俯瞰到奇特的岩石形成、古老的洞穴住宅和廣袤的葡萄園。飛行過程中，您會感受到微風拂面，並且能夠拍攝到壯觀的全景，這將成為您旅行中難忘的回憶。',
    price: 18800,
    original: 20800,
    date: '2025.04.10 ~ 2025.04.12',
    tag1: '文化體驗',
    tag2: '自然療癒',
    img: view3,
    isFavorite: false,
  },
  {
    id: 4,
    title: '義大利｜文藝復興巡禮',
    desc: '義大利的旅程充滿了迷人的景點和豐富的歷史。從羅馬的古老遺跡，如羅馬競技場和萬神殿，到威尼斯的浪漫運河，這裡每一個角落都散發著藝術的氣息。佛羅倫斯的烏菲茲美術館收藏了無數大師的作品，而比薩的斜塔則是建築奇蹟的象徵。無論是品嚐當地的美食，還是漫步在古老的街道上，義大利都會讓你流連忘返，感受到無與倫比的魅力。',
    price: 18800,
    original: 20800,
    date: '2025.04.10 ~ 2025.04.12',
    tag1: '都市感官',
    tag2: '拍照打卡',
    img: view4,
    isFavorite: false,
  },
  {
    id: 5,
    title: '加拿大｜洛磯山脈',
    desc: '加拿大洛磯山脈是自然愛好者的天堂，擁有壯觀的山脈、清澈的湖泊和茂密的森林。這裡的班夫國家公園以其壯麗的冰川湖泊和壯觀的山景而聞名，遊客可以在此進行徒步旅行、滑雪和野生動物觀賞。冰原大道則是通往洛磯山脈的絕佳路線，沿途可欣賞到壯觀的冰川和壯麗的山脈景色。無論是夏季的綠意盎然，還是冬季的白雪皚皚，洛磯山脈都展現出無與倫比的自然美。',
    price: 18800,
    original: 20800,
    date: '2025.04.10 ~ 2025.04.12',
    tag1: '探索冒險',
    tag2: '自然療癒',
    img: view5,
    isFavorite: false,
  },
  {
    id: 6,
    title: '美國｜大峽谷',
    desc: '美國大峽谷是世界上最壯觀的自然奇觀之一，深達1800米，長約446公里，寬度從6到29公里不等。這裡的岩石層顯示了地球數百萬年的地質歷史，色彩斑斕的岩壁在陽光下閃耀著迷人的光芒。遊客可以在觀景台欣賞壯麗的景色，或參加徒步旅行和漂流等冒險活動，體驗大峽谷的壯闊與神秘。每年吸引數百萬遊客前來探索這片壖麗的自然寶藏。',
    price: 18800,
    original: 20800,
    date: '2025.04.10 ~ 2025.04.12',
    tag1: '探索冒險',
    tag2: '自然療癒',
    img: view6,
    isFavorite: false,
  },
]);
// 愛心收藏
function toggleFavorite(item) {
  item.isFavorite = !item.isFavorite;
  allItems.value = [...allItems.value];
}

const displayStartDate = ref('')
const displayEndDate = ref('')
const realDateRef = ref(null)

const openDatePicker = () => {
  realDateRef.value?.click()
}

const onStartDateChange = (event) => {
  displayStartDate.value = event.target.value
}
const onEndDateChange = (event) => {
  displayEndDate.value = event.target.value
}



const currentPage = ref(1);
const itemsPerPage = ref(6);

function onSortOrderChange() {
  currentPage.value = 1
}

// 每次筆數改變時，重置回第 1 頁
function onItemsPerPageChange() {
  currentPage.value = 1
}

// 加入排序邏輯
const sortedItems = computed(() => {
  const sorted = [...allItems.value]
  return sorted.sort((a, b) =>
    sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price
  )
})

// 排序後的 items 來做分頁
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return sortedItems.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() =>
  Math.ceil(sortedItems.value.length / itemsPerPage.value)
)

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function goToPage(page) {
  currentPage.value = page;
}

</script>

<style scoped>
body {
  background-color: #f9f9f9;
}

.main-content{
  max-width: 1296px;
  margin-left: auto;
  margin-right: auto;
}

.hero-banner {
  height: 450px;
  background-image: url('@/assets/img/search/banner.jpg');
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
  writing-mode: vertical-rl;
  text-orientation: upright;
}
.img-fluid{
  width: 332px;
  height: 192px;
}


.favorite-icon {
  cursor: pointer;
  color: #aaa;
  transition: color 0.1s;
}

.favorite-icon.active {
  color: red;
}

.price-custom {
  font-size: 24px;
  font-weight: 700;
  font-family: 'Noto Serif TC', serif;
  color: red;
  letter-spacing: 1px;
  text-align: right;
}

.fake-date-input {
  position: relative;
  display: inline-block;
  width: 180px;
}

.fake-date-input input[type="text"] {
  width: 100%;
  padding: 8px 30px 8px 12px;
  font-size: 16px;
  box-sizing: border-box;
}

.fake-date-input .calendar-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #666;
}

.fake-date-input input[type="date"] {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: auto;
}

.btn-oval {
  border-radius: 50px;   /* 大圓角 */
  padding: 10px 40px;    /* 上下 10px，左右 40px */
  min-width: 120px;      /* 最小寬度 */
}
</style>
