const state = {
    nm: window.localStorage.getItem('nowNm') || '北京',
    id: window.localStorage.getItem('nowId') || 1
};

const actions = {

};

const mutations = {
    //修改状态的方法,state就是上面初始状态的数据，payload就是传过来的数据
    CITY_INFO(state, payload) {
        state.nm = payload.nm;
        state.id = payload.id;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}