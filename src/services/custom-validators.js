export const emailFormatter = (value) => {
  if (!value) return value
  let parts = value.split('@')
  if (parts.length !== 2) return value
  parts[1] = parts[1].toLowerCase()
  return parts.join('@')
}
