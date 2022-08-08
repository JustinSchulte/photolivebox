<template>
  <v-container class="pa-0">
    <v-carousel
      v-model="activeImage"
      height="100vh"
      cycle
      :interval="imageInterval"
      show-arrows-on-hover
      hide-delimiters
      transition="fade-transition"
    >
      <v-carousel-item v-for="(item, i) in images" :key="i">
        <v-img
          class="fill-height"
          :src="item"
          contain
          max-height="1080"
          max-width="1920"
        ></v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      activeImage: null,
      images: [],
      timer: null,
      lastDate: '2022-07-31T18:20:44Z',
      imageInterval: 10000, // 10 sec
    }
  },
  mounted() {
    const elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden'
    this.getNewImages()
    // check every 5 seconds if new images exists
    this.timer = setInterval(() => {
      this.getNewImages()
    }, 5000)
  },
  beforeDestroy() {
    const elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = null
    clearInterval(this.timer)
  },
  methods: {
    async getNewImages() {
      const formData = new FormData()
      formData.append('lastDate', this.lastDate) // '2022-07-31T18:20:44Z')
      const response = await this.$axios.post(
        '/api/images/newImages',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      if (response?.status === 200 && response.data.newFiles) {
        const files = response.data.files
        this.lastDate = response.data.newLastDate
        // add the new images to the front of the array
        this.images = [
          ...files.map((file) => `data:image/png;base64,${file}`),
          ...this.images,
        ]
        // set the current image to the first one
        this.activeImage = 0
      }
    },
  },
}
</script>