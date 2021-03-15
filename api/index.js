import { request } from "@/plugins/request"

export const apiLogin = (data) => request({
  method: "post",
  url: "/api/users/login",
  data
})


export const apiRegister = (data) => request({
  method: "post",
  url: "/api/users",
  data
})

