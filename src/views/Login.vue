<template>
  <div class="wrapper">

    <div class="login-wrapper">
      <van-form @submit="onSubmit" v-show="register">
        <h2 v-if="1">登录页面</h2>
        <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />

      </van-form>
      <van-form @submit="onSubmit" v-show="!register">
        <h2 v-if="1">注册页面</h2>
        <van-field v-model="regusername" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="regpassword" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />

      </van-form>
      <div style="margin: 16px;">
        <van-button @click="reg" round block type="info" native-type="submit">
          登陆
        </van-button>
        <br />
        <van-button @click="reg2" round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        regusername: '',
        regpassword: '',
        title: '登陆页面',
        register: true
      };
    },
    methods: {
      onSubmit(values) {
        console.log('submit', values);
      },
      reg() {
        this.register = true
        if (this.username === localStorage.getItem("注册用户")) {
          this.$router.push({
            path: "/mine",
          });
          localStorage.setItem("登陆成功", "successful")
        }
      },
      reg2() {
        this.register = false
        localStorage.setItem("注册用户", this.regusername)
        localStorage.setItem("注册密码", this.regpassword)
      }
    },

  };
</script>

<style lang="scss" scoped>
  .wrapper {
    height: 200px;
    text-align: center;

    h2 {
      line-height: 200px;
    }

  }
</style>