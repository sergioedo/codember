
import fs from 'fs'

const parseUser = (userString) => {
  const user = userString.split(' ').filter(kv => kv !== '').reduce((prev, curr) => {
    const keyValue = curr.trim().split(':')
    return {
      ...prev,
      [keyValue[0]]: keyValue[1]
    }
  }, {})
  return user
}

const requiredFields = ['usr', 'eme', 'psw', 'age', 'loc', 'fll']
const isValid = (user) => {
  return requiredFields.every(field => user[field] !== undefined)
}

export function getValidUsers(inputLines) {
  return inputLines
    .map(line => line === '' ? '###' : `${line} `) //prepare user separator
    .join('') //concat in one line
    .split('###') //split one line per user
    .map(parseUser)
    .filter(isValid)
}

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  const inputLines = fs.readFileSync('challenge01.input.sample.txt', 'UTF-8').split('\n')

  it('validUsers sample', () => {
    const validUsers = getValidUsers(inputLines)
    const uniqueValidUsers = [...new Set(validUsers)];
    // console.log(validUsers)

    expect(validUsers).toBeDefined()
    expect(uniqueValidUsers).toHaveLength(3)
    expect(validUsers.at(-1).usr).toBe('@itziar')
  })

  const inputLinesSolution = fs.readFileSync('challenge01.input.txt', 'UTF-8').split('\n')

  it('validUsers solution', () => {
    const validUsers = getValidUsers(inputLinesSolution)
    const uniqueValidUsers = [...new Set(validUsers)];
    // console.log(validUsers)

    expect(validUsers).toBeDefined()
    expect(uniqueValidUsers).toHaveLength(156)
    expect(validUsers.at(-1).usr).toBe('@giroz')
  })
}