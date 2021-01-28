const { sendJSONResponse, isConditionMet } = require('../utils');

const apiRoot = (req, res) => sendJSONResponse(res, 'My Rule-Validation API', 'success', 200, {
  name: 'Abioye Oyetunji',
  github: '@tunji17',
  email: 'oyetunjiabioye17@gmail.com',
  mobile: '+2348138542116',
  twitter: '@_2nji_'
})

const validateRule = (req, res) => {
  const { rule, data } = req.body;
  if ((typeof data === 'string' || Array.isArray(data)) && data[rule.field] === undefined) {
    return sendJSONResponse(res, `field ${rule.field} is missing from data.`, 'error', 400, null)
  }

  if (typeof data === 'string' || Array.isArray(data)) {
    const isValid = isConditionMet(data[rule.field], rule.condition, rule.condition_value)
    return sendJSONResponse(res, `field ${rule.field} ${ isValid ? 'successfully validated' : 'failed validation'}.`, isValid ? 'success': 'error', isValid ? 200: 400, {
      validation: {
        error: isValid ? false : true,
        field: rule.field,
        field_value: data[rule.field],
        condition: rule.condition,
        condition_value: rule.condition_value
      }
    })
  };
  const dataObjFields = rule.field.split('.')
  if (dataObjFields.length > 2) {
    return sendJSONResponse(res, 'The nested rule.field should not be more than two levels', 'error', 400, null)
  }
  if (typeof data === 'object' && !data.hasOwnProperty(dataObjFields[0])) {
    return sendJSONResponse(res, `field ${rule.field} is missing from data.`, 'error', 400, null)
  }

  if (typeof data === 'object' && dataObjFields.length === 2 && !data[dataObjFields[0]].hasOwnProperty(dataObjFields[1])) {
    return sendJSONResponse(res, `field ${rule.field} is missing from data.`, 'error', 400, null)
  }
  if (typeof data === 'object' && dataObjFields.length === 1 && data.hasOwnProperty(dataObjFields[0])) {
    const isValid = isConditionMet(data[rule.field], rule.condition, rule.condition_value)
    return sendJSONResponse(res, `field ${rule.field} ${ isValid ? 'successfully validated' : 'failed validation'}.`, isValid ? 'success': 'error', isValid ? 200: 400, {
      validation: {
        error: isValid ? false : true,
        field: rule.field,
        field_value: data[rule.field],
        condition: rule.condition,
        condition_value: rule.condition_value
      }
    })
  }
  if (typeof data === 'object' && dataObjFields.length === 2 && data[dataObjFields[0]].hasOwnProperty(dataObjFields[1])) {
    const isValid = isConditionMet(data[dataObjFields[0]][dataObjFields[1]], rule.condition, rule.condition_value)
    return sendJSONResponse(res, `field ${rule.field} ${ isValid ? 'successfully validated' : 'failed validation'}.`, isValid ? 'success': 'error', isValid ? 200: 400, {
      validation: {
        error: isValid ? false : true,
        field: rule.field,
        field_value: data[dataObjFields[0]][dataObjFields[1]],
        condition: rule.condition,
        condition_value: rule.condition_value
      }
    })
  }
  return sendJSONResponse(res, 'An error occurred while processing, Please try again', 'error', 400, null)
}

module.exports = {
  apiRoot,
  validateRule,
}