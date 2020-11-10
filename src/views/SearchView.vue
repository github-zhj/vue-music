<template>
  <div>
      <van-search class="search" @search="onSearch" @input="SearchDel" v-model="value" shape="round"
        background="#d43c33" placeholder="请输入搜索歌曲" />
    <div class="wrapper" v-show="hidden">
      <div class="history-wrapper">
        <h2 class="history">搜索历史</h2>
        <span class="search-clear" @click="RemoveLocal">清除记录</span>
        <span class="search-history" v-for="(item, index) in history" :key="index"
          @click="MusicClick(item.id,item.pir,item.title)">{{item.name}}</span>
      </div>
      <div class="list-wrapper">
        <h2>热门搜索</h2>
        <div v-for="(item, index) in searchList" :key="index">
          <span class="search-list">{{item.searchWord}}<img v-if="item.iconUrl" :src="item.iconUrl"></span>
        </div>
      </div>
    </div>
    <div class="mask" v-show="!hidden">
      <ul>
        <li class="search-list-content" v-for="(item,index) in searchDel" :key="index"
          @click="MusicClick(item.id,item.pir,item.title)"><i class="iconfont icon-sousuo"></i>{{item.name}}
          <span>{{item.artists[0].name}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    HotSearch
  } from "../assets/apis/apis.js";
  export default {
    data() {
      return {
        value: "",
        searchList: "",
        searchDel: "",
        history: [],
        hidden: true
      };
    },
    created() {
      this.onLoad();
      this.history;
      if (localStorage.getItem("搜索历史")) {
        this.history = JSON.parse(localStorage.getItem("搜索历史"))
      }
    },
    methods: {
      onSearch(val) {
        if (val) {
          this.$router.push({
            path: "/autoplay",
            query: {
              id: this.searchDel[0].id,
              pir: this.searchDel[0].album.artist.img1v1Url,
              title: this.searchDel[0].name
            },
          });
        }

        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i].name == this.value) {
            this.history.splice(i, 1)
          }
        }

        this.history.push({
          name: val,
          id: this.searchDel[0].id,
          pir: this.searchDel[0].album.artist.img1v1Url,
          title: this.searchDel[0].name
        });
        localStorage.setItem("搜索历史", JSON.stringify(this.history))
      },
      SearchDel(val) {
        if (val) {
          this.axios({
            method: "GET",
            url: `/api/search/suggest?keywords= ${val}&type=1`,
          }).then((result) => {
            if (result.data.code === 200) {
              this.searchDel = result.data.result.songs
            }
          })
        }

      },
      RemoveLocal() {
        localStorage.removeItem('搜索历史')
        // window.location.reload()
      },
      onLoad() {
        HotSearch().then((res) => {
          // 获取数据成功后的其他操作
          this.searchList = res.data
        })
      },
      MusicClick(id, pir, title) {
        this.$router.push({
          path: "/autoplay",
          query: {
            id: id,
            pir: pir,
            title: title
          },
        });
      }
    },
    watch: {
      value(afther, old) {
        if (afther) {
          console.log(old)
          this.hidden = false
        } else if (!afther) {
          this.hidden = true
        }
      },

    },

  };
</script>

<style lang="scss" scoped>
  img {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }

  h2 {
    color: black;
    font-size: 20px;
    margin-left: 20px;
    margin-top: 14px;
  }

  .history-wrapper {
    margin-top: 20px;
    position: relative;

    .search-clear {
      position: absolute;
      top: 0;
      right: 20px;
      color: #a8a8a8;
    }

    .search-history {
      display: inline-block;
      margin-top: 12px;
      font-size: 18px;
      margin-left: 20px;
      color: skyblue;
    }
  }


  .list-wrapper {
    margin-top: 40px;
    height: 420px;
    overflow: hidden;

    .search-list {
      display: inline-block;
      margin-top: 18px;
      margin-left: 20px;
      color: skyblue;
    }
  }

  .search-list-content {
    display: flex;
    display: block;
    border-bottom: 1px solid #e3e3e3;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    padding-left: 20px;

    span {
      justify-content: flex-start;
    }
  }
</style>