<template>
  <div class="wrap">
    <!-- Header -->
    <HeaderComponent />

    <!-- Content -->
    <div class="content">
      <div class="container">
        <div class="row">
          <!-- 側邊欄 -->
          <div class="sidebar col-md-3 col-lg-2">
            <div class="sidebar-content">
              <img class="headimg" :src="userStore.userPicture" alt="頭像" />
              <div class="name">{{ user.name }}</div>
              <div
                class="sidebaritem"
                :class="{ active: currentTab === tab }"
                v-for="tab in tabs"
                :key="tab"
                @click="currentTab = tab"
              >
                <i :class="icons[tab] + ' me-2'"></i>{{ tab }}
              </div>
            </div>
          </div>

          <!-- 主要內容 -->
          <div class="col-md-9 col-lg-10">
            <div class="title"><i class="bi bi-person-circle me-2"></i>會員中心</div>

            <!-- 會員資訊表單 -->
            <form v-if="currentTab === '會員資訊'" id="userinfo" @submit.prevent>
              <div class="form-title"><i class="bi bi-person-vcard me-2"></i>會員資訊</div>
              <div class="form-group">
                <label for="name" class="form-label">姓名</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="user.name"
                  :disabled="!isEditable.name"
                />
                <span class="edit-icon" @click="toggleEdit('name')"
                  ><i class="bi bi-pencil-square"></i
                ></span>
              </div>
              <div class="form-group">
                <label for="email" class="form-label">信箱</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="user.email"
                  disabled="false"
                />
              </div>
              <div class="form-group" v-for="(pref, idx) in preferences" :key="idx">
                <label :for="'preference' + (idx + 1)" class="form-label">{{ pref.label }}</label>
                <select
                  class="form-select"
                  :id="'preference' + (idx + 1)"
                  v-model="user[pref.model]"
                >
                  <option
                    v-for="opt in options"
                    :key="opt"
                    :value="opt"
                    :disabled="isOptionDisabled(opt, pref.model)"
                  >
                    {{ opt }}
                  </option>
                </select>
              </div>
              <div class="btn_saveBtn">
                <button type="button" class="btn btn-primary save-button" @click="updateUserInfo">
                  <i class="bi bi-check-circle me-2"></i>儲存設定
                </button>
              </div>
            </form>

            <!-- 修改密碼表單 -->
            <form v-if="currentTab === '會員資訊'" id="password">
              <div class="form-title"><i class="bi bi-shield-lock me-2"></i>密碼管理</div>
              <div class="password-container">
                <div class="password-inputs">
                  <div class="form-group">
                    <input
                      type="password"
                      v-model="password.current"
                      class="form-control password-input"
                      id="currentPassword"
                      placeholder="請輸入舊密碼"
                    />
                  </div>
                  <div class="form-group">
                    <div class="password-input-group">
                      <input
                        :type="passwordVisible.new ? 'text' : 'password'"
                        :disabled="!isEditable.new"
                        v-model="password.new.value"
                        class="form-control password-input"
                        id="newPassword"
                        placeholder="請輸入新密碼"
                      />
                      <span class="password-toggle" @click="togglePassword('new')">
                        <i :class="passwordVisible.new ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                      </span>
                      <span class="edit-icon pw-edit-icon" @click="toggleEdit('new')"
                        ><i class="bi bi-pencil-square"></i
                      ></span>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="password-input-group">
                      <input
                        :type="passwordVisible.confirm ? 'text' : 'password'"
                        :disabled="!isEditable.confirm"
                        v-model="password.new.confirm"
                        class="form-control password-input"
                        id="confirmNewPassword"
                        placeholder="再次輸入新密碼"
                      />
                      <span class="password-toggle" @click="togglePassword('confirm')">
                        <i :class="passwordVisible.confirm ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                      </span>
                      <span class="edit-icon pw-edit-icon" @click="toggleEdit('confirm')"
                        ><i class="bi bi-pencil-square"></i
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn_saveBtn">
                <button
                  type="button"
                  class="btn btn-primary save-button"
                  @click="updateUserPassword"
                >
                  <i class="bi bi-check-circle me-2"></i>更新密碼
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script setup>
import { userStore } from '@/stores/userStore.js';
</script>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import * as func from '@/utils/function.js';
import * as api from '@/utils/api.js';
import Swal from 'sweetalert2';

export default {
  name: 'userprofilePage',
  components: { HeaderComponent, FooterComponent },
  data() {
    return {
      isEditable: {
        name: false,
        new: false,
        confirm: false,
      },
      currentTab: '會員資訊',
      tabs: ['會員資訊', '會員等級', '個人偏好設定', '個人訂單查看'],
      icons: {
        會員資訊: 'bi bi-person-vcard',
        會員等級: 'bi bi-trophy',
        個人偏好設定: 'bi bi-gear',
        個人訂單查看: 'bi bi-cart-check',
        密碼管理: 'bi bi-shield-lock',
      },
      user: {
        name: '',
        email: '',
        preference1: '',
        preference2: '',
        preference3: '',
      },
      preferences: [
        { label: '個人偏好', model: 'preference1' },
        { label: '次要偏好', model: 'preference2' },
        { label: '第三偏好', model: 'preference3' },
      ],
      options: [
        '探索冒險',
        '放鬆療癒',
        '文化體驗',
        '美食探索',
        '都市感官',
        '自然療癒',
        '親子家庭',
        '拍照打卡',
        '懶人輕鬆',
        '特殊主題',
      ],
      password: {
        current: '',
        new: {
          value: '',
          confirm: '',
        },
      },
      passwordVisible: {
        new: false,
        confirm: false,
      },
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    togglePassword(key) {
      this.passwordVisible[key] = !this.passwordVisible[key];
    },

    toggleEdit(key) {
      this.isEditable[key] = !this.isEditable[key];
    },

    isOptionDisabled(option, currentModel) {
      const selected = [
        { key: 'preference1', val: this.user.preference1 },
        { key: 'preference2', val: this.user.preference2 },
        { key: 'preference3', val: this.user.preference3 },
      ];
      return selected.some((sel) => sel.key !== currentModel && sel.val === option);
    },

    async fetchUserInfo() {
      const data = await api.get_user_Profile();

      this.user = {
        name: data.data.user.name,
        email: data.data.user.email,
        preference1: data.data.user.preferences[0],
        preference2: data.data.user.preferences[1],
        preference3: data.data.user.preferences[2],
      };
    },

    async updateUserInfo() {
      const payload = {
        name: this.user.name,
        preference: [this.user.preference1, this.user.preference2, this.user.preference3],
      };
      await api.patch_user_Profile(payload);
      this.isEditable.name = false;
    },

    async updateUserPassword() {
      console.log(this.password.current);

      await api.post_user_resetProfilePW(
        this.password.current,
        this.password.new.value,
        this.password.new.confirm,
        () => {
          this.password.current = '';
          this.password.new.value = '';
          this.password.new.confirm = '';
          this.isEditable.password = false;
        }
      );

      this.isEditable.new = false;
      this.isEditable.confirm = false;
    },
  },
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');

@import '@/assets/css/common.css';
@import '/src/assets/css/common.css';

/* 全局樣式 */
:root {
  --primary-color: #c1e9dc;
  --secondary-color: #1cc88a;
  --background-color: #f8f9fc;
  --sidebar-bg: #c1e9dc;
  --sidebar-text: #fff;
  --form-bg: #fff;
  --border-radius: 0.5rem;
  --box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
}

body {
  font-family: 'Noto Sans TC', sans-serif;
  background-color: var(--background-color);
  color: #333;
  padding-top: 20px;
}

.container {
  padding: 2rem 0;
}

/* 側邊欄樣式 */
/*
.sidebar {
  background-color: #9dbeb3;
  color: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem 1rem;
  min-height: 100vh;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  position: relative;
  transition: all 0.3s;
}
  */

.sidebar-content {
  background-color: #ffffff;
  color: #5B5B5B;
  border-radius: 0.5rem;
  padding: 1rem 0.5rem 32px 0.5rem;

  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  transition: all 0.3s;
}

.headimg {
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 3px solid rgba(255, 255, 255, 0.5);
}

.name {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.sidebaritem {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: all 0.2s;
}

.sidebaritem:hover {
  background-color: #5B5B5B;
  color: #fff;
  transform: translateX(5px);
}

.sidebaritem.active {
  background-color: #ffffff;
  color: #5B5B5B;
  font-weight: 600;
}

/* 主要內容區域 */
.content {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem 2rem;
  padding-top: 100px;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #9dbeb3;
}

/* 表單樣式 */
#userinfo,
#password {
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
}

.form-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #9dbeb3;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.form-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-control,
.form-select {
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d3e2;
  transition: all 0.2s;
}

.form-control:focus,
.form-select:focus {
  border-color: #9dbeb3;
  box-shadow: 0 0 0 0.25rem rgba(78, 115, 223, 0.25);
}

select option:disabled {
  color: #d4d4d4 !important;
  background-color: #f8f9fa !important;
}

/* 編輯圖標 */
.edit-icon {
  position: absolute;
  right: 10px;
  top: calc(50% + 4px);
  color: #6c757d;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-icon:hover {
  color: #9dbeb3;
}

.pw-edit-icon {
  top: 8px;
}

/* 密碼區塊 */
.password-container {
  display: flex;
  margin-bottom: 1.5rem;
}

.password-label {
  font-weight: 500;
  width: 20%;
  padding-top: 0.5rem;
}

.password-inputs {
  width: 100%;
}

.password-input-group {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  cursor: pointer;
}

.password-toggle:hover {
  color: #9dbeb3;
}

/* 按鈕樣式 */
.btn_saveBtn {
  display: flex;
  justify-content: end;
}

.save-button {
  background-color: #9dbeb3;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 0.3rem;
  font-weight: 500;
  transition: all 0.3s;
}

.save-button:hover {
  background-color: #b1d6ca;
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

/* 響應式設計 */
@media (max-width: 992px) {
  .sidebar {
    min-height: auto;
    margin-bottom: 1.5rem;
  }

  .password-container {
    flex-direction: column;
  }

  .password-label,
  .password-inputs {
    width: 100%;
  }

  .password-label {
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }

  #userinfo,
  #password {
    padding: 1.5rem;
  }
}
</style>
