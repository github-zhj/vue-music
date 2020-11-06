<template>
  <div>
    <Head />
    <Banner />
    <MusicNav />
    <NewMusic/>
    <FootNav />
  </div>
</template>

<script>
import Banner from "../components/Banner";
import Head from "../components/Head";
import MusicNav from "../components/MusicNav";
import FootNav from "../components/FootNav";
import NewMusic from "../components/NewMusic";
export default {
  components: {
    Banner,
    MusicNav,
    Head,
    FootNav,
    NewMusic
  },
};
</script>