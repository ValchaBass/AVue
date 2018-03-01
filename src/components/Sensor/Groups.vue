<template>
  <v-container fluid>
    <v-expansion-panel expand>
      <v-expansion-panel-content v-for="group in groups" :key="group.id" class="mb-2">
          <v-layout slot="header">
          <v-badge left>
            <span slot="badge">{{ group.count }}</span>
            <v-icon large>folder_open</v-icon>
            <span>{{ group.name }}</span>
          </v-badge>
          </v-layout>
        <v-card>
          <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
  export default {
    computed: {
      groups () {
        return this.$store.getters.groups
      }
    }
  }
</script>
