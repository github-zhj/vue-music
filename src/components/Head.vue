<template>
  <div>
    <div class="wrapper">
      <h1><i class="icon"><van-icon name="audio"/></i>Music</h1>
      <Playbar />
    </div>
  </div>
</template>
<script>
  import Playbar from "../components/Playbar";
  export default {
    components: {
      Playbar
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
    height: 40px;
    position: fixed;
    top: 0;
    z-index: 999;
    line-height: 40px;
    text-align: center;
    background-color: #d43c33;
  }
    
  h1 {
    font-weight: 600;
    font-size: 20px;
    color: #e3e3e3;
    height: 20px;

    .icon {
      position: relative;
      top: 2px;
    }
  }
</style>