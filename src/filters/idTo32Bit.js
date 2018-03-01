export default (value) => {
  const base32Table = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
  let base32 = ''
  parseInt(value, 10)
  var remainder
  while (value >= 1) {
    remainder = value % 32
    value -= remainder
    value /= 32
    base32 = base32Table.charAt(remainder) + base32
  }
  // Zero pad to 4 chars
  base32 = (`0000${base32}`).slice(-4)
  return base32
}
