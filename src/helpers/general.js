import { map, forEach } from 'ramda'

export const prepareValidateErrors = error => {
  let message = '<p class="error-header">Error in validating</p><ul class="error-list">'
  map(item => {
    forEach(msg => {
      message += `<li class="error-item">${msg.message}</li>`
    }, item)
  }, error)
  message += '</ul>'
  return message
}

export const prepareNetworkErrors = error => {
  let message = '<p class="error-header">Network error</p><ul class="error-list">'
  forEach(msg => {
    message += `<li class="error-item">${msg.message}</li>`
  }, error)
  message += '</ul>'
  return message
}

export const prepareGraphQLErrors = error => {
  let message = '<p class="error-header">GraphQL error</p><ul class="error-list">'
  forEach(msg => {
    message += `<li class="error-item">${msg.message}</li>`
  }, error)
  message += '</ul>'
  return message
}
