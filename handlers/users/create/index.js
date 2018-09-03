const authorize = require('../../middleware/authorize')

module.exports.handler = async (event, context) => {
  // const user = authorize(event)
  // and wrap this with try/catch with error middleware so we can format and return the error back to the user

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hi! I had this url written in my environment file: ${process.env.BASE_URL}`
    }),
  }
}
