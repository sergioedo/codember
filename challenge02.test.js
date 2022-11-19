
import fs from 'fs'

// ASCII Digits Codes from a to z: 97 to 122
const decryptWord = (word) => {
  if (word.length === 0) {
    return ''
  } else {
    const firstCharCodeIndex = (word[0] === '9') ? 2 : 3 // choose 2-digits or 3-digits ascii code
    const firstChar = String.fromCharCode(word.substring(0, firstCharCodeIndex))
    return firstChar + decryptWord(word.substring(firstCharCodeIndex))
  }
}

export function decrypt(inputLines) {
  return inputLines.map(line => line.split(' ').map(decryptWord).join(' '))
}

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  const inputLines = fs.readFileSync('challenge02.input.sample.txt', 'UTF-8').split('\n')

  it('decrypt sample', () => {
    const decryptedMessage = decrypt(inputLines)
    const expectedMessage = ['midu', 'codember', 'codember midu', 'play tetris'];
    // console.log(validUsers)

    expect(decryptedMessage).toBeDefined()
    expect(decryptedMessage).toHaveLength(expectedMessage.length)
    expect(JSON.stringify(decryptedMessage)).toBe(JSON.stringify(expectedMessage))
  })
}