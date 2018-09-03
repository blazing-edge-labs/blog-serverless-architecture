const error = require('../utils/error')

function wrap (err) {
  if (err instanceof error.GenericError) {
    return err
  }

  if (err.status === 400) {
    return error.http('http.bad_request', 400)(err, true)
  }

  if (err.status === 401) {
    return error.http('http.unauthorized', 401)(err, true)
  }

  if (err.status === 404) {
    return error.http('http.not_found', 404)(err, true)
  }

  return error.http('http.internal')(err, true)
}

function format (err) {
  if (err instanceof error.ValidationError) {
    return {
      status: false,
      code: err.code,
      error: err.error,
      errorv: {
        [err.nested.target]: err.nested.details,
      },
    }
  }

  if (err instanceof error.GenericError) {
    return {
      status: false,
      code: err.code,
      error: err.error,
      errorv: process.env.MODE === 'DEVELOPMENT' ? err.nested : null,
    }
  }
}

function log (err) {
  if (process.env.LOG > 0 && err instanceof error.DatabaseError) {
    console.log(err)
  } else if (process.env.LOG > 0 && err instanceof error.HttpError) {
    console.log(err)
  } else if (err instanceof error.ValidationError) {
    // do nothing
  } else if (process.env.LOG > 1) {
    console.log(err)
  }
}

module.exports = function (err) {
  let error = wrap(err)

  log(error)

  let formattedError = format(error)
  let status = error.status

  const response = {
    statusCode: status,
    body: JSON.stringify(formattedError),
  }

  return response
}