import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    power: '',
    avatar: ''
  },
  mutations: {
    setPower (state, mes) {
      state.power = mes
    },
    setAvatar (state, mes) {
      state.avatar = mes
    }
  }
})

export default store
