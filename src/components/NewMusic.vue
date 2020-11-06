<template>
  <div class="wrapper">
    <h2>最新音乐</h2>

    <div v-for="(item, index) in MusicList" :key="index" class="music-title" @click="MusicClick(item)">
      <div class="song-title">{{ item.name }}</div>
      <span><img src="../assets/imgs/play.svg" /></span>
      <div class="music-author">{{ item.song.artists[0].name }}</div>
    </div>
  </div>
</template>

<script>
  import {
    NewMusic
  } from "../assets/apis/apis.js";

  export default {
    data() {
      return {
        MusicList: null,
      };
    },
    created() {
      this.onLoad();
    },
    methods: {
      onLoad() {
        // 调用api接口，并且提供了两个参数
        NewMusic().then((res) => {
          // 获取数据成功后的其他操作
          this.MusicList = res.result;
        });
      },

      MusicClick(val) {
        // this.$router.push(`/api/personalized?id=${val.id}`)
        this.$router.push({
          path: "/autoplay",
          query: {
            id: val.id,
            pir: val.picUrl,
            title: val.name
          },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    h2 {
      padding-left: 5%;
      margin: 20px auto;
      border-left: 3px solid #d33a31;
    }

    .music-title {
      position: relative;
      width: 90%;
      margin: 5px auto;
      font-size: 14px;
      border-bottom: 1px solid #e3e3e3;

      .song-title {
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .music-author {
        margin: 5px auto;
        color: #909090;
      }

      span {
        display: block;
        position: absolute;
        right: 5px;
      }
    }
  }
</style>