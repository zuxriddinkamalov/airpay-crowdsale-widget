import { map, forEach } from 'ramda'

export const prepareValidateErrors = error => {
  let message = '<p class="validate-error-header">Error in validating</p><ul class="validate-error-list">'
  map(item => {
    forEach(msg => {
      message += `<li class="validate-error">${msg.message}</li>`
    }, item)
  }, error)
  message += '</ul>'
  return message
}
