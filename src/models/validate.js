import { validate } from 'validate.js'

import requireTrue from 'models/validators/requireTrue'
import requireEmpty from 'models/validators/requireEmpty'
import hasValue from 'models/validators/hasValue'
import array from 'models/validators/array'
import accordion from 'models/validators/accordion'
import branchCollection from 'models/validators/branchCollection'
import customModel from 'models/validators/customModel'
import date from 'models/validators/date'
import daterange from 'models/validators/daterange'
import location from 'models/validators/location'
import ssn from 'models/validators/ssn'
import zipcode from 'models/validators/zipcode'
import durationCoverage from 'models/validators/durationCoverage'
import containsRequiredItems from 'models/validators/containsRequiredItems'

import {
  isDateTime, cleanDateObject, createDateFromObject, createDateFromTimestamp,
} from 'helpers/date'

// Error message format
validate.formatters.errorKeys = errors => (
  errors.map((e) => {
    let { validator } = e
    if (validator === 'presence') {
      validator = 'required'
    }

    return `${e.attribute}.${validator}`
  })
)

// Date parser/formatting
validate.extend(validate.validators.datetime, {
  parse: (value) => {
    // Value is the datetime as taken in by the form
    // Return unix timestamp
    const dateTime = value && isDateTime(value)
      ? value
      : createDateFromObject(cleanDateObject(value))

    if (dateTime.isValid) {
      return dateTime.toMillis()
    }

    return NaN
  },
  format: (value) => {
    // Value is the datetime as a unix timestamp
    // Return formatted date (used in error messages)
    const dateTime = createDateFromTimestamp(value)
    return dateTime.toLocaleString()
  },
})

// Set default options/config
validate.validators.presence.options = { allowEmpty: false }
validate.options = {
  format: 'errorKeys',
  allowPOBox: true,
  requireDay: true,
  requireMonth: true,
  requireYear: true,
}

// Implement custom validators
validate.validators.requireTrue = requireTrue
validate.validators.requireEmpty = requireEmpty
validate.validators.hasValue = hasValue
validate.validators.array = array
validate.validators.accordion = accordion
validate.validators.branchCollection = branchCollection
validate.validators.model = customModel
validate.validators.date = date
validate.validators.daterange = daterange
validate.validators.location = location
validate.validators.ssn = ssn
validate.validators.zipcode = zipcode
validate.validators.durationCoverage = durationCoverage
validate.validators.containsRequiredItems = containsRequiredItems

export const validateModel = (data, model, options) => {
  const errors = options
    ? validate(data, model, options)
    : validate(data, model)

  // console.log('validate model', data, model, errors)

  if (!errors) return true

  return errors
}

export default validateModel

// Misc helpers (might be moved later)

/** require Yes or No */
export const hasYesOrNo = {
  inclusion: ['Yes', 'No'],
}

/** check the value of an attribute.value */
export const checkValue = (attribute, expected) => !!(attribute
  && attribute.value
  && attribute.value === expected)

export const checkValueIncluded = (attribute, expected) => attribute
  && attribute.value
  && expected.includes(attribute.value)

export const valueIsEmpty = (data = {}) => !data.value || validate.isEmpty(data.value)

export const nameIsEmpty = (data = {}) => {
  const {
    first, firstInitialOnly, middle, middleInitialOnly, last, suffix,
  } = data

  const fields = [
    first, firstInitialOnly, middle, middleInitialOnly, last, suffix,
  ]

  return fields.every(i => i === false || validate.isEmpty(i))
}

export const dateIsEmpty = (data = {}) => {
  const { day, month, year } = data
  const fields = [day, month, year]
  return fields.every(i => validate.isEmpty(i))
}

export const locationIsEmpty = (data = {}) => {
  const { country, city, state } = data

  return (validate.isEmpty(country) || valueIsEmpty(country))
    && validate.isEmpty(city)
    && validate.isEmpty(state)
}
