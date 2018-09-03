const http = {
  bad_request: 400,
  unauthorized: 401,
  not_found: 404,
  internal: 500
}

const db = {
  connection: 1000,
  read: 1000,
  write: 1001,
  delete: 1002
}

const user = {
  password_wrong: 2001,
  password_invalid: 2002,
  not_found: 2003,
  duplicate: 2004,
  update: 2005,
  password_token_invalid: 2006
}

const role = {
  duplicate: 4000,
  not_found: 4001,
  insufficient: 4002
}

module.exports = {
  http,
  db,
  user,
  role,
}