<template>
  <v-data-table
    :headers="headers"
    :items="sensors"
    :search="search"
    v-model="selected"
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
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        selected: [],
        headers: [
          { text: 'Sensor', align: 'left', value: 'name' },
          { text: 'Group', align: 'left', value: 'group' }
        ],
        rppItems: [10, 20, 50, 100, { text: 'All', value: -1 }],
        paginationSync: '',
        rppText: 'Sensors per page:',
        noDataText: ''
      }
    },
    computed: {
      sensors () {
        return this.$store.getters.sensors
      },
      selectedSensors: {
        get: function () {
          return this.$store.getters.selectedSensors
        },
        set: function (newValue) {
          this.$store.commit('setSelectedSensors', newValue)
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
    }
  }
</script>