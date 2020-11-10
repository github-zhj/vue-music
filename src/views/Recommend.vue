<template>
  <div>

    <Head />
    <Banner />
    <MusicNav />
    <NewMusic />
  </div>
</template>

<script>
  import Banner from "../components/Banner";
  import Head from "../components/Head";
  import MusicNav from "../components/MusicNav";
  import NewMusic from "../components/NewMusic";
  export default {
    components: {
      Banner,
      MusicNav,
      Head,
      NewMusic
    },
  };
</script>