let dateServer = value => {
  return value.indexOf('0') > 2 ? '$ '+value : value
}
export { dateServer }