<template>
  <div class="NAME">
    <div class="content">
      <vue-easy-lightbox :visible="visible" :imgs="imgs" @hide="handleHide"></vue-easy-lightbox>

    </div>
  </div>
</template>

<script>
export default {
  name: 'NAME',
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
