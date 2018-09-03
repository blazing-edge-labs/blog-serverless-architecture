const jwt = require('jsonwebtoken')

function authorize (event, access) {
  const token = event.headers.Authorization.replace('Bearer ', '')
  const payload = jwt.verify(token, process.env.JWT_SECRET)

  if (access) {
    // get access level of a user
    // if administrator, return userPayload or id
    // if not, check if user has the access
    // if not, throw access forbidden
  }

  return {
    id: payload.id
  }
}

module.exports = authorize
