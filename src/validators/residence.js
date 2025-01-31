import { validateModel } from 'models/validate'
import residence from 'models/residence'
import historyResidence from 'models/sections/historyResidence'
import * as formConfig from 'config/forms'

export const validateResidence = data => validateModel(data, residence)

export const validateHistoryResidence = (data, formType, options = {}) => {
  const years = formType
    && formConfig[formType]
    && formConfig[formType].HISTORY_RESIDENCE_YEARS

  return validateModel(data, historyResidence, { ...options, requireYears: years })
}

export class ResidenceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateResidence(this.data) === true
  }
}

export default class HistoryResidenceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateHistoryResidence(this.data) === true
  }
}
