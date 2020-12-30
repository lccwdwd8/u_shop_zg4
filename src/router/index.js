import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import store from "../store"
function checkEnter(path, next) {
    if (store.state.userInfo.menus_url.includes(path)) {
        next()
    } else {
        next("/")
    }
}
export let indexRouters = [{
    path: "menu",
    component: () => import("../pages/menu/menu"),
    name: "菜单",
    beforeEnter(to, from, next) {
        checkEnter("/menu", next)
    }
},
{
    path: "role",
    component: () => import("../pages/role/role"),
    name: "角色",
    beforeEnter(to, from, next) {
        checkEnter("/role", next)
    }
},
{
    path: "manage",
    component: () => import("../pages/manage/manage"),
    name: "管理员管理",
    beforeEnter(to, from, next) {
        checkEnter("/manage", next)
    }
},
{
    path: "cate",
    component: () => import("../pages/cate/cate"),
    name: "商品分类",
    beforeEnter(to, from, next) {
        checkEnter("/cate", next)
    }
},
{
    path: "specs",
    component: () => import("../pages/specs/specs"),
    name: "商品规格",
    beforeEnter(to, from, next) {
        checkEnter("/specs", next)
    }
},
{
    path: "goods",
    component: () => import("../pages/goods/goods"),
    name: "商品管理",
    beforeEnter(to, from, next) {
        checkEnter("/goods", next)
    }
},
{
    path: "member",
    component: () => import("../pages/member/member"),
    name: "会员",
    beforeEnter(to, from, next) {
        checkEnter("/member", next)
    }
},
{
    path: "banner",
    component: () => import("../pages/banner/banner"),
    name: "轮播图",
    beforeEnter(to, from, next) {
        checkEnter("/banner", next)
    }
},
{
    path: "speckill",
    component: () => import("../pages/speckill/speckill"),
    name: "秒杀",
    beforeEnter(to, from, next) {
        checkEnter("/speckill", next)
    }
},]

let router = new Router({
    routes: [
        {
            path: "/login",
            component: () => import("../pages/login/login")
        },
        {
            path: "/",
            component: () => import("../pages/index/index"),
            children: [
                {
                    path: "",
                    component: () => import("../pages/home/home")
                },

            ].concat(indexRouters)
        },

    ]
})


router.beforeEach((to, from, next) => {
    if (to.path === "/login") {
        next()
        return
    }
    if (store.state.userInfo.id) {
        next()
        return
    }
    next("/login")
})


export default router