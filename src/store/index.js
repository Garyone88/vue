import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem("user")) || {}
    },
    mutations: {
        setUser(state,data){
            state.user = data;

            localStorage.setItem("user",JSON.stringify(data))
        }
    }
})

export default store;