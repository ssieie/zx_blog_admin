import md5 from "js-md5";

export function getSignParam(data = {}) {
  if (typeof data === "string") {
    data = JSON.parse(data);
  }

  data.timestamp = Date.parse(new Date()) / 1000;
  let arr = [];
  for (let key in data) {
    arr.push(key);
  }
  arr.sort();
  let str = "key=wodekey&";
  for (let i in arr) {
    str += arr[i] + "=" + data[arr[i]] + "&";
  }

  str = str.substr(0, str.length - 1);

  data.sign = md5(str).toUpperCase();
  return data;
}
