<template>
  <div id="app">

    <div class="wrapper">
      <!-- Sidebar  -->
      <nav id="sidebar" v-bind:class="{active: isActive}">
          <div class="sidebar-header">
              <h3>Book Viewer App</h3>
          </div>

          <ul class="list-unstyled components">
              <li>
                  <a class="navbar-brand" @click="$store.dispatch('showSection', 'available')" href="#">Book Links</a>
              </li>
              <li>
                  <a class="navbar-brand" @click="$store.dispatch('showSection', 'management')" href="#">Manage Links</a>
              </li>
              <li>
                  <a class="navbar-brand" @click="$store.dispatch('showSection', 'settings')" href="#">App Settings</a>
              </li>
          </ul>

      </nav>

      <!-- Page Content  -->
      <div id="content">

          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="container-fluid">

                  <button type="button" id="sidebarCollapse" class="btn btn-info" @click="sidebarCollapse()">
                      <font-awesome-icon icon="align-left" />
                  </button>

              </div>
          </nav>

          <Available />
          <Management />
          <Settings />
          
      </div>
    </div>

  </div>

</template>

<script>
import Management from './components/Management.vue';
import Available from './components/Available.vue';
import Settings from './components/Settings.vue';

export default {
  name: 'App',
  data: function() {
    return {
      isActive: false
    }
  },
  methods: {
    sidebarCollapse: function() {
      this.isActive = !this.isActive;
    }
  },
  components: {
    Available,
    Management,
    Settings
  }
}
</script>

<style>
@import './assets/css/GooglePoppins.css';
@import './assets/css/App.css';

.bottom {
  margin-bottom: 75px;
}
</style>
