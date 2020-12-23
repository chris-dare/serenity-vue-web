<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="modalVisible"
    size="xs"
  >
    <template slot="content">
      <div class="flex items-center justify-between mb-6 w-full">
        <p>Note details</p>
      </div>
      <div>
        <p class="text-secondary mb-2">Written by</p>
        <div class="flex items-center py-2">
          <img
            class="w-10 h-10 rounded-full mr-3"
            :src="$faker().image.image()"
            alt=""
          />
          <div>
            <p>Dr. {{ $faker().name.findName() }}</p>
            <p class="text-secondary text-xs">
              General Practitioner
            </p>
          </div>
        </div>

        <div class="my-6">
          <p class="text-secondary text-sm mb-2">Encounter</p>
          <div class="flex items-center">
            <p>Nov. 10, 2020</p>
            <p class="text-sm text-primary ml-2">
              {{ $faker().lorem.word() }}
              <router-link
                to="/"
                class="text-serenity-primary font-bold underline ml-2"
                >View encounter</router-link
              >
            </p>
          </div>
        </div>
        <div class="my-6">
          <p class="text-secondary text-sm mb-2">Area</p>
          <p>In Patient</p>
        </div>
        <div class="my-6">
          <p
            class="text-secondary text-sm pb-2 border border-solid border-subtle"
          >
            Details
          </p>
          <p>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. <br />
            <br />
            The passage is attributed to an unknown typesetter in the 15th
            century who is thought to have scrambled parts of Cicero's De
            Finibus Bonorum et Malorum for use in a type specimen book.
            <br />
            <br />
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs.
          </p>
        </div>
      </div>
      <div class="w-full mt-8">
        <SeButton variant="secondary" full> Close</SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'PatientNotesModal',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    modalVisible: {
      set(val) {
        this.$emit('visible:update', val)
      },
      get() {
        return this.visible
      },
    },
  },
}
</script>
