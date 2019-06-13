import Vue from 'vue'
import App from './App.vue'
import store from './store'

// 页面路径；
import Login from './pages/Login.vue'
import Admin from './pages/Admin.vue'
import GoodsList from './pages/GoodsList.vue'
import CategoryList from './pages/CategoryList.vue'
import GoodsAdd from './pages/GoodsAdd.vue'
import GoodsEdit from './pages/GoodsEdit.vue'

// 组件模块；
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import axios from "axios"
import VueRouter from "vue-router"
// 注册组件模块；
Vue.use(Element)
Vue.use(VueRouter)
// 原型继承；
Vue.prototype.$axios = axios;

Vue.config.productionTip = false


// 配置路由；
const routes = [
  {
    path:"/",
    redirect: "/admin/goods-list"
  },
  {
    path:"/login",
    component: Login,
    meta:"登录"
  },
  {
    path:"/admin",
    component: Admin,
    meta:"后台管理",
    children: [
      {
        path:"goods-list",
        component: GoodsList,
        meta:"商品列表"
      },
      {
        path:"category-list",
        component: CategoryList,
        meta:"栏目列表"
      },
      {
        path:"goods-add",
        component: GoodsAdd,
        meta:"商品添加"
      },
      {
        path:"goods-edit/:id",
        component: GoodsEdit,
        meta:"商品编辑"
      },
    ]
  }
]

const router = new VueRouter({routes});

router.beforeEach((to,from,next)=>{
  axios({
    url: "http://localhost:8899/admin/account/islogin",
    method:"GET",
    withCredentials: true
  }).then(res=>{
    const {code} = res.data;
    if(to.path === '/login'){
      if (code === 'logined'){
        next("/admin/goods-list")
      }else {
        next();
      }
    }else {
      if (code === 'logined'){
        next()
      }else {
        next("/login");
      }
    }
  })
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')