
const validateRequiredField = ($v, field) => {
  const $field = $v.form[field]
  const formattedField = field.charAt(0).toUpperCase() 
    + field.slice(1).replace(/([-_]\w)/g, g => ' '+g[1].toUpperCase())

  if($field.$error && $field.$dirty){
    if($field.sameAsPassword === false){
      return 'Passwords do not match'
    }

    if($field.maxLength === false){
      return `${formattedField} should not exceed ${$field.$params.maxLength.max} characters`
    }

    if($field.minLength === false){
      return `${formattedField} should not be less than ${$field.$params.minLength.min} characters`
    }

    return `${formattedField} is required`
  }
  return ''
}

const createRandom = (number = 10) => {
  return Math.floor(Math.random() * number) + 1
}

const formatIncomingRoles = (data) => {
  let role = { ...data }
  let resources = data.permissions.resources
  let workspaces = data.permissions.workspaces
  let newResources = []
  let newWorkspaces = []

  resources.forEach(resource => {
    if (resource.includes('*')) {
      let split = resource.split('.')
      let root = split.length === 2 ? split[0] : `${split[0]}.${split[1]}`
      newResources.push(`${root}.read`,`${root}.write`,`${root}.delete`)
    } else {
      newResources.push(resource)
    }
  })

  workspaces.forEach(workspace => {
    if (workspace.includes('*')) {
      let split = workspace.split('.')
      newWorkspaces.push(split[0])
    } else {
      newWorkspaces.push(workspace)
    }
  })

  role.permissions.resources = newResources
  role.permissions.workspaces = newWorkspaces
  return role
}

const formatOutgoingRoles = (data) => {
  let role = { ...data }
  let resources = data.permissions.resources
  let workspaces = data.permissions.workspaces
  let newResources = []
  let newWorkspaces = []

  let splits = {}
  resources.forEach(resource => {
    let split = resource.split('.')
    split = [ split.slice(0, split.length - 1).join('.'), split[split.length - 1] ]
    splits[split[0]] = splits[split[0]] || []
    if(!splits[split[0]].includes(split[1])){
      splits[split[0]].push(split[1])
    }
  })
  Object.keys(splits).forEach(key => {
    let split = splits[key]
    if(split.length === 3){
      newResources.push(`${key}.*`)
    }else{
      split.forEach(el =>{
        newResources.push(`${key}.${el}`)
      })
    }
  })

  workspaces.forEach(workspace => {
    newWorkspaces.push(`${workspace}.*`)
  })
  role.permissions.resources = newResources
  role.permissions.workspaces = newWorkspaces
  return role
}

export default {
  install(Vue) {
    Vue.prototype.$utils = {
      validateRequiredField,
      createRandom,
      formatIncomingRoles,
      formatOutgoingRoles,
    }
  },
}
