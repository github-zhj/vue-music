<template>
  <div class="wrapper">
    <Back />
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in songList" :key="index">
          <img :src="item.coverImgUrl" :alt="item.name"  />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div
      @click="MusicClick(item)"
      class="music-nav"
      v-for="(item, index) in songList"
      :key="index"
    >
      <img :src="item.picUrl" :alt="item.name" />
      <br />
      <i>{{ item.name }}</i>
    </div>
  </div>
</template>

<script>
import { MusicNav } from "../assets/apis/apis.js";
import Back from "../components/Back";

export default {
  data() {
    return {
      songList: '',
    };
  },

  components: { Back },

  created() {
    this.onLoad();
  },
  methods: {
    onLoad() {
      // 调用api接口，并且提供了两个参数
      MusicNav().then((res) => {
        // 获取数据成功后的其他操作
        this.songList = res.result;
        console.log(res)
      })
    },
      MusicClick(val) {
      // this.$router.push(`/api/personalized?id=${val.id}`)
      this.$router.push({
        path: "/autoplay",
        query: { id: val.id, pir: val.picUrl, title: val.name },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 20px;
}

.banner {
    
  img {
    background-size: cover;
    width: 100%;
    height: auto;
  }
}
.music-head {
  width: 100%;
  height: 25px;
  padding-top: 15px;
  margin-bottom: 20px;
  display: flex;
  // justify-content: space-between;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .music-nav {
    width: 110px;
    margin-bottom: 20px;

    i {
      width: 100%;
      display: block;
      margin-top: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    img {
      background-size: cover;
      width: 110px;
      height: 80px;
    }
  }
}
</style>