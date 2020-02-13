<template>
  <div class="GhostFort">
    <div class="content">
      <vue-easy-lightbox :visible="visible" :imgs="imgs" @hide="handleHide"></vue-easy-lightbox>

      <h2>Ghost Fort</h2>
      <p>Ghost Fort is a multiplayer roguelike prototype. The main idea was to handle as many entities as possible. It was also a good excuse to take a crack at learning more C++. The core of the project was a multi-threaded game loop. I mostly went for this approach just to see if I could do it.</p>
      <p>Each entity has an early, main and late update phase. The early phase gathers any information needed from other entities, main applies any changes to itself and queues request for other entities that are being interacted with, and late handles any request made by other entities. Doing it this way cuts back on a lot of blocking and waiting on entities on other threads. And because I can’t ensure execution order, this ensures actions are applied effectively at the same time. For example, if two entities hurt each other at the same time, the results are applied after both actions are taken.</p>
      <p>
        The loop itself functions on two queues (current and buffer) as well as a worker thread pool.
        Entities are in charge of their own queue status. At the end of an entity’s update, if it becomes inactive, it doesn’t add itself to the buffer queue. Active entities can interact with inactive ones, adding them back to the buffer queue for the next frame.
      </p>
      <div v-highlight>
      <pre class="lang-js"><code>
case WORKPHASE_EARLY:
	while (game->gameQueue->PopEarly(gameObject))
	{
		gameObject->EarlyUpdate(game->DeltaTime());
	}

	SetWorkPhase(WORKPHASE_WAIT);
	break;
		</code></pre>
      </div>
      <p>The execution order is pretty simple. All active entities must finish their early update before main update starts, and likewise for the main and late updates. A pool of worker threads pulls from the current queue as fast as they can and, when the queue is empty, they move onto the next update phase. Once all the update phases are complete, I swap the current and buffer queues pointers.</p>
      <p>That’s the gist of how the prototype works. It was mostly just an exercise in learning to do something odd in C++, I’m not sure if I would apply it to a full game. I can see the AI and queueing systems sprawling and becoming a mess, but as a proof of concept it certainly worked ok.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GhostFort',
  data: function () {
    return {
      imgs: '', // Img Url , string or Array
      visible: false,
      index: 0 // default
    }
  },

  methods: {
    show (img) {
      console.log(img)
      this.imgs = img
      this.visible = true
    },
    handleHide () {
      this.visible = false
    }
  },

  mounted: function () {
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
