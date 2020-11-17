<template>
    <div @click="MusicClick" class="wrapper-play">
        <img :src="MusicImg" class="rotate" />
        <audio @timeupdate="updateTime" ref="play" :src="MusicUrl" autoplay></audio>
        <h2>{{messageString.url}}</h2>

    </div>
</template>

<script>
    import {
        mapState
    } from "vuex";
    export default {
        data() {
            return {
                MusicImg: "",
                MusicUrl: "",
                MusicID: "",
            }
        },
        created() {
            this.MusicUrl = this.messageString.url
            this.MusicImg = this.messageString.pir
            this.MusicName = this.messageString.name
            this.MusicID = this.messageString.id
            this.MusicTitle = this.messageString.title
        },
        mounted() {
            this.$nextTick(() => {
                if (this.time.time) {
                    this.$refs.play.currentTime = this.time.time
                }
            })

        },
        methods: {
            MusicClick() {
                if (this.messageString.id) {
                    this.$router.push({
                        path: "/autoplay",
                        query: {
                            id: this.MusicID,
                            pir: this.MusicImg,
                            title:this.MusicTitle
                        }
                    });
                }
            },

            updateTime(e) {
                this.$store.commit("playbarTime", {
                    title: this.MusicTitle,
                    time: e.target.currentTime,
                    id: this.MusicID
                })
            },


        },

        computed: {
            ...mapState({
                messageString: state => state.messageString
            }),
            ...mapState({
                time: state => state.time
            }),
            ...mapState({
                onPlay: state => state.bool
            })
        },

    }
</script>

<style lang="scss" scoped>
    .wrapper-play {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 0;
        right: 5px;
        background: #ffffff;
        background: url("../assets/imgs/music.png") no-repeat;
        background-size: 40px 40px;
        border-radius: 50%;
        overflow: hidden;

        img {
            background-size: cover;
            width: 100%;
            height: 100%;
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
    }
</style>