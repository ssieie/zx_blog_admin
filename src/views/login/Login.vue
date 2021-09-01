<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">我的后台</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="用户名">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="param.password"
                    @keyup.enter="submitForm()">
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { adminLogin } from "@/request/user";

export default {
  setup() {
    const router = useRouter();
    const param = reactive({
      username: "admin",
      password: "123123"
    });
    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur"
        }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" }
      ]
    };
    const login = ref(null);
    const submitForm = () => {
      login.value.validate((valid) => {
        if (valid) {
          adminLogin({ ...param }).then(res => {
            console.log(res);
          });
          ElMessage.success("登录成功");
          window.sessionStorage.setItem("token", "hahah");
          // router.replace("/welcome");
        } else {
          ElMessage.error("登录成功");
          return false;
        }
      });
    };

    return {
      param,
      rules,
      login,
      submitForm
    };
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-image: url("../../assets/images/login-bg.jpg");
  background-repeat: no-repeat;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
</style>
