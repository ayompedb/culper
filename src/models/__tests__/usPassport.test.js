import { validateModel } from 'models/validate'
import usPassport from '../usPassport'

describe('The US Passport model', () => {
  it('HasPassports is required', () => {
    const testData = {}
    const expectedErrors = ['HasPassports.required']
    expect(validateModel(testData, usPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HasPassports must have a valid value', () => {
    const testData = { HasPassports: { value: true } }
    const expectedErrors = ['HasPassports.hasValue']
    expect(validateModel(testData, usPassport))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasPassports is "No"', () => {
    it('Name is not required', () => {
      const testData = {
        HasPassports: { value: 'No' },
      }
      const expectedErrors = ['Name.required']
      expect(validateModel(testData, usPassport))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Number is not required', () => {
      const testData = {
        HasPassports: { value: 'No' },
      }
      const expectedErrors = ['Number.required']
      expect(validateModel(testData, usPassport))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Issued is not required', () => {
      const testData = {
        HasPassports: { value: 'No' },
      }
      const expectedErrors = ['Issued.required']
      expect(validateModel(testData, usPassport))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Expiration is not required', () => {
      const testData = {
        HasPassports: { value: 'No' },
      }
      const expectedErrors = ['Expiration.required']
      expect(validateModel(testData, usPassport))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid US Passport', () => {
      const testData = {
        HasPassports: { value: 'No' },
      }
      expect(validateModel(testData, usPassport)).toEqual(true)
    })
  })

  describe('if HasPassports is "Yes"', () => {
    it('Name is required', () => {
      const testData = {
        HasPassports: { value: 'Yes' },
      }
      const expectedErrors = ['Name.required']
      expect(validateModel(testData, usPassport))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Name must be a valid name', () => {
      const testData = {
        HasPassports: { value: 'Yes' },
        Name: 'First middle last',
      }
      const expectedErrors = ['Name.model']
      expect(validateModel(testData, usPassport))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Number is required', () => {
      const testData = {
        HasPassports: { value: 'Yes' },
      }
      const expectedErrors = ['Number.required']
      expect(validateModel(testData, usPassport))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Dates is required', () => {
      const testData = {
        HasPassports: { value: 'Yes' },
      }
      const expectedErrors = ['Dates.required']
      expect(validateModel(testData, usPassport))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Dates (Issued and Expiration) must be a valid date range', () => {
      const testData = {
        HasPassports: { value: 'Yes' },
        Dates: {
          from: { year: '1900', day: '10', month: '22' },
          present: true,
        },
      }
      const expectedErrors = ['Dates.daterange']
      expect(validateModel(testData, usPassport))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if Issued is before 1/1/1990', () => {
      it('Number must be a valid value', () => {
        const testData = {
          HasPassports: { value: 'Yes' },
          Dates: {
            from: { year: '1980', day: '10', month: '4' },
            to: { year: '1990', day: '10', month: '4' },
          },
          Number: {
            value: '....',
          },
        }
        const expectedErrors = ['Number.hasValue']
        expect(validateModel(testData, usPassport))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid US Passport', () => {
        const testData = {
          HasPassports: { value: 'Yes' },
          Name: { first: 'Test', noMiddleName: true, last: 'Passport' },
          Dates: {
            from: { year: '1980', day: '10', month: '4' },
            to: { year: '1990', day: '10', month: '4' },
          },
          Number: {
            value: 'abc123',
          },
        }
        expect(validateModel(testData, usPassport)).toEqual(true)
      })
    })

    describe('if Issued is after 1/1/1990', () => {
      it('Number must be a valid value', () => {
        const testData = {
          HasPassports: { value: 'Yes' },
          Name: { first: 'Test', noMiddleName: true, last: 'Passport' },
          Dates: {
            from: { year: '1990', day: '10', month: '4' },
            to: { year: '2000', day: '10', month: '4' },
          },
          Number: {
            value: 'abc123',
          },
        }
        const expectedErrors = ['Number.hasValue']
        expect(validateModel(testData, usPassport))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid US Passport', () => {
        const testData = {
          HasPassports: { value: 'Yes' },
          Name: { first: 'Test', noMiddleName: true, last: 'Passport' },
          Dates: {
            from: { year: '1995', day: '10', month: '4' },
            to: { year: '2000', day: '10', month: '4' },
          },
          Number: {
            value: 'abc123def',
          },
        }
        expect(validateModel(testData, usPassport)).toEqual(true)
      })
    })
  })
})
