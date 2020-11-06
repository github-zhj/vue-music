<template>
  <div class="wrapper">
    <van-action-sheet v-model="show" title="热门评论">
      <div class="content" v-for="(item,index) in comments" :key="index">
        <div class="content-img"><img :src="item.user.avatarUrl"></div>
        <i class="nickname">{{item.user.nickname}}</i>
        <i class="liked">{{item.likedCount}} <i class="iconfont icon-dianzan good "
            @click="isGood($event);{if(goodBool){item.likedCount +=1}else{item.likedCount -=1} }"></i></i>
        <div class="content-title">{{item.content}}</div>
      </div>
      <van-cell-group>
        <van-field class="publish" v-model="values" label="评论" label-align="center" placeholder="请发表你牛逼的评论"
          @keyup.enter="publish" />
      </van-cell-group>
    </van-action-sheet>
    <div class="bg-blur" :style="`background-image:url(${img})`"></div>
    <Back />
    <h2 class="music_title">{{ title }}</h2>
    <div class="img-wrapper">
      <img ref="cd" :src="img" class="rotate" />
    </div>
    <div class="scroll-wrapper">
      <div class="lyc">
        <ul class="lyriul">
          <li @click="selectMusicProgress(item.time)" v-for="(item, index) in lyricArr" :key="index"
            :class="{ active: light === index }">
            {{ item.lyc }}
          </li>
        </ul>
      </div>
    </div>
    <div class="comment iconfont icon-pinglun" @click="OpenComment"></div>
    <audio class="audio" @timeupdate="updateTime" @ended="NextMusic()" ref="player" :src="MusicUrl"
      autoplay="autoplay"></audio>
    <div class="progressz">

      <div data-v-ccdcf386="" class="van-slider">
        <div class="van-slider__bar" :style="{ width: `${precent}` }">
          <div role="slider" tabindex="0" aria-valuemin="0" aria-valuenow="60" aria-valuemax="100"
            aria-orientation="horizontal" class="van-slider__button-wrapper">
            <div @touchmove="onChange" class="van-slider__button"></div>
            <!-- //@touchmove="onChange"  -->
          </div>
        </div>
      </div>
      <!-- console.log(minutes,seconds) -->

      <div class="percent">{{minutes}}:{{seconds}}</div>
      <div class="total_time">{{DurationMinutes}}:{{DurationSeconds}}</div>
    </div>
    <div class="audio-btn">
      <span @click="PrevMusic" class="icon-previous"></span>
      <span @click="onplay" v-show="!bool" class="icon-play2"></span>
      <span @click="onplay" v-show="bool" class="icon-play1"></span>
      <span @click="NextMusic" class="icon-next"></span>
      <span @click="reset" class="icon-loop"></span>
    </div>
  </div>
</template>

<script>
  import Back from "../components/Back";
  import {
    mapState
  } from "vuex";
  export default {
    data() {
      return {
        values: '',
        value: 0,
        light: 0,
        show: false,
        precent: 0,
        duration: 0,
        bool: true,
        goodBool: false,
        img: null,
        MusicUrl: null,
        currentTime: null,
        sliderTime: null,
        lyricID: this.$route.query.id,
        title: "",
        Songlyric: "",
        save: [],
        comments: [],
        idIndex: 0,
        seconds: 0,
        minutes: 0,
        DurationMinutes: 0,
        DurationSeconds: 0
      };
    },

    components: {
      Back
    },

    created() {
      if (localStorage.getItem("播放记录")) {
        this.save = JSON.parse(localStorage.getItem("播放记录"))
      }
      this.getSellerDataFromBanner();

    },

    mounted() {

      this.$nextTick(() => {
        if (this.playbarTime.time && this.playbarTime.id === this.$route.query.id) {
          this.$refs.player.currentTime = this.playbarTime.time
        }
      })
      // this.$nextTick(() => {
      //   this.updateLyric()
      // })
    },
    methods: {
      getSellerDataFromBanner() {
        setTimeout(() => {
          this.$toast.loading("加载中");
          this.axios({
              method: "GET",
              url: `/api/song/url?id=${this.$route.query.id}`,
            }).then((result) => {
              this.$toast.clear();
              if (result.status === 200) {
                this.img = this.$route.query.pir;
                this.title = this.$route.query.title;
                this.MusicUrl = result.data.data[0].url;
                this.songList = result.data.result;
                this.$store.commit("messageString", {
                  url: result.data.data[0].url,
                  pir: this.$route.query.pir,
                  id: this.$route.query.id
                })
              }
            }),
            this.axios({
              method: "GET",
              url: `/api/lyric?id=${this.lyricID}`,
            }).then((result) => {
              if (result.status === 200) {
                this.Songlyric = result.data.lrc.lyric;

                for (let i = 0; i < this.save.length; i++) {
                  if (this.save[i].id == this.lyricID) {
                    this.save.splice(i, 1)
                  }
                }

                this.save.push({
                  name: this.title,
                  id: this.lyricID,
                  lyric: this.Songlyric,
                  url: this.MusicUrl,
                  pir: this.img
                });
                localStorage.setItem("播放记录", JSON.stringify(this.save))

              }
            }, ),
            this.axios({
              method: "GET",
              url: `/api/comment/music?id=${this.lyricID}&limit=6`,
            }).then((result) => {
              if (result.status === 200) {
                this.comments = result.data.hotComments
              }
            }, )
        }, 20);
      },

      updateTime(e) {
        this.currentTime = e.target.currentTime;
        let timeDisplay = Math.floor(this.currentTime); //获取实时时间
        let minute = timeDisplay / 60;
        let minutes = parseInt(minute);
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        //秒
        let second = timeDisplay % 60;
        let seconds = Math.round(second);
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        this.minutes = minutes
        this.seconds = seconds
        this.$store.commit("time", {
          time: e.target.currentTime,
        })


        // 获取总时长

        let DurationtimeDisplay = Math.floor(this.duration); //获取实时时间
        let Durationminute = DurationtimeDisplay / 60;
        let Durationminutes = parseInt(Durationminute);
        if (Durationminutes < 10) {
          Durationminutes = "0" + Durationminutes;
        }
        //秒
        let Durationsecond = DurationtimeDisplay % 60;
        let Durationseconds = Math.round(Durationsecond);
        if (Durationseconds < 10) {
          Durationseconds = "0" + Durationseconds;
        }
        this.DurationMinutes = Durationminutes
        this.DurationSeconds = Durationseconds

        this.duration = e.target.duration; //有问题

        this.updateProgress(this.currentTime, this.duration);
        this.updateLyric()
      },

      updateLyric() {
        let lyricUL = document.getElementsByClassName('lyriul')[0]
        this.lyricArr.forEach((item, index) => {
          if (parseInt(item.time) <= this.currentTime) {
            this.light = index;
            lyricUL.style.transform = `translateY(${170 - (30 * (index + 1))}px)`
          }
        });
      }, //歌词滚动

      updateProgress(currentTime, duration) {
        // 更新进度条
        this.precent = `${((currentTime / duration) * 100).toFixed(2)}%`;
      },

      // 点击歌词拖动
      selectMusicProgress(time) {
        let audio = document.getElementsByClassName('audio')[0]
        audio.currentTime = time
      },

      // 拖动进度条
      onChange(e) {
        let audio = document.getElementsByClassName('audio')[0]
        const musicWidth = document.getElementsByClassName('van-slider')[0].offsetWidth
        if (e.targetTouches[0].pageX, musicWidth <= musicWidth) {
          audio.currentTime = `${(parseInt(e.targetTouches[0].pageX) / musicWidth) * 100}`
        }
      },

      onplay() {
        let audio = this.$refs.player;
        this.bool = !this.bool;
        this.$refs.cd.classList.add("rotate");
        if (audio.paused) {
          if (this.$refs.cd.classList.contains("pause")) {
            this.$refs.cd.classList.remove("pause");
          }

          audio.play(); //audio.play();// 这个就是播放
        } else {
          this.$refs.cd.classList.add("pause");
          audio.pause(); // 这个就是暂停
        }
      },

      NextMusic() {
        let idArr = JSON.parse(localStorage.getItem('播放记录'))
        this.idIndex++;
        if (this.idIndex >= idArr.length - 1) {
          this.idIndex = 0;
        }
        this.$refs.player.src = idArr[this.idIndex].url;
        this.img = idArr[this.idIndex].pir
        this.Songlyric = idArr[this.idIndex].lyric
        this.title = idArr[this.idIndex].name
        this.$store.commit("messageString", {
          url: idArr[this.idIndex].url,
          pir: idArr[this.idIndex].pir,
          name: idArr[this.idIndex].name,
          id: idArr[this.idIndex].id,
        })
      },

      PrevMusic() {
        let idArr = JSON.parse(localStorage.getItem('播放记录'))
        this.idIndex--;
        if (this.idIndex < 0) {
          this.idIndex = idArr.length - 1;
        }
        this.$refs.player.src = idArr[this.idIndex].url;
        this.img = idArr[this.idIndex].pir
        this.Songlyric = idArr[this.idIndex].lyric
        this.title = idArr[this.idIndex].name

        this.$store.commit("messageString", {
          url: idArr[this.idIndex].url,
          pir: idArr[this.idIndex].pir,
          name: idArr[this.idIndex].name,
          id: idArr[this.idIndex].id,
        })
      },

      reset() {
        let audio = this.$refs.player;
        audio.currentTime = 0;
      },

      OpenComment() {
        this.show = !this.show
      },

      isGood(e) {
        if (!this.goodBool) {
          e.target.classList.add("goodbtn");
        } else {
          e.target.classList.remove("goodbtn");
        }
        this.goodBool = !this.goodBool
      },

      publish() {
        if (localStorage.getItem("登陆成功")) {
          if (this.values == "") {
            return;
          }
          this.comments.push({
            id: "kirito",
            content: this.values,
            liked: false,
            likedCount: 0,
            user: {
              "nickname": "kirito",
              "avatarUrl": " https://static.wanplus.com/2019/1/7/154683014500045.jpg "
            }
          })
        } else {
          this.$toast.fail('请先登录再评论');
        }
        return this.values = ""
      }
    },
    computed: {
      lyricArr() {
        let arr = this.Songlyric.split(/\n/);
        // 正则组匹配
        return arr.map((l) => {
          /\[(\d+):(\d+\.\d+)\](.+)/.test(l);
          return {
            time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),

            lyc: RegExp.$3,
          };
        });
      },
      ...mapState({
        playbarTime: state => state.time
      }),
      percent() {
        return this.duration === 0 ? 0 : ((this.currentTime / this.$refs.player.duration) * 10).toFixed(2);
      },

    },
  };
</script>


<style lang="scss" scoped>
  .wrapper {
    .content {
      font-size: 16px;
      font-weight: 100;
      margin-bottom: 45px;
      margin-top: -10px;
      color: #363636;
      padding: 10px 10px;
      border-bottom: 1px solid #e3e3e3;

      .content-title {
        padding-left: 50px;
        line-height: 20px;
      }

      .content-img {
        width: 40px;
        height: 40px;
        margin-bottom: 10px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;

        img {
          width: 40px;
          height: 40px;
        }
      }

      i {
        color: #5b5b5b;
      }

      .nickname {
        position: absolute;
        left: 60px;
        transform: translateY(-38px);
      }

      .liked {
        position: absolute;
        line-height: 30px;
        right: 30px;
        transform: translateY(-48px);

        .goodbtn {
          color: red;
        }

        .good {
          font-size: 30px;
          padding-top: 5px;
        }
      }

    }

    .publish {
      position: fixed;
      bottom: 0;
    }


    .music_title {
      width: 100px;
      color: #ffffff;
      font-weight: 500;
      text-align: center;
      display: block;
      margin: 0px auto;
    }

    .bg-blur {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      filter: blur(20px);
      opacity: 0.5;
      z-index: -1;
    }

    .rotate {
      animation: rotateIMG 15s linear infinite;
    }

    .pause {
      animation-play-state: paused;
    }

    @keyframes rotateIMG {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    .img-wrapper {
      position: relative;
      left: 50%;
      margin-top: 15%;
      margin-left: -100px;
      width: 200px;
      height: 200px;
      overflow: hidden;
      border-radius: 300px;
      border: 2px solid #131313;
      box-shadow: 0 0 0 30px #343935;
      opacity: 0.7;

      img {
        background-size: cover;
        width: 100%;
        height: auto;
      }
    }

    .scroll-wrapper {
      margin-top: 40px;
      height: 220px;
      position: relative;
      overflow: hidden;

      .lyc {
        position: absolute;
        left: 0;
        top: 0;
        right: -17px;
        bottom: 0;
        overflow-x: hidden;
        // overflow-y: hidden;
        overflow-y: scroll;

        ul {
          font-size: 12px;
          font-weight: bold;
          line-height: 24px;
          color: #000000;
          text-align: center;

          .active {
            color: #ffffff;
          }
        }
      }
    }

    .comment {
      font-size: 30px;
      position: absolute;
      right: 20px;
      bottom: 80px;
    }

    .progressz {
      width: 70%;
      padding-bottom: 10px;
      position: absolute;
      bottom: 50px;
      margin-left: 15%;

      .percent {
        margin-top: 5px;
        position: absolute;
        left: -52px;
        top: -12px;
      }

      .total_time {
        margin-top: 5px;
        position: absolute;
        right: -52px;
        top: -12px;
      }

      .van-slider__button {
        width: 14px;
        height: 14px;
      }
    }

    .audio-btn {
      width: 100%;
      display: flex;
      justify-content: space-around;
      position: fixed;
      bottom: 5px;
      // z-index: 999;
    }

    .tabbar {
      display: none;
    }

  }
</style>