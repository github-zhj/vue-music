<template>
  <div>歌单</div>
</template>

<script>
export default {
  created() {
    this.getSellerDataFromBanner();
  },
  methods: {
    getSellerDataFromBanner() {
      setTimeout(() => {
        this.axios({
          method: "GET",
          url: `/api/related/playlist?id=${this.$route.query.id}`,
        }).then((res) => {
          if (res.status === 200) {
            console.log(res);
          }
        });
      }, 500);
    },
  },
};
</script>