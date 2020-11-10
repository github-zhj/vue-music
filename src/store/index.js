import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messageString: {},
    time: {},
    playbarTime: {},
    onPlay:{},
  
  },
  mutations: {
    messageString(state, messageString) { //设置参数
      state.messageString = messageString;
    },
    time(state, time) { //设置参数
      state.time = time;
    },
    playbarTime(state, playbarTime) { //设置参数
      state.time = playbarTime;
    },
    onPlay(state, onPlay) { //设置参数
      state.onPlay = onPlay;
    },
  },
  actions: {
  },
  modules: {
  }
})
