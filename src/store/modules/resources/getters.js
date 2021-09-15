import uniq from 'lodash/uniq'
import meds from './meds'
export default {
  resources: state => {
    const resources = []

    const data = uniq(state.resources.map(resource => {
      let gr = resource.split('.')
      return gr.length === 2 ? gr[0] : `${gr[0]}.${gr[1]}`
    }))

    data.forEach(element => {
      // group data
      let group = state.resources.filter(resource => resource.includes(element))

      let resourceObject = {
        rootLabel: element.split('.').length === 2 ? element.split('.')[0] : element,
        hasChildren: element.split('.').length === 2,
        value: element,
        groups: uniq(group.map(gp => {
          let split = gp.split('.')
          return split[split.length -1]
        })),
      }
      return resources.push(resourceObject)
    })

    return resources
  },

  medications: () => {
    return meds[0].split(', ')
  },

  getEncounterClassDisplayName: (state) => (code) => {
    return state.encounterClasses.find(enc => enc.code === code)?.display
  },
}
