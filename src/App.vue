<template>
  <div id="app">
    <router-view />
    <Social />
  </div>
</template>

<script>
import Social from "./components/Social";

export default {
  name: "App",
  components: {
    Social
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oxygen|Oxygen+Mono&display=swap');
@import './style.css';

#app {
  font-family: 'Oxygen', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
