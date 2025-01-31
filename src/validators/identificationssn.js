/* eslint import/prefer-default-export: 0 */
import { validateModel } from 'models/validate'
import identificationSSN from 'models/sections/identificationSSN'

export const validateIdentificationSSN = (data, formType, options = {}) => (
  validateModel(data, identificationSSN, options)
)
