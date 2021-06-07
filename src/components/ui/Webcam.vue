<template>
  <div
    ref="webcam"
    class="bg-serenity-light-gray h-3/4 w-full flex items-center justify-center"
  >
    <div v-if="showVideo">
      <video
        v-show="!isPhotoTaken"
        ref="video"
        width="100%"
        height="100%"
        autoplay
        class="border border-solid"
      />
      <img
        v-show="isPhotoTaken"
        width="200"
        height="auto"
        :src="photo"
      >
      <canvas
        v-show="false"
        ref="canvas"
        :width="200"
        :height="200"
      />
      <div
        v-if="showVideo"
        class="camera-shoot"
      >
        <button
          type="button"
          class="button"
          @click="takePhoto"
        >
          <template v-if="photo && isPhotoTaken">Change Photo</template>
          <template v-else>Take Photo</template>
        </button>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center cursor-pointer"
      @click="showVideo = !showVideo"
    >
      <Camera class="w-16 h-16 text-secondary" />
      <p class="text-secondary">Click to use webcam</p>
    </div>
  </div>
</template>

<script>
import Camera from '@carbon/icons-vue/es/camera/32'
export default {
  name: 'Webcam',

  components: { Camera },

  data() {
    return {
      showVideo: false,
      video: {},
      canvas: {},
      isCameraOpen: false,
      isPhotoTaken: false,
      photo: null,
      width: null,
      height: null,
    }
  },

  computed: {
    dimensions() {
      return {
        height: this.$refs.webcam.clientHeight,
        width: this.$refs.webcam.clientWidth,
      }
    },
  },

  watch: {
    showVideo: {
      deep: true,
      immediate: true,
      handler: function (val) {
        if (val) {
          this.initVideo()
        }
      },
    },
  },

  methods: {
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false
        this.isPhotoTaken = false
        this.stopCameraStream()
      } else {
        this.isCameraOpen = true
        this.createCameraElement()
      }
    },
    async takePhoto() {
      this.isPhotoTaken = !this.isPhotoTaken
      const canvas = this.$refs.canvas
      const video = this.$refs.video
      const context = this.$refs.canvas.getContext('2d')
      canvas.setAttribute('width', video.videoWidth)
      canvas.setAttribute('height', video.videoHeight)
      context.drawImage(this.$refs.video, 0, 0, video.videoWidth, video.videoHeight)
      let data = canvas.toDataURL('image/png')
      this.photo = data
      this.$emit('input', this.photo)
      // await navigator.mediaDevices
      //   .getUserMedia({ video: true })
      //   .then((stream) => {
      //     stream.getTracks()[0].stop()
      //   })
    },

    async initVideo() {
      await navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          var video = this.$refs.video

          window.stream = stream

          video.srcObject = stream

          this.$refs.video.play()

          return navigator.mediaDevices.enumerateDevices()
        })
        .then(this.gotDevices)
        .catch((err) => {
          if (err.message === 'Permission denied') {
            this.$alert('Make sure to enable the camera on your browser', {
              showCancelButton: false,
              type: 'warning',
              confirmButtonText: 'Okay',
            })
          }

          return err
        })
    },
  },
}
</script>
