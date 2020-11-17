<template>
  <span @click="prev"><img src="../assets/imgs/back.svg" /></span>
</template>

<script>
export default {
  methods: {
    prev() {
      this.$router.push('/');
    },
  },

};
</script>


