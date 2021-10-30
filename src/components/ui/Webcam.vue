<template>
  <div
    ref="webcam"
    class="bg-serenity-light-gray h-3/4 w-full flex items-center justify-center"
  >
    <div
      v-if="showVideo"
      class="space-y-1 px-6"
    >
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
        class="w-full h-52 object-contain"
        :src="imageUrl"
      >
      <canvas
        v-show="false"
        ref="canvas"
        :width="200"
        :height="200"
      />
      <div
        class="camera-shoot"
      >
        <SeButton
          v-if="imageUrl && isPhotoTaken"
          size="sm"
          @click="changePhoto"
        >
          Change Photo
        </SeButton>
        <SeButton
          v-else
          size="sm"
          @click="takePhoto"
        >
          Take Photo
        </SeButton>
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
import model from '@/mixins/model'

export default {
  name: 'Webcam',

  components: { Camera },

  mixins: [model],

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
      imageUrl: null,
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

    localValue: {
      deep: true,
      handler(val, oldVal) {
        if (!val || val == oldVal) return
        
        this.isPhotoTaken = true
        this.showVideo = true
        this.imageUrl = typeof val === 'string' ? val : URL.createObjectURL(val)
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

    async changePhoto() {
      await this.initVideo()
      this.isPhotoTaken = false
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
      this.imageUrl = data
      this.$emit('input', data)
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
            this.$toast.error('Make sure to enable the camera on your browser', {
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
