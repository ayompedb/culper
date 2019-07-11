import { validate } from 'validate.js'
import { validateModel } from 'models/validate'
import { INVALID_VALIDATOR } from 'constants/errors'

const customModelValidator = (value, options = {}) => {
  if (validate.isEmpty(value)) return null // Don't validate if there is no value

  const { validator } = options
  if (!validator) return INVALID_VALIDATOR

  const errors = validateModel(value, validator, options)
  if (errors !== true) return errors

  return null
}

export default customModelValidator
