import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import * as api from '../utils/api';
import { userStore } from '../stores/userStore';

const requireAuth = async (to, from, next) => {
  const res = await api.get_user_status();
  console.log(res);
  if (res.isLoggedIn) {
    userStore.isLoggedIn = true; // 更新 store 狀態
    next();
  } else {
    next('/admin/login');
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { breadcrumb: '首頁' },
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('../views/HomeView.vue'),
          meta: { breadcrumb: '首頁' },
        },
        // {
        //   path: 'shopping',
        //   name: 'shopping',
        //   component: () => import('../views/front/shopping.vue'),
        //   meta: { breadcrumb: '購物專區' },
        // },
        {
          path: 'search',
          name: 'search',
          component: () => import('../views/front/searchPage.vue'),
          meta: { breadcrumb: '搜尋頁面' },
        },
      ],
    },
    {
      path: '/admin',
      name: 'member',
      component: () => import('../views/admin/memberPage.vue'),
      meta: { breadcrumb: '會員功能' },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/admin/loginPage.vue'),
          meta: { breadcrumb: '登入' },
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/admin/registerPage.vue'),
          meta: { breadcrumb: '註冊' },
        },
        {
          path: 'forgotpw',
          name: 'forgotpw',
          component: () => import('../views/admin/forgotpwPage.vue'),
          meta: { breadcrumb: '忘記密碼' },
        },
        {
          path: 'userprofile',
          name: 'userprofile',
          component: () => import('../views/admin/userprofilePage.vue'),
          meta: { breadcrumb: '個人會員' },
          beforeEnter: requireAuth,
        },
        {
          path: 'resetpw',
          name: 'resetpw',
          component: () => import('../views/admin/resetpwPage.vue'),
          meta: { breadcrumb: '會員資料' },
        },
        {
          path: 'collect',
          name: 'collect',
          component: () => import('../views/admin/collectPage.vue'),
          meta: { breadcrumb: '收藏' },
        },
        {
          path: 'personalOrder',
          name: 'personalOrder',
          component: () => import('../views/admin/personalOrder.vue'),
          meta: { breadcrumb: '個人旅遊訂單' },
        },
        {
          path: 'manage',
          meta: { breadcrumb: '管理者中心' },
          children: [
            {
              path: 'website',
              name: 'website',
              component: () => import('../views/admin/manage/websiteSetting.vue'),
              meta: { breadcrumb: '網站管理' },
            },
            {
              path: 'dashboard',
              name: 'dashboard',
              component: () => import('../views/admin/manage/dashboardPage.vue'),
              meta: { breadcrumb: '儀表板分析' },
            },
            {
              path: 'role',
              name: 'role',
              component: () => import('../views/admin/manage/roleSetting.vue'),
              meta: { breadcrumb: '權限設定' },
            },
            {
              path: 'service',
              name: 'service',
              component: () => import('../views/admin/manage/serviceSetting.vue'),
              meta: { breadcrumb: '客服' },
            },
            {
              path: 'automatic',
              name: 'automatic',
              component: () => import('../views/admin/manage/automaticSetting.vue'),
              meta: { breadcrumb: '自動化設定' },
            },
          ],
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { breadcrumb: '關於我們' },
    },
  ],
})


router.beforeEach(async (to, from, next) => {
  const authPages = ['/admin/login', '/admin/register', '/admin/forgotpw', '/admin/resetpw'];

  if (authPages.includes(to.path) && localStorage.getItem('authToken')) {
    const result = await api.get_user_status();

    if (result.isLoggedIn) {
      return next('/admin/userprofile');
    }
  }

  return next();
});

export default router;
