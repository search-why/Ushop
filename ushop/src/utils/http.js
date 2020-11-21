import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { errorAlert } from "./alert"
import store from '../store'

//开发环境使用 8080
let urlBase = "/why";
Vue.prototype.$imgPre="http://localhost:3000"
//生产环境使用 打包
// let urlBase = ''
// Vue.prototype.$imgPre=""

// 请求拦截
axios.interceptors.request.use(req => {
    if (req.url != urlBase + '/api/userlogin') {
        req.headers.authorization = store.state.userInfo.token;
    }
    return req
})

// 响应拦截
axios.interceptors.response.use(res => {
    console.log("本次请求的地址是：" + res.config.url);
    console.log(res);
    if (res.data.code != 200) {
        errorAlert(res.data.msg)
    }
    if(res.data.msg==="登录已过期或访问权限受限"){//掉线了
        //清除登录信息
        store.dispatch("changeUser",{})
        //跳转到登录页
        router.push("/login")
    }
    return res
})

// ==============菜单操作================
// 菜单添加
export const reqMenuAdd = (form) => {
    return axios({
        url: urlBase + '/api/menuadd',
        method: 'post',
        data: qs.stringify(form)
    })
}

// 获取菜单列表
export const reqMenuList = () => {
    return axios({
        url: urlBase + '/api/menulist',
        method: 'get',
        params: {
            istree: true
        }
    })
}

// 删除菜单
export const reqMenuDel = (id) => {
    return axios({
        url: urlBase + '/api/menudelete',
        method: 'post',
        data: qs.stringify({
            id: id
        })
    })
}

// 获取一条数据
export const reqMenuDetail = (id) => {
    return axios({
        url: urlBase + '/api/menuinfo',
        method: "get",
        params: {
            id: id
        }
    })
}

// 修改菜单
export const reqMenuUpdate = (form) => {
    return axios({
        url: urlBase + '/api/menuedit',
        method: 'post',
        data: qs.stringify(form)
    })
}


// ==============角色操作================
// 角色添加
export const reqRoleAdd = (user) => {
    return axios({
        url: urlBase + '/api/roleadd',
        method: 'post',
        data: qs.stringify(user)
    })
}

// 角色列表
export const reqRoleList = () => {
    return axios({
        url: urlBase + '/api/rolelist',
        method: 'get',
    })
}

// 删除角色
export const reqRoleDel = (id) => {
    return axios({
        url: urlBase + '/api/roledelete',
        method: 'post',
        data: qs.stringify({
            id: id
        })
    })
}

// 获取编辑角色
export const reqRoleDetail = id => {
    return axios({
        url: urlBase + '/api/roleinfo',
        get: 'post',
        params: {
            id: id
        }
    })
}

// 修改角色
export const reqRoleUpdate = user => {
    return axios({
        url: urlBase + '/api/roleedit',
        method: 'post',
        data: qs.stringify(user)
    })
}


// ==============管理员操作================
// 添加管理员
export const reqUserAdd = (user) => {
    return axios({
        url: urlBase + '/api/useradd',
        method: 'post',
        data: qs.stringify(user)
    })
}

// 管理员交互
export const reqUserList = (pagination) => {
    return axios({
        url: urlBase + '/api/userlist',
        method: 'get',
        params: pagination
    })
}

// 管理员总数
export const reqUserCount = () => {
    return axios({
        url: urlBase + '/api/usercount',
        method: 'get'
    })
}

// 获取一条管理员数据
export const reqUserDetail = (uid) => {
    return axios({
        url: urlBase + '/api/userinfo',
        method: "get",
        params: {
            uid: uid
        }
    })
}

// 管理员修改
export const reqUserUpdate = user => {
    return axios({
        url: urlBase + '/api/useredit',
        method: "post",
        data: qs.stringify(user)
    })
}


// 管理员删除
export const reqUserDel = uid => {
    return axios({
        url: urlBase + '/api/userdelete',
        method: 'post',
        data: qs.stringify({
            uid: uid
        })
    })
}

// ==============登录操作================
// 登录
export const reqLogin = (user) => {
    return axios({
        url: urlBase + '/api/userlogin',
        method: "post",
        data: qs.stringify(user)
    })
}


// ==============商品分类操作================
// 商品分类列表
// 列表 p={istree:true}  p={pid:1}
export const reqCateList = (p) => {
    return axios({
        url: urlBase + "/api/catelist",
        method: "get",
        params: p
    })
}

// 分类添加
export const reqCateAdd = (cate) => {
    let d=new FormData()
    for(let i in cate){
        d.append(i,cate[i])
    }
    return axios({
        url: urlBase + '/api/cateadd',
        method: "post",
        data: d
    })
}

// 分类删除
export const reqCateDel = (id) =>{
    return axios({
        url: urlBase + '/api/catedelete',
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 获取一条分类数据
export const reqCateDetail = (id) => {
    return axios({
        url: urlBase + '/api/cateinfo',
        method: "get",
        params: {
            id: id
        }
    })
}

// 分类编辑
export const reqCateEdit = (cate) => {
    let d=new FormData()
    for(let i in cate){
        d.append(i,cate[i])
    }
    return axios({
        url: urlBase + "/api/cateedit",
        method: "post",
        data: d 
    })
}

// ==============商品规格操作================
// 规格添加
export const reqSpecsAdd = (specs) => {
    return axios({
        url: urlBase + '/api/specsadd',
        method: "post",
        data: qs.stringify(specs)
    })
}

// 获取规格列表
export const reqSpecsList = (p) => {
    return axios({
        url: urlBase + '/api/specslist',
        method: "get",
        params: p
    })
}

// 获取一条规格
export const reqSpecsDetail = (id) => {
    return axios({
        url: urlBase + '/api/specsinfo',
        method: "get",
        params: {
            id: id
        }
    })
}


// 修改商品规格
export const reqSpecsUpdate = (specs) => {
    return axios({
        url: urlBase + '/api/specsedit',
        method: "post",
        data: qs.stringify(specs)
    })
}

// 获取商品规格总数
export const reqSpecsCount = () => {
    return axios({
        url: urlBase + '/api/specscount',
        method: "get"
    })
}


// 删除规格
export const reqSpecsDel = (id) => {
    return axios({
        url: urlBase + '/api/specsdelete',
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}


// ==============商品管理操作================
// 商品添加
export const reqGoodsAdd = (goods) => {
    let d=new FormData()
    for(let i in goods){
        d.append(i,goods[i])
    }
    return axios({
        url: urlBase + '/api/goodsadd',
        method: 'post',
        data: d
    })
}


// 商品列表
// p = {size:查询条数 page:页码数 fid:一级分类id sid:二级分类id }
export const reqGoodsList = (p) => {
    return axios({
        url: urlBase + "/api/goodslist",
        method: "get",
        params: p
    })
}

// 获取所有商品总数
export const reqGoodsCount = () => {
    return axios({
        url: urlBase + "/api/goodscount",
        method: "get"
    })
}

// 获取一条商品数据
export const reqGoodsDetail = (id) => {
    return axios({
        url: urlBase + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 修改商品数据
export const reqGoodsUpdate = (goods) => {
    let d=new FormData()
    for(let i in goods){
        d.append(i,goods[i])
    }
    return axios({
        url: urlBase + '/api/goodsedit',
        method: "post",
        data: d
    })
}

// 商品删除
export const reqGoodsDel = (id) => {
    return axios({
        url: urlBase + '/api/goodsdelete',
        method: "POST",
        data: qs.stringify({
            id: id
        })
    })
}

// ==============会员管理操作================
// 会员列表
export const reqVipList = () => {
    return axios({
        url: urlBase + '/api/memberlist',
        method: "get"
    })
}

// 获取一条会员数据
export const reqVipDetail = (uid) => {
    return axios({
        url: urlBase + '/api/memberinfo',
        method: "get",
        params: {
            uid: uid
        }
    })
}

// 修改会员数据
export const reqVipUpdate = (vip) => {
    return axios({
        url: urlBase + '/api/memberedit',
        method: "post",
        data: qs.stringify(vip)
    })
}

// ==============轮播图管理操作================
// 轮播图添加
export const reqBannerAdd = (form) => {
    let d=new FormData()
    for(let i in form){
        d.append(i,form[i])
    }
    return axios({
        url: urlBase + '/api/banneradd',
        method: 'post',
        data: d
    })
}


// 轮播图列表
export const reqBannerList = () => {
    return axios({
        url: urlBase + '/api/bannerlist',
        method: 'get'
    })
}

// 获取一条轮播图数据
export const reqBannerDetail = (id) => {
    return axios({
        url: urlBase + '/api/bannerinfo',
        method: "get",
        params: {
            id: id
        }
    })
}

// 修改轮播图数据
export const reqBannerUpdate = (form) => {
    let d=new FormData()
    for(let i in form){
        d.append(i,form[i])
    }
    return axios({
        url: urlBase + '/api/banneredit',
        method: 'post',
        data: d
    })
}


// 删除轮播图
export const reqBannerDel = (id) => {
    return axios({
        url: urlBase + '/api/bannerdelete',
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}


// ==============秒杀管理操作================
// 添加秒杀活动
export const reqSeckillAdd = (form) => {
    return axios({
        url: urlBase + '/api/seckadd',
        method: "post",
        data: qs.stringify(form)
    })
}

// 获取秒杀列表
export const reqSeckillList = () => {
    return axios({
        url: urlBase + '/api/secklist',
        method: "get"
    })
}

// 获取一条秒杀列表
export const reqSeckillDetail = (id) => {
    return axios({
        url: urlBase + '/api/seckinfo',
        method: "GET",
        params: {
            id: id
        }
    })
}


// 修改秒杀活动
export const reqSeckillUpdate = (form) => {
    return axios({
        url: urlBase + '/api/seckedit',
        method: "post",
        data: qs.stringify(form)
    })
}

// 删除秒杀活动
export const reqSeckillDel = (id) => {
    return axios({
        url: urlBase + '/api/seckdelete',
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}