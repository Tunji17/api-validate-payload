const Joi = require('joi');
const { sendJSONResponse } = require('../utils')

  const validateBodySchema = () => {
    const conditionArray = ['eq', 'neq', 'gt', 'gte', 'contains']
    const schema = Joi.object().keys({
      rule: Joi.object({
        field: Joi.string().required().messages({
          'any.required': 'field is required.',
          'string.base': 'field should be a string.'
        }),
        condition: Joi.string().valid(...conditionArray).required().messages({
          'any.required': 'condition is required.',
          'string.base': 'condition should be a string.',
          'any.only': 'condition must be one of [eq, neq, gt, gte, contains].'
        }),
        condition_value: Joi.alternatives().try(Joi.number(), Joi.string()).required().messages({
          'any.required': 'condition_value is required.',
          'alternatives.types': 'condition_value should be a string or number.'
        }),
      }).required().messages({
        'any.required': 'rule is required.',
        'object.base': 'rule should be an object.'
      }),
      data: Joi.alternatives().try(
        Joi.object(),
        Joi.array().items(Joi.string()),
        Joi.string()
      ).required().messages({
        'any.required': 'data is required.',
        'alternatives.types': 'data should be a string, array or object.'
      }),
    });
  
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if( result.error ) {
        return sendJSONResponse(res, result.error.details[0].message, 'error', 400, null)
      }else {
        next();
      }
    }
  };

  module.exports = validateBodySchema;
