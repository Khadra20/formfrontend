import { api }  from '../../../../Api/config'
export const Getuser=async()=>{
    return await api.get("/user")
}
export const Getbyid=async(id)=>{
    return await api.get(`/user/${id}`)
}
export const postuser=async(data)=>{
    return await api.post("/user",data)
}
export const putuser=async(id,data)=>{
    return await api.put(`/user/${id}`,data)
}
export const deleluser=async(id)=>{
    return await api.delete(`/user/${id}`)
}