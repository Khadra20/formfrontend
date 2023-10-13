

import { api } from "../../../../Api/config"
export const Getsubjects=async()=>{
    return await api.get("/subject")
}
export const Getbyid=async(id)=>{
    return await api.get(`/subject/${id}`)
}
export const postsubject=async(data)=>{
    return await api.post("/subject",data)
}
export const puclaient=async(id,data)=>{
    return await api.put(`/subject/${id}`,data)
}
export const delets=async(id)=>{
    return await api.delete(`/subject/${id}`)
}