<template>
  <el-container>
    <el-header>
      <div class="fl-b">
        <div>BLOG Manage</div>
        <div class="fl-c banner-info">
          <div>上次登录地点：<span>{{ loginInfo ? loginInfo.last_address : "***" }}
            {{ weatherAddress ? weatherAddress.name : "" }}</span></div>
          <div>上次登录时间：<span>{{ loginInfo ? loginInfo.last_time : "***" }}</span></div>
          <div class="weather-icon" @mouseenter="weatherCardShow=true" @mouseleave="weatherCardShow=false">
            <el-button :icon="getWeatherType()" size="small" circle></el-button>
            <el-card :class="{'weather-card-ac':weatherCardShow}">
              <div style="margin: 0;height: 45px;" class="fl-c">
                <span>当前温度：<span>{{ weatherNow ? weatherNow.temp + "℃" : "--" }}</span></span>&nbsp;&nbsp;&nbsp;
                <span>体感温度：<span>{{ weatherNow ? weatherNow.feels_like + "℃" : "--" }}</span></span>
              </div>
              <div style="margin: 0;height: 45px;" class="fl-c">
                <span>当前天气：<span>{{ weatherNow ? weatherNow.text : "--" }}</span></span>&nbsp;&nbsp;&nbsp;
                <span>相对湿度：<span>{{ weatherNow ? weatherNow.rh + "%" : "--" }}</span></span>
              </div>
              <div style="margin: 0;height: 45px;" class="fl-c">
                <span>风力等级：<span>{{ weatherNow ? weatherNow.wind_class : "--" }}</span></span>&nbsp;&nbsp;&nbsp;
                <span>风向描述：<span>{{ weatherNow ? weatherNow.wind_dir : "--" }}</span></span>
              </div>
              <div style="margin: 0;height: 45px;" class="fl-c">
                <span>最后更新时间：<span>{{ weatherNow ? getEndTime(weatherNow.uptime) : "--" }}</span></span>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="210px">
        <el-menu
          :uniqueOpened="true"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          router
          active-text-color="#ffd04b"
          :default-active="activePath">
          <el-sub-menu index="1">
            <template #title>
              <i style="color: #ffffff" class="el-icon-setting"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/write" @click="saveNavState('/write')">
              <i class="el-icon-edit"></i>
              <span>增加新的</span>
            </el-menu-item>
            <el-menu-item index="/edit" @click="saveNavState('/edit')">
              <i class="el-icon-edit-outline"></i>
              <span>修改已有</span>
            </el-menu-item>
            <el-menu-item index="/categroy" @click="saveNavState('/categroy')">
              <i class="el-icon-s-operation"></i>
              <span>分类管理</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <i style="color: #ffffff" class="el-icon-setting"></i>
              <span>选项XX2</span>
            </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <i style="color: #ffffff" class="el-icon-setting"></i>
              <span>选项XX3</span>
            </template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive include="WriteArticle">
              <component :is="Component"></component>
            </keep-alive>
          </router-view>
        </el-main>
        <el-footer>
          <i class="el-icon-lollipop"></i>
          <span>&nbsp;&nbsp;i&nbsp;ZhaoXin</span>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { getHomeInfo, getWeather } from "@/request/other";
import { ElMessage } from "element-plus";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      activePath: "",
      loginInfo: null,
      weatherIcon: {
        lightRain: "el-icon-light-rain", // 小雨
        lightning: "el-icon-lightning", // 雷阵雨
        heavyRain: "el-icon-heavy-rain", // 大雨
        sunny: "el-icon-sunny", // 晴天
        cloudy: "el-icon-cloudy", // 多云
        cloudyAndSunny: "el-icon-cloudy-and-sunny", // 晴转多云
        unKnow: "el-icon-loading"
      },
      weatherAddress: null,
      weatherNow: null,
      weatherCardShow: false
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
    this.getViewInfo();
  },
  methods: {
    getViewInfo() {
      getHomeInfo({
        token: window.sessionStorage.getItem("token")
      }).then(res => {
        if (res.code === 0) {
          this.loginInfo = res.data;
          res.data.last_address_code && this.getViewWeather(res.data.last_address_code);
        } else {
          ElMessage.warning(res.message);
        }
      });
    },
    getViewWeather(code) {
      getWeather({
        code
      }).then(res => {
        if (res.status === 0) {
          this.weatherAddress = res.result.location;
          this.weatherNow = res.result.now;
        } else {
          ElMessage.warning(res.message);
        }
      });
    },
    getEndTime(time) {
      return time.slice(0, 4) + "年" + time.slice(4, 6) + "月" + time.slice(6, 8) + "日" + time.slice(8, 10) + "时" + time.slice(10, 12) + "分";
    },
    getWeatherType() {
      if (this.weatherNow) {
        switch (this.weatherNow.text) {
          case "阴":
            return this.weatherIcon.cloudy;
            break;
          case "晴":
            return this.weatherIcon.sunny;
            break;
          case "多云":
            return this.weatherIcon.cloudyAndSunny;
            break;
          default:
            return this.weatherIcon.unKnow;
        }
      } else {
        return this.weatherIcon.unKnow;
      }
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  }
};
</script>

<style scoped lang="scss">
.weather-icon {
  position: relative;

  .el-card {
    position: absolute;
    width: 340px;
    top: 55px;
    right: 0;
    z-index: -9;
    opacity: 0;
    transition: all .4s;

    span {
      color: #333;
      font-size: 14px;

      span {
        color: #4bbb07;
      }
    }
  }

  .weather-card-ac {
    z-index: 9999;
    opacity: 1;
  }
}

.el-header, .el-footer {
  background-color: #6d84a2;
  color: #ffffff;
  text-align: center;
  height: 60px;
  line-height: 60px;
}

.el-aside {
  //background-color: #545c64;
  text-align: center;
  line-height: 200px;

  .el-menu {
    height: 100%;

    .el-menu-item {
      font-size: 10px;
      float: right;
    }
  }
}

.el-main {
  background-color: #ffffff;
  color: var(--el-text-color-primary);
  min-height: calc(100vh - 120px);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.banner-info {
  div {
    margin-left: 15px
  }

  span {
    color: #eee9e9;
  }
}
</style>
