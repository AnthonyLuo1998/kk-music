export function hasPermission(has: Array<string>, need: Array<string>) {
  return need.length === 0 || has.some((h) => need.some((n) => h === n))
}
