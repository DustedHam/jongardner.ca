<template>
  <div class="Home">
    <div class="container-fluid content">
      <div class="row">
        <div class="col-md-4 col-lg-4 project">
          <!--<a href=""> -->
          <img src="static/images/index/notdeadinside.png" />
          <h3>Jonathan Gardner</h3>
          <!--</a>	-->
          <div class="description">Game Developer</div>
        </div>

        <div class="col-md-4 col-lg-4 project">
          <router-link to="Lovac">
            <img src="static/images/index/planet.png" />
            <h3>Lovac</h3>
          </router-link>
          <div class="description">ASCII Space Rogue-Lite</div>
        </div>

        <div class="col-md-4 col-lg-4 project">
          <router-link to="MeshGeneration">
            <img src="static/images/index/mesh.png" />
            <h3>Mesh Generation</h3>
          </router-link>
          <div class="description">Low-Poly Terrain Editing</div>
        </div>

        <div class="col-md-4 col-lg-4 project">
          <router-link to="Latticelight">
            <img src="static/images/index/latticelight.png" />
            <h3>LatticeLight</h3>
          </router-link>
          <div class="description">ASCII Game Engine</div>
        </div>

        <div class="col-md-4 col-lg-4 project">
          <router-link to="Finley">
            <img src="static/images/index/finley.png" />
            <h3>Finley</h3>
          </router-link>
          <div class="description">ASCII Multiplayer Shooter</div>
        </div>

        <div class="col-md-4 col-lg-4 project">
          <router-link to="GhostFort">
            <img src="static/images/index/ghostfort.png" />
            <h3>Ghost Fort</h3>
          </router-link>
          <div class="description">C++ Game Architecture Experiment</div>
        </div>
      </div>
      <!-- Row -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
</style>