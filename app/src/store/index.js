import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Sorted_Books from '../assets/js/sorted_books'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showAvailable: true,
    showManagement: false,
    showSettings: false,
    showAddAvailableBook: false,
    allBooks: [],
    bookLinks: [],
    settings: {'source_ip':'', 'source_script_path':'', 'source_viewer_base_url':''},
    refreshInProgress: false
  },
  mutations: {
    showSection: function(state, sectionName) {
      switch (sectionName) {
        case 'available':
          state.showAvailable = true
          state.showManagement = false
          state.showSettings = false
          break;
        case 'management':
          state.showAvailable = false
          state.showManagement = true
          state.showSettings = false
          break;
        case 'settings':
          state.showAvailable = false
          state.showManagement = false
          state.showSettings = true
          break;
      
        default:
          break;
      }
    },
    setAllBooks (state, newList) {
      state.allBooks = newList
    },
    setBookLinks (state, newList) {
      state.bookLinks = newList
    },    
    setSettings(state, value) {
      state.settings = {'source_ip':value['source_ip'], 
                        'source_script_path':value['source_script_path'],
                        'source_viewer_base_url':value['source_viewer_base_url']}
    },
    setRefreshInprogress(state, value) {
      state.refreshInProgress = value
    }
    
  },
  actions: {
    showSection({commit}, sectionName) {
      commit('showSection', sectionName)
    },
    setAllBooks({commit}) {
      let config = {
          headers : {
          'Authorization' : 'Token '+process.env.VUE_APP_BOOK_API_KEY
        }
      }
      axios
      .get('http://'+process.env.VUE_APP_BOOK_API_IPADDRESS+'/bookapi/book/', config)
      .then(response => {
        // console.log('setbooks', response.data)
        let sortedData = new Sorted_Books(response.data)
        commit('setAllBooks', sortedData.allSorted());
      })
      .catch(error => {
          console.log('setAllBooks:', error);
      })            
    },
    setBookLinks({commit}) {
      let config = {
          headers : {
          'Authorization' : 'Token '+process.env.VUE_APP_BOOK_API_KEY
        }
      }
      axios
      .get('http://'+process.env.VUE_APP_BOOK_API_IPADDRESS+'/bookapi/availablebook/', config)
      .then(response => {
        // console.log('setbooks', response.data)
        commit('setBookLinks', response.data);
      })
      .catch(error => {
          console.log('setBookLinks:', error);
      })            
    },     
    setSettings({commit}) {
      let config = {
          headers : {
          'Authorization' : 'Token '+process.env.VUE_APP_BOOK_API_KEY
        }
      }
      axios
      .get('http://'+process.env.VUE_APP_BOOK_API_IPADDRESS+'/bookapi/settings/', config)
      .then(response => {
        let dbValues = {'source_ip':response.data[0]['source_ip'], 
                        'source_script_path':response.data[0]['source_script_path'],
                        'source_viewer_base_url':response.data[0]['source_viewer_base_url']}
        commit('setSettings', dbValues);
      })
      .catch(error => {
          console.log('setSettings:', error);
      })        
    },
    setRefreshInprogress({commit}, value) {
      commit('setRefreshInprogress', value)
    }

  },
  modules: {
  }
})
