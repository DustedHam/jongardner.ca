<template>
  <div class="Finley">
    <div class="content">
      <h2>Finley</h2>
      <p>
        Finley is top down ASCII arena shooter, it started as a shared screen 1 vs 1 prototype.
        I rebooted it as a test game atop LatticeLight to see what the engine could do.
      </p>
      <p>I opted to perform a cardinal sin of multiplayer game dev, and I used a TCP socket. The main reason was for ease and speed of dev time, but also the number of actions a player sends the server per second is relatively low and a missed packet could mean not moving a whole tile. I stand by the decision, although I did leave room to rip the TCP socket out and replace it with a UDP one if the need ever arose.</p>
      <p>Most of my handling of the net code was quick and dirty. I’d write a command on the client/server that would send a request to the other. Then on the other I’d write a function to handle the incoming data. It was not scalable at all, I regret sacrificing a proper request/reply system in order to try and get the code written faster. I should have also written a bit packer especially because I already had all the overhead of TCP. All that said and done it actually ran really well.</p>
      <a
        href="https://pbs.twimg.com/media/CmisQGCWYAI6B4K.jpg"
        rel="lightbox"
        data-lightbox="walls-solution"
      >
        <img src="https://pbs.twimg.com/media/CmisQGCWYAI6B4K.jpg" class="img-responsive" />
      </a>
      <p>The sprite selection for walls is one part I really enjoy, it’s not terribly complex but I think it’s pretty neat. Depending on the neighboring tiles a different sprite would have to be selected, to avoid having a giant if statement, I used a small amount of bit-shifting and a switch case.</p>
      <div v-highlight>
        <pre class="lang-java"><code>
private int getLinearBitmask(int x, int y)
{
	int bitmask = 0;

	if(isWall(x, y - 1)) 	// North
		bitmask |= (1 << 3);
	if(isWall(x, y + 1)) 	// South
		bitmask |= (1 << 2);
	if(isWall(x + 1, y)) 	// East
		bitmask |= (1 << 1);
	if(isWall(x - 1, y)) 	// West
		bitmask |= (1 << 0);
	return bitmask;
}

private Vector2i getWallSprite(int x, int y)
{
	int bitmask = getLinearBitmask(x, y);

	switch (bitmask)
	{
	case WALL_MASK_EAST:
	case WALL_MASK_WEST:
	case WALL_MASK_HORIZONTAL:
		return GameInfo.sprite_wall_hori;
	case WALL_MASK_NORTH:
	case WALL_MASK_SOUTH:
	case WALL_MASK_VERTICAL:
		return GameInfo.sprite_wall_vert;
	case WALL_MASK_CROSS:
		return checkCross(x, y, bitmask);
		//Corners
	case WALL_MASK_NORTH | WALL_MASK_WEST:
		return GameInfo.sprite_wall_bottom_right;
    ...
        </code></pre>
      </div>
      <p class="padtop">The last bit of Finley that I really enjoy and might salvage my next multiplayer game is how I handle clients downloading maps. Clients download the current map when they connect to the server, I actually did this with a small web servlet and the maps are JSON files. I went the JSON route to allow players to easily make custom maps, and because it’s built like a web API server hosts can set up a remote web site as a fast download location, or community ran map databases could also be possible. Most multiplayer games live or die from their communities so I thought making customizing maps and weapons easy for users was important.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Finley',
  mounted: function () {
    window.scrollTo(0, 0);

    const codeTags = document.getElementsByTagName('code')

    for (let i = 0; i < codeTags.length; i++) {
      const code = codeTags[i]
      code.innerHTML = code.innerHTML.trim()
    }
  }
}
</script>

<style scoped>
@import "../article.css";
</style>
