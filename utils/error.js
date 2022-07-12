const error = (msg = 'Something Went Wrong !', code = 400) => {
  const err = new Error(msg)
  err.status = code
  return err
}

module.exports = error
