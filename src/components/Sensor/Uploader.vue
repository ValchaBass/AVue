<template>
  <v-stepper v-model="phase">
    <v-stepper-header class = "elevation-5">
      <v-stepper-step step="1" :complete="step1Complete" editable>Select sensors</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="step1Complete && step2Complete" editable>Enter date range</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Upload to cloud</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-data-table
          :headers="headers"
          :items="sensors"
          v-model="selectedSensors"
          item-key="id"
          select-all
          :rows-per-page-items="rppItems"
          :rows-per-page-text="rppText"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>
              <v-checkbox
                primary
                hide-details
                v-model="props.selected"
              ></v-checkbox>
            </td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.group | ungrouped }}</td>
          </template>
        </v-data-table>
      </v-stepper-content>

      <v-stepper-content step="2">

  <v-layout row wrap>
    <v-flex xs11 sm5>
      <v-menu
        lazy
        :close-on-content-click="false"
        v-model="pickerFrom"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="Date from"
          v-model="dateFromFormatted"
          prepend-icon="event"
          @blur="dateFrom = parseDate(dateFromFormatted)"
          required
        ></v-text-field>
        <v-date-picker v-model="dateFrom" @input="dateFromFormatted = formatDate($event)" no-title scrollable actions>
          <template slot-scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs11 sm5>
      <v-menu
        lazy
        :close-on-content-click="false"
        v-model="pickerTo"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="Date To"
          v-model="dateToFormatted"
          prepend-icon="event"
          @blur="dateTo = parseDate(dateToFormatted)"
          required
        ></v-text-field>
        <v-date-picker v-model="dateTo" @input="dateToFormatted = formatDate($event)" no-title scrollable actions>
          <template slot-scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-menu>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs11 sm2 offset-xs1 offset-sm9>
    <v-spacer></v-spacer>
    <v-switch label="Preview" v-model="dataPreview" :disabled="previewDisable"></v-switch>  
    </v-flex>
  </v-layout>

<template v-if="dataPreview && step1Complete && step2Complete">
  <v-expansion-panel focusable>
    <v-expansion-panel-content v-for="item in selectedSensors" :key="item.id">
      <div slot="header">{{ item.name }}</div>
      <v-layout>
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            class="primary--text"
            :width="7"
            :size="70"
            v-if="loading"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-data-table
          :headers="dataHeaders"
          :items="devdata(item.id)"
          hide-actions
          class="elevation-1"
        >
        </v-data-table>      
      </v-layout>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>  

      </v-stepper-content>

      <v-stepper-content step="3">
  <v-layout row wrap>
  <v-flex xs11 sm5>
        <v-text-field
          label="Host"
          v-model="host"
          required
        ></v-text-field>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs11 sm5>
        <v-text-field
          label="Uri"
          v-model="uri"
          hint="Uri starts with /"
          required
        ></v-text-field>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
  <v-flex xs11 sm5>
        <v-text-field
          label="Base ID"
          v-model="baseID"
          required
        ></v-text-field>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs11 sm5>
        <v-text-field
          label="Base private key"
          v-model="pkey"
          required
        ></v-text-field>
    </v-flex>
  </v-layout>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  export default {
    data () {
      return {
        phase: 0,
        headers: [
          { text: 'Sensor', align: 'left', value: 'name' },
          { text: 'Group', align: 'left', value: 'group' }
        ],
        dataPreview: false,
        dateFromRules: [
          (v) => !!v || 'Date From is required',
          (v) => (v && this.parseDate(v) <= this.dateTo) || 'Date From must be before Date To'
        ],
        pickerFrom: false,
        pickerTo: false,
        dateFromFormatted: '',
        dateToFormatted: '',
        baseID: '',
        pkey: 'VerySecretKey',
        host: 'localhost:8484',
        uri: '/device/:device/data',
        rppItems: [10, 20, 50, 100, { text: 'All', value: -1 }],
        paginationSync: '',
        rppText: 'Sensors per page:',
        noDataText: '',
        dataHeaders: [
          { text: 'Time', align: 'left', value: 'time' },
          { text: 'Temperature', align: 'left', value: 't' },
          { text: 'Humidity', align: 'left', value: 'h' },
          { text: 'Co2', align: 'left', value: 'co2' },
          { text: 'Rssi', align: 'left', value: 'rssi' },
          { text: 'Volt', align: 'left', value: 'volt' },
          { text: 'Ch', align: 'left', value: 'ch' }
        ],

        max25chars: (v) => v.length <= 25 || 'Input too long!'
      }
    },
    computed: {
      sensors () {
        return this.$store.getters.sensors
      },
      step1Complete () {
        return this.selectedSensors.length > 0
      },
      step2Complete () {
        return this.dateFrom !== null && this.dateTo !== null && this.dateFrom <= this.dateTo
      },
      previewDisable () {
        return (this.step1Complete === false || this.step2Complete === false)
      },
      loading () {
        return this.$store.getters.uploadLoading
      },
      dateFrom: {
        get: function () {
          return this.$store.getters.dateFrom
        },
        set: function (newValue) {
          // call action
          this.$store.commit('setDateFrom', newValue)
        }
      },
      dateTo: {
        get: function () {
          return this.$store.getters.dateTo
        },
        set: function (newValue) {
          this.$store.commit('setDateTo', newValue)
        }
      },
      selectedSensors: {
        get: function () {
          return this.$store.getters.uploadSensors
        },
        set: function (newValue) {
          this.$store.commit('setUploadSensors', newValue)
        }
      },
      previewData2 () {
        return (this.$store.getters.rawData || [])
      },

      dataPreview2: {
        get: function () {
          return this.$store.getters.dataPreview
        },
        set: function (newValue) {
          this.$store.commit('setDataPreview', newValue)
        }
      }
    },
    filters: {
      ungrouped: function (value) {
        if (value === '') {
          return 'Ungrouped'
        } else {
          return value
        }
      }
    },
    methods: {
      formatDate (dateStr) {
        if (!dateStr) {
          return null
        }
        const [year, month, day] = dateStr.split('-')
        return `${day}.${month}.${year}.`
      },
      parseDate (date) {
        if (!date) {
          return null
        }
        const [day, month, year] = date.split('.')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      devdata (id) {
        let d = this.previewData2.find((d) => {
          return d.id === id
        })
        if (typeof d !== 'object') {
          return []
        }
        return d.data
      },
      loading2 (id) {
        let d = this.loadedData(id)
        return d.loading
      },
      loadedData2 (id) {
        let d = this.previewData.find((d) => {
          return d.id === id
        })
        if (typeof d !== 'object') {
          d = {
            id: id,
            loading: true,
            data: []
          }
          this.previewData.push(d)
        }
        return d
      }
    }
  }
</script>