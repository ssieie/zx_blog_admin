import { request } from "@/request/request";

export function adminLogin(data) {
  return  request({
    url: "/adminLogin",
    method: "POST",
    data
  });
}
