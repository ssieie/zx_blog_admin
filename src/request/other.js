import { request } from "@/request/request";

export function getHomeInfo(data) {
  return request({
    url: "/homeInfo",
    method: "POST",
    data
  });
}

export function getWeather(data) {
  return request({
    url: "getWeather",
    method: "POST",
    data
  });
}
