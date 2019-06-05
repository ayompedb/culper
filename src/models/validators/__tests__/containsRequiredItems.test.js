import containsRequiredItems from '../containsRequiredItems'

describe('The containsRequiredItems validator', () => {
  it('fails if items is undefined', () => {
    const testData = { items: undefined }
    expect(containsRequiredItems(testData)).toBeTruthy()
  })

  it('fails if there are no items', () => {
    const testData = { items: [] }
    expect(containsRequiredItems(testData)).toBeTruthy()
  })

  it('fails if there are no requirements', () => {
    const testData = { items: [{ Item: 'Thing' }] }
    expect(containsRequiredItems(testData)).toBeTruthy()
  })

  it('fails if not all of the requirements are met', () => {
    const testData = {
      items: [
        { Item: 'One' },
        { Item: 'Two' },
        { Item: 'Five' },
      ],
    }

    const requirements = [
      i => i.Item === 'One',
      i => i.Item === 'Two',
      i => i.Item === 'Three',
    ]

    expect(containsRequiredItems(testData, { requirements })).toBeTruthy()
  })

  it('passes if all of the requirements are met', () => {
    const testData = {
      items: [
        { Item: 'One' },
        { Item: 'Two' },
        { Item: 'Three' },
        { Item: 'Four' },
        { Item: 'Five' },
      ],
    }

    const requirements = [
      i => i.Item === 'One',
      i => i.Item === 'Two',
      i => i.Item === 'Three',
    ]

    expect(containsRequiredItems(testData, { requirements })).toBeNull()
  })
})
