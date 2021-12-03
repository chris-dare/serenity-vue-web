import isEmpty from 'lodash/isEmpty'

const validateRequiredField = ($v, field, parent = 'form') => {
  if(!$v[parent])return ''
  const $field = $v[parent][field]
  if(!$field) return ''
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

    if($field.minValue === false){
      return `${formattedField} should not be less than ${$field.$params.minValue.min}`
    }

    if($field.maxValue === false){
      return `${formattedField} should not be more than ${$field.$params.maxValue.max}`
    }

    if($field.email === false){
      return `${formattedField} format is invalid`
    }

    if($field.isUnique === false && $field.required){
      return `${formattedField} already exists`
    }

    if($field.bpvalidator === false){
      return `A valid ${formattedField.toLowerCase()} is required`
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
  let resources = role.permissions.resources
  let workspaces = role.permissions.workspaces
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
    let error = ''
    if (err.data) {
      error = err.data.error || err.data[0] || err.data.detail || err.data.message
    } else {
      error = err.response.data.error || err.message
    }

    if (!error) {
      let field = Object.keys(err.data)[0]
      error = field ? err.data[field][0] : null
    }

    toast.open({ message: error || 'Something went wrong', type: 'error' })
  }

  throw err
}

// takes a subset of an object given a set of keys to include and exclude
const objectSubset = (data, includedKeys, excludedKeys = []) => {
  includedKeys = includedKeys || Object.keys(data)
  let result = {}
  includedKeys.forEach(key => {
    if(!excludedKeys.includes(key)){
      result[key] = data[key]
    }
  })
  return result
}

const customNameLabel = ({ first_name, last_name }) => {
  if (!first_name && !last_name) return ''
  return `${first_name} ${last_name}`
}

const getFilteredData = (data, searchTerms, searchFields) => {
  if (!searchTerms) {
    return data
  }

  let filteredData = data.filter(data => {
    for (let index = 0; index < searchFields.length; index++) {
      const element = searchFields[index]
      const field = data[element]?.toString()
      if (field?.toLowerCase().includes(searchTerms.toLowerCase())) {
        return data
      }
    }
  })

  return filteredData
}

const getFirstData = (data, field = 'display') => {
  if (!data || !data.length) return '-'

  return data[0][field] || ''
}

const downloadPDF = (pdf) => {
  var link = document.createElement('a')
  link.setAttribute('href', pdf)
  link.target = '_blank'
  link.setAttribute('download', 'report.pdf')
  document.body.appendChild(link)
  link.click()
}

const hasData = (data, field) => {
  return !!(data && data[field])
}

const concatData = (data, fields) => {
  if (!data) return ''
  return fields.map(field => data[field]).filter(name => name).join(' ')
}

const getTotalValue = (data, field = 'balance') => {
  return data.reduce((acc, el) => {return acc + el[field]}, 0)
}

const formatName = (val) => {
  if (!val) return '-'
  let words = val.split(' ')
  const word = words.map((el ,i) => {
    return el.charAt(0).toUpperCase() + words[i].substr(1)
  })

  return word.join(' ')
}

const objectHasRequiredData = (data, fields) => {
  return !!Object.keys(data).find(field => {
    if (!fields.includes(field)) {
      return false
    }
    return !isEmpty(data[field])
  })
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
      getFirstData,
      downloadPDF,
      objectSubset,
      hasData,
      concatData,
      formatName,
      getTotalValue,
      objectHasRequiredData,
    }
  },
}
