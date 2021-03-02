import uniq from 'lodash/uniq'
export default {
    resources: state => {
        const resources = state.resources

        return uniq(resources.map(resource => {
            return resource.split('.')[0]
        }))
    },
}
