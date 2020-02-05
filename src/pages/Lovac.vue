<template>
  <div class="Lovac">
    <div class="content">
      <vue-easy-lightbox :visible="visible" :imgs="imgs" @hide="handleHide"></vue-easy-lightbox>

      <h2>Lovac</h2>
      <p>
        Lovac is my current project. It’s a 2D top-down ASCII space shoot-em-up, centered around collecting modules
        to expand your ship. The original prototype started in Unity as an experiment to see how far I could push
        ASCII art. I felt like I was fighting with Unity a lot on how I was originally trying to render the planets,
        so I began work on another prototype in LatticeLight. This time, I generated the planets in a much cleaner
        way, but when i got to building the module systems I realized Unity’s component architecture would be an
        extremely good fit, and I could port the new planet generation.
      </p>
      <p>
        The current planet generation in Lovac is another example of an odd mesh I’ve had to build. It’s actually
        hundreds of quads organized into a cylinder. I do some texture atlasing from a spritesheet to assign tiles
        their sprite. After that, it’s a simple shader to cut the corners off, making it look 2D with just a smidge
        of depth.
      </p>
      <div>
        <img
          src="static/images/lovac/terrestrial_planet.png"
          class="img-responsive, img-clickable"
          @click="show('static/images/lovac/planet.gif')"
        />
        <img src="static/images/lovac/cylinder_view.png" class="img-responsive" />
      </div>
      <p>
        The planet's surface uses a Unity port of LibNoise. The part I really like is how simple Unity’s editor made
        it for me to set up generation ranges, so the planets are easily customizable.
      </p>
      <div>
        <img src="static/images/lovac/generation_settings.png" class="img-responsive" />
        <img src="static/images/lovac/lava_planet.png" class="img-responsive" />
      </div>
      <p>
        I’m also pretty proud of the collisions from the original prototype. Ship collisions are done per-tile, so I
        use Unity’s physics as a broadphase. Ships could be made out of potentially 1000s of tiles, so it’s not
        viable to check every tile against every other tile every frame. The solution was to use a quadtree with a
        bucket size of 4. Instead of 1000s of tiles, the collision check only has to look at a few rectangles that
        get recursively smaller until it stops at a tile.
      </p>
        <img src="static/images/lovac/ship_collisions.png" class="img-responsive" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Lovac",
  data: function() {
    return {
      imgs: "", // Img Url , string or Array
      visible: false,
      index: 0 // default
    };
  },

  methods: {
    show(img) {
      console.log(img);
      this.imgs = img;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
</style>