import get from 'lodash/get'
import Vue from 'vue'
export default {
  fullName: state => {
    return state.user ? `${state.user.first_name} ${state.user.last_name}` : null
  },

  authorizationHeader: state => {
    return state.token ? `Bearer ${state.token}` : null
  },

  isLoggedIn: state => state.loggedIn,

  organizations: state => state.organizations,

  userPermissions: state => get(state.provider, 'permissions.permissions'),

  userWorkspaces: (state, getters, rootState) => {
    const workspaces = get(rootState.workspaces, 'workspaces')

    return getters.userPermissions ? getters.userPermissions.workspaces.map(workspace => {
      const workspaceName = workspaces.find(space => space.workspace_type === workspace.split('.')[0])
      return {
        label: workspaceName ? workspaceName.workspace_name : 'In Patient',
        value: workspace.split('.')[0],
      }
    }): []
  },

  hasPaymentPermission: () => {
    return Vue.prototype.$userCan('bills.acceptcash.read')
    || Vue.prototype.$userCan('bills.acceptuseracccount.write')
    || Vue.prototype.$userCan('bills.acceptcorporate.write')
    || Vue.prototype.$userCan('bills.acceptinsurance.write')
  },

  practitionerRoleId: state => get(state.provider, 'practitionerRoleId'),

  userRoles: (state, getters) => {
    if (!getters.userPermissions) {
      return []
    }
    let roles = []

    getters.userPermissions.resources.forEach(resource => {
      if (resource.includes('*')) {
        let prefix = resource.slice(0,-2).toLowerCase()

        roles.push(`${prefix}.read`,`${prefix}.write`,`${prefix}.delete`)
      } else {
        roles.push(resource.toLowerCase())
      }
    })

    return roles
  },
}
