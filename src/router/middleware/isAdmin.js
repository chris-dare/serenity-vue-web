
export default function isAdmin ({ next, store }) {

  const workspaces = store.getters['auth/userWorkspaces']
  const hasAdminWorkspace = !!workspaces.find(workspace => workspace.value === 'ADMIN')

  if (!hasAdminWorkspace) {
    return next({name: 'Dashboard'})
  }

  return next()
}