<template>
  <div class="CubeMaze">
    <div class="content">
      <vue-easy-lightbox :visible="visible" :imgs="imgs" @hide="handleHide"></vue-easy-lightbox>

      <h2>CubeMaze</h2>
      <p>
        CubeMaze is a simple maze game wrapped around a cube. I started this project as part of a small
        game-jam at work. While it's another example of an odd mesh I've had to
        generate at runtime, I think the much more intresting aspect is the maze generation itself.
      </p>

      <p>
        While reserching types of maze generation I found that most are built ontop of a 2D array, that's fine for flat surfaces,
        But it would make it difficult for wrapping around a cube, so I opted to build a node-graph with the points centered on each
        tile of the mesh instead.
      </p>

      <img src="static/images/cubemaze/navmesh.jpg" class="img-responsive" />

      <p class="padtop">
        The way the nodes on the edges of each side are connected isn't particularly elegant, but it works well enough and I only
        had the weekend to build the whole game.
      </p>

      <p>At this point in generation nodes are still stored in a 1D 2D-indexed array per face of the cube.</p>

      <div v-highlight>
        <pre class="lang-java"><code>
// For example
int totalNodes = faces * size * size
Node[] nodes = new Node[totalNodes];
        </code></pre>
      </div>

      <div v-highlight>
        <pre class="lang-java"><code>
// Returns an array of all the indices for an edge of a face
private int[] getEdge(int faceIndex, int direction)
{
    int[] indices = new int[size];
    switch (direction)
    {
        // this is a modifided version of index = (y + (x * width)) 
        // But also only returning the edge nodes of that square.
        case DOWN:
            for (int i = 0; i < size; i++)
            {
                indices[i] = (i + (0 * size)) + faceIndex;
            }
            break;
        case LEFT:
            for (int i = 0; i < size; i++)
            {
                indices[i] = (0 + (i * size)) + faceIndex;
            }
            break;
        case UP:
            for (int i = 0; i < size; i++)
            {
                indices[i] = (i + ((size - 1) * size)) + faceIndex;
            }
            break;
        case RIGHT:
            for (int i = 0; i < size; i++)
            {
                indices[i] = ((size - 1) + (i * size)) + faceIndex;
            }
            break;
    }
    return indices;
}
        </code></pre>
      </div>
      <div v-highlight>
        <pre class="lang-java"><code>
private void AttachEdges()
{
    int sqrSize = size * size;

    //Get an array of indices for each edge 
    // on each side of each face [6 * 4][size];
    int[,][] faceEdges = new int[6, 4][];
    for (int face = 0; face < 6; face++)
    {
        for (int direction = 0; direction < 4; direction++)
        {
            faceEdges[face, direction] = 
              getEdge(face * sqrSize, direction);
        }
    }

    // loop though the size of the cube, attaching all the edges
    for (int i = 0; i < size; i++)
    {
        AttachEdgeNode(faceEdges, i, 0, 2, DOWN, DOWN);
        AttachEdgeNode(faceEdges, i, 0, 1, LEFT, LEFT);
        AttachEdgeNode(faceEdges, i, 0, 4, UP, DOWN);
        AttachEdgeNode(faceEdges, i, 0, 3, RIGHT, LEFT);

        AttachEdgeNode(faceEdges, i, 1, 2, DOWN, LEFT);
        AttachEdgeNode(faceEdges, i, 1, 4, UP, LEFT);
        AttachEdgeNode(faceEdges, i, 1, 5, RIGHT, LEFT);

        AttachEdgeNode(faceEdges, i, 5, 2, DOWN, UP);
        AttachEdgeNode(faceEdges, i, 5, 3, RIGHT, RIGHT);
        AttachEdgeNode(faceEdges, i, 5, 4, UP, UP);
        
        AttachEdgeNode(faceEdges, i, 3, 4, UP, RIGHT);
        AttachEdgeNode(faceEdges, i, 3, 2, DOWN, RIGHT);
    }
}
        </code></pre>
      </div>
      <p
        class="padtop"
      >finally I can use the index of the nodes to connect them in the correct directions.</p>
      <div v-highlight>
        <pre class="lang-java"><code>
private void AttachEdgeNode(
    int[,][] faceEdges, int i,
    int nodeA, int nodeB, 
    int directionA, int directionB
)
{
    Node current = nodes[faceEdges[nodeA, directionA][i]];
    Node neighbour = nodes[faceEdges[nodeB, directionB][i]];
    current.Attach(neighbour, directionA);
    neighbour.Attach(current, directionB);
}
        </code></pre>
      </div>

      <p class="padtop">
        It's not the cleanest and it's not the most optimal way to build the node-graph, but it was the
        way that was the quickest to write and fit with how the rest of the cube generation was written.
      </p>

      <p>
        Because I seperated out the maze generation itself and converted a few common algoritims to use a node-graph
        instead of an array, it was really easy to swap in a diffrent algoritim, or even in the future diffrent shapes.
      </p>

      <p>
        The algoritim you see in the final game is a modified version of the Kruskal-S algoritim. I tested
        a few diffrent maze generators, it was what ended up feeling the best. I find this blog explains diffrent
        types of generation extremely well
        <a
          href="http://weblog.jamisbuck.org/2011/1/3/maze-generation-kruskal-s-algorithm"
          target="_blank"
        >http://weblog.jamisbuck.org/</a>
      </p>

      <div class="note">click for a gif</div>
      <img
        src="static/images/cubemaze/cubemaze.png"
        class="img-responsive, img-clickable"
        @click="show('static/images/cubemaze/cubemaze.gif')"
      />

      <p>
        You can play the game on
        <a
          href="https://saltboxgames.itch.io/cubemaze"
          target="_blank"
        >itch.io</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CubeMaze",
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
    window.scrollTo(0, 0);

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
