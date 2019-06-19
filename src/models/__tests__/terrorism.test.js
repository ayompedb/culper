import { validateModel } from 'models/validate'
import terrorism from '../terrorism'

describe('The terrorism model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'HasTerrorism.required',
    ]

    expect(validateModel(testData, terrorism))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Explanation must have a valid value', () => {
    const testData = {
      HasTerrorism: { value: 'true' },
    }
    const expectedErrors = ['HasTerrorism.hasValue']

    expect(validateModel(testData, terrorism))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if HasTerrorism is "Yes"', () => {
    it('Explanation must have a value', () => {
      const testData = {
        HasTerrorism: { value: 'Yes' },
      }
      const expectedErrors = [
        'Explanation.required',
        'Explanation.hasValue',
      ]

      expect(validateModel(testData, terrorism))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid terrorism', () => {
      const testData = {
        HasTerrorism: { value: 'Yes' },
        Explanation: { value: 'Because' },
      }

      expect(validateModel(testData, terrorism)).toEqual(true)
    })
  })

  describe('if HasTerrorism is "No"', () => {
    it('Explanation is not required', () => {
      const testData = {
        HasTerrorism: { value: 'No' },
      }
      const expectedErrors = ['Explanation.required']

      expect(validateModel(testData, terrorism))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid terrorism', () => {
      const testData = {
        HasTerrorism: { value: 'No' },
      }

      expect(validateModel(testData, terrorism)).toEqual(true)
    })
  })
})
