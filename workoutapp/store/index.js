

export const state = () => ({
    pageNumber: 1
})

export const actions = {
    newPageNumber({state, commit}, page) {
        commit('setPageNumber', page)
    }
}

export const mutations = {
    setPageNumber(state, value) {
        state.pageNumber = value
    }
}
 
export const getters = {
    getPageNumber(state) {
        return state.pageNumber 
    }
}


