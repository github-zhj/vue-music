<template>
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in banner" :key="index">
          <img :src="image.imageUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
</template>

<script>
import { Banner } from "../assets/apis/apis.js"; // 导入我们的api接口

export default {
  data() {
    return {
      banner: {},
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
     onLoad() {
      // 调用api接口，并且提供了两个参数
      Banner().then((res) => {
        // 获取数据成功后的其他操作
        this.banner = res.banners;
      });
    },
   
  },
};
</script>

<style lang="scss" scoped>
  .banner {
    margin-top: 40px;
  }

  img {
    background-size: cover;
    width: 100%;
    height: auto;
  }
</style>