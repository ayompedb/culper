import { validateModel } from 'models/validate'
import phone from 'models/shared/phone'
import email from 'models/shared/email'

export const validateContactEmail = data => (
  validateModel(data, email) === true
)

export const validateContactPhoneNumber = (data) => {
  const { Telephone } = data
  return validateModel(Telephone, phone, { requireNumberType: true }) === true
}

// Requires at least one valid phone number item
export const validateContactPhoneNumbers = data => (
  data && data.items && data.items.length > 0
    && data.items.some(i => validateContactPhoneNumber(i))
)

// There can only be one of each phone number type (Cell, Home, Work)
export const validateContactPhoneTypes = (data) => {
  const types = []

  data.forEach((i) => {
    if (!i.Item || !i.Item.Telephone) {
      return
    }

    types.push(i.Item.Telephone.numberType)
  })

  const uniqueTypes = [...new Set(types)]
  return uniqueTypes.length === types.length
}

// Checks for at least one valid phone number, valid home email, and valid work email
export const validateIdentificationContactInformation = (data) => {
  const { HomeEmail, WorkEmail, PhoneNumbers } = data

  const validEmailPresent = (HomeEmail && validateContactEmail(HomeEmail))
    || (WorkEmail && validateContactEmail(WorkEmail))

  return validateContactPhoneNumbers(PhoneNumbers)
    && validateContactPhoneTypes(PhoneNumbers)
    && validEmailPresent
}

/** LEGACY */
export default class IdentificationContactInformationValidator {
  constructor(data = {}) {
    this.data = data
    this.homeEmail = data.HomeEmail
    this.workEmail = data.WorkEmail
    this.phoneNumbers = (data.PhoneNumbers || { items: [] }).items
  }

  validPhoneTypes() {
    return validateContactPhoneTypes(this.phoneNumbers)
  }

  /**
   * Validates emails and phone numbers
   */
  isValid() {
    return validateIdentificationContactInformation(this.data)
  }
}

export class ContactPhoneNumberValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateContactPhoneNumber(this.data)
  }
}
