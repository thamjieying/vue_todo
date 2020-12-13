import Vue from 'vue'
import Vuex from 'vuex'

import firebase from '../firebase'

Vue.use(Vuex)

const db = firebase.firestore()
const dbName = 'todo'

export default new Vuex.Store({
  state: {
    loading: false, 
    tableData: []
  },
  mutations: {
    GET_ITEMS(state) {
      state.loading = true
      db.collection(dbName)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            state.tableData.push({
              id: doc.id,
              message: doc.data().message,
              done: doc.data().done,
            })
          })
        })
        .catch(error => {
          console.error('Error getting todolist', error)
        })
        .finally(()=> {
          state.loading = false
        })
    },
    ADD_ITEM(state, item) {
      db.collection(dbName)
        .add(item)
        .then(() => {
          console.log('Added to DB Successfully')
          state.tableData.push(item)
        })
        .catch(error => {
          console.error('Error adding item', error)
        })
    },
    REMOVE_ITEM(state, index) {
      const id = state.tableData[index].id
      db.collection(dbName)
        .doc(id)
        .delete()
        .then(() => {
          console.log('Delete from DB Successfully')
          state.tableData.splice(index, 1)
        })
        .catch(error => {
          console.error('Error deleting item', error)
        })
    }, 
    CHECK_ITEM(state, index) {
      const id = state.tableData[index].id
      db.collection(dbName)
        .doc(id)
        .update({ done: true})
        .then(() => {
          console.log('Updated DB Successfully')
          state.tableData[index].done = true
        })
        .catch(error => {
          console.error('Error updating item', error)
        })
    },
    UNCHECK_ITEM(state, index) {
      const id = state.tableData[index].id
      db.collection(dbName)
        .doc(id)
        .update({ done: false })
        .then(() => {
          console.log('Updated DB Successfully')
          state.tableData[index].done = false
        })
        .catch(error => {
          console.error('Error updating item', error)
        })
    }
  },
  actions: {
    loadTableData({ commit }) {
      commit('GET_ITEMS')
    },
    addItems({ commit }, item) { 
      commit('ADD_ITEM', item )
    },
    removeItems({ commit }, index) {
      commit('REMOVE_ITEM', index)  
    }, 
    toggleCheck({ commit, state }, index) {
      state.tableData[index].done ?
        commit('UNCHECK_ITEM', index) :
        commit('CHECK_ITEM', index)
    }
  },
})
