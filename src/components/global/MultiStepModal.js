export default {
  name: 'MultiStepModal',

  props: ['value', 'parent'],

  data() {
    return {
      visible: false,
      form: {},
      steps: [],
    }
  },
  /*eslint-disable */
  render: function (h) {
    const children = this.$slots.default
    this.steps = children
    return (
      <div>{this.activeSlot()}</div>
    )
  },

  computed: {
    
  },

  methods: {
    slots() {
      return this.$scopedSlots.default({data: this.data})
    },
    activeSlot() {
      const slots = this.slots()
      const currentSlot = slots[this.value]
      return currentSlot
    },
    close() {
      console.info('close')
      this.visible = false
    },
    
    next(form) {
      if(this.value < this.steps.length - 1){
        this.$emit('input', this.value + 1)
        setTimeout(()=> {
          const slot = this.slots()[this.value]
          Object.assign(slot.componentInstance.$data.form, form)
          slot.componentInstance.$forceUpdate(); 
        }, 100)
      }
    },
    prev(form) {
      if(this.value > 0){
        this.$emit('input', this.value - 1)
        setTimeout(()=> {
          const slot = this.slots()[this.value]
          console.info(slot, form)
          slot.componentInstance.form = Object.assign(slot.componentInstance.form, form)
          slot.componentInstance.$forceUpdate(); 
        }, 100)
      }
    },
  },
}
