import { validateModel, checkValue } from 'models/validate'
import usPassport from 'models/usPassport'

export const validateUsPassport = (data, formType, options = {}) => (
  validateModel(data, usPassport, options)
)

export const hasValidUSPassport = (data = {}) => {
  const { HasPassports = {} } = data
  return checkValue(HasPassports, 'Yes') && validateUsPassport(data) === true
}

/**
 * This is for U.S. Passports
 */
export default class PassportValidator {
  constructor(data = {}) {
    this.data = data
    this.issued = data.Issued
    this.expiration = data.Expiration
  }

  validHasPassports() {
    return validateModel(this.data, {
      HasPassports: usPassport.HasPassports,
    }) === true
  }

  validPassportNumber() {
    return validateModel({
      ...this.data,
      Dates: {
        from: this.issued,
      },
    }, {
      Number: usPassport.Number,
    }) === true
  }

  validDates() {
    return validateModel({
      ...this.data,
      Dates: {
        from: this.issued,
        to: this.expiration,
      },
    }, {
      Dates: usPassport.Dates,
    }) === true
  }

  isValid() {
    return validateUsPassport(this.data) === true
  }
}
