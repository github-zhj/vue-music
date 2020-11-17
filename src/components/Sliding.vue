<template>
    <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright">
        <div class="slider"></div>
    </v-touch>
</template>

<script>
    export default {
        created() {
            this.$emit('sliding');
        },
        methods: {
            swiperleft() {
                console.log("left")
            },

            swiperright() {
                console.log("right")
            }
        },
    }
</script>

<style lang="scss" scoped>
    .slider {
        width: 100%;
        height: 200px;
    }
</style>