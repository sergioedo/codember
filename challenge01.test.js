
import fs from 'fs'

export function getValidUsers(inputLines) {
}

// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  const inputLines = fs.readFileSync('challenge01.input.sample.txt', 'UTF-8').split('\n')

  it('validUsers sample', () => {
    const validUsers = getValidUsers(inputLines)
    expect(validUsers).toBeDefined()
    expect(validUsers).toHaveLength(3)
    expect(validUsers.at(-1).usr).toBe('@itziar')
  })
}