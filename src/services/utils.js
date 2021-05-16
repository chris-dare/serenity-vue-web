// import values from 'lodash/values'
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

    if($field.email === false){
      return `${formattedField} format is invalid`
    }
  
    return `${formattedField} is required`
  }
  return ''
}

const createRandom = (number = 10) => {
  return Math.floor(Math.random() * number) + 1
}

const renameKey = (object, key, newKey) => {
  const clonedObj = { ...object }
  const targetKey = clonedObj[key]
  delete clonedObj[key]
  clonedObj[newKey] = targetKey
  return clonedObj

}

const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {},
  )

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

const checkForEmpty = (tree) => {
  Object
    .entries(tree)
    .forEach(([k, v]) => {
      if (v && typeof v === 'object') {
        checkForEmpty(v)
      }
      if (v && typeof v === 'object' && !Object.keys(v).length || v === null || v === undefined || v.length === 0) {
        if (Array.isArray(tree)) {
          tree.splice(k, 1)
        } else {
          delete tree[k]
        }
      }
    })
  return Object.keys(tree).length === 0
}

const error = (err, toast) => {
  console.log('error', err)
  if (err) {
    const error = err.data ? err.data[0] || err.data.detail || err.data.message : err.error || err.message
    toast.open({ message: error, type: 'error' })
  }
  
  throw error
}

const customNameLabel = ({ first_name, last_name }) => {
  return `${first_name} ${last_name}`
}

const getFilteredData = (data, searchTerms, searchFields) => {
  let filteredData = data.filter(data => {
    if (!searchTerms) {
      return data
    }

    for (let index = 0; index < searchFields.length; index++) {
      const element = searchFields[index]
      if (data[element]?.toLowerCase().includes(searchTerms.toLowerCase())) {
        return data
      }
    }
  })

  return filteredData
}

export default {
  install(Vue) {
    Vue.prototype.$utils = {
      validateRequiredField,
      createRandom,
      formatIncomingRoles,
      formatOutgoingRoles,
      renameKey,
      renameKeys,
      checkForEmpty,
      customNameLabel,
      error: err => error(err, Vue.prototype.$toast),
      getFilteredData,
    }
  },
}
