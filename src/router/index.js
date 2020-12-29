import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export let indexRouters = [{
    path: "menu",
    component: () => import("../pages/menu/menu"),
    name: "菜单"
},
{
    path: "role",
    component: () => import("../pages/role/role"),
    name: "角色"
},
{
    path: "manage",
    component: () => import("../pages/manage/manage"),
    name: "管理员管理"
},
{
    path: "cate",
    component: () => import("../pages/cate/cate"),
    name: "商品分类"
},
{
    path: "specs",
    component: () => import("../pages/specs/specs"),
    name: "商品规格"
},
{
    path: "goods",
    component: () => import("../pages/goods/goods"),
    name: "商品管理"
},
{
    path: "member",
    component: () => import("../pages/member/member"),
    name: "会员"
},
{
    path: "banner",
    component: () => import("../pages/banner/banner"),
    name: "轮播图"
},
{
    path: "speckill",
    component: () => import("../pages/speckill/speckill"),
    name: "秒杀"
},]

export default new Router({
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
