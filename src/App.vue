<template>
  <v-app>
      <v-navigation-drawer fixed temporary v-model="sideNav" app>
      <v-list>
        <v-list-tile
          v-for="item in menuitems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app v-bind:style="styleObject">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">{{ this.title }}</router-link>
      </v-toolbar-title>
    </v-toolbar>
    

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        menuitems: [{
          icon: 'developer_mode',
          title: 'Sensors',
          link: '/sensors'
        },
        {
          icon: 'settings_input_component',
          title: 'Groups',
          link: '/groups'
        },
        {
          icon: 'cloud_upload',
          title: 'Upload to cloud',
          link: '/upload'
        }],
        title: 'Aranet'
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
