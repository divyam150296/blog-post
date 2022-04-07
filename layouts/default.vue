<template>
  <div>
    <TheHeader @sidenavToggle="displaySideNavbar = !displaySideNavbar" />
    <TheSidenav 
      :show="displaySideNavbar"
      @close="displaySideNavbar = false"
    />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '~/components/Navigation/TheHeader'
import TheSidenav from '~/components/Navigation/TheSidenav'

export default{
  components: {
    TheHeader,
    TheSidenav
  },
  data () {
    return {
      displaySideNavbar: false
    }
  }
}
</script>


<style>
html {
  font-family: 'Open Sans, sans-serif';
}

body {
  margin: 0;
}
</style>