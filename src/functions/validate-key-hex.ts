export const validateKeyHex = (key: string) => {
  const regex = /^[0-9a-fA-F]{64}$/
  return regex.test(key)
}
