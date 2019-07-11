import { validate } from 'validate.js'

import * as errorKeys from 'constants/errors'
import { YES, NO } from 'constants/values'

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
  errors.map(e => `${e.attribute}.${e.validator}.${e.error}`)
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
validate.validators.datetime.notValid = errorKeys.INVALID_DATE
validate.validators.datetime.tooEarly = errorKeys.DATE_TOO_EARLY
validate.validators.datetime.tooLate = errorKeys.DATE_TOO_LATE
validate.validators.email.message = errorKeys.INVALID_EMAIL
validate.validators.equality.message = errorKeys.NOT_EQUAL
validate.validators.exclusion.message = errorKeys.EXCLUSION
validate.validators.format.message = errorKeys.INVALID_FORMAT
validate.validators.inclusion.message = errorKeys.INCLUSION
validate.validators.length.notValid = errorKeys.INVALID_LENGTH
validate.validators.length.wrongLength = errorKeys.LENGTH_WRONG
validate.validators.length.tooShort = errorKeys.LENGTH_TOO_SHORT
validate.validators.length.tooLong = errorKeys.LENGTH_TOO_LONG
validate.validators.numericality.notValid = errorKeys.INVALID_NUMBER
validate.validators.numericality.notInteger = errorKeys.NUMBER_NOT_INTEGER
validate.validators.numericality.notGreaterThan = errorKeys.NUMBER_NOT_GREATER_THAN
validate.validators.numericality.notGreaterThanOrEqualTo = errorKeys
  .NUMBER_NOT_GREATER_THAN_OR_EQUAL_TO
validate.validators.numericality.notEqualTo = errorKeys.NUMBER_NOT_EQUAL_TO
validate.validators.numericality.notLessThan = errorKeys.NUMBER_NOT_LESS_THAN
validate.validators.numericality.notLessThanOrEqualTo = errorKeys.NUMBER_NOT_LESS_THAN_OR_EQUAL_TO
validate.validators.numericality.notDivisibleBy = errorKeys.NUMBER_NOT_DIVISIBLE_BY
validate.validators.numericality.notOdd = errorKeys.NUMBER_NOT_ODD
validate.validators.numericality.notEven = errorKeys.NUMBER_NOT_EVEN
validate.validators.presence.allowEmpty = false
validate.validators.presence.message = errorKeys.REQUIRED
validate.validators.url.message = errorKeys.INVALID_URL

validate.options = {
  fullMessages: false,
  format: 'errorKeys',
  allowPOBox: true,
  requireDay: true,
  requireMonth: true,
  requireYear: true,
  earliest: createDateFromObject({ day: 1, month: 1, year: 1000 }),
  latest: createDateFromObject({ day: 1, month: 1, year: 10000 }),
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
  inclusion: [YES, NO],
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
