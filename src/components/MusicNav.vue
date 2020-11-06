<template>
  <div>
    <div class="music-head">

      <h2>推荐歌曲</h2>
      <span @click="more">更多&gt;&gt;</span>
    </div>
    <div class="wrapper">
      <div @click="MusicClick(item)" class="music-nav" v-for="(item, index) in songList" :key="index">
        <img :src="item.picUrl" :alt="item.name" />
        <br />
        <i>{{ item.name }}</i>
      </div>
    </div>
  </div>
</template>

<script>
  import { MusicNav } from "../assets/apis/apis.js";

  export default {
    data() {
      return {
        songList: '',
      };
    },
    created() {
      this.onLoad();
    },
    methods: {
      onLoad() {
        // 调用api接口，并且提供了两个参数
        MusicNav().then((res) => {
            // 获取数据成功后的其他操作
            this.songList = res.result;
          })
      },

      more() {
        this.$router.push({
          path: "/musicmore"
        })
      },

      MusicClick(val) {
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
  .music-head {
    width: 100%;
    height: 25px;
    padding-top: 15px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    h2 {
      font-size: 14px;
      font-weight: 700;
      margin-left: 20px;
      color: #000000;
    }

    span {
      display: table-cell;
      padding: 2px;
      font-size: 12px;
      width: 60px;
      height: 20px;
      margin-right: 20px;
      border: 1px solid #eeeeee;
      border-radius: 5px;
      text-align: center;
      vertical-align: middle;
      background-color: #eeeeee;
    }
  }

  .wrapper {
    width: 100%;
    height: 240px;
    font-size: 10px;
    overflow: hidden;
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