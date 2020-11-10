<template>
  <div>
    <div class="login">
      <div class="login-img" @click="LoginClick">
        <img v-show="!bool" src="../assets/imgs/login.png">
        <img v-show="bool" src="../assets/imgs/login2.png">
      </div>
      <span @click="LoginClick">{{title}}</span>
    </div>
    <div class="login-list">
      <ul>
        <li><span class="iconfont">&#xe60f;</span> 收藏</li>
        <li><span class="iconfont">&#xe8ad;</span>播放记录</li>
        <li><span class="iconfont">&#xe61b;</span>客服</li>
        <li><span class="iconfont">&#xe684;</span>关于我们</li>
      </ul>
    </div>
    <!-- <FootNav /> -->
  </div>
</template>

<script>
  // import FootNav from "../components/FootNav";

  export default {
    data() {
      return {
        title: "登陆/注册",
        bool: true
      }
    },
    // components: {
    //   FootNav,
    // },
    created() {
      this.LoginClick()
    },
    methods: {
      LoginClick() {
        if (localStorage.getItem("登陆成功")) {
          this.bool = true
          this.title = "kirito"
        } else {
          this.$router.push({
            path: "/login",
          });
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 300px;
    line-height: 300px;
    display: flex;
    justify-content: space-around;
    background: #f6f6f6;

    span {
      position: absolute;
      top: 30px;
      font-size: 18px;
    }

    .login-img {
      width: 100px;
      height: 100px;
      position: absolute;
      top: 48px;   
      background: #ffffff;
      border-radius: 50%;
      overflow: hidden;

      img {
        position: absolute;
        background-size: cover;
        width: 100%;
        height: 100%;
      }
    }
  }

  .login-list {
    margin-top: 30px;

    ul li {
      display: block;
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #e3e3e3;
      padding-left: 18px;

      span {
        margin-right: 8px;
      }
    }

  }
</style>