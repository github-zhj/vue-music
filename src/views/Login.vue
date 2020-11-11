<template>
  <div class="wrapper">

    <div class="login-wrapper">
      <van-form @submit="onSubmit">
        <h2 class="login-title" v-if="1">登录页面</h2>
        <van-field v-model="LoginUsername" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写您的用户名' }]" autocomplete="off" />
        <van-field v-model="LoginPassword" :type="isRegisterPassword ? 'password' : 'text'" name="密码" label="密码"
          placeholder="密码" :rules="[{ required: true, message: '请填写您的密码' }]" autocomplete="off"
          :right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'" @click-right-icon="toggleRegsiterPasswordType" />

      </van-form>

      <div class="login-btn">
        <van-button @click="reg" color="#d43c33" round block type="info" native-type="submit">
          登陆
        </van-button>
        <br />
        <van-button @click="show=!show" style="margin-top:10px" color="#e3e3e3" round block type="info"
          native-type="submit">
          注册
        </van-button>
      </div>
      <van-popup v-model="show" closeable position="bottom" :style="{ height: '30%' }" />
      <!-- 自定义图标 -->
      <van-popup v-model="show" closeable close-icon="close" position="bottom" :style="{ height: '30%' }" />
      <!-- 图标位置 -->
    </div>
    <van-popup v-model="show" closeable close-icon-position="top-right" position="bottom" :style="{ height: '50%' }">
      <van-form @submit="onSubmit">
        <h2 class="register-title" v-if="1">注册页面</h2>
        <van-field v-model="RegisterName" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写您需要注册的名字' }]" autocomplete="off" />
        <van-field v-model="RegisterPassword" :type="isRegisterPassword ? 'password' : 'text'" name="密码" label="密码"
          placeholder="密码" :rules="[{ required: true, message: '请填写您需要注册的密码' }]" autocomplete="off"
          :right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'" @click-right-icon="toggleRegsiterPasswordType" />
      </van-form>
      <div class="register-btn">
        <van-button @click='reg2' style="margin-top:10px" color="#e3e3e3" round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        LoginUsername: '',
        LoginPassword: '',
        RegisterName: '',
        RegisterPassword: '',
        isRegisterPassword: true
      };
    },
    methods: {
      onSubmit(values) {
        console.log('submit', values);
      },
      toggleRegsiterPasswordType() {
        this.isRegisterPassword = !this.isRegisterPassword;
      },
      reg() {
        if (this.LoginUsername === localStorage.getItem("注册用户") && this.LoginPassword === localStorage.getItem(
            "注册密码")) {
          this.$router.push({
            path: "/mine",
          });
          this.$toast('登陆成功');
          localStorage.setItem("登陆成功", "successful")
        }
      },
      reg2() {
        this.$toast('注册成功');
        this.show = false,
        localStorage.setItem("注册用户", this.RegisterName)
        localStorage.setItem("注册密码", this.RegisterPassword)
      }
    },

  };
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 200px;
    text-align: center;

    .login-title {
      line-height: 200px;
      font-weight: bold;
    }

    .register-title {
      line-height: 100px;
      font-weight: bold;
    }

    .register-btn {
      margin-top: 40px;
    }

    .login-btn {
      margin-top: 80px;
    }
  }
</style>