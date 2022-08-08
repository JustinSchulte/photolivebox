<template>
  <v-row>
    <v-col class="text-center">
      <v-file-input
        v-model="myFile"
        label="Select a file"
        accept="image/*"
      ></v-file-input>
      <v-btn :loading="isLoading" :disabled="isLoading" @click="uploadFile">
        UPLOAD
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      myFile: null,
      isLoading: false,
    }
  },
  methods: {
    async uploadFile() {
      this.isLoading = true
      const formData = new FormData()
      formData.append('image', this.myFile, this.myFile.name)
      const response = await this.$axios.post('/api/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(response)
      // TODO send error message if failed
      this.isLoading = false
    },
  },
}
</script>
