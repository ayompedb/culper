import name from 'models/shared/name'
import address from 'models/shared/locations/address'
import birthplaceWithoutCounty from 'models/shared/locations/birthplaceWithoutCounty'
import usCityStateZipInternationalCity from 'models/shared/locations/usCityStateZipInternationalCity'
import phone from 'models/shared/phone'
import { DEFAULT_LATEST, OTHER } from 'constants/dateLimits'

import {
  previouslyMarriedOptions,
} from 'constants/enums/relationshipOptions'

const divorce = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  Birthdate: {
    presence: true,
    date: OTHER,
  },
  BirthPlace: {
    presence: true,
    location: { validator: birthplaceWithoutCounty },
  },
  // TODO country
  Citizenship: {
    presence: true,
    country: true,
  },
  Telephone: {
    presence: true,
    model: { validator: phone },
  },
  Recognized: {
    presence: true,
    date: true,
  },
  Address: {
    presence: true,
    location: { validator: birthplaceWithoutCounty },
  },
  DateDivorced: (value, attributes) => {
    const dateLimits = { latest: DEFAULT_LATEST }
    if (attributes.Recognized) {
      dateLimits.earliest = attributes.Recognized
    }

    return {
      presence: true,
      date: dateLimits,
    }
  },
  Status: {
    presence: true,
    hasValue: {
      validator: { inclusion: previouslyMarriedOptions },
    },
  },
  DivorceLocation: (value, attributes) => {
    if (attributes.Status
      && attributes.Status.value === 'Widowed') return {}

    return {
      presence: true,
      location: { validator: usCityStateZipInternationalCity },
    }
  },
  Deceased: (value, attributes) => {
    if (attributes.Status
      && attributes.Status.value === 'Widowed') return {}

    return {
      presence: true,
      hasValue: {
        validator: { inclusion: ['Yes', 'No', 'DK'] },
      },
    }
  },
  DeceasedAddress: (value, attributes) => {
    if (attributes.DeceasedAddressNotApplicable
      && attributes.DeceasedAddressNotApplicable.applicable === false) {
      return {}
    }

    if (attributes.Status
      && attributes.Status.value === 'Widowed') return {}

    if (attributes.Deceased
      && attributes.Deceased.value !== 'No') return {}

    return {
      presence: true,
      location: { validator: address },
    }
  },
}

export default divorce
