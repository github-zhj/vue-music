<template>
  <div id="app">
    <router-view />
    <div class="tabbar">
      <van-tabbar v-model="active" v-show="$store.state.vanTabbar">
        <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
        <van-tabbar-item to="/mine" icon="friends-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
  export default {
      data() {
      return {
        active: 0,
      };
    },
  }
</script>