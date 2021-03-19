import Vue from 'vue'

// todo find better name
Vue.directive('nested-keyup', {
  // When the bound element is inserted into the DOM...
  inserted(el, binding) {
    // Focus the element
    let keycode = Object.keys(binding.modifiers)[0]
    switch(keycode){
      case 'enter':
        keycode = 13
    }
    console.info(binding)
    const elements = el.querySelectorAll(binding.arg)
    console.log(elements)
    elements.forEach(function(element) {
      element.addEventListener('keyup', (ev) => {
        if(keycode == ev.keyCode){
          binding.value()
        }
      })
    })
  },
  // unbind(el, binding){

  // }
})
