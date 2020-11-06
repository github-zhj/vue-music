<template>
  <div class="block">
    <el-slider v-model="currentTime" :show-tooltip="false"></el-slider>
  </div>
</template>

<script>
export default {
  props:{
    currentTime:{
      type:Number
    }
  },
  data() {
    return {
      value:0
    }
  },

}
</script>