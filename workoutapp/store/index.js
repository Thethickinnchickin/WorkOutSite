

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
        console.log(state)
        state.pageNumber = value
        console.log("hey")
    }
}
 
export const getters = {
    getPageNumber(state) {
        return state.pageNumber 
    }
}


