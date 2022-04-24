//由于vuex不能持久化保存数据，所以需要将token保存在本地中

export const setToken=(token)=>{
    localStorage.setItem("TOKEN",token)
}
export const getToken=()=>{
    return localStorage.getItem("TOKEN")
}
// 退出登录需要移除token
export const removeToken=()=>{
    localStorage.removeItem("TOKEN")
}