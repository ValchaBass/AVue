import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import IdTo32Bit from '../filters/idTo32Bit'
import AddDays from '../filters/addDays'

Vue.use(Vuex)
Vue.use(VueResource)

const sensorData = {
  state: {
    dateFrom: '',
    dateTo: '',
    sensors: [],
    loading: false
  },
  mutations: {
    setDateFrom (state, payload) {
      state.dateFrom = payload
    },
    setDateTo (state, payload) {
      state.dateTo = payload
    },
    setUploadSensors (state, payload) {
      state.sensors = payload
    },
    setUploadLoading (state, payload) {
      state.loading = payload
    }
  },
  getters: {
    dateFrom (state) {
      return state.dateFrom
    },
    dateTo (state) {
      return state.dateTo
    },
    uploadSensors (state) {
      return state.sensors
    },
    uploadLoading (state) {
      return state.loading
    },
    rawData (state, getters) {
      if ((getters.uploadSensors.length === 0) || (getters.dateFrom === '') || (getters.dateTo === '')) {
        return []
      }
//      commit('setUploadLoading', true)
      let uri = ''
      getters.uploadSensors.forEach((item) => {
        uri += ',' + item.id
      })
      uri = 'd0=' + AddDays(getters.dateFrom, 0).toISOString() + '&d1=' + AddDays(getters.dateTo, 1).toISOString() + '&id=(' + uri.slice(1) + ')'
      Vue.http.get('http://127.0.0.1:8079/sensdata?' + encodeURI(uri))
      .then(function (response) {
        const data = []
        const dataobj = response.body
        for (let key in dataobj) {
          data.push({
            id: key,
            data: dataobj[key]
          })
        }
//       commit('setUploadLoading', false)
        return data
      }).catch(
        (error) => {
          console.log(error)
//          commit('setUploadLoading', false)
        }
      )
    }
  }
}

export const store = new Vuex.Store({
  state: {
    loading: false,
    groups: [],
    sensors: [],
    selectedSensors: [],
    user: null,
    error: null
  },
  modules: {
    previewData: sensorData
  },
  mutations: {
    setGroups (state, payload) {
      state.groups = payload
    },
    setSensors (state, payload) {
      state.sensors = payload
    },
    setSelectedSensors (state, payload) {
      state.selectedSensors = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadSensors0 ({commit}) {
      commit('setGroups', [
        {
          id: '10',
          name: 'Pie Renāra',
          count: 1
        },
        {
          id: '11',
          name: '4. stāvs TestLab',
          count: 2
        },
        {
          id: '12',
          name: '2. stāvs Kaste Marketings',
          count: 1
        }
      ])
      commit('setSensors', [
        {
          id: '1048624',
          name: 'SERVER ROOM',
          group: 'Pie Renāra',
          type: '1',
          selected: false
        },
        {
          id: '1048649',
          name: 'Sapulču telpa',
          group: '2. stāvs Kaste Marketings',
          type: '1',
          selected: false
        },
        {
          id: '3145740',
          name: 'Pie Radio izstrādes',
          group: '4. stāvs TestLab',
          type: '3',
          selected: false
        },
        {
          id: '1048624',
          name: 'SERVER ROOM',
          group: '4. stāvs TestLab',
          type: '1',
          selected: false
        }
      ])
    },
    loadSensors ({commit}) {
      commit('setLoading', true)
      Vue.http.get('http://127.0.0.1:8079/sensordata')
        .then(function (response) {
          const groups = []
          const grpobj = response.body.sensors_raw.groups
          for (let key in grpobj) {
            groups.push({
              id: key,
              name: grpobj[key].name.trim(),
              count: 0
            })
          }
          commit('setGroups', groups.sort((groupA, groupB) => {
            return groupA.name.localeCompare(groupB.name)
          }))
          const sensors = []
          const sensobj = response.body.sensors_raw.sensors
          var sensor, t, g
          for (let key in sensobj) {
            if (typeof sensobj[key].type === 'string') {
              t = sensobj[key].type
            } else {
              t = key.charAt(0)
            }
            sensor = {
              id: key,
              name: sensobj[key].name,
              group: '',
              type: t,
              selected: false
            }
            if (typeof sensobj[key].group === 'string') {
              g = groups.find((group) => {
                return group.id === sensobj[key].group
              })
              g.count++
              sensor.group = g.name
            }
            if (typeof sensor.name !== 'string' || sensor.name === '') {
              sensor.name = IdTo32Bit(sensor.id)
            }
            sensors.push(sensor)
          }
          commit('setSensors', sensors)
          commit('setLoading', false)
        }).catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    logout ({commit}) {
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    groups (state) {
      return state.groups
    },
    sensors (state) {
      return state.sensors.sort((itemA, itemB) => {
        return itemA.name > itemB.name
      })
    },
    selectedSensors (state) {
      return state.selectedSensors
    }
  }
})
