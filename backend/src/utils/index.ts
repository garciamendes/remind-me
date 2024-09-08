export const isEmpty = <T extends object>(data: T) => {
  return Object.keys(data).length === 0
}
