const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^\+?\d{9,15}$/

export function isEmail(value) {
  return value.includes("@")
}

export function isValidIdentifier(value) {
  const v = value.trim()
  if (!v) return false
  return isEmail(v) ? EMAIL_REGEX.test(v) : PHONE_REGEX.test(v)
}