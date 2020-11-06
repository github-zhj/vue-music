<template>
  <div class="tabbar">
    <van-tabbar v-model="active">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    // props:{
    //   active:{
    //     type:Array,
    //     required:true
    //   }
    // },
    data() {
      return {
        active: 0,
      };
    },


  };
</script>

