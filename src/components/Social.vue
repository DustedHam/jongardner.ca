<template>
  <div class="Social">
    <a href="https://github.com/DustedHam" target="_blank">
      <font-awesome-icon :icon="['fab', 'github-square']" size="4x" />
    </a>
    <a href="https://twitter.com/DustedHam" target="_blank">
      <font-awesome-icon :icon="['fab', 'twitter-square']" size="4x" />
    </a>
    <a href="https://dustedham.itch.io/" target="_blank">
      <font-awesome-icon :icon="['fab', 'itch-io']" size="4x" />
    </a>
  </div>
</template>

<script>
export default {
  name: "Social"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Social {
  padding-top: 20px;
}

.fa-twitter,
.fa-twitter-square {
  color: #00aced;
}

.fa-itch-io {
  color: #fa5c5c;
}

.fa-github-square {
  color: #24292e;
}
</style>
