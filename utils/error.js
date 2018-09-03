const NestedError = require('nested-error-stacks')
const _ = require('lodash')
const assert = require('assert')
const pgp = require('pg-promise')

const errors = require('./errors')

class GenericError extends NestedError {
  constructor (ec, cause, status) {
    super(ec, cause)
    this.error = ec
    this.code = code(ec)
    this.status = status
  }
}

class DatabaseError extends GenericError {}
class HttpError extends GenericError {}
class ValidationError extends GenericError {}

function code (ec) {
  const code = _.get(errors, ec)
  assert(code, 'invalid error const specified')
  return code
}

function wrapper (ErrorClass, defaultStatus = 500) {
  return function (ec, status = defaultStatus) {
    return function handler (cause, nothrow = false) {
      if (cause instanceof GenericError && !nothrow) {
        throw cause
      }
      const err = new ErrorClass(ec, cause, status)
      if (nothrow) return err
      throw err
    }
  }
}

const error = wrapper(GenericError, 400)
error.db = wrapper(DatabaseError, 500)
error.http = wrapper(HttpError, 500)
error.validation = wrapper(ValidationError, 400)

error.errors = errors

error.AssertionError = assert.AssertionError
error.DatabaseError = DatabaseError
error.GenericError = GenericError
error.HttpError = HttpError
error.QueryFileError = pgp.errors.QueryFileError
error.QueryResultError = pgp.errors.QueryResultError
error.ValidationError = ValidationError

module.exports = error