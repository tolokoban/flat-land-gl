// tslint:disable:no-magic-numbers

import castInteger from './integer'

describe('castInteger( string )', () => {
  const defaultValue = 666
  const defaultValueCases = ['Prout', '*5656', 'é485']
  for (const defaultValueCase of defaultValueCases) {
    it(`should return defaultValue (${defaultValue}) for "${defaultValueCase}"`, () => {
      const result = castInteger(defaultValueCase, defaultValue)
      expect(result).toEqual(defaultValue)
    })
  }

  const castCases = [
    ['', 0],
    ['8', 8],
    ['-8', -8],
    ['487421', 487421],
    ['3.141', 3],
    ['-3.141', -3],
    ['2.3e2', 230],
    ['0xFAB', 0xfab],
    ['0b11101001000101111010111010110', 0b11101001000101111010111010110],
    ['0o4517', 0o4517]
  ]
  for (const value of castCases) {
    const [input, expected] = value
    it(`should convert "${input}" into ${expected}`, () => {
      const result = castInteger(input, defaultValue)
      expect(result).toEqual(expected)
    })
  }

  it('Should round default value', () => {
    expect(castInteger('PI', 3.14)).toEqual(3)
    expect(castInteger('E', 1.618)).toEqual(2)
  })
})
