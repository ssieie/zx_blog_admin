import axios from "axios";
import { ElMessage } from "element-plus";
import { getSignParam } from "@/utils/utils";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:9999",
    // baseURL: "http://47.109.17.168:9999",
    timeout: 10000
  });

  instance.interceptors.request.use((config) => {
    config.data = getSignParam(config.data)
    return config;
  });

  instance.interceptors.response.use((res) => {
    if (res.status === 200) {
      console.log(res.data);
      return res.data;
    } else {
      ElMessage({
        showClose: true,
        message: "发生了错误",
        type: "error"
      });
      return {
        code: 1,
        message: "发生了错误"
      };
    }
  });

  return instance(config);
}
