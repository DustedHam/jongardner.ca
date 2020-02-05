<template>
  <div class="Latticelight">
    <div class="content">
      <vue-easy-lightbox :visible="visible" :imgs="imgs" @hide="handleHide"></vue-easy-lightbox>

      <h2>Ghost Fort</h2>
      <p>LatticeLight is a lightweight ASCII game engine built on the Lightweight Java Game Library. To make it easier for developers to create their games, I built a behaviour that takes care of atlasing the ASCII characters from the tilesheet onto a tile mesh. It’s a bunch of quads thrown into a single vertex buffer object. Because I got to build the VBO from scratch I could add a few interesting features, such as multi-coloring tiles.</p>

      <img src="static/images/latticelight/multcolortiles.png" class="img-responsive" />

      <div v-highlight>
        <pre class="lang-java"><code>
string text = "Hello";
example = new TileMesh(text.lenght(), 1, 16, 16);
Vector3f[] colors = new Vector3f[4];
for(int x = 0; x < example.getWidth(); x ++)
	for(int c = 0; c < colors.lenght; c++)
		colors[c] = new Vector3f(
								(float) Math.random(), 
								(float) Math.random(), 
								(float) Math.random())
	}
	example.bufQuadColor(x, 0, colors);
	example.bufQuadTile(x, 0, text.charAt(x));
}
example.pushBuffers();
		</code></pre>
      </div>
      <p>You can select a tile via its index or (x, y) coord in the tile sheet. Or as you see above if it’s a keyboard character you can retrieve the tile from it’s string character.</p>
      <p>Engine tools are utilities developers can create that are not meant to be used for gameplay, but rather as additions to the engine.</p>
      <p>One of the tools I’ve built into the engine is a terminal. It’s a bit of a special case. Every engine tool’s active state can be set using the console, but the console itself can also be opened using keyboard shortcuts. I like how the console has turned out so far. It’s mostly feature complete with the exception of tab auto-complete and mouse control, which I plan to add in the future.</p>

      <img src="static/images/latticelight/console.png" class="img-responsive" />

      <p>One thing I really appreciate in a game engine is an in-game console, so I was set on making sure mine had one. I may try to replicate the console for an ASCII framework in Unity, as it’s a feature I miss having.</p>
      <p>Getting live debug information isn’t exactly viable via a console, so my solution was to take a partial note from Unity: the Debug view is the 2nd engine tool that I built into the engine. It’s not as powerful as Unity’s editor, but it lets you place panels in screen space or world space, you can even have the panels follow the objects you’re viewing.</p>
      <div>
        <img src="static/images/latticelight/debug2.png" class="img-responsive" />

        <div v-highlight>
          <pre class="lang-java"><code>
class CelestialBody
{
	@DebugVariable
	private int radius;
	private Quaternionf quatRotation;
	
	@DebugVariable
	public	Vector3f position;
	
			</code></pre>
        </div>
        <div v-highlight>
          <pre class="lang-java"><code>
	body = new CelestialBody(new Vector3f(50, 25, 0), 30);
	DebugView.put(body, "test-body");
	
		      </code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Latticelight",
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
</style>