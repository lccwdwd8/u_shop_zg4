import axios from "axios"
import qs from "qs"
import Vue from "vue"
import { warnalert } from "./alert";
// 开发环境
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

import store from "../store"
import router from "../router";
//生产环境
// let baseUrl = ""
// Vue.prototype.$pre = ""


axios.interceptors.request.use(config => {
    if (config.url !== baseUrl + "/api/userlogin") {
        config.headers.authorization = store.state.userInfo.token
    }
    return config
})

axios.interceptors.response.use(res => {
    console.group("本次请求的地址是" + res.config.url)
    console.log(res)
    console.groupEnd()
    if (res.data.code !== 200) {
        warnalert(res.data.msg)
    }
    if (!res.data.list) {
        res.data.list = []
    }
    if(res.data.msg==="登录已过期或访问受限"){
        store.dispatch("changeUser",{})

        router.push("/login")
    }
    return res
})



function dataToFormData(user) {
    let data = new FormData()
    for (let i in user) {
        data.append(i, user[i])
    }
    return data
}

export const reqUserLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(user)
    })
}

//Start-------------菜单管理--------Start---------
//添加列表
export const reqMenuAdd = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })
}
//请求列表
export const reqMenuList = (user) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}

//删除数据

export const reqMenuDel = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

//获取一条数据
export const reqMenuDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        methods: "get",
        params: obj
    })
}

//重新编辑菜单
export const initMenuList = (obj) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: obj
    })
}
//End-------------菜单管理---------End--------


//role -----------角色管理----------

//添加
export const reqRoleAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(obj)
    })
}

//请求
export const reqRolelist = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
    })
}

//一条
export const reqRoleinfo = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: id
    })
}

//编辑
export const reqRoleedit = (obj) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: obj
    })
}

//删除
export const reqRoledel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(id)
    })
}
//End-----角色管理-----End


//manage ------ 管理员管理---------
//管理添加
export let reqUserAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(obj)
    })
}
//管理总数
export let reqUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
    })
}

//管理列表
export let reqUserList = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: obj
    })
}

//获取一条数据(管理员)
// id {uid:32134212}
export let reqUserInfo = (id) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: id
    })
}

//修改数据(管理员)
export let reqUseradit = (obj) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(obj)
    })
}

//删除
export let reqManageDel = (user) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//-----------------------------


//--------商品分类------------
//添加
export let reqcateadd = (user) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表
// {istree:true}
export let reqcatelist = (obj) => {
    return axios({
        url: baseUrl + "/api/catelist",
        params: obj
    })
}

// 一条
export let reqcatedetail = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: id
    })
}


//修改 
export let reqcateedit = (obj) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: dataToFormData(obj)
    })
}

// 删除
export let reqcatedel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(id)
    })
}
//End


//轮播图 开始
//轮播图添加
export let reqbanneradd = (user) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: dataToFormData(user)
    })
}
//；轮播图列表
export let reqbannerlist = (user) => {
    return axios({
        url: baseUrl + "/api/bannerlist",
    })
}

//获取一条
// {id:id}
export let reqbannerinfo = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        params: id
    })
}

//修改轮播图
export let reqbanneredit = (user) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: dataToFormData(user)
    })
}

//轮播图删除
export let reqbannerdel = (user) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//lunbotu End



//会员开始
//会员列表
export let reqmemlist = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
    })
}

//获取一条
export let reqmemeinfo = (obj) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: obj
    })
}
//修改
export let reqmemeedit = (obj) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(obj)
    })
}

//商品规格
/************商品规格管理 start**************************/

//添加 user={img:File,catename:"12",pid:1}
export let reqspecsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 p={page:1,size:500}
export let reqspecslist = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        params: p
    })
}

//详情 user={id:1}
export let reqspecsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,specsname:""}
export let reqspecsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={id:1}
export let reqspecsDel = (user) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqspecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount"
    })
}

/************商品规格管理 end**************************/

/************商品管理 start**************************/

//添加 user={}
export let reqgoodsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 p={page:1,size:500}
export let reqgoodslist = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        params: p
    })
}

//详情 user={id:1}
export let reqgoodsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,goodsname:""}
export let reqgoodsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqgoodsDel = (user) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqgoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount"
    })
}

/************商品管理 end**************************/

// 秒杀

export let speckilladd = (obj) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(obj)
    })
}

export let specklist = () => {
    return axios({
        url: baseUrl + "/api/secklist",
    })
}
// {id:id}
export let speckinfo = (id) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        params: id
    })
}

export let speckedit = (obj) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(obj)
    })
}


export let speckdel = (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify(id)
    })
}

