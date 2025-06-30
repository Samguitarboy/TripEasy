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
        //首頁
        {
          path: '',
          name: 'index',
          component: () => import('../views/HomeView.vue'),
        },

        //產品細項頁面

        {
          path: 'tour',
          name: 'tour',
          component: () => import('../views/front/tourPage.vue'),
          meta: { title: '產品細項' }
        },

        //產品細項頁面(假資料)
        {
          path: 'tourfake',
          name: 'tourfake',
          component: () => import('../views/front/tourPageFake.vue'),
          meta: { title: '產品細項(假資料)' }
        },

        //搜索頁面
        /*{
          path: 'search',
          name: 'search',
          component: () => import('../views/front/searchPage.vue'),
          meta: { breadcrumb: '購物專區' },
        },*/
      ],
    },
    //會員功能
    {
      //會員中心(預設顯示會員資料)
      path: '/admin',
      name: 'member',
      component: () => import('../views/admin/memberPage.vue'),
      meta: { breadcrumb: '會員功能' },
      children: [
        //登入
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/admin/loginPage.vue'),
          meta: { breadcrumb: '登入' },
        },
        //註冊
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/admin/registerPage.vue'),
          meta: { breadcrumb: '註冊' },
        },
        //忘記密碼
        {
          path: 'forgotpw',
          name: 'forgotpw',
          component: () => import('../views/admin/forgotpwPage.vue'),
          meta: { breadcrumb: '忘記密碼' },
        },
        //個人會員
        {
          path: 'userprofile',
          name: 'userprofile',
          component: () => import('../views/admin/userprofilePage.vue'),
          meta: { breadcrumb: '會員資料' },
          beforeEnter: requireAuth,
        },
        //會員資料
        {
          path: 'resetpw',
          name: 'resetpw',
          component: () => import('../views/admin/resetpwPage.vue'),
          meta: { breadcrumb: '重設密碼' },
        },
        //收藏
        {
          path: 'collect',
          name: 'collect',
          component: () => import('../views/admin/collectPage.vue'),
          meta: { breadcrumb: '收藏' },
        },
        //個人旅遊訂單
        {
          path: 'personalOrder',
          name: 'personalOrder',
          component: () => import('../views/admin/personalOrder.vue'),
          meta: { breadcrumb: '個人旅遊訂單' },
        },
        //管理者中心(管理者功能)
        {
          path: 'manage',
          meta: { breadcrumb: '管理者中心' },
          children: [
            //網站管理
            {
              path: 'website',
              name: 'website',
              component: () => import('../views/admin/manage/websiteSetting.vue'),
              meta: { breadcrumb: '網站管理' },
            },
            //儀表板分析
            {
              path: 'dashboard',
              name: 'dashboard',
              component: () => import('../views/admin/manage/dashboardPage.vue'),
              meta: { breadcrumb: '儀表板分析' },
            },
            //權限設定
            {
              path: 'role',
              name: 'role',
              component: () => import('../views/admin/manage/roleSetting.vue'),
              meta: { breadcrumb: '權限設定' },
            },
            //客服
            {
              path: 'service',
              name: 'service',
              component: () => import('../views/admin/manage/serviceSetting.vue'),
              meta: { breadcrumb: '常見問題' },
            },
            //自動化設定
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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { breadcrumb: '關於我們' },
    },
    //搜索頁面
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/front/searchPage.vue'),
      meta: { breadcrumb: '購物專區' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 若使用瀏覽器的返回/前進按鈕，保留原來的位置
    if (savedPosition) {
      return savedPosition
    } else {
      // 否則捲動到最上面
      return { top: 0 }
    }
  }
});

router.beforeEach(async (to, from, next) => {
  const authPages = ['/admin/login', '/admin/register', '/admin/forgotpw', '/admin/resetpw'];

  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'TripEasy 旅遊電商';
  }

  if (authPages.includes(to.path) && localStorage.getItem('authToken')) {
    const result = await api.get_user_status();

    if (result.isLoggedIn) {
      return next('/admin/userprofile');
    }
  }

  return next();
});

export default router;
