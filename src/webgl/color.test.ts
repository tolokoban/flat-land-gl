import Color from './color'

describe('webgl/color', () => {
    const validCases = ['#f37', '#FfF', '#d952', '#7833FD', '#12345678']
    for (const validCase of validCases) {
        it(`should find "${validCase}" valid`, () => {
            expect(Color.isValid(validCase)).toBeTruthy()
        })
    }

    const invalidCases = ['#ffx', 'Truc', '', '#79', '#dd451', '#1234567']
    for (const invalidCase of invalidCases) {
        it(`should find "${invalidCase}" invalid`, () => {
            expect(Color.isValid(invalidCase)).toBeFalsy()
        })
    }
})
