<template>
  <aside class="bg-white p-4 rounded shadow-sm">
    <div v-for="filter in filters" :key="filter.id" class="mb-4">
      <label :for="filter.id" class="form-label fw-bold">{{ filter.label }}</label>
      <select :id="filter.id" class="form-select">
        <option v-for="option in filter.options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label class="form-label fw-bold">購買金額</label>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="最小金額" />
        <span class="input-group-text">~</span>
        <input type="text" class="form-control" placeholder="最大金額" />
      </div>
      <button class="btn btn-outline-secondary w-100 mt-2">清除金額</button>
    </div>

    <div class="mb-4">
      <label class="form-label fw-bold">選擇日期</label>
      <div class="input-group">
        <input type="date" class="form-control" />
        <span class="input-group-text">~</span>
        <input type="date" class="form-control" />
      </div>
    </div>

    <div class="mb-4">
      <label class="form-label fw-bold">選擇天數</label>
      <input type="number" class="form-control" placeholder="天數" />
    </div>

    <div class="mb-4">
      <label class="form-label fw-bold">關鍵字</label>
      <input type="text" class="form-control" placeholder="請輸入關鍵字" />
    </div>

    <button class="btn btn-primary w-100">搜尋</button>
  </aside>
</template>

<script>
export default {
  name: 'SidebarFilters',
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
      ]
    };
  }
};
</script>
