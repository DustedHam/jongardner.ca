<template>
  <div class="Lovac">
    <div class="content">
      <vue-easy-lightbox :visible="visible" :imgs="imgs" @hide="handleHide"></vue-easy-lightbox>

      <h2>Lovac</h2>
      <p>
        Lovac is my passion project, I
        <b>will</b> finish it. It’s a 2D top-down ASCII space shoot-em-up, centered around collecting modules
        to expand your ship. The original prototype started in Unity as an experiment to see how far I could push
        ASCII art. I felt like I was fighting with Unity a lot on how I was originally trying to render the planets,
        so I began work on another prototype in LatticeLight. I generated the planets in a much cleaner
        way, but when i got to building the module systems I realized Unity’s component architecture would be an
        extremely good fit, and I could port the new planet generation. So back to Unity.
      </p>
      <p>
        The current planet generation in Lovac is an example of an odd mesh I’ve had to build. It’s actually
        hundreds of quads organized into a cylinder. I do some texture atlasing from a spritesheet to assign tiles
        their sprite. After that, it’s a simple shader to cut the corners off, making it look 2D with just a smidge
        of depth.
      </p>
      <div>
        <div class="note">click for a gif</div>
        <img
          src="static/images/lovac/terrestrial_planet.png"
          class="img-responsive, img-clickable"
          @click="show('static/images/lovac/planet.gif')"
        />
        <img src="static/images/lovac/cylinder_view.png" class="img-responsive" />
      </div>
      <p class="padtop">
        The planet's surface uses a Unity port of LibNoise. The part I really like is how simple Unity’s editor made
        it for me to set up generation ranges, so the planets are easily customizable.
      </p>
      <div>
        <img src="static/images/lovac/generation_settings.png" class="img-responsive" />
        <img src="static/images/lovac/lava_planet.png" class="img-responsive" />
      </div>
      <p class="padtop">
        I’m also pretty proud of the collisions system. Ship collisions are done per-tile, so I
        use Unity’s physics as a broadphase. Ships could be made out of potentially 1000s of tiles, it’s not
        viable to check every tile against every other tile every frame. The solution was to use rotated quadtrees with a
        bucket size of 4. Instead of 1000s of tiles, the collision check only has to do a handful of SAT checks on squares that
        get recursively smaller until it stops at a tile.
      </p>
      <p>
        Ideally I'd like to be able rewite this system to work within Unity's ECS system. Quadtrees are typically a node-graph type data structure though and
        ECS works best with all the data arranged linear in memory. I'm still trying to work out how/if it would be better at all.
      </p>
      <div class="note">click for a gif</div>
      <img
        src="static/images/lovac/collisions.png"
        class="img-responsive, img-clickable"
        @click="show('static/images/lovac/collisions.gif')"
      />
      <p class="padtop">
        The last part of Lovac that I think is intresting from a programming perspective is that the ship modules and components are completely described
        with external JSON files. This opens the game up to being largely soft-moddable, anyone looking to add new module types wouldn't have to touch any
        code or Unity at all.
      </p>
      <div v-highlight>
        <pre class="lang-java"><code>
// A module with a turret
{
    "behaviour": "emplacement",
    "layout": "emplacement",
    "Description": "Stuff Stuff Stuff",
    "turrets": [       
        "dual-turret"
    ],
    "offsets": [
        {"x": 0, "y": 0}
    ]
}
        </code></pre>
      </div>
      <div v-highlight>
        <pre class="lang-java"><code>
// A turret with 2 guns
{
    "layout": "dual-turret",
    "layer": 1,
    "rotation-speed": 2.5,
    "guns": [
        { "type": "base-gun", "pos": { "x": -0.5, "y": 0 } },
        { "type": "base-gun", "pos": { "x":  0.5, "y": 0 } }
    ]
}
        </code></pre>

      So with a few simple JSON files you end up with something like this.

      </div>
      <div class="note">click for a gif</div>
      <img
        src="static/images/lovac/turret.png"
        class="img-responsive, img-clickable"
        @click="show('static/images/lovac/turret.gif')"
      />
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
      this.imgs = img;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    }
  },

  mounted: function() {
    const codeTags = document.getElementsByTagName("code");

    for (let i = 0; i < codeTags.length; i++) {
      const code = codeTags[i];
      code.innerHTML = code.innerHTML.trim();
    }
  }
};
</script>

<style scoped>
@import "../article.css";
</style>
