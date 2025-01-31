import store from 'services/store'
import { validateModel } from 'models/validate'
import militaryForeign, { foreignMilitaryContact } from 'models/militaryForeign'
import { requireForeignMilitaryMaintainsContact } from 'helpers/branches'

const validateForeignContact = data => (
  validateModel(data, foreignMilitaryContact)
)
export class ForeignContactValidator {
  constructor(data) {
    this.data = data
  }

  isValid() {
    return validateForeignContact(this.data) === true
  }
}

export class ForeignServiceValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  isValid() {
    return validateModel(this.data, militaryForeign, {
      requireForeignMilitaryMaintainsContact: requireForeignMilitaryMaintainsContact(this.formType),
    }) === true
  }
}

const militaryForeignModel = {
  List: {
    presence: true,
    branchCollection: {
      validator: militaryForeign,
    },
  },
}

export const validateMilitaryForeign = (data, formType, options = {}) => (
  validateModel(data, militaryForeignModel, {
    ...options,
    requireForeignMilitaryMaintainsContact: requireForeignMilitaryMaintainsContact(formType),
  })
)

export default class MilitaryForeignValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  isValid() {
    return validateMilitaryForeign(this.data, this.formType) === true
  }
}
