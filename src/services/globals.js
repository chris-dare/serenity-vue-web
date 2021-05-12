export const registerBaseComponents = vm => {

  const requireComponent = require.context('../components/ui', true, /\.vue$/)


  requireComponent.keys().forEach(filename => {
    const componentConfig = requireComponent(filename)
    const componentName = componentConfig.default?.name ? componentConfig.default.name : filename.replace(/^\.\//, '').replace(/\.\w+$/, '')

    vm.component(componentName, componentConfig.default || componentConfig)
  })
}